module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    sass_import: {
      options: {},
      dist: {
        files: {
          'css/styles.scss': ['sass/variables/*.scss', 'sass/mixins/*.scss', 'sass/base/*.scss', 'sass/components/*.scss'],
        }
      }
    },
    sass: {
      dist: {
        files: {
          'css/styles.min.css': 'css/styles.scss'
        }
      }
    },
    watch: {
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass:dist', 'autoprefixer'],
        options: {
          spawn: false,
        }
      }
    },
    autoprefixer: {
      dist: {
        files: {
          'css/styles.min.css': 'css/styles.min.css'
        },
        options: {
          browsers: ['last 2 versions', 'iOS 8']
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css'],
          dest: 'css'
        }]
      }
    },
    svgmin: {
      options: {
        plugins: [
          {
            removeViewBox: false
          },
          {
            cleanupIDs: false
          }
        ]
      },
      dist: {
        files: {
          'icons/symbol-defs.svg' : 'icons/symbol-defs.svg'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'js/scripts.min.js': ['js/scripts.js', 'js/svgxuse.js']
        }
      }
    },
    uncss: {
      dist: {
        options: {
          ignore: [/\.js/, /\.active/, /\.open/]
        },
        files: {
          'css/styles.min.css': ['_site/index.html', 'site/resources.html']
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['sass_import','sass', 'autoprefixer', 'uncss', 'cssmin', 'svgmin', 'uglify']);

};

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
          'css/styles.css': 'css/styles.scss'
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
          'css/styles.css': 'css/styles.css'
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
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sass-import');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['sass_import','sass', 'autoprefixer', 'cssmin']);

};

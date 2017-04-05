module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    sass_import: {
      options: {},
      dist: {
        files: {
          'assets/css/styles.scss': ['assets/sass/variables/*.scss', 'assets/sass/mixins/*.scss', 'assets/sass/base/*.scss', 'assets/sass/components/*.scss'],
        }
      }
    },
    sass: {
      dist: {
        files: {
          'assets/css/styles.min.css': 'assets/css/styles.scss'
        }
      }
    },
    watch: {
      sass: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },
      js: {
        files: ['assets/js/scripts.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
        }
      }
    },
    autoprefixer: {
      dist: {
        files: {
          'assets/css/styles.min.css': 'assets/css/styles.min.css'
        },
        options: {
          browsers: ['last 2 versions', 'iOS 8']
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'assets/css/styles.min.css': 'assets/css/styles.min.css'
        }
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
          'assets/icons/symbol-defs.svg' : 'assets/icons/symbol-defs.svg'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': ['assets/js/modernizr-output.js', 'assets/js/scripts.js', 'assets/js/svg4everybody.js']
        }
      }
    },
    uncss: {
      dist: {
        options: {
          ignore: [/\.js/, /\.active/, /\.open/]
        },
        files: {
          'assets/css/styles.min.css': ['_site/index.html', '_site/resources.html']
        }
      }
    },
    shell: {
      jekyllServe: {
        command: 'jekyll serve'
      }
    },
    concurrent: {
      serve: [
        'sass',
        'watch',
        'shell:jekyllServe'
      ],
      options: {
        logConcurrentOutput: true
      }
    },
    modernizr: {
      dist: {
        crawl: false,
        dest: 'assets/js/modernizr-output.js',
        tests: [
          'flexbox'
        ],
        options: [
          'setClasses'
        ],
        uglify: true
      }
    },
    concat: {
      serve: {
        src: ['assets/js/modernizr-output.js', 'assets/js/scripts.js', 'assets/js/svg4everybody.js'],
        dest: 'assets/js/scripts.min.js',
      },
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks("grunt-modernizr"); //not picked up by load-grunt-tasks

  grunt.registerTask('default', ['sass_import','sass', 'autoprefixer', 'uncss', 'cssmin', 'svgmin', 'modernizr', 'uglify']);
  grunt.registerTask('serve', ['concurrent:serve'])

};

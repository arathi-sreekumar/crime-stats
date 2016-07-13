
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
        // compile: {
        //     options: {
        //         baseUrl: 'js/',
        //         name: 'main',
        //         dir: 'js/target/',
        //         mainConfigFile: 'js/config.js',
        //         //out: 'js/compiled.min.js',
        //         optimize: 'uglify2'
        //     }
        // }
        /* For minification - production */
        compile: {
            options: {
               baseUrl: 'js/',
               name: 'main',
               mainConfigFile: 'js/config.js',
               out: 'js/compiled/compiled.min.js',
               optimize: 'uglify2',
               include: ['libs/require.js']
            }
        }
    },
    jshint: {
      files: ['js/application/**/*.js', 'Gruntfile.js',
      '!**/target/*.js', '!**/vendor/**/*.js',
      '!**/compiled.min.js', '!**/node_modules/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },
    inline: {
        dist: {
            options:{
                uglify: true
            },
            src: [
            ]
        }
    },
    less: {
      main: {
        options: {
          cleancss: true
        },
        files: {
          'css/styles.css': [
            'less/project.less'
          ]
        }
      }
    },
    jasmine: {
      src: ['js/Player.js', 'js/Song.js'],
      options: {
        specs: 'test/spec/PlayerSpec.js',
        helpers: 'test/spec/SpecHelper.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'js/scripts.min.js': [
            'js/*.js'
          ]
        }
      }
    },

    watch: {
      styles: {
        files: [ 'less/*.less'],
        tasks: ['less']
      },
      scripts: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      jade: {
        files: ['jade/*.jade','jade/demos/*.jade','jade/includes/**/*.jade'],
        tasks: ['jade']
      }
      // livereload: {
      //   // Browser live reloading
      //   // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
      //   options: {
      //     livereload: false
      //   }
      //   // files: [
      //   //   'css/main.min.css',
      //   //   'js/scripts.min.js',
      //   //   // 'templates/*.php',
      //   //   // '*.php'
      //   // ]
      // }
    },
    clean: {
      dist: [
        'css/*.css',
        'js/compiled/*.js',
        'index.html'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  //grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-inline');
  //grunt.loadNpmTasks('grunt-exec');
  //grunt.loadNpmTasks('grunt-recess');
  //grunt.loadNpmTasks('grunt-wp-version');

  // Register tasks
  grunt.registerTask('default', [
    'requirejs',
    'jshint',
    //'jade',
    'jasmine',
    'clean',
    'less',
    'inline',
    //'uglify',
    //'exec',
    'concat'
  ]);

};
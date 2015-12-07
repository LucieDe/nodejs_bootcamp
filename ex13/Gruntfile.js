module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    //VARIABLES
    files: {
      js: ['src/js/**/*.js'],
      destination: 'dist/'
    },
    //TASKS
    uglify: {
      dist: {
        files: {
          '<%= files.destination %>js/main.min.js': ['<%= files.js %>']
        }
      }
    },
    handlebarslayouts: {
      dist: {
        files: {
          'dist/*.html': 'src/hbs/pages/*.hbs'
        },
        options: {
          partials: [
            'src/hbs/partials/*.hbs'
          ],
          context: "src/hbs/datas.json"
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['*.html'],
          dest: '<%= files.destination %>'
        }],
      },
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/sass',
          cssDir: 'dist/css',
          environment: 'production'
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['img/**/*.{png,jpg,gif}'],
          dest: '<%= files.destination %>'
        }]
      }
    },
    clean: ["dist"],

    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          base: '<%= files.destination %>'
        }
      }
    },
    ftpush: {
      prod: {
        auth: {
          host: 'dev.technocite.lan',
          port: 21,
          authKey: 'key1'
        },
        src: 'dist/',
        dest: '/',
        simple: false,
        useList: false
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      js: {
        files: '<%= files.js %>',
        tasks: ['uglify:dist']
      },
      sass: {
        files: 'src/sass/**/*.scss',
        tasks: ['compass:dist']
      },
      hbs: {
        files: ['src/hbs/**/**/*.hbs', 'src/hbs/**/**/*.json'],
        tasks: ['handlebarslayouts']
      }
    },
  });

  // Load the plugin
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks("grunt-handlebars-layouts");
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ftpush');
  // Default task(s).
  grunt.registerTask('default', ['uglify:dist', 'handlebarslayouts', 'compass', 'connect', 'watch']);
  grunt.registerTask('prod', ['clean','uglify:dist', 'handlebarslayouts', 'compass',"ftpush:prod"]);
};

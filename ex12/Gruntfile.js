module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    //variables
    files : {
      js:['src/js/**/*.js'],
      destination:'dist/'
    },
    //tasks
    uglify: {
      dist: {
        files: {
          '<%= files.destination %>js/main.min.js': ['<%= files.js %>']
        },
      },
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
          context:"src/hbs/datas.json"
        },
      },
    },
    copy: {
      dist: {
        files:[{
          expand: true,
          cwd: 'src/',
          src: ['*.html'],
          dest: '<%= files.destination %>'
        }],
      },
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['img/**/*.{png,jpg,gif}'],
          dest: '<%= files.destination %>'
        }]
      },
    },
    compass: {
      dist: {
        options: {
          sassDir: 'src/sass',
          cssDir: 'dist/css',
          environment: 'production'
        }
      },
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          base: '<%= files.destination %>'
        },
      },
    },
    watch: {
      options:{
        livereload:true
      },
      js: {
        files: '<%= files.js %>',
        tasks: ['uglify:dist']
      },
      hbs:{
        files: ['src/hbs/**/**/*.hbs', 'src/hbs/**/**/*.json'],
        tasks: ['handlebarslayouts']
      },
      sass:{
        files: 'src/sass/**/*.scss',
        tasks:['compass:dist']
      },
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks("grunt-handlebars-layouts");

  // Default task(s).
  grunt.registerTask('default', ['uglify:dist', 'handlebarslayouts','compass','connect','watch']);

};

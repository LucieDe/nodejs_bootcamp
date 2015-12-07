module.exports = function(grunt){
  grunt.initConfig({
    copy: {
      dist: {
        files:[{
          expend: true,
          cwd: "src/",
          src:["*.html"],
          dest: "dist/"
        }],
      },
    },
    compass: {
      dist:{
        options:{
          sassDir:"src/sass",
          cssDir: "dist/css",
          environment:"production",
        },
      },
    },
  });

  //Load the plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task(s)
  grunt.registerTask('default',["copy","compass"]);
};

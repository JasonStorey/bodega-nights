module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            dev: {
                options: {
                    baseUrl: 'src/',
                    name: '../node_modules/almond/almond',
                    include: ['main'],
                    out: 'dist/bodega-nights.js',
                    optimize: 'none',
                    cjsTranslate: true,
                    wrapShim: true,
                    wrap: {
                        startFile: 'src/boilerplate/start.frag',
                        endFile: 'src/boilerplate/end.frag'
                    },
                    paths: {
                        Phaser: '../node_modules/Phaser/build/custom/phaser-arcade-physics.min'
                    }
                }
            }
        }
    });

    grunt.registerTask('default', ['requirejs:dev']);
};
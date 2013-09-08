module.exports = function (grunt) {

    grunt.initConfig({
        pkg: {
          name: 'RxJS-Splash'
        },
        concat: {
            basic: {
                src: [
                    'src/meta/license.js',
                    'src/meta/intro.js',
                    'src/meta/header.js',

                    'src/util/link.js',
                    'src/util/wrap.js',
                    'src/util/combine.js',
                    'src/util/arrayDiff.js',
                    
                    'src/internal/parse.js',
                    'src/internal/formatOptions.js',
                    'src/internal/bind.js',

                    'src/bind.js',

                    'src/binders/text.js',

                    'src/meta/exports.js',
                    'src/meta/outro.js'
                ],
                dest: 'bin/rx.splash.js'
            }
        },
        uglify: {
            options: {
              banner: '/* <%= pkg.name %> Copyright (c) Christopher Harris 2013 */\r\n'
            },
            basic: {
                src: 'bin/rx.splash.js',
                dest: 'bin/rx.splash.min.js'
            }
        },
        qunit: {
            all: ['tests/*.html']
        },
        jshint: {
            options: {
                evil: true
            },
            all: [
                'bin/rx.splash.js',
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', [
        'qunit'
    ]);

    grunt.registerTask('lint', [
        'concat:basic',
        'jshint'
    ]);

    // Default task
    grunt.registerTask('default', [
        'concat:basic',
        'uglify:basic',
        'jshint',
        'qunit',
    ]);    

};
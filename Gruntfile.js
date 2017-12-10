module.exports = function (grunt) {
    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    // Project configuration.  
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        purifycss: {
            options: { minify: true },
            target: {
                src: ['public/dist/index.html', 'public/dist/js/app.min.js'],
                css: ['public/dist/css/site.min.css'],
                dest: 'public/dist/css/site.min.css'
            },
        },
        cssmin: {
            options: {
                expand: true,
                keepSpecialComments: 0,
                // cwd:'public/dev',
                //relativeTo:'public/dev',
                //root:'public/dev',
                //target: 'public/dist',
                rebase: true
            },
            sitecss: {
                files: {
                    'public/dist/css/site.min.css': [
                        'public/dev/css/font-awesome.min.css',
                        'public/dev/css/ds.css',
                        'public/dev/css/ipad-ds.css',
                        'public/dev/css/mobile-ds.css',
                        'public/dev/css/animate.css',
                        'public/dev/css/menu.css',
                        'public/dev/css/tabs.css',
                        'public/dev/css/popup.css',
                    ]
                }
            }
        },
        replace: {
            processUrlRebase: {
                src: ['public/dist/css/site.min.css'],             // source files array (supports minimatch) 
                overwrite: true,             // destination directory or file 
                replacements: [{
                    from: '/../dev/',                   // string replacement 
                    to: '/'
                }]
            }
        },
        'closure-compiler': {
            frontend: {
                closurePath: 'closure',
                js: [
                    'public/dev/js/jquery-1.8.2.min.js',
                    "public/dev/js/jquery-1.8.2.min.js",
                    "public/dev/js/wow.min.js",
                    "public/dev/js/menu.js",
                    "public/dev/js/jquery.mobile.customized.min.js",
                    "public/dev/js/jquery.easing.1.3.js",
                    "public/dev/js/tabs.js",
                    "public/dev/js/trim.js",
                    "public/dev/js/jquery.localscroll-1.2.7-min.js",
                    "public/dev/js/jquery.scrollTo-1.4.2-min.js",
                    "public/dev/js/page_scroller.js",
                    "public/dev/js/common-script.js",
                    "public/dev/js/page_nav.js",
                    "public/dev/js/site.js"
                ],
                jsOutputFile: 'public/dist/js/app.min.js',
                maxBuffer: 1000,
                options: {
                    compilation_level: 'SIMPLE_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT'
                }
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: 'public/dev/images',
                    src: ['**/*.{png,jpg,gif,ico}'],
                    dest: 'public/dist/images'
                }]
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        cwd: 'public/dev/fonts/',
                        src: ['**/*'],
                        dest: 'public/dist/fonts'
                    },
                    {
                        expand: true,
                        cwd: 'public/dev/',
                        src: 'favicon.ico',
                        dest: 'public/dist/'
                    }
                ],
            },
        },
        processhtml: {
            options: {
                // Task-specific options go here.
            },
            dist: {
                files: {
                    'public/dist/index.html': ['public/dev/index.html']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'public/dist',
                    src: 'index.html',
                    dest: 'public/dist/'
                }]
            }
        },
    });
    // Default task.
    grunt.registerTask('cssonly', ['cssmin', 'replace', 'purifycss']);
    grunt.registerTask('htmlonly', ['processhtml', 'htmlmin']);
    grunt.registerTask('jsonly', ['closure-compiler']);
    // grunt.registerTask('default', ['closure-compiler', 'cssmin', 'replace', 'processhtml', 'htmlmin', 'purifycss', 'imagemin', 'copy']);
    grunt.registerTask('default', ['closure-compiler', 'cssmin', 'replace', 'processhtml', 'htmlmin', 'purifycss']);
};
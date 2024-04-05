function firefox_manifest(src, path) {
    if(path.endsWith('manifest.json')) {
        let obj = JSON.parse(src);

        obj['permissions'] = obj['permissions'].concat(obj['optional_permissions']);
        obj['applications'] = {
            'gecko': {
                'id': '{646d57f4-d65c-4f0d-8e80-5800b92cfdaa}',
                'strict_min_version': '56.0',
            },
        };

        return JSON.stringify(obj);
    }
}

let ALL_JS = ['**/*.js'];
let ALL_HTML = ['**/*.html'];
let ALL_EVERYTHING = ['**/*'];

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    let typescript = require('@rollup/plugin-typescript');
    let commonjs = require('@rollup/plugin-commonjs');
    let {nodeResolve} = require('@rollup/plugin-node-resolve');
    let replace = require('@rollup/plugin-replace');

    const NORMAL_DIR = [
        'assets',
        'page',
    ];

    function make_filelist(list, src_type, src_dir = 'pakkujs', dest_dir = 'dist/_') {
        return list.map(function(x) {
            return {
                expand: true,
                cwd: src_dir + '/' + x,
                src: src_type,
                dest: dest_dir + '/' + x + '/',
            };
        });
    }

    const COPY_FILES = make_filelist(NORMAL_DIR, ALL_EVERYTHING).concat([
        {
            src: ['pakkujs/LICENSE.txt'],
            dest: 'dist/_/LICENSE.txt',
        },
    ]);

    const MANIFEST_FILES = [
        {
            src: ['pakkujs/manifest.json'],
            dest: 'dist/_/manifest.json',
        },
    ];

    grunt.initConfig({
        watch: {
            scripts: {
                files: 'pakkujs/**/*',
                tasks: ['dev'],
                options: {
                    interrupt: true,
                },
            },
        },

        rollup: {
            options: {
                plugins: [
                    typescript(),
                    nodeResolve({
                        browser: true,
                    }),
                    commonjs(),
                    replace({
                        preventAssignment: true,
                       'process.env.PAKKU_CHANNEL': '"chrome"', // TODO: firefox
                    }),
                ],
                shimMissingExports: true,
            },
            main: {
                files: {
                    'dist/_/generated/background.js': 'pakkujs/background/background.ts',
                    'dist/_/generated/combine_worker.js': 'pakkujs/core/combine_worker.ts',
                    'dist/_/generated/injected.js': 'pakkujs/injected/main.ts',
                    'dist/_/generated/options.js': 'pakkujs/page/options.js',
                    'dist/_/generated/popup.js': 'pakkujs/page/popup.js',
                    'dist/_/generated/troubleshooting.js': 'pakkujs/page/troubleshooting.js',
                    'dist/_/generated/view_result.js': 'pakkujs/page/view_result.js',
                    'dist/_/generated/userscript_editor.js': 'pakkujs/page/userscript_editor.js',
                }
            }
        },

        clean: {
            dist: ['dist/_/'],
            tmp: ['dist/tmp/'],
            firefox: ['dist/F/'],
            chrome: ['dist/C/'],
        },


        copy: {
            options: {
                noProcess: '**/*.{png,woff}',
            },

            assets: {
                files: COPY_FILES,
            },

            firefox_manifest: {
                files: MANIFEST_FILES,
                options: {
                    process: firefox_manifest,
                },
            },

            chrome_manifest: {
                files: MANIFEST_FILES,
            },
        },

        move: {
            firefox: {
                src: ['dist/_/'],
                dest: 'dist/F',
            },
            chrome: {
                src: ['dist/_/'],
                dest: 'dist/C',
            },
        },

        htmlmin: {
            options: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                removeAttributeQuotes: true,
                minifyCSS: true,
            },

            main: {
                files: make_filelist(NORMAL_DIR, ALL_HTML),
            },
        },

        compress: {
            options: {
                level: 9,
            },

            firefox: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/F/',
                        src: ['**/*'],
                    },
                ],
                options: {
                    archive: 'dist/Firefox-pakku.zip',
                },
            },
            chrome: {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/C/',
                        src: ['**/*'],
                    },
                ],
                options: {
                    archive: 'dist/Chrome-pakku.zip',
                },
            },
            src: {
                files: [
                    {
                        expand: true,
                        src: ['Gruntfile.js', 'package.json', 'package-lock.json', 'pakkujs/**/*'],
                    },
                    {
                        expand: true,
                        src: 'BUILD.txt',
                        rename: () => 'README.txt',
                    },
                ],
                options: {
                    archive: 'dist/src.zip',
                },
            },
        },
    });

    grunt.registerTask('dev', [
        'clean:dist',
        'clean:tmp',

        'copy:assets',
        'rollup:main',
        'copy:chrome_manifest',

        'clean:tmp',
    ]);
    grunt.registerTask('chrome', [
        'clean:dist',
        'clean:tmp',
        'clean:chrome',

        'copy:assets',
        'htmlmin:main',
        'copy:chrome_manifest',

        'move:chrome',
        'compress:chrome',
        'clean:tmp',
    ]);
    grunt.registerTask('firefox', [
        'clean:dist',
        'clean:tmp',
        'clean:firefox',

        'copy:assets',
        'htmlmin:main',
        'copy:firefox_manifest',

        'move:firefox',
        'compress:firefox',
        'clean:tmp',
    ]);
    grunt.registerTask('src', [
        'compress:src',
    ]);

};
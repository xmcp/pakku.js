function firefox_manifest(src, path) {
    if(path.endsWith('manifest.json')) {
        let obj = JSON.parse(src);

        // https://github.com/w3c/webextensions/issues/119
        obj.host_permissions = obj.host_permissions.concat(obj.optional_host_permissions);
        delete obj.optional_host_permissions;

        // https://github.com/mozilla/web-ext/issues/2532
        obj.background.scripts = [obj.background.service_worker];
        delete obj.background.service_worker;

        // https://bugzilla.mozilla.org/show_bug.cgi?id=1736575
        for(let s of obj.content_scripts)
            if(s.world==='MAIN') {
                s.js = ['/assets/xhr_hook_injector.js'];
                delete s.world;
            }

        obj.browser_specific_settings = {
            gecko: {
                id: '{646d57f4-d65c-4f0d-8e80-5800b92cfdaa}',
                strict_min_version: '113.0', // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/declarativeNetRequest
            },
        };

        return JSON.stringify(obj);
    }
}

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

    const COPY_FILES = [
        ...make_filelist(['assets'], ['**/*']),
        ...make_filelist(['page'], ['**/*.html', 'img/*']),
        {
            src: ['pakkujs/LICENSE.txt'],
            dest: 'dist/_/LICENSE.txt',
        },
    ];

    const MANIFEST_FILES = [
        {
            src: ['pakkujs/manifest.json'],
            dest: 'dist/_/manifest.json',
        },
    ];

    const ROLLUP_FILES = {
        'dist/_/generated/background.js': 'pakkujs/background/background.ts',
        'dist/_/generated/combine_worker.js': 'pakkujs/core/combine_worker.ts',
        'dist/_/generated/content_script.js': 'pakkujs/core/main.ts',
        'dist/_/generated/injected.js': 'pakkujs/injected/do_inject.ts',
        'dist/_/generated/options.js': 'pakkujs/page/options.js',
        'dist/_/generated/popup.js': 'pakkujs/page/popup.js',
        'dist/_/generated/troubleshooting.js': 'pakkujs/page/troubleshooting.js',
        'dist/_/generated/view_result.js': 'pakkujs/page/view_result.js',
        'dist/_/generated/parse_local.js': 'pakkujs/page/parse_local.js',
        'dist/_/generated/userscript_editor.js': 'pakkujs/page/userscript_editor.js',
        'dist/_/generated/bili_worker_sandbox.js': 'pakkujs/page/bili_worker_sandbox.ts',
    };

    const TERSER_FILES = Object.fromEntries(Object.keys(ROLLUP_FILES).map(k => [k, [k]]));

    function ROLLUP_PLUGINS(channel) {
        return [
            typescript(),
            nodeResolve({
                browser: true,
            }),
            commonjs(),
            replace({
                preventAssignment: true,
                'eval': 'undefined', // https://github.com/protobufjs/protobuf.js/issues/593
               'process.env.PAKKU_CHANNEL': `"${channel}"`,
            }),
        ];
    }

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
                shimMissingExports: true,
            },
            chrome: {
                files: ROLLUP_FILES,
                options: {
                    plugins: ROLLUP_PLUGINS('chrome'),
                },
            },
            firefox: {
                files: ROLLUP_FILES,
                options: {
                    plugins: ROLLUP_PLUGINS('firefox'),
                },
            },
        },

        clean: {
            tmp: ['dist/tmp/'],
            dist: ['dist/_/'],
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

            gen: {
                files: make_filelist(NORMAL_DIR, ['**/*.html']),
            },
        },

        cssmin: {
            options: {
                level: 2,
            },

            gen: {
                files: {
                    'dist/_/generated/injected.css': ['pakkujs/injected/*.css'],
                },
                options: {
                    sourceMap: false,
                },
            },
        },

        terser: {
            options: {
                module: true,
                ecma: 2020,
                keep_classnames: true,
                keep_fnames: true,
            },

            production: {
                files: TERSER_FILES,
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
                        src: ['Gruntfile.js', 'package.json', 'package-lock.json', 'tsconfig.json', 'pakkujs/**/*'],
                    },
                    {
                        expand: true,
                        src: 'BUILD_FIREFOX.txt',
                        rename: () => 'README.txt',
                    },
                ],
                options: {
                    archive: 'dist/src.zip',
                },
            },
        },
    });

    grunt.registerTask('_common', [
        'clean:tmp',
        'clean:dist',
        'copy:assets',
        'cssmin:gen',
        'htmlmin:gen',
    ])
    grunt.registerTask('dev', [
        '_common',
        'rollup:chrome',
        'copy:chrome_manifest',
    ]);
    grunt.registerTask('chrome', [
        '_common',
        'rollup:chrome',
        'terser:production',
        'copy:chrome_manifest',

        'clean:chrome',
        'move:chrome',
        'compress:chrome',
    ]);
    grunt.registerTask('firefox', [
        '_common',
        'rollup:firefox',
        'terser:production',
        'copy:firefox_manifest',

        'clean:firefox',
        'move:firefox',
        'compress:firefox',
    ]);
    grunt.registerTask('src', [
        'compress:src',
    ]);

};
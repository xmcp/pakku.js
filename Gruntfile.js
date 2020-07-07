var FIREFOX_COMMENT_RE=/\/\*for-firefox:(.*?)\*\//gs; // s: DOTALL

function firefox_manifest(src,path) {
  if(path.endsWith('manifest.json')) {
    var obj=JSON.parse(src);
    
    delete obj['content_security_policy'];
    obj['permissions']=obj['permissions'].concat(obj['optional_permissions']);
    obj['applications']={
        'gecko': {
            'id': '{646d57f4-d65c-4f0d-8e80-5800b92cfdaa}',
            'strict_min_version': '56.0',
        },
    };

    return JSON.stringify(obj);
  }
}

function firefox_comment_applier(should_apply) {
  if(should_apply)
    return function(src,path) {
      return src.replace(FIREFOX_COMMENT_RE,'$1');
    };
  else
    return function(src,path) {
      return src;
    }
}

var ALL_JS=['**/*.js'];
var ALL_HTML=['**/*.html'];
var ALL_EVERYTHING=['**/*'];

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var NORMAL_DIR=[
    'assets',
    'page'
  ];

  function make_filelist(list,src_type,src_dir='pakkujs',dest_dir='dist/_') {
    return list.map(function(x) {
      return {
        expand: true,
        cwd: src_dir+'/'+x,
        src: src_type,
        dest: dest_dir+'/'+x+'/',
      };
    });
  }

  var COPY_FILES=make_filelist(NORMAL_DIR,ALL_EVERYTHING).concat([
    {
      src: ['pakkujs/LICENSE.txt'],
      dest: 'dist/_/LICENSE.txt',
    },
  ]);

  var CONCAT_FILES=[
    {
      src: [
        'pakkujs/core/protobuf.min.js',
        'pakkujs/core/pinyin_dict.min.js',
        'pakkujs/core/crc32-crack.js',
        'pakkujs/core/utils.js',
        'pakkujs/core/config.js',
        'pakkujs/core/edit_distance.js',
        'pakkujs/core/proto-bili-gen.js',
        'pakkujs/core/protocol.js',
        'pakkujs/core/core.js',
        'pakkujs/core/background.js',
        'pakkujs/core/post_init.js',
      ],
      dest: 'dist/tmp/all_core.js',
    },
    {
      src: [
        'pakkujs/injected/!(do_inject).js',
        'pakkujs/injected/do_inject.js'
      ],
      dest: 'dist/tmp/all_injected.js',
    },
  ];

  var CONCAT_OUT_FILES=[
    {
      src: ['dist/tmp/all_core.js'],
      dest: 'dist/_/core/all_core.js',
    },
    {
      src: ['dist/tmp/all_injected.js'],
      dest: 'dist/_/injected/all_injected.js',
    },
  ];

  var MANIFEST_FILES=[
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

    clean: {
      dist: ['dist/_/'],
      tmp: ['dist/tmp/'],
      firefox: ['dist/F/'],
      chrome: ['dist/C/'],
    },

    concat: {
      options: {
        sourceMap: true,
      },

      firefox: {
        files: CONCAT_FILES.concat(make_filelist(NORMAL_DIR,ALL_JS,'pakkujs','dist/tmp/')),
        options: {
          process: firefox_comment_applier(true),
        },
      },
      chrome: {
        files: CONCAT_FILES.concat(make_filelist(NORMAL_DIR,ALL_JS,'pakkujs','dist/tmp/')),
        options: {
          process: firefox_comment_applier(false),
        },
      },
    },

    copy: {
      options: {
        noProcess: '**/*.{png,woff}',
      },

      background: {
        files: COPY_FILES.concat([
          {
            src: ['pakkujs/core/background.html'],
            dest: 'dist/_/core/background.html',
          }
        ]),
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

    uglify: {
      options: {
        banner: '// (C) 2017-2020 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.',
        sourceMapIn: function(path) { return path+'.map'; },
        'sourceMap.includeSources': true,
        mangle: false,
      },

      dev: {
        files: CONCAT_OUT_FILES.concat(make_filelist(NORMAL_DIR,ALL_JS,'dist/tmp')),
        options: {
          sourceMap: true,
          compress: false,
        },
      },
      production: {
        files: CONCAT_OUT_FILES.concat(make_filelist(NORMAL_DIR,ALL_JS,'dist/tmp')),
        options: {
          sourceMap: false,
          compress: false,
        },
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
        files: make_filelist(NORMAL_DIR,ALL_HTML),
      },
    },

    cssmin: {
      options: {
        level: 2,
      },

      dev: {
        files: {
          'dist/_/injected/all_injected.css': ['pakkujs/injected/*.css'],
        },
        options: {
          sourceMap: true,
        },
      },
      production: {
        files: {
          'dist/_/injected/all_injected.css': ['pakkujs/injected/*.css'],
        },
        options: {
          sourceMap: false,
        },
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
            src: ['Gruntfile.js','package.json','package-lock.json','pakkujs/**/*'],
          },
          {
            expand: true,
            src: 'BUILD.txt',
            rename: ()=>'README.txt'
          }
        ],
        options: {
          archive: 'dist/src.zip',
        },
      }
    }
  });

  grunt.registerTask('dev', [
    'clean:dist',
    'clean:tmp',

    'copy:background',
    'concat:chrome',
    'uglify:dev',
    'cssmin:dev',
    'copy:chrome_manifest',

    'clean:tmp',
  ]);
  grunt.registerTask('chrome',[
    'clean:dist',
    'clean:tmp',
    'clean:chrome',

    'copy:background',
    'concat:chrome',
    'uglify:production',
    'htmlmin:main',
    'cssmin:production',
    'copy:chrome_manifest',

    'move:chrome',
    'compress:chrome',
    'clean:tmp',
  ]);
  grunt.registerTask('firefox',[
    'clean:dist',
    'clean:tmp',
    'clean:firefox',

    'copy:background',
    'concat:firefox',
    'uglify:production',
    'htmlmin:main',
    'cssmin:production',
    'copy:firefox_manifest',

    'move:firefox',
    'compress:firefox',
    'clean:tmp',
  ]);
  grunt.registerTask('src',[
    'compress:src',
  ]);

};
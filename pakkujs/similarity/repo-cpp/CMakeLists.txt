cmake_minimum_required(VERSION 3.30)
project(similarity-gen)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} \
    --pre-js ${PROJECT_SOURCE_DIR}/pre.js --closure 1 \
    --emit-symbol-map \
    -Wno-unused-command-line-argument \
    -fno-exceptions \
    -O3 -msimd128 \
    -s ASSERTIONS=1 \
    -s CHECK_NULL_WRITES=0 \
    -s EXPORT_ES6=1 \
    -s USE_ES6_IMPORT_META=0 \
    -s MINIMAL_RUNTIME=1 \
    -s ENVIRONMENT='worker,web' \
    -s SUPPORT_LONGJMP=0 \
    -s DISABLE_EXCEPTION_THROWING=1 \
    -s FILESYSTEM=0 \
    -s WASM_BIGINT=1 \
    -s NO_EXIT_RUNTIME=1 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s MEMORY_GROWTH_GEOMETRIC_STEP=1.0 \
    -s MAXIMUM_MEMORY=268435456 \
    -s EXPORTED_FUNCTIONS=['_begin_chunk','_check_similar','_begin_index_lock','_malloc'] \
    -s EXPORTED_RUNTIME_METHODS=['stringToUTF16'] \
    -s EXPORT_KEEPALIVE=1 \
")

add_executable(similarity-gen src/main.cpp)

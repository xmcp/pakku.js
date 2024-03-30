:: npm i protobufjs-cli
call pbjs -t static-module proto_translation/bili-proto.json -o proto_translation/proto-bili-gen.js -w es6
call pbts -o proto_translation/proto-bili-gen.d.ts proto_translation/proto-bili-gen.js

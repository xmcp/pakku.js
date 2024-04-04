:: npm i protobufjs-cli
call pbjs -t static-module proto_translation/bili-proto.json -o proto_translation/proto-bili-gen.js -w es6 --no-create --no-verify --no-convert --no-delimited --no-service
call pbts -o proto_translation/proto-bili-gen.d.ts proto_translation/proto-bili-gen.js

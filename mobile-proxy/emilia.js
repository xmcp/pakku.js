var fs=require('fs');
var path=require('path');

var pen=fs.readFileSync(path.join(__dirname,'emilia_original.js'), {encoding: 'utf-8'});
var pineapple=fs.readFileSync(path.join(__dirname,'all_core.js'), {encoding: 'utf-8'});

var ppap=pen.replace('__EVAL__',pineapple);

fs.writeFileSync(path.join(__dirname,'_emilia_generated.js'),'// AUTO GENERATED. DO NOT EDIT.\n\n'+ppap);

module.exports=require('./_emilia_generated');
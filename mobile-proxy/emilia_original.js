var fs=require('fs');
var path=require('path');
var jsdom=require('jsdom');

var settings=require('./settings');

var dummy=new Proxy(()=>dummy, {
    get: ()=>dummy,
    set: ()=>dummy,
    apply: ()=>dummy,
    construct: ()=>dummy,
});

var chrome=dummy;
var navigator=dummy;
var document=dummy;
var window=global;
var localStorage=JSON.parse(settings.options);
var BREAK_UPDATE=false;

var XMLSerializer=function() { // dummy
    return {
        serializeToString: (x)=>x,
    };
};
var DOMParser=function() {
    return {
        parseFromString: function(str,type) {
            return new jsdom.JSDOM(str, {
                contentType: 'text/xml',
            }).window.document;
        },
    };
};

__EVAL__

var SCROLL_THRESHOLD=0;

module.exports=function(dom) {
    var s=Status();
    var d=[];
    var ret=parse(dom,0,s,d);
    return {
        xml: ret,
        s: s,
        d: d,
    };
};
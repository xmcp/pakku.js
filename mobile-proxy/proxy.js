var http=require('http');
var https=require('https');
var http_proxy=require('http-proxy');
var net=require('net');
var fs=require('fs');
var path=require('path');
var jsdom=require('jsdom');
var zlib=require('zlib');
var xmlserializer=require('xmlserializer');

var settings=require('./settings');
var pac_content=fs.readFileSync('proxy.pac',{encoding: 'utf-8'}).replace(/__SETTINGS__/g,JSON.stringify(settings));

var emilia=require('./emilia');

function load_xml(str) {
    return new jsdom.JSDOM(str, {
        contentType: 'text/xml',
    }).window.document;
}
function dump_xml(dom) {
    return xmlserializer.serializeToString(dom);
}

function xml_mobile_to_pc(dom) {
    dom.childNodes[0].childNodes.forEach(function(elem) {
        if(elem.tagName==='d') {
            [dmid,unknown,time_ms,mode,size,color,ts,pool,uidhash]=elem.attributes['p'].value.split(',');
            elem.setAttribute('p', [time_ms/1000,mode,size,color,ts,pool,uidhash,dmid,unknown].join(','));
        }
    });
    return dom;
}
function xml_pc_to_mobile(dom) {
    dom.childNodes[0].childNodes.forEach(function(elem) {
        if(elem.tagName==='d') {
            [time_s,mode,size,color,ts,pool,uidhash,dmid,unknown]=elem.attributes['p'].value.split(',');
            elem.setAttribute('p', [dmid,unknown,Math.floor(time_s*1000),mode,size,color,ts,pool,uidhash].join(','));
        }
    });
    return dom;
}

var proxy_goahead=http_proxy.createProxyServer({});
var proxy_modify=http_proxy.createProxyServer({});

proxy_modify.on('proxyRes', function(proxyRes, req, res) {
    var body=new Buffer('');
    proxyRes.on('data', function(data) {
        body=Buffer.concat([body, data]);
    });
    proxyRes.on('end', function () {
        console.log('GOT DANMAKU RESPONSE');

        var partlen=body.readUInt32BE();
        res.write(body.slice(0,partlen+4));

        var danmaku_xml_str=zlib.gunzipSync(body.slice(partlen+4)).toString('utf-8');
        var danmaku_dom_pc=xml_mobile_to_pc(load_xml(danmaku_xml_str));

        //fs.writeFileSync('last_danmaku.xml',dump_xml(danmaku_dom_pc));
        var {xml: new_dom,s: s,d: d}=emilia(danmaku_dom_pc);
        if(settings.verbose)
            console.log('PROCESSED OK',s);
        
        var new_xml_str=dump_xml(xml_pc_to_mobile(new_dom));
        res.end(zlib.gzipSync(new_xml_str));
        console.log('COMPLETED');
    });
});

console.log('make sure that your ip address is',settings.ip);

var http_server=http.createServer(function(req,res) {
    if(settings.verbose)
        console.log('HTTP', req.method, req.url);
    
    if(req.url.indexOf('/proxy.pac')===0) {
        res.writeHead(200, {
            'Content-Type': 'application/x-ns-proxy-autoconfig',
        });
        res.end(pac_content);
        return;
    }
    if(req.url=='/cert.pem') {
        res.writeHead(200, {
            'Content-Type': 'application/x-x509-ca-cert',
        });
        res.end(fs.readFileSync('cert/cert.pem', {encoding: 'utf-8'}));
        return;
    }
    res.end('what are you doing here?');
});
http_server.on('connect',function(req,c,head) {
    if(settings.verbose)
        console.log('CONNECT',req.url);
    
    var s=net.connect(settings.ssl_port, '127.0.0.1', function() {
        c.write('HTTP/1.1 200 Connection Established\r\n\r\n');
        s.write(head);
        c.pipe(s);
        s.pipe(c);
    });
});
http_server.listen(settings.http_port, settings.ip);
console.log('http listening on port', settings.http_port);

https.createServer({
    key: fs.readFileSync('cert/key.pem', {encoding: 'utf-8'}),
    cert: fs.readFileSync('cert/cert.pem', {encoding: 'utf-8'}),
}, function(req,res) {
    if(settings.verbose)
        console.log('HTTPS', req.method, req.url);
    
    if(req.url=='/test') {
        res.end('success');
        return;
    }
    
    if(req.url.includes('/x/v2/dm/list.so?')) {
        proxy_modify.web(req, res, {target: 'https://api.bilibili.com', selfHandleResponse: true});
        return;
    }
    
    proxy_goahead.web(req, res, {target: 'https://api.bilibili.com'});
}).listen(settings.ssl_port, '127.0.0.1');
console.log('ssl listening on port', settings.ssl_port);
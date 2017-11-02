function make_p(s) {
    var elem=document.createElement('p');
    elem.textContent=s;
    return elem;
}
function make_a(s,u) {
    var elem=document.createElement('a');
    elem.href=u;
    elem.target='_blank';
    elem.textContent=s;
    return elem;
}
function make_elem(tagname,classname) {
    var elem=document.createElement(tagname);
    elem.className=classname;
    return elem;
}

function proc_mode(mode) {
    switch(parseInt(mode)) {
        case 1: return '|←';
        // 2,3: ???
        case 4: return '↓↓';
        case 5: return '↑↑';
        case 6: return 'R→';
        case 7: return '**';
        default: return '['+mode+']';
    }
}

function proc_rgb(x) {
    return [
        Math.floor(x/256/256),
        Math.floor(x/256)%256,
        x%256
    ];
}
function get_L(r,g,b) {
    // var ma=Math.max(r,g,b), mi=Math.min(r,g,b);
    // return (ma+mi)/2/256;
    return (r+g+b)/3/256;
}

function _fix2(a) {
    return a<10 ? '0'+a : ''+a;
}
function format_date(x) {
    return _fix2(x.getFullYear()%100)+'/'+(x.getMonth()+1)+'/'+x.getDate();
}
function format_datetime(x) {
    return format_date(x)+' '+x.getHours()+':'+_fix2(x.getMinutes());
}
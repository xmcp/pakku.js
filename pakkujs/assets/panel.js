var panel_src=`
<div class="pakku-panel" style="
        background-color: rgba(243,243,243,.8);
        color: black;
        width: 300px;
        position: absolute;
        z-index: 99999;
        top: 10px;
        padding: 5px;
        border-radius: 5px;
        left: -305px;
        box-shadow: 2px 2px 50px black;
">
    <p style="
            overflow-x: hidden;
            text-overflow: ellipsis;
            line-height: calc(1em + 6px);
            vertical-align: middle;
    ">
        <span style="
                float: right;
                font-family: Consolas, Courier, monospace;
                opacity: .7;
        ">pakku</span>
        <button type="button" class="pakku-panel-close" style="
                color: black;
                background-color: #f3f3f3;
                border-radius: 5px;
                border: 1px solid black;
                padding: 3px;
                margin-right: .5em;
                cursor: pointer;
        ">关闭</button>
        <span class="pakku-panel-text"></span>
    </p>
    <hr>
    <div class="pakku-panel-desc" style="line-height: 1.2em;"></div>
    <hr>
    <div class="pakku-panel-peers" style="
            height: 350px;
            overflow-y: auto;
    "></div>
</div>
`;

var style_src=`
.pakku-panel * {
    user-select: initial !important;
}
.pakku-panel-desc:empty~hr {
    display: none;
}
.pakku-panel-peers p {
    font-family: Consolas, Courier, '微软雅黑', 'Microsoft Yahei', '宋体', monospace;
}
.pakku-panel-peers p:nth-child(1) {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.pakku-panel-peers p:nth-child(2) {
    margin-left: 1em;
    display: none;
}

.pakku-panel-peers div:hover p:nth-child(1) {
    white-space: initial;
    word-wrap: break-word;
    word-break: break-all;
}
.pakku-panel-peers div:hover p:nth-child(2) {
    display: initial;
}
.pakku-panel-peers div.black {
    background-color: rgba(0,0,0,.6);
}
.pakku-panel-peers div.white {
    background-color: rgba(255,255,255,.6);
}
.pakku-panel-peers div.black:hover {
    background-color: rgba(0,0,0,1);
}
.pakku-panel-peers div.white:hover {
    background-color: rgba(255,255,255,1);
}
`;
var global_style_obj=document.createElement('style');
global_style_obj.innerHTML=style_src;

function make_p(s) {
    var elem=document.createElement('p');
    elem.textContent=s;
    return elem;
}

function proc_mode(mode) {
    switch(parseInt(mode)) {
        case 1: return '←-';
        // 2,3: ???
        case 4: return '↓↓';
        case 5: return '↑↑';
        case 6: return '-→';
        case 7: return '**';
        default: return '['+mode+']';
    }
}

function proc_rgb(x) {
    return [
        Math.ceil(x/256/256),
        Math.ceil(x/256)%256,
        x%256
    ];
}

console.log('pakku panel script injected: D.length = '+D.length);

var try_left=20;
function try_inject() {
    var danmu_lists=[].slice.call(document.querySelectorAll('.bilibili-player-danmaku'));
    // maybe player is in an iframe
    [].slice.call(document.querySelectorAll('iframe')).forEach(function(frame) {
        try {
            [].slice.call(frame.contentDocument.querySelectorAll('.bilibili-player-danmaku')).forEach(function(elem) {
                danmu_lists.push(elem);
            })
        } catch(e) { // maybe cross-domain
            console.error(e);
        }
    })
    if(!danmu_lists.length) { // maybe player is not ready yet
        if(--try_left)
            setTimeout(try_inject,500);
        return;
    }
    
    danmu_lists.forEach(function(elem) {
        console.log('bind danmu-list obj ',elem);
        var panel_obj=document.createElement('div');
        panel_obj.style.display='none';
        panel_obj.innerHTML=panel_src;
        panel_obj.querySelector('.pakku-panel-close').addEventListener('click',function() {
            panel_obj.style.display='none';
        })
        elem.appendChild(panel_obj);
        panel_obj.appendChild(global_style_obj);
        
        elem.addEventListener('click',function(e) {
            console.log('click fired ',e.target);
            var dm_obj=e.target.parentElement;
            var dm_str=dm_obj.querySelector('.danmaku-info-danmaku').title;
            if(dm_obj && dm_obj.classList.contains('danmaku-info-row') && dm_obj.getAttribute('dmno')) {
                var dmno=parseInt(dm_obj.getAttribute('dmno'));
                var text_container=panel_obj.querySelector('.pakku-panel-text'),
                    desc_container=panel_obj.querySelector('.pakku-panel-desc'),
                    peers_container=panel_obj.querySelector('.pakku-panel-peers');
                
                
                panel_obj.style.display='block';
                text_container.textContent='???';
                desc_container.innerHTML='';
                peers_container.innerHTML='';
                
                var info=null;
                // the list might be sorted in a wrong way, so let's guess the index
                if(D[dmno] && D[dmno].text===dm_str)
                    info=D[dmno];
                else if(D[D.length-dmno-1] && D[D.length-dmno-1].text===dm_str)
                    info=D[D.length-dmno-1];
                else {
                    for(var i=0;i<D.length;i++)
                        if(D[i].text===dm_str) {
                            info=D[i];
                            desc_container.appendChild(make_p('* 数据可能不准确，请按时间排序弹幕列表'));
                            break;
                        }
                }
                
                if(info) {
                    text_container.textContent=info.text;
                    info.desc.forEach(function(d) {
                        desc_container.appendChild(make_p(d));
                    });
                    info.peers.forEach(function(p) {
                        var self=document.createElement('div');
                        var color=proc_rgb(parseInt(p.attr[3]));
                        self.style.color='rgb('+color[0]+','+color[1]+','+color[2]+')';
                        self.classList.add((color[0]+color[1]+color[2])*2>768 ? 'black' : 'white');
                        
                        self.appendChild(make_p(proc_mode(p.mode)+' '+p.orig_str));
                        self.appendChild(make_p(p.reason+' / '+p.time.toFixed(3)+'s / '+parseInt(p.attr[2])+'px / by '+p.attr[6]));
                        
                        peers_container.appendChild(self);
                    });
                } else
                    desc_container.appendChild(make_p('无法显示弹幕详情：可能是刚刚产生的弹幕'));
            }
        });
    });
}
try_inject();
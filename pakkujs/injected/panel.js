// (C) 2018 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

var PANEL_CSS=`
.pakku-panel {
    background-color: rgba(205,205,205,.8);
    color: black;
    width: 300px;
    position: absolute;
    z-index: 10000;
    top: 70px;
    right: 0;
    box-shadow: 2px 2px 50px black;
}
.pakku-floating .pakku-panel {
    right: -20px;
    filter: brightness(.9);
    pointer-events: none;
}
.pakku-panel-title {
    overflow-x: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
    margin: 3px 0;
}
.pakku-panel-close {
    font: inherit; /* fix for bangumi page */
    line-height: 1em;
    color: black !important;
    background-color: transparent !important;
    border-radius: 0;
    border: none !important;
    padding: 3px 5px;
    cursor: pointer;
}
.pakku-panel-desc:not(:empty) {
    line-height: 1.2em;
    margin: 3px 5px;
    white-space: initial;
}
.pakku-panel-peers {
    max-height: 350px;
    overflow-y: auto;
}
.pakku-panel-footer:not(:empty) {
    overflow: hidden;
    margin: 3px 5px;
}
.pakku-panel * {
    user-select: initial !important;
}
.pakku-panel a {
    color: black;
    border-bottom: 1px solid black;
}
.pakku-panel hr {
    margin: 0;
}
.pakku-panel .text-fix {
    overflow-x: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
}
.pakku-panel-footer a {
    display: inline-block;
}
.pakku-panel-desc:empty~hr.pakku-for-desc {
    display: none;
}
.pakku-panel-footer:empty~hr.pakku-for-footer {
    display: none;
}
.pakku-panel * {
    font-family: Consolas, Courier, '微软雅黑', 'Microsoft Yahei', '宋体', monospace;
}
.pakku-panel-peers p:nth-child(1) {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.pakku-panel-peers p:nth-child(2) {
    display: none;
    font-weight: normal;
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
    background-color: rgba(24,24,24,.8);
}
.pakku-panel-peers div.white {
    background-color: rgba(231,231,231,.8);
}
.pakku-panel-peers div.black:hover {
    background-color: rgba(0,0,0,1);
}
.pakku-panel-peers div.white:hover {
    background-color: rgba(255,255,255,1);
}
`;

var PANEL_EVENT_FIX=`
.__pakku_pointer_event div.bilibili-player-video-danmaku, .__pakku_pointer_event div.bilibili-danmaku {
    pointer-events: initial !important;
}
.__pakku_pointer_event div.bilibili-danmaku {
    background-color: rgba(255,255,0,.6);
}
.__pakku_pointer_event div.bilibili-danmaku:hover {
    background-color: rgba(255,255,0,1);
}
`

function make_panel_dom() {
    var dom=make_elem('div','pakku-panel');
    var dom_title=make_elem('p','pakku-panel-title');
    var dom_close=make_elem('button','pakku-panel-close');
    
    dom_close.type='button';
    dom_close.textContent='×';
    
    dom_title.appendChild(dom_close);
    dom_title.appendChild(make_elem('span','pakku-panel-text'));
    
    dom.appendChild(dom_title);
    dom.appendChild(make_elem('hr',''));
    dom.appendChild(make_elem('div','pakku-panel-desc'));
    dom.appendChild(make_elem('hr','pakku-for-desc'));
    dom.appendChild(make_elem('div','pakku-panel-peers'));
    dom.appendChild(make_elem('hr','pakku-for-footer'));
    dom.appendChild(make_elem('div','pakku-panel-footer text-fix'));
    
    return dom;
};

var _mem_info={};
function _load_info(uid,logger,callback) {
    if(_mem_info[uid]) {
        callback(_mem_info[uid]);
        return;
    }
    var xhr=new XMLHttpRequest();
    xhr.responseType='text';
    xhr.open('get','https://api.bilibili.com/x/web-interface/card?type=json&mid='+uid);
    xhr.onreadystatechange=function() {
        if(this.readyState!=4) return;
        var res;
        try {
            if(this.status!=200) throw 1;
            res=JSON.parse(this.responseText);
        } catch(e) {
            logger.innerHTML='';
            logger.appendChild(make_a(
                uidhash+' ('+uid+') 个人信息加载失败',
                '//space.bilibili.com/'+uid
            ));
            throw e;
        }
        callback(_mem_info[uid]=res);
    }
    xhr.send();
}

function query_uid(uidhash,logger_container) {

    if(logger_container.dataset['_current_hash']===uidhash) return;
    logger_container.dataset['_current_hash']=uidhash;
    logger_container.textContent='';
    var logger=document.createElement('div');
    logger_container.appendChild(logger);
    
    logger.textContent=uidhash+' 正在获取 UID...';
    chrome.runtime.sendMessage({type: 'crack_uidhash', hash: uidhash}, function(uids) {
        if(uids.length) {
            logger.textContent='';
            uids.forEach(function(uid) {
                var subitem=document.createElement('p');
                subitem.textContent=uid+' 正在加载个人信息...';
                logger.appendChild(subitem);
                _load_info(uid,subitem,function(res) {
                    var nickname,lv,exp,fans,sex;
                    
                    if(!res.data || !res.data.card || !res.data.card.mid || !res.data.card.level_info.current_level) { // does not exist
                        subitem.parentNode.removeChild(subitem);
                        return;
                    }
                    try {
                        nickname=res.data.card.name;
                        lv=res.data.card.level_info.current_level;
                        exp=res.data.card.level_info.current_exp;
                        fans=res.data.card.fans;
                        sex={'男':'♂','女':'♀'}[res.data.card.sex]||'〼';
                    } catch(e) {
                        subitem.textContent='';
                        subitem.appendChild(make_a(
                            uid+' 个人信息加载失败',
                            '//space.bilibili.com/'+uid
                        ));
                        throw e;
                    }
                    
                    subitem.textContent='';
                    subitem.appendChild(make_a(
                        uid+' Lv'+lv+(exp?('('+exp+') '):' ')+sex+' '+(fans?+fans+'★ ':'')+nickname,
                        '//space.bilibili.com/'+uid
                    ));
                });
            });
        } else {
            logger.textContent=uidhash+' UID 不存在';
        }
    });
}

function inject_panel(list_elem,player_elem) {
    inject_css(PANEL_CSS);
    var panel_obj=document.createElement('div');
    panel_obj.style.display='none';
    panel_obj.appendChild(make_panel_dom());
    panel_obj.querySelector('.pakku-panel-close').addEventListener('click',function() {
        panel_obj.style.display='none';
    });
    panel_obj.addEventListener('mousewheel',function(e) {
        e.stopPropagation();
    });
    root_document.addEventListener('click',function(e) {
        if(!panel_obj.contains(e.target) && !list_elem.contains(e.target))
            panel_obj.style.display='none';
    });
    
    player_elem.appendChild(panel_obj);

    function show_panel(dminfo,floating) {
        console.log('pakku panel: show panel',dminfo)

        var dm_ultralong=dminfo.str.length>498;
        var dm_str=dminfo.str.replace(/([\r\n\t]|\/n)/g,'');
        var text_container=panel_obj.querySelector('.pakku-panel-text'),
            desc_container=panel_obj.querySelector('.pakku-panel-desc'),
            peers_container=panel_obj.querySelector('.pakku-panel-peers'),
            footer_container=panel_obj.querySelector('.pakku-panel-footer');
        
        panel_obj.style.display='block';
        text_container.textContent='';
        desc_container.innerHTML='';
        peers_container.innerHTML='';
        footer_container.textContent='';
        footer_container.dataset['_current_hash']='';
        
        var info=null;
        // the list might be sorted in a wrong way, so let's guess the index
        if(typeof dminfo.index=='number' && D[dminfo.index] &&
                (dm_ultralong ? D[dminfo.index].text.indexOf(dm_str)===0 : D[dminfo.index].text===dm_str))
            info=D[dminfo.index];
        else {
            var cnt=0;
            for(var i=0;i<D.length;i++)
                if((dm_ultralong ? D[i].text.indexOf(dm_str)===0 : D[i].text===dm_str)) {
                    info=D[i];
                    cnt++;
                }
            if(cnt>1)
                desc_container.appendChild(make_p('* 数据可能不准确'));
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
                self.classList.add(get_L(color[0],color[1],color[2])>.5 ? 'black' : 'white');
                
                self.appendChild(make_p(proc_mode(p.mode)+' '+p.orig_str));
                self.appendChild(make_p(
                    p.reason+' '+p.attr[6]+' '+p.time.toFixed(2)+'s '+parseInt(p.attr[2])+'px '
                    +format_datetime(new Date(parseInt(p.attr[4])*1000))
                ));
                
                (function(self,uidhash,container) {
                    self.addEventListener('mouseover',function() {
                        query_uid(uidhash,container);
                    });
                })(self,p.attr[6],footer_container);
                
                peers_container.appendChild(self);
            });
            if(info.peers[0])
                query_uid(info.peers[0].attr[6],footer_container);
        } else
            desc_container.appendChild(make_p('找不到弹幕详情'));
    
        peers_container.scrollTo(0,0);

        if(floating)
            panel_obj.classList.add('pakku-floating');
        else
            panel_obj.classList.remove('pakku-floating');
    }
    
    list_elem.addEventListener('click',function(e) {
        var dm_obj=e.target.parentElement;
        if(dm_obj && dm_obj.classList.contains('danmaku-info-row') && dm_obj.getAttribute('dmno'))
            show_panel({
                str: dm_obj.querySelector('.danmaku-info-danmaku').title,
                index: parseInt(dm_obj.getAttribute('dmno')),
            });
    });
    
    var danmaku_stage=player_elem.querySelector('.bilibili-player-video-danmaku');
    if(danmaku_stage) {
        inject_css(PANEL_EVENT_FIX);
        var hover_counter=0;
        danmaku_stage.addEventListener('mouseover',function(e) {
            hover_counter++;
            if(e.target.className=='bilibili-danmaku') {
                show_panel({str: e.target.textContent},true);
            }
        });
        danmaku_stage.addEventListener('mouseout',function(e) {
            if(--hover_counter<0)
                hover_counter=0;
            if(hover_counter==0 && panel_obj.classList.contains('pakku-floating'))
                panel_obj.style.display='none';
        });
        danmaku_stage.addEventListener('click',function(e) {
            if(e.target.className=='bilibili-danmaku') {
                console.log('click');
                show_panel({str: e.target.textContent});
                e.stopPropagation();
            }
            player_elem.classList.remove('__pakku_pointer_event');
        });
        root_document.addEventListener('keydown',function(e) {
            if(e.key=='Control' && !e.repeat) {
                hover_counter=0;
                player_elem.classList.add('__pakku_pointer_event');
            } else if(e.ctrlKey===false) { // fix ctrl key state
                player_elem.classList.remove('__pakku_pointer_event');
                if(panel_obj.classList.contains('pakku-floating'))
                    panel_obj.style.display='none';
            }
        });
        root_document.addEventListener('keyup',function(e) {
            if(e.key=='Control') {
                player_elem.classList.remove('__pakku_pointer_event');
                if(panel_obj.classList.contains('pakku-floating'))
                    panel_obj.style.display='none';
            }
        });
        // after the webpage lost focus, `keyup` event might not be dispatched
        root_document.defaultView.addEventListener('blur',function() {
            player_elem.classList.remove('__pakku_pointer_event');
        })
    }
}

// 2017-2020 @xmcp. THIS PROJECT IS LICENSED UNDER GPL VERSION 3. SEE `LICENSE.txt`.

function make_panel_dom() {
    var dom=make_elem('div','pakku-panel');
    var dom_title=make_elem('p','pakku-panel-title');
    var dom_close=make_elem('button','pakku-panel-close');
    var dom_selectbar=make_elem('div','pakku-panel-selectbar');
    
    dom_close.type='button';
    dom_close.textContent='×';
    
    dom_title.appendChild(dom_close);
    dom_title.appendChild(make_elem('span','pakku-panel-text'));

    dom_selectbar.appendChild(make_elem('span','pakku-panel-selectbar-left'));
    dom_selectbar.appendChild(make_elem('span','pakku-panel-selectbar-right'));
    dom_selectbar.appendChild(make_elem('span','pakku-panel-selectbar-content'));
    
    dom.appendChild(dom_title);
    dom.appendChild(dom_selectbar);
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
    chrome.runtime.sendMessage(null,{
        type: 'xhr_proxy',
        method: 'get',
        url: 'https://api.bilibili.com/x/web-interface/card?type=json&mid='+uid,
    },function(res) {
        try {
            if(res.status!=200) throw 1;
            res=JSON.parse(res.responseText);
        } catch(e) {
            logger.innerHTML='';
            logger.appendChild(make_a(
                uid+' 个人信息加载失败',
                '//space.bilibili.com/'+uid
            ));
            throw e;
        }
        callback(_mem_info[uid]=res);
    });
}

function query_uid(uidhash,logger_container) {

    if(logger_container.dataset['_current_hash']===uidhash) return;
    logger_container.dataset['_current_hash']=uidhash;
    logger_container.textContent='';
    var logger=document.createElement('div');
    logger_container.appendChild(logger);
    
    logger.textContent=uidhash+' 正在获取 UID...';
    chrome.runtime.sendMessage(null,{type: 'crack_uidhash', hash: uidhash}, function(uids) {
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
    var panel_obj=document.createElement('div');
    panel_obj.style.display='none';
    panel_obj.appendChild(make_panel_dom());
    panel_obj.querySelector('.pakku-panel-close').addEventListener('click',function() {
        panel_obj.style.display='none';
    });
    panel_obj.addEventListener('mousewheel',function(e) {
        e.stopPropagation();
    });
    document.addEventListener('click',function(e) {
        if(!panel_obj.contains(e.target) && !list_elem.contains(e.target))
            panel_obj.style.display='none';
    });
    
    player_elem.appendChild(panel_obj);

    function show_panel(dminfo,floating) {
        var dm_ultralong=dminfo.str.length>498;
        var dm_str=dminfo.str.replace(/([\r\n\t]|\/n)/g,'').trim();
        var text_container=panel_obj.querySelector('.pakku-panel-text'),
            selectbar={
                bar: panel_obj.querySelector('.pakku-panel-selectbar'),
                content: panel_obj.querySelector('.pakku-panel-selectbar-content'),
                left: panel_obj.querySelector('.pakku-panel-selectbar-left'),
                right: panel_obj.querySelector('.pakku-panel-selectbar-right'),
            },
            desc_container=panel_obj.querySelector('.pakku-panel-desc'),
            peers_container=panel_obj.querySelector('.pakku-panel-peers'),
            footer_container=panel_obj.querySelector('.pakku-panel-footer');
        
        panel_obj.style.display='block';
        text_container.textContent='';
        desc_container.innerHTML='';
        peers_container.innerHTML='';
        footer_container.textContent='';
        footer_container.dataset['_current_hash']='';
        
        var infos=[];
        // the list might be sorted in a wrong way, so let's guess the index
        if(typeof dminfo.index=='number' && D[dminfo.index] &&
                (dm_ultralong ? D[dminfo.index].trimmed_text.indexOf(dm_str)===0 : D[dminfo.index].trimmed_text===dm_str)) {
            infos=[D[dminfo.index]];
        } else {
            for(var i=0;i<D.length;i++)
                if((dm_ultralong ? D[i].trimmed_text.indexOf(dm_str)===0 : D[i].trimmed_text===dm_str))
                    infos.push(D[i]);
        }

        console.log('pakku panel: show panel',infos);
        
        function redraw_ui(idx) {
            if(idx<0) idx+=infos.length;
            else if(idx>=infos.length) idx-=infos.length;
            var info=infos[idx];

            text_container.textContent=info.text;

            selectbar.bar.style.display=infos.length>1 ? 'block' : 'none';
            selectbar.content.textContent=(idx+1)+'/'+infos.length+' ['+format_duration((info.peers[0]||{ir_obj: {time: 0}}).ir_obj.time)+']';
            selectbar.left.onclick=function() {redraw_ui(idx-1);};
            selectbar.right.onclick=function() {redraw_ui(idx+1);};

            desc_container.textContent='';
            info.desc.forEach(function(d) {
                desc_container.appendChild(make_p(d));
            });

            peers_container.textContent='';
            info.peers.forEach(function(p) {
                var self=document.createElement('div');
                var color=proc_rgb(p.ir_obj.color);
                self.style.color='rgb('+color[0]+','+color[1]+','+color[2]+')';
                self.classList.add(get_L(color[0],color[1],color[2])>.5 ? 'black' : 'white');

                self.appendChild(make_p(proc_mode(p.ir_obj.mode)+' '+p.ir_obj.content));
                self.appendChild(make_p(
                    p.reason+' '+p.ir_obj.sender_hash+' '+(p.ir_obj.time_ms/1000).toFixed(1)+'s '+p.ir_obj.fontsize+'px '
                    +'W'+p.ir_obj.weight+' '+format_datetime(new Date(p.ir_obj.sendtime*1000))
                ));
                
                (function(self,uidhash,container) {
                    self.addEventListener('mouseover',function() {
                        query_uid(uidhash,container);
                    });
                })(self,p.ir_obj.sender_hash,footer_container);
                
                peers_container.appendChild(self);
            });
            if(info.peers[0])
                query_uid(info.peers[0].ir_obj.sender_hash,footer_container);
        }

        if(infos.length) {
            redraw_ui(0);
        } else {
            desc_container.appendChild(make_p('找不到弹幕详情'));
        }
    
        peers_container.scrollTo(0,0);

        if(floating)
            panel_obj.classList.add('pakku-floating');
        else
            panel_obj.classList.remove('pakku-floating');
    }
    
    if(window._panel_listener) {
        list_elem.removeEventListener('click',window._panel_listener);
        console.log('pakku panel: removing previous hook listener');
    }
    list_elem.addEventListener('click',window._panel_listener=function(e) {
        var dm_obj=e.target.parentElement;
        if(dm_obj && dm_obj.classList.contains('danmaku-info-row') && dm_obj.getAttribute('dmno'))
            show_panel({
                str: dm_obj.querySelector('.danmaku-info-danmaku').title,
                index: parseInt(dm_obj.getAttribute('dmno')),
            });
    });
    
    var danmaku_stage=player_elem.querySelector('.bilibili-player-video-danmaku');
    if(danmaku_stage) {
        var hover_counter=0;
        danmaku_stage.addEventListener('mouseover',function(e) {
            hover_counter++;
            if(e.target.className=='bilibili-danmaku' || e.target.className=='b-danmaku') {
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
            if(e.target.className=='bilibili-danmaku' || e.target.className=='b-danmaku') {
                show_panel({str: e.target.textContent});
                e.stopPropagation();
            }
            player_elem.classList.remove('__pakku_pointer_event');
        });
        document.addEventListener('keydown',function(e) {
            if((e.key=='Control' || e.key=='Meta') && !e.repeat) {
                hover_counter=0;
                player_elem.classList.add('__pakku_pointer_event');
            } else if(!e.ctrlKey && !e.metaKey) { // fix ctrl key state
                player_elem.classList.remove('__pakku_pointer_event');
                if(panel_obj.classList.contains('pakku-floating'))
                    panel_obj.style.display='none';
            }
        });
        document.addEventListener('keyup',function(e) {
            if(e.key=='Control' || e.key=='Meta') {
                player_elem.classList.remove('__pakku_pointer_event');
                if(panel_obj.classList.contains('pakku-floating'))
                    panel_obj.style.display='none';
            }
        });
        // after the webpage lost focus, `keyup` event might not be dispatched
        document.defaultView.addEventListener('blur',function() {
            player_elem.classList.remove('__pakku_pointer_event');
        })
    }
}

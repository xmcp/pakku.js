var MAX_FLUCT=15;
var MAX_TIMEDELTA=3;

function bind_seekbar(bar_elem) {
    function parse_time(time) { // MMMMMM:SS -> seconds
        var res=/(\d+)\:(\d{2})/.exec(time);
        return parseInt(res[1])*60+parseInt(res[2]);
    }
    function time_delta(time,danmu_time) {
        return Math.abs(time-danmu_time);
    }
    function to_dom(danmu) {
        var p=make_p(proc_mode(danmu.peers[0].mode)+' '+danmu.text);
        if(danmu.peers.length>1)
            p.style.fontWeight='bold';
        return p;
    }
    function mode_prio(mode) { // smaller is more prior
        switch(parseInt(mode)) {
            case 4: return 1; //'↓↓'
            case 5: return 2; //'↑↑'
            case 7: return 3; //'**'
            case 1: return 4; //'|←'
            default: return 999;
        }
    }
    
    var fluct=document.createElement('div');
    
    var time_elem=bar_elem.querySelector('.bilibili-player-video-progress-detail-time');
    if(!time_elem) {
        console.log('! fluctlight cannot find time_elem');
        return;
    }
    // time
    new MutationObserver(function(muts) {
        muts.forEach(function(mut) {
            if(mut.addedNodes) {
                var time_str=mut.addedNodes[0].textContent;
                if(time_str===fluct.dataset['current_time']) return;
                fluct.dataset['current_time']=time_str;
                
                fluct.style.height=0;
                fluct.textContent='';
                var time=parse_time(time_str);
                var danmus=[];
                for(var i=0;i<D.length && danmus.length<MAX_FLUCT;i++) {
                    var d=D[i];
                    if(d.peers && time_delta(time,d.peers[0].time)<=MAX_TIMEDELTA)
                        danmus.push(d);
                }
                danmus.sort(function(a,b) {
                    return 0 || // avoid auto ;
                        mode_prio(b.peers[0].mode) - mode_prio(a.peers[0].mode) ||
                        a.peers.length - b.peers.length ||
                        time_delta(time,b) - time_delta(time,a) ||
                        0;
                }).forEach(function(danmu) {
                    fluct.appendChild(to_dom(danmu));
                });
                fluct.style.height=(4+14*danmus.length)+'px';
                fluct.style.bottom=(4+100+14*danmus.length)+'px';
            }
        });
    }).observe(time_elem,{
        childList: true
    });
    
    // inject fluctlight
    fluct.setAttribute('style',`
        position: relative;
        width: 156px;
        background-color: white;
        opacity: .8;
        overflow-x: hidden;
        text-align: left;
        font-size: 12px;
        line-height: 14px;
        padding: 2px;
    `);
    fluct.dataset['current_time']='';
    bar_elem.appendChild(fluct);
}

var x=document.createElement('script');
x.src='https://static.hdslb.com/player/js/basAce.min.js';
document.head.appendChild(x);
console.log('bas injected');

function try_inj() {
    var t=document.querySelector('.bilibili-player-bas-danmaku');
    if(t) t.style.display='initial';
    else setTimeout(try_inj,1000);
}
try_inj();

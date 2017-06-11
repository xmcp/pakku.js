(function() {
    try {
        if(document.domain==='www.bilibili.com') {
            localStorage['defaulth5']=1;
            alert('已启用 HTML5 播放器，刷新网页即可生效');
            window.close();
            return true;
        } else
            throw 1;        
    } catch(e) {
        alert('请点击页面上的“试用”按钮启用 HTML5 播放器');
    }
})();
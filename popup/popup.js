chrome.runtime.getBackgroundPage(function(bgpage) {
    var enabled=bgpage.GLOBAL_SWITCH;
    var btn=document.getElementById('switch');

    function setbtn() {
        btn.classList.add(enabled?'on':'off');
        btn.classList.remove(enabled?'off':'on');
        btn.textContent=enabled?'工作中':'休息中';
    }
    btn.addEventListener('click',function() {
        bgpage.GLOBAL_SWITCH=enabled=!enabled;
        chrome.browserAction.setBadgeText({
            text: enabled?'':'zzz'
        });
        setbtn();
    });
    setbtn();
});
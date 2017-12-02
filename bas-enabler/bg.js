var danmaku=`
def button foo1 {
    text="<center><span style='display: inline-block; margin: 0 -20px; font-size: 18px; width: 70px;'>+0.1s</span><br>x123</center>"
    textColor=0xffffff
    fillColor=0x0000aa
    fontSize=10
    target=seek{time=0s}
    fillAlpha=.5
    duration=3s
    x=0
    y=30%
}
def button foo2 {
    text="<center><span style='display: inline-block; margin: 0 -20px; font-size: 18px; width: 70px;'>+0.1s</span><br>x123</center>"
    textColor=0xffffff
    fillColor=0x0000aa
    fontSize=10
    target=seek{time=0s}
    fillAlpha=.5
    duration=3s
    x=70
    y=30%
}
def button foo3 {
    text="<center><span style='display: inline-block; margin: 0 -20px; font-size: 18px; width: 70px;'>+0.1s</span><br>x123</center>"
    textColor=0xffffff
    fillColor=0x0000aa
    fontSize=10
    target=seek{time=0s}
    fillAlpha=.5
    duration=3s
    x=140
    y=30%
}
`;

/**/

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    console.log('replaced');
    return {redirectUrl: 'data:text/xml;charset=utf-8,'+encodeURIComponent(`
        <i>
        <chatserver>chat.bilibili.com</chatserver>
        <chatid>12664443</chatid>
        <mission>0</mission>
        <maxlimit>1000</maxlimit>
        <source>k-v</source>
        <d p="1,9,25,16777215,1482851464,0,f571e8a8,2788062125">
        ${danmaku.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')}
        </d>
    `)};
}, {urls: ['*://comment.bilibili.com/12664443.xml','*://comment.bilibili.com/rc/12664443.xml']}, ['blocking']);

//*/
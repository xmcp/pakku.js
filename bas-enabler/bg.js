var replaced=`
<i>
<chatserver>chat.bilibili.com</chatserver>
<chatid>12664443</chatid>
<mission>0</mission>
<maxlimit>1000</maxlimit>
<source>k-v</source>
<d p="1,9,25,16777215,1482851464,0,f571e8a8,2788062125">
def text foo {
    content = "foobar"
    x=10%
    y=10%
    color = 0xffffff
}

set foo {
    x=50%
    y=50%
} 1s
</d></i>
`;

/**

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    return {redirectUrl: 'data:text/xml;charset=utf-8,'+encodeURIComponent(replaced)};
}, {urls: ['*://comment.bilibili.com/12664443.xml','*://comment.bilibili.com/rc/12664443.xml']}, ['blocking']);

//*/
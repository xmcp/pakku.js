# 请在[Chrome Web Store](https://chrome.google.com/webstore/detail/pakku/jklfcpboamajpiikgkbjcnnnnooefbhh) 中下载本扩展程序

不方便翻墙的人和其他Chrome内核浏览器的用户可以 [直接下载CRX文件](http://s.xmcp.ml/pakkujs/latest.crx)，忽略浏览器的提示后将其拖拽至扩展程序页面（chrome://extensions） 来安装。

![logo](https://cloud.githubusercontent.com/assets/6646473/17503651/20b41376-5e24-11e6-8829-6b8a0ccd47a9.png)
# pakku.js
自动合并B站视频中相同的弹幕**的 Chrome 扩展程序**，让您免受节奏大师刷屏之苦

![screenshot](https://cloud.githubusercontent.com/assets/6646473/17503800/5cba26e8-5e25-11e6-87c1-04431ef58e17.png)

其前身是基于Python的[pakku.py](https://github.com/xmcp/pakku.py)，现在移植为了 Chrome 扩展以方便使用。

## 实现细节

所有时间差在15秒以内的、内容完全相同的弹幕会被合并。

合并之后的弹幕的模式（即顶部、滚动、底部）、颜色和大小与时间最早的弹幕相同。

另外，符合如下模式的弹幕将被视为相同：

- `^23{3,}$`
- `^6{4,}$`
- `^[fF]+$`
- `^[hH]+$`

## 注意

出于跨域、Data URL、Chrome 扩展程序的权限等等技术限制，目前**只支持B站的 HTML5 播放器，不支持 Flash 播放器**。敬请谅解。

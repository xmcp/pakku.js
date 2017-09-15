[![Build Status](https://travis-ci.org/xmcp/pakku.js.svg?branch=master)](https://travis-ci.org/xmcp/pakku.js)
[![license](https://img.shields.io/github/license/xmcp/pakku.js.svg)](https://opensource.org/licenses/GPL-3.0/)

[![Chrome Web Store - Version](https://img.shields.io/chrome-web-store/v/jklfcpboamajpiikgkbjcnnnnooefbhh.svg)](https://chrome.google.com/webstore/detail/pakku/jklfcpboamajpiikgkbjcnnnnooefbhh)
[![Chrome Web Store - Downloads](https://img.shields.io/chrome-web-store/d/jklfcpboamajpiikgkbjcnnnnooefbhh.svg)](https://chrome.google.com/webstore/detail/pakku/jklfcpboamajpiikgkbjcnnnnooefbhh)
[![Chrome Web Store - Rating](https://img.shields.io/chrome-web-store/rating/jklfcpboamajpiikgkbjcnnnnooefbhh.svg)](https://chrome.google.com/webstore/detail/pakku/jklfcpboamajpiikgkbjcnnnnooefbhh)

[![Mozilla Add-on - Version](https://img.shields.io/amo/v/pakkujs.svg)](https://addons.mozilla.org/zh-CN/firefox/addon/pakkujs/)
[![Mozilla Add-on - Downloads](https://img.shields.io/amo/d/pakkujs.svg)](https://addons.mozilla.org/zh-CN/firefox/addon/pakkujs/)
[![Mozilla Add-on - Rating](https://img.shields.io/amo/rating/pakkujs.svg)](https://addons.mozilla.org/zh-CN/firefox/addon/pakkujs/)

## 请在[Chrome Web Store](https://chrome.google.com/webstore/detail/pakku/jklfcpboamajpiikgkbjcnnnnooefbhh) / [Addons.Mozilla.Org](https://addons.mozilla.org/zh-CN/firefox/addon/pakkujs/) 中下载本扩展程序

不方便访问 Chrome Web Store 的人和其他Chrome内核浏览器的用户可以 [直接下载CRX文件](http://s.xmcp.ml/pakkujs/latest.crx)，忽略浏览器的提示后将其拖拽至扩展程序页面（chrome://extensions） 来安装。

![logo](https://cloud.githubusercontent.com/assets/6646473/17503651/20b41376-5e24-11e6-8829-6b8a0ccd47a9.png)
# pakku.js
自动合并B站视频中刷屏弹幕的 Chrome 扩展程序，让您免受各种带节奏弹幕的刷屏之苦

使用之前 ↓

![screenshot_before](https://user-images.githubusercontent.com/6646473/27000977-c4d32444-4df0-11e7-8049-2a611f174471.png)

使用之后 ↓

![screenshot_after](https://user-images.githubusercontent.com/6646473/27000990-3ff7deee-4df1-11e7-90ba-32647c1defea.png)

Browser Action ↓

![browser_action](https://user-images.githubusercontent.com/6646473/27863234-b1e279b4-61bb-11e7-985e-f4c7e2eb8ef5.png)

弹幕信息显示 ↓

![tooltip](https://user-images.githubusercontent.com/6646473/27863237-b4798dc0-61bb-11e7-912e-5f534adc32ec.png)

其前身是基于Python的[pakku.py](https://github.com/xmcp/pakku.py)，现在移植为了 Chrome 扩展以方便使用。

## 实现细节

视频的弹幕池中所有时间差小于`THRESHOLD`秒的相似弹幕（“弹幕P与弹幕Q相似”定义为 `edit_distance(P,Q)<=MAX_DIST || cosine_distance(P,Q)*100>=MAX_COSINE`，设置中有 `THRESHOLD`、`MAX_DIST` 和 `MAX_COSINE` 的选项）会被合并成一个。

合并之后的弹幕的模式（即顶部、滚动、底部）、颜色和大小与时间最早的弹幕相同。代表多个相似弹幕的弹幕会被添加一个“[xN]”后缀以示标记（在设置中可以修改为添加前缀或不添加任何标记）。

出于这个原因，部分高级弹幕合并后会出现排版错乱的问题，设置中提供了是否处理高级弹幕（`type==7`）的开关。

部分用户不想让某些相似弹幕（例如计数君、弹幕护眼等）被合并，因此我们提供了基于正则表达式的弹幕合并白名单功能。

另外，我们发现有些弹幕虽然在文本上来看并不相似，但符合某些特定的模式，比如：

- `^23{3,}$`
- `^6{4,}$`
- `^[fF]+$`
- `^[hH]+$`

pakku支持通过正则表达式识别这些模式并将它们合并成一个。

## 注意

出于跨域、Data URL、Chrome 扩展程序的权限等等技术限制，目前**只支持B站的 HTML5 播放器，不支持 Flash 播放器**。敬请谅解。

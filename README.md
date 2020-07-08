[![Build Status](https://img.shields.io/travis/xmcp/pakku.js.svg?style=flat-square)](https://travis-ci.org/xmcp/pakku.js)
/
[![Chrome Web Store - Version](https://img.shields.io/chrome-web-store/v/jklfcpboamajpiikgkbjcnnnnooefbhh.svg?style=flat-square)](https://chrome.google.com/webstore/detail/pakku/jklfcpboamajpiikgkbjcnnnnooefbhh)
[![Chrome Web Store - Downloads](https://img.shields.io/chrome-web-store/d/jklfcpboamajpiikgkbjcnnnnooefbhh.svg?style=flat-square)](https://chrome.google.com/webstore/detail/pakku/jklfcpboamajpiikgkbjcnnnnooefbhh)
[![Chrome Web Store - Rating](https://img.shields.io/chrome-web-store/rating/jklfcpboamajpiikgkbjcnnnnooefbhh.svg?style=flat-square)](https://chrome.google.com/webstore/detail/pakku/jklfcpboamajpiikgkbjcnnnnooefbhh)
/
[![Mozilla Add-on - Version](https://img.shields.io/amo/v/pakkujs.svg?style=flat-square)](https://addons.mozilla.org/zh-CN/firefox/addon/pakkujs?src=external-shield)
[![Mozilla Add-on - Downloads](https://img.shields.io/amo/users/pakkujs.svg?style=flat-square)](https://addons.mozilla.org/zh-CN/firefox/addon/pakkujs?src=external-shield)
[![Mozilla Add-on - Rating](https://img.shields.io/amo/rating/pakkujs.svg?style=flat-square)](https://addons.mozilla.org/zh-CN/firefox/addon/pakkujs?src=external-shield)

#### [→ 点我安装 ←](https://s.xmcp.ml/pakkujs/?src=readme_1) （支持 Chrome 和 Firefox）

![logo](https://cloud.githubusercontent.com/assets/6646473/17503651/20b41376-5e24-11e6-8829-6b8a0ccd47a9.png)
# pakku.js
自动合并B站视频中刷屏弹幕的 WebExtension，让您免受各种带节奏弹幕的刷屏之苦

↓ 《千绪的通学路》第5话

![](https://s.xmcp.ml/pakkujs/comm/1.png)

↓  哔哩哔哩拜年祭 2018，可见“弹幕密度分析图”功能

![](https://s.xmcp.ml/pakkujs/comm/2.png)

↓  【炮姐/AMV】我永远都会守护在你的身边！(av810872)，可见“自动调整弹幕大小”功能

![](https://s.xmcp.ml/pakkujs/comm/3.png)

↓  《NEW GAME!》第8话，可见“弹幕信息显示框”功能

![](https://s.xmcp.ml/pakkujs/comm/4.png)

↓  电磁炮真是太可爱了(av314)，可见统计信息显示

![](https://s.xmcp.ml/pakkujs/comm/5.png)

### 开放 API

可以通过 HTML5 Messaging API 来利用 pakku 干更多的事情，例如修改弹幕列表、跟踪换P操作、进行对弹幕的可视化等等。

v10.0+:

- 在每个B站播放器页面，当弹幕加载完成时，会向页面自身发送一条内容为 `{type: 'pakku_event_danmaku_loaded', pakku_version: '...', cid: ...}` 的消息。你可以用 `window.addEventListener('message', callback)` 来接收这一消息。
- 调用 `window.postMessage({type: 'pakku_get_danmaku'}, '*')` 可以获取当前弹幕内容，弹幕将会通过 `{type: 'pakku_got_danmaku', resp: [...]}` 形式的消息返回。
- 调用 `window.postMessage({type: 'pakku_get_danmaku_with_uid'}, '*')` 可以获得弹幕的发送者信息，弹幕将会通过同样的方式返回，但返回的列表中包括了 `cracked_uid` 属性。
- 调用 `window.postMessage({type: 'pakku_set_danmaku_bounce', danmakus: [...]}, '*')` 可以更新当前弹幕内容。

请注意，上述接口没有文档，不保证能够正常工作，随时可能改变，任何 bug 都是 feature。

一个简单的 Demo 参见 [pakku-advanced-filter](https://github.com/xmcp/pakku-advanced-filter)。

-----

### License

This is free software, and you are welcome to redistribute it under GPLv3.

Also, you can redistribute the CRC32 Cracker component under MIT License.

See [LICENSE.txt](LICENSE.txt) for details.

-----

#### [→ 点我安装 ←](https://s.xmcp.ml/pakkujs/?src=readme_2) （支持 Chrome 和 Firefox）

-----

高级用户请不要错过 [按发送者UID屏蔽弹幕](https://github.com/xmcp/pakku-advanced-filter) 的用户脚本。
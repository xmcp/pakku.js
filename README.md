[![Build Status](https://travis-ci.org/xmcp/pakku.js.svg?branch=master)](https://travis-ci.org/xmcp/pakku.js)
/
[![Chrome Web Store - Version](https://img.shields.io/chrome-web-store/v/jklfcpboamajpiikgkbjcnnnnooefbhh.svg)](https://chrome.google.com/webstore/detail/pakku/jklfcpboamajpiikgkbjcnnnnooefbhh)
[![Chrome Web Store - Downloads](https://img.shields.io/chrome-web-store/d/jklfcpboamajpiikgkbjcnnnnooefbhh.svg)](https://chrome.google.com/webstore/detail/pakku/jklfcpboamajpiikgkbjcnnnnooefbhh)
[![Chrome Web Store - Rating](https://img.shields.io/chrome-web-store/rating/jklfcpboamajpiikgkbjcnnnnooefbhh.svg)](https://chrome.google.com/webstore/detail/pakku/jklfcpboamajpiikgkbjcnnnnooefbhh)
/
[![Mozilla Add-on - Version](https://img.shields.io/amo/v/pakkujs.svg)](https://addons.mozilla.org/zh-CN/firefox/addon/pakkujs?src=external-shield)
[![Mozilla Add-on - Downloads](https://img.shields.io/amo/users/pakkujs.svg)](https://addons.mozilla.org/zh-CN/firefox/addon/pakkujs?src=external-shield)
[![Mozilla Add-on - Rating](https://img.shields.io/amo/rating/pakkujs.svg)](https://addons.mozilla.org/zh-CN/firefox/addon/pakkujs?src=external-shield)

## [→ 点我安装 ←](http://s.xmcp.ml/pakkujs/?src=readme_1) （支持 Chrome 和 Firefox）

![logo](https://cloud.githubusercontent.com/assets/6646473/17503651/20b41376-5e24-11e6-8829-6b8a0ccd47a9.png)
# pakku.js
自动合并B站视频中刷屏弹幕的 Chrome 扩展程序，让您免受各种带节奏弹幕的刷屏之苦

使用之前 ↓

![screenshot_before](https://user-images.githubusercontent.com/6646473/27000977-c4d32444-4df0-11e7-8049-2a611f174471.png)

使用之后 ↓

![screenshot_after](https://user-images.githubusercontent.com/6646473/27000990-3ff7deee-4df1-11e7-90ba-32647c1defea.png)

Browser Action ↓

![browser_action_advanced](https://user-images.githubusercontent.com/6646473/36491658-42022f8e-1766-11e8-9728-33d0a77f7f47.png)

![browser_action_details](https://user-images.githubusercontent.com/6646473/36491671-50194710-1766-11e8-9f73-7bbe1d90efa2.png)


弹幕信息显示（支持查询弹幕发送者） ↓

![tooltip](https://user-images.githubusercontent.com/6646473/36491701-5e8f89a8-1766-11e8-815b-e890ebaeff5e.png)

弹幕密度分析图 ↓

![fluctlight](https://user-images.githubusercontent.com/6646473/36491732-70320f0a-1766-11e8-80e9-11ae4842f781.png)

弹幕屏蔽 Pro ↓

![foolbar](https://user-images.githubusercontent.com/6646473/39392565-6fa348ee-4aea-11e8-86e4-abc30c61bbb8.png)

其前身是基于Python的[pakku.py](https://github.com/xmcp/pakku.py)，现在移植为了 Chrome 扩展程序和 Firefox 扩展以方便使用。

### 开放 API

Power User 可以通过 HTML5 Messaging API 来利用 pakku 干更多的事情。

v8.6.5+:

- 在每个B站播放器页面，当弹幕加载完成时，会向页面自身发送一条内容为 `{type: 'pakku_event_danmaku_loaded'}` 的消息。你可以用 `window.addEventListener('message', callback)` 来接收这一消息。
- 调用 `window.postMessage({type: 'pakku_get_danmaku'}, '*')` 可以获取当前弹幕内容，弹幕将会通过 `{type: 'pakku_return_danmaku', resp: [...]}` 形式的消息返回。
- 调用 `window.postMessage({type: 'pakku_set_xml_bounce', xml: '<i><d p="...">...</d></i>'}, '*')` 可以更新当前弹幕内容。

v8.7+:

- 调用 `window.postMessage({type: 'pakku_get_danmaku_with_uid'}, '*')` 或 `window.postMessage({type: 'pakku_get_danmaku_with_info'}, '*')` 可以获得弹幕的发送者信息，弹幕将会通过 `{type: 'pakku_return_danmaku', flag: '...', resp: [...]}` 形式的消息返回。
- `pakku_event_danmaku_loaded` 消息增加了属性 `pakku_version` 表示当前 pakku 版本号。

v8.7.1+:

- `pakku_get_danmaku_with_info` 方法增加了可选参数 `silence` 表示是否隐藏进度条。

请注意，上述接口没有文档，不保证能够正常工作，任何 bug 都是 feature。

使用该 API 的示例：[xmcp/pakku-advanced-filter](https://github.com/xmcp/pakku-advanced-filter)

-----

### License

This is free software, and you are welcome to redistribute it under GPLv3.

Also, you can redistribute the CRC32 Cracker component under MIT License.

See [LICENSE.txt](LICENSE.txt) for details.

-----

#### [→ 点我安装 ←](http://s.xmcp.ml/pakkujs/?src=readme_2) （支持 Chrome 和 Firefox）

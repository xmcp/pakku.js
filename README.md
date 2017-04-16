# 请在[Chrome Web Store](https://chrome.google.com/webstore/detail/pakku/jklfcpboamajpiikgkbjcnnnnooefbhh) 中下载本扩展程序

不方便翻墙的人和其他Chrome内核浏览器的用户可以 [直接下载CRX文件](http://s.xmcp.ml/pakkujs/latest.crx)，忽略浏览器的提示后将其拖拽至扩展程序页面（chrome://extensions） 来安装。

另外 [@fanthos](https://github.com/fanthos) 搞了一个油猴移植版的 [pakku.user.js](https://github.com/fanthos/pakku.user.js)（非官方），效果怎么样我也没试过，把链接放在这里供 Firefox 党参考（逃。比起这个油猴脚本，出于作者个人的立场，我当然更希望大家用我这个 Chrome 扩展啦 :)

![logo](https://cloud.githubusercontent.com/assets/6646473/17503651/20b41376-5e24-11e6-8829-6b8a0ccd47a9.png)
# pakku.js
自动合并B站视频中刷屏弹幕的 Chrome 扩展程序，让您免受各种带节奏弹幕的刷屏之苦

![screenshot](https://cloud.githubusercontent.com/assets/6646473/17503800/5cba26e8-5e25-11e6-87c1-04431ef58e17.png)

其前身是基于Python的[pakku.py](https://github.com/xmcp/pakku.py)，现在移植为了 Chrome 扩展以方便使用。

## 实现细节

视频的弹幕池会被按照时间切成若干个片段（默认是每15秒一个片段，可以在设置中调整），在每个片段中的相似弹幕（“弹幕A与弹幕B相似”定义为`(similar_flag_enabled && A.length+B.length>=10) ? edit_distance(A,B)<=5 : A==B`，设置中有`similar_flag_enabled`的开关）会被合并成一个。

由于这个实现方式，少数时间相近但跨越片段分界线的相似弹幕无法被合并。例如当片段长度为15秒时，如果有3条相同弹幕分别位于00:26、00:29、00:32，只有前两个会被合并，而第三个不会。这种实现并不完美，但实现容易、效率更好且效果可以接受。

合并之后的弹幕的模式（即顶部、滚动、底部）、颜色和大小与时间最早的弹幕相同。代表多个相似弹幕的弹幕会被添加一个“[xN]”后缀以示标记（在设置中可以修改为添加前缀或不添加任何标记）。

出于这个原因，部分高级弹幕合并后会出现排版错乱的问题，设置中提供了是否处理高级弹幕（`type==7`）的开关。

另外，我们发现有些弹幕虽然在文本上来看并不相似，但符合某些特定的模式，比如：

- `^23{3,}$`
- `^6{4,}$`
- `^[fF]+$`
- `^[hH]+$`

pakku支持通过正则表达式识别这些模式并将它们合并成一个。

## 注意

出于跨域、Data URL、Chrome 扩展程序的权限等等技术限制，目前**只支持B站的 HTML5 播放器，不支持 Flash 播放器**。敬请谅解。

# pakku-mobile-proxy

在 iOS 哔哩哔哩 app 上使用 pakku。

![image](https://user-images.githubusercontent.com/6646473/43705407-f45a7d8e-9994-11e8-956a-3502d483ca40.png)

Android 没有测试。

-----

### 在电脑（服务器）上的配置：

（下面的流程假设你的操作系统是 Ubuntu 18.04 LTS，但其实 Windows 也可以）

生成 pakku 的核心代码：

- `apt install nodejs npm`

- `cd path/to/pakkujs/repository`

- `npm install`
- `npm install -g grunt-cli`
- `grunt dev`
- `cp dist/_/core/all_core.js mobile-proxy/`

安装依赖：

- `cd mobile-proxy`
- `npm install`

生成证书：

- `cd cert`
- `sh ./gen_cert.sh`
  OpenSSL 会询问一些东西，直接按回车。
- `cd ..`

调整设置：

- `nano settings.js`
  "ip" 为电脑的 IP 地址；
  "http_port" 为代理服务器端口（要在防火墙开放这个端口）；
  "ssl_port" 为内部使用的端口；
  "options" 为 pakku 设置（在 pakku 选项页面可以导出设置，注意字符串需要转义）。

运行代理服务器：

- `node proxy.js`

### 在手机上的配置：

（下面的流程假设你的操作系统是 iOS 11.4.1）

添加证书：

- 访问 `http://<ip>:<http_port>/cert.pem`
- 按照提示添加描述文件
- 前往 “设置”→“通用”→“关于本机”→“证书信任设置” 信任添加的证书

设置代理服务器：

- 前往 “设置”→“无线局域网”→“`<ssid>`”→“配置代理”
- 选择“自动”，URL 填写 `http://<ip>:<http_port>/proxy.pac`

测试代理服务器设置：

- 打开 Safari
- 访问 URL `https://api.bilibili.com/test` （注意是 https）
- 页面应该显示 "success"

设置完成，现在可以打开哔哩哔哩 app 看视频了。
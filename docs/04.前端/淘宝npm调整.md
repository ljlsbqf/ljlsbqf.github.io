---
title: 淘宝npm调整
date: 2022-06-08 16:59:33
permalink: /pages/eea373/
categories:
  - 前端
tags:
  - 
---
淘宝调整了npm域名解析地址，原文：https://developer.aliyun.com/mirror/NPM?spm=a2c6h.25603864.0.0.3d975969CxyIYY

~~~
http://npm.taobao.org和 http://registry.npm.taobao.org 将在 2022.06.30 号正式下线和停止 DNS 解析。

新域名为 npmmirror.com, 相关服务域名切换规则请参考：

http://npm.taobao.org => http://npmmirror.com
http://registry.npm.taobao.org => http://registry.npmmirror.com
~~~

修改：
~~~
编辑命令:
npm config edit
调整registry为:http://registry.npmmirror.com
查看命令：
npm config get registry
~~~

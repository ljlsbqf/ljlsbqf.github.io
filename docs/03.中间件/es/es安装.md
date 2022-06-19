---
title: es安装
date: 2022-06-08 16:19:38
permalink: /pages/b20294/
categories:
  - 中间件
  - es
tags:
  - 
---
### 官网
https://www.elastic.co/guide/index.html
https://hub.docker.com/

### 安装
1.dockerhub官网查询镜像安装:
~~~
docker pull elasticsearch:8.2.2
~~~



3.创建本机挂载目录
~~~
sudo mkdir -p /opt/elasticsearch/config
sudo mkdir -p /opt/elasticsearch/data
sudo mkdir -p /opt/elasticsearch/plugins
~~~

4.容器启动
~~~
sudo docker run --name elasticsearch -p 9200:9200  -p 9300:9300 \
 -e "discovery.type=single-node" \
 -e ES_JAVA_OPTS="-Xms84m -Xmx512m" \
 -v /opt/elasticsearch/config:/usr/share/elasticsearch/config \
 -v /opt/elasticsearch/data:/usr/share/elasticsearch/data \
 -v /opt/elasticsearch/plugins:/usr/share/elasticsearch/plugins \
 -d elasticsearch:8.2.2
 
 若报错，可先不挂载目录启动；启动成功后，再将容器内目录复制到宿主机，rm容器，重新新建docker容器，挂载目录
~~~
说明
~~~
-p 端口映射
-e discovery.type=single-node 单点模式启动
-e ES_JAVA_OPTS="-Xms84m -Xmx512m"：设置启动占用的内存范围,es内存使用率高，建议配置
-v 目录挂载
-d 后台运行
~~~



6.验证
es默认开启https访问
~~~
curl https://127.0.0.1:9200
~~~


7.开启账号密码
es8 已经不建议在es中设置账号密码，建议使用kibana设置访问端口
参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/setup-passwords.html
~~~
进入docker镜像，修改默认的elastic用户密码:
./elasticsearch-reset-password -u elastic -i
修改为:elasticdev
访问测试:
curl --cacert /opt/elasticsearch/config/certs/http_ca.crt -u elastic https://localhost:9200

~~~


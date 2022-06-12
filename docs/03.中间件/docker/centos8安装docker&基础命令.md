---
title: centos8安装docker&基础命令
date: 2022-06-08 16:31:54
permalink: /pages/62b57e/
categories:
  - 中间件
  - docker
tags:
  - 
---
参考：
docker镜像官网：https://hub.docker.com/

1、安装
~~~
yum install -y yum-utils device-mapper-persistent-data lvm2
~~~
2、仓库设置
~~~
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
~~~
3、安装 Docker Engine-Community
~~~
yum install docker-ce docker-ce-cli containerd.io
~~~
4、启动docker
~~~
systemctl start docker
~~~
5、docker学习镜像安装
~~~
docker search docker/getting-started
docker pull docker/getting-started
~~~


6、启动docker镜像
~~~
docker run -d -p 7080:80 docker/getting-started
~~~

7、停止docker
~~~
docker stop [CONTAINER ID]
~~~
8、删除镜像
~~~
docker rmi -f [IMAGE ID]
~~~

9、查看所有容器
~~~
docker ps -a
~~~
10、启动容器
~~~
docker start [CONTAINER ID]
~~~
11、查看docker 日志
~~~
docker logs [CONTAINER ID]
~~~
12、进入docker容器
~~~
docker exec -it [CONTAINER ID] /bin/bash
~~~
13、清理停止的容器
~~~
docker container prune
~~~

14、查看卷信息
~~~
docker volume --help
docker volume --ls   #查看所有卷
docker volume rm [卷名]  #删除卷
docker volume inspect [卷名]  #查看卷详情
~~~

15、 复制文件

~~~
从容器中复制文件到本地目录:
docker cp [containerid]:容器内路径 本机路径

docker cp elasticsearch:/usr/share/elasticsearch/config /opt/elasticsearch/config

从本地中复制文件到容器:
docker cp 本机路径 [containerid]:容器内路径

docker cp /opt/elasticsearch/config elasticsearch:/usr/share/elasticsearch/config
~~~


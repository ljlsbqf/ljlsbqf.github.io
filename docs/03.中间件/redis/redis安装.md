---
title: redis安装
date: 2022-06-15 16:34:09
permalink: /pages/583726/
categories:
  - 中间件
  - redis
tags:
  - 
---
### 安装redis7
github:https://github.com/redis/redis

官网:https://redis.io/docs/

1.dockerhub官网查询镜像安装:
~~~
docker pull redis:7.0.2
~~~



3.创建本机挂载目录
~~~
sudo mkdir -p /opt/redis/data
sudo mkdir -p /opt/elasticsearch/data
sudo mkdir -p /opt/elasticsearch/plugins
~~~

4.容器启动

~~~
sudo docker run --name redis -p 6379:6379 \
 -v /opt/redis/redis.conf:/etc/redis.conf \
 -v /opt/redis/data:/data \
 -d redis:7.0.2 redis-server /etc/redis.conf

redis镜像内是没有redis.conf文件的，需要用户自己到github上下载映射进去
~~~

参数说明:
~~~
--privileged=true：容器内的root拥有真正root权限，否则容器内root只是外部普通用户权限
-v /docker/redis/conf/redis.conf:/etc/redis/redis.conf：映射配置文件
-v /docker/redis/data:/data：映射数据目录
redis-server /etc/redis/redis.conf：指定配置文件启动redis-server进程
--appendonly yes：开启数据持久化
~~~


5.ca证书生成
下载ca生成脚本:https://fossies.org/linux/redis/utils/gen-test-certs.sh
或下载redis源码获取
~~~
#!/bin/bash

# Generate some test certificates which are used by the regression test suite:
#
#   tests/tls/ca.{crt,key}          Self signed CA certificate.
#   tests/tls/redis.{crt,key}       A certificate with no key usage/policy restrictions.
#   tests/tls/client.{crt,key}      A certificate restricted for SSL client usage.
#   tests/tls/server.{crt,key}      A certificate restricted for SSL server usage.
#   tests/tls/redis.dh              DH Params file.

generate_cert() {
    local name=$1
    local cn="$2"
    local opts="$3"

    local keyfile=/opt/redis/tls/${name}.key
    local certfile=/opt/redis/tls/${name}.crt

    [ -f $keyfile ] || openssl genrsa -out $keyfile 2048
    openssl req \
        -new -sha256 \
        -subj "/O=Redis Test/CN=$cn" \
        -key $keyfile | \
        openssl x509 \
            -req -sha256 \
            -CA /opt/redis/tls/ca.crt \
            -CAkey /opt/redis/tls/ca.key \
            -CAserial /opt/redis/tls/ca.txt \
            -CAcreateserial \
            -days 365 \
            $opts \
            -out $certfile
}

mkdir -p /opt/redis/tls
[ -f /opt/redis/tls/ca.key ] || openssl genrsa -out /opt/redis/tls/ca.key 4096
openssl req \
    -x509 -new -nodes -sha256 \
    -key /opt/redis/tls/ca.key \
    -days 3650 \
    -subj '/O=Redis Test/CN=Certificate Authority' \
    -out /opt/redis/tls/ca.crt

cat > /opt/redis/tls/openssl.cnf <<_END_
[ server_cert ]
keyUsage = digitalSignature, keyEncipherment
nsCertType = server

[ client_cert ]
keyUsage = digitalSignature, keyEncipherment
nsCertType = client
_END_

generate_cert server "Server-only" "-extfile /opt/redis/tls/openssl.cnf -extensions server_cert"
generate_cert client "Client-only" "-extfile /opt/redis/tls/openssl.cnf -extensions client_cert"
generate_cert redis "Generic-cert"

[ -f /opt/redis/tls/redis.dh ] || openssl dhparam -out /opt/redis/tls/redis.dh 2048

~~~

6. redis 开启tls
~~~
修改配置文件redis.conf
--tls-port 6379 --port 0 \
--tls-cert-file /opt/redis/redis-7.0.2/tests/tls/redis.crt \
--tls-key-file /opt/redis/redis-7.0.2/tests/tls/redis.key \
--tls-ca-cert-file /opt/redis/redis-7.0.2/tests/tls/ca.crt
  
~~~
7. 登录校验
~~~
启动：
./src/redis-server \
--tls-port 6379 --port 0 \
--tls-cert-file /opt/redis/redis-7.0.2/tests/tls/redis.crt \
--tls-key-file /opt/redis/redis-7.0.2/tests/tls/redis.key \
--tls-ca-cert-file /opt/redis/redis-7.0.2/tests/tls/ca.crt

./src/redis-cli -a foobared --tls \
--cert ./tests/tls/redis.crt \
--key ./tests/tls/redis.key \
--cacert ./tests/tls/ca.crt

~~~

6.配置redis tls访问
参考:https://redis.io/docs/manual/security/encryption/
https://blog.csdn.net/shuux666/article/details/123838193
~~~

~~~




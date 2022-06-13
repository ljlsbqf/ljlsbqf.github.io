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
 --net elknet --ip 127.0.0.1 \
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



### es字段说明
~~~
参考：
https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html
https://www.jianshu.com/p/9af735d634a2
1. text
text字段会被分词，对于text类型的字段你可能无法通过指定文本精确的检索到。另外需要注意的是，text类型的字段不能直接用于排序、聚合操作。
这种类型的字符串也称做analyzed字符串。
2.keyword
keyword类型适用于结构化的字段，比如手机号、商品id、用户id等，默认最大长度为256。keyword类型的字段内容不会被分词器分析、拆分，
而是根据原始文本直接生成倒排索引，所以keyword类型的字段可以直接通过原始文本精确的检索到。keyword类型的字段可用于过滤、排序、聚合操作。
这种字符串称做not-analyzed字符串。
3.日期类型
ES 中的date类型默认支持如下两种格式：
strict_date_optional_time，表示 yyyy-MM-dd'T'HH:mm:ss.SSSSSSZ 或者 yyyy-MM-dd 格式的日期
epoch_millis，表示从 1970.1.1 零点到现在的毫秒数


~~~


### es中match term使用
参考：https://blog.csdn.net/z8756413/article/details/85068970
~~~
term:是代表完全匹配，即不进行分词器分析，文档中必须包含整个搜索的词汇.
match和term的区别是,match查询的时候,elasticsearch会根据你给定的字段提供合适的分析器,
而term查询不会有分析器分析的过程，match查询相当于模糊匹配,只包含其中一部分关键词就行

~~~
### es组合查询
参考：https://juejin.cn/post/6936487066272432142
~~~
bool query 支持多种查询子句类型，分别是：
must：其查询子句必须全部被满足，逻辑相当于 and ，并且会计算分数。
filter：与 must 作用一样，但是不会计算分数。在 filter context  下的查询子句不会计算分数且会被缓存。
should：其查询子句应该被满足，也就是不一定都满足，逻辑相当于 or。

~~~

### es相关查询功能
~~~
参考:
https://blog.csdn.net/weixin_39626369/article/details/111575946
https://www.jianshu.com/p/81a2c3032079
删除索引:
curl --cacert /opt/elasticsearch/config/certs/http_ca.crt -u elastic https://localhost:9200/student -X DELETE




创建索引
curl --cacert /opt/elasticsearch/config/certs/http_ca.crt -u elastic https://localhost:9200/student -X POST -H 'Content-Type:application/json;charset=utf-8' -D '
{
	"mappings": {
		"properties": {
			"num": {
				"type": "integer",
				"index": true
			},
			"sex": {
				"type": "boolean",
				"index": true
			},
			"grade": {
				"type": "integer",
				"index": true
			},
			"schoolName": {
				"type": "text",
				"fields": {
					"keyword": {
						"type": "keyword",
						"ignore_above": 256
					}
				}
			},
			"userName": {
				"type": "object",
				"properties": {
					"last": {
						"type": "text",
						"fields": {
							"keyword": {
								"type": "keyword",
								"ignore_above": 256
							}
						}
					},
					"first": {
						"type": "text",
						"fields": {
							"keyword": {
								"type": "keyword",
								"ignore_above": 256
							}
						}
					}
				}
			}
		}
	},
	"settings": {
		"number_of_shards": "1",
		"number_of_replicas": "1"
	}
}'

查看es结构：
curl --cacert /opt/elasticsearch/config/certs/http_ca.crt -u elastic https://localhost:9200/student

curl --cacert /opt/elasticsearch/config/certs/http_ca.crt -u elastic https://localhost:9200/_cat

查询语句：
curl --cacert /opt/elasticsearch/config/certs/http_ca.crt -u elastic https://localhost:9200/student/_search -H 'Content-Type:application/json;charset=utf-8'  -X POST -d '
{       "query": {
            "match": {
                "schoolName": {
                    "query": "七中"
                }
            }
        }
}'

更新es索引mapping，新增字段
参考:https://blog.csdn.net/qq_41878532/article/details/111562255
curl --cacert /opt/elasticsearch/config/certs/http_ca.crt -u elastic https://localhost:9200/student/_mapping -H 'Content-Type:application/json;charset=utf-8'  -X PUT -d '
{
  "properties":{
    "joinDate" : {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
      }
  }
}'

~~~



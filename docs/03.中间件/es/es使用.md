---
title: es使用
date: 2022-06-07 00:06:25
permalink: /pages/9decf4/
categories:
  - 中间件
  - es
tags:
  - 
---
### 说明
升级了springboot到2.7版本,看到以前使用的RestHighLevelClient 被标注@Deprecated.
查看官网：介绍
> WARNING: Deprecated in 7.15.0.
The Java REST Client is deprecated in favor of the Java API Client.

参考链接：https://www.elastic.co/guide/en/elasticsearch/client/java-api-client/current/connecting.html

### 具体说明如下：

1. java类客户端(API client classes): 为es api提供了强类型的数据结构和方法。These provide strongly typed data structures and methods for Elasticsearch APIs. Since the Elasticsearch API is large, it is structured in feature groups (also called “namespaces”), each having its own client class. Elasticsearch core features are implemented in the ElasticsearchClient class.
2. json对象映射（A JSON object mapper）. This maps your application classes to JSON and seamlessly integrates them with the API client.
3. 数据传输层实现(A transport layer implementation). This is where all HTTP request handling takes place.

连接样例代码：
~~~
// Create the low-level client
RestClient restClient = RestClient.builder(
    new HttpHost("localhost", 9200)).build();

// Create the transport with a Jackson mapper
ElasticsearchTransport transport = new RestClientTransport(
    restClient, new JacksonJsonpMapper());

// And create the API client
ElasticsearchClient client = new ElasticsearchClient(transport);
~~~

官方样例代码及具体使用参考：
https://github.com/elastic/elasticsearch-java/tree/8.2/java-client/src/test/java/co/elastic/clients/documentation
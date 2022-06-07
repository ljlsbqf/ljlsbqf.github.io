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
https://docs.spring.io/spring-data/elasticsearch/docs/current/reference/html/#repositories
### 1. java客户端连接：

1. java类客户端(API client classes): 为es api提供了强类型的数据结构和方法。These provide strongly typed data structures and methods for Elasticsearch APIs. Since the Elasticsearch API is large, it is structured in feature groups (also called “namespaces”), each having its own client class. Elasticsearch core features are implemented in the ElasticsearchClient class.
2. json对象映射（A JSON object mapper）. This maps your application classes to JSON and seamlessly integrates them with the API client.
3. 数据传输层实现(A transport layer implementation). This is where all HTTP request handling takes place.

连接样例代码：
~~~
//身份鉴权
        CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY,new UsernamePasswordCredentials("user", "password"));

        RestClient restClient = RestClient.builder(
                new HttpHost("localhost", 9200))
                .setHttpClientConfigCallback(new RestClientBuilder.HttpClientConfigCallback() {
            @Override
            public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpAsyncClientBuilder) {
                return httpAsyncClientBuilder.setDefaultCredentialsProvider(credentialsProvider);
            }
        }).build();

// Create the transport with a Jackson mapper
ElasticsearchTransport transport = new RestClientTransport(
    restClient, new JacksonJsonpMapper());

// And create the API client
ElasticsearchClient client = new ElasticsearchClient(transport);
~~~



### 2. 响应式客户端连接请求
这是一个基于webclient的非官方驱动程序。它使用 Elasticsearch 核心项目提供的请求/响应对象。调用直接在响应式堆栈上运行，而不是将异步（线程池绑定）响应包装为响应式类型。ReactiveElasticsearchClientWebClient

~~~
@Configuration
public class ReactiveRestClientConfig extends AbstractReactiveElasticsearchConfiguration {

    @Override
    @Bean
    public ReactiveElasticsearchClient reactiveElasticsearchClient() {
        final ClientConfiguration clientConfiguration = ClientConfiguration.builder() 
            .connectedTo("localhost:9200") //
            .build();
        return ReactiveRestClients.create(clientConfiguration);

    }
}
// ...

Mono<IndexResponse> response = client.index(request ->

  request.index("spring-data")
    .id(randomID())
    .source(singletonMap("feature", "reactive-client"));
);
~~~


官方样例代码及具体使用参考：
https://github.com/elastic/elasticsearch-java/tree/8.2/java-client/src/test/java/co/elastic/clients/documentation
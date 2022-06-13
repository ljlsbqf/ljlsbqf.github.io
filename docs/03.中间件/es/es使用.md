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
https://blog.csdn.net/UbuntuTouch/article/details/123839857
### 1. java客户端连接：

1. java类客户端(API client classes): These provide strongly typed data structures and methods for Elasticsearch APIs. Since the Elasticsearch API is large, it is structured in feature groups (also called “namespaces”), each having its own client class. Elasticsearch core features are implemented in the ElasticsearchClient class.
2. json对象映射（A JSON object mapper）. This maps your application classes to JSON and seamlessly integrates them with the API client.
3. 数据传输层实现(A transport layer implementation). This is where all HTTP request handling takes place.

连接样例代码：
~~~
 private String esname = "name";
    private String espwd = "pwd";

    private CertsEnum certs = CertsEnum.P12;

    private String hostname = "ip";
    private String schema = "https";

    private Integer port =9200;

    enum CertsEnum{
        P12("iL1f6g72QVGlTA_Ov2m6pA","D:\\certs\\http.p12"),
        CA(null,"D:\\certs\\http_ca.crt");
        private String keyStorePass;
        private String path;

        CertsEnum(String keyStorePass,String path){
            this.keyStorePass = keyStorePass;
            this.path = path;
        }

    }


    public SSLContext initSSLContext(CertsEnum certsEnum ){
        Path trustStorePath = null;
        SSLContext sslContext = null;
        KeyStore trustStore = null;
        try{
            trustStorePath = Paths.get(certsEnum.path);
            switch (certsEnum){
                case P12:
                    String keyStorePass=certsEnum.keyStorePass;
                    trustStore = KeyStore.getInstance("pkcs12");
                    try (InputStream is = Files.newInputStream(trustStorePath)) {
                        trustStore.load(is, keyStorePass.toCharArray());
                    }

                    break;
                case CA:
                    CertificateFactory factory = CertificateFactory.getInstance("X.509");
                    trustStore = KeyStore.getInstance("pkcs12");
                    try (InputStream is = Files.newInputStream(trustStorePath)) {
                        Certificate trustedCa = factory.generateCertificate(is);
                        trustStore.load(null,null );
                        trustStore.setCertificateEntry("ca", trustedCa);
                    }

                    break;
            }
            SSLContextBuilder sslBuilder = SSLContexts.custom().loadTrustMaterial(trustStore, null);
            sslContext = sslBuilder.build();

        }catch (Exception e){
            log.error("证书信息错误",e);
            throw new RuntimeException("证书信息错误");
        }

        return sslContext;
    }
    @SneakyThrows
    @Bean
    @ConditionalOnMissingBean(ElasticsearchClient.class)
    public ElasticsearchClient elasticsearchClient(){

        CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY,new UsernamePasswordCredentials(esname, espwd));

        //tag::create-client
        // Create the low-level client
        final SSLContext finalSslContext = initSSLContext(certs);
        RestClient restClient = RestClient.builder(
                new HttpHost(hostname, port,schema)).setHttpClientConfigCallback(httpClientBuilder -> httpClientBuilder
                .setSSLContext(finalSslContext)
                .setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE)
                .setDefaultCredentialsProvider(credentialsProvider)
        ).build();

        // Create the transport with a Jackson mapper
        ElasticsearchTransport transport = new RestClientTransport(
                restClient, new JacksonJsonpMapper());

        // And create the API client
        ElasticsearchClient client = new ElasticsearchClient(transport);
        return client;
    } private String esname = "elastic";
    private String espwd = "elasticdev";

    private CertsEnum certs = CertsEnum.P12;

    private String hostname = "120.46.142.51";
    private String schema = "https";

    private Integer port =9200;

    enum CertsEnum{
        P12("iL1f6g72QVGlTA_Ov2m6pA","D:\\certs\\http.p12"),
        CA(null,"D:\\certs\\http_ca.crt");
        private String keyStorePass;
        private String path;

        CertsEnum(String keyStorePass,String path){
            this.keyStorePass = keyStorePass;
            this.path = path;
        }

    }


    public SSLContext initSSLContext(CertsEnum certsEnum ){
        Path trustStorePath = null;
        SSLContext sslContext = null;
        KeyStore trustStore = null;
        try{
            trustStorePath = Paths.get(certsEnum.path);
            switch (certsEnum){
                case P12:
                    String keyStorePass=certsEnum.keyStorePass;
                    trustStore = KeyStore.getInstance("pkcs12");
                    try (InputStream is = Files.newInputStream(trustStorePath)) {
                        trustStore.load(is, keyStorePass.toCharArray());
                    }

                    break;
                case CA:
                    CertificateFactory factory = CertificateFactory.getInstance("X.509");
                    trustStore = KeyStore.getInstance("pkcs12");
                    try (InputStream is = Files.newInputStream(trustStorePath)) {
                        Certificate trustedCa = factory.generateCertificate(is);
                        trustStore.load(null,null );
                        trustStore.setCertificateEntry("ca", trustedCa);
                    }

                    break;
            }
            SSLContextBuilder sslBuilder = SSLContexts.custom().loadTrustMaterial(trustStore, null);
            sslContext = sslBuilder.build();

        }catch (Exception e){
            log.error("证书信息错误",e);
            throw new RuntimeException("证书信息错误");
        }

        return sslContext;
    }
    @SneakyThrows
    @Bean
    @ConditionalOnMissingBean(ElasticsearchClient.class)
    public ElasticsearchClient elasticsearchClient(){

        CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY,new UsernamePasswordCredentials(esname, espwd));

        //tag::create-client
        // Create the low-level client
        final SSLContext finalSslContext = initSSLContext(certs);
        RestClient restClient = RestClient.builder(
                new HttpHost(hostname, port,schema)).setHttpClientConfigCallback(httpClientBuilder -> httpClientBuilder
                .setSSLContext(finalSslContext)
                .setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE)
                .setDefaultCredentialsProvider(credentialsProvider)
        ).build();

        // Create the transport with a Jackson mapper
        ElasticsearchTransport transport = new RestClientTransport(
                restClient, new JacksonJsonpMapper());

        // And create the API client
        ElasticsearchClient client = new ElasticsearchClient(transport);
        return client;
    }
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


### 官方样例代码及具体使用参考：
~~~
https://github.com/elastic/elasticsearch-java/tree/8.2/java-client/src/test/java/co/elastic/clients/documentation
https://blog.csdn.net/weixin_45203607/article/details/124332531
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

es8推出了多条件的聚合查询，但是，java api好像没提供
具体查看：https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-multi-terms-aggregation.html

~~~


### es汇聚功能
~~~
https://help.aliyun.com/document_detail/162577.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/rollup-getting-started.html

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


~~~ es的类型和映射
参考：https://www.elastic.co/guide/cn/elasticsearch/guide/current/mapping.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/release-highlights.html



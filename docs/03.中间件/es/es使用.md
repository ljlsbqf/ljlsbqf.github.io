---
title: es8使用
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
### 1. es8 java客户端连接：

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

### es7为啥移除type
~~~
https://blog.csdn.net/qq_29860591/article/details/109340346
https://www.cnblogs.com/miracle-luna/p/10998670.html
https://segmentfault.com/a/1190000040330218
Elasticsearch：index   -->  type     -->   doc   -->  field
MySQL:          数据库  -->   数据表 -->    行     -->  列

因为 Elasticsearch 设计初期，是直接查考了关系型数据库的设计模式，存在了 type（数据表）的概念。
但是，其搜索引擎是基于 Lucene 的，这种 “基因”决定了 type 是多余的。 Lucene 的全文检索功能之所以快，是因为 倒序索引 的存在。
而这种 倒序索引 的生成是基于 index 的，而并非 type。多个type 反而会减慢搜索的速度。
为了保持 Elasticsearch “一切为了搜索” 的宗旨，适当的做些改变（去除 type）也是无可厚非的，也是值得的。
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

es8推出了多条件的聚合查询
MultiTermsAggregation支持排序,如果不用排序可 using nested terms aggregation or composite aggregations
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

es8多条件聚合
curl --cacert /opt/elasticsearch/config/certs/http_ca.crt -u elastic https://localhost:9200/student/_search -H 'Content-Type:application/json;charset=utf-8'  -X POST -d '
{
	"aggregations": {
		"schoolAndSexAgg": {
			"multi_terms": {
				"terms": [{
					"field": "schoolName.keyword"
				}, {
					"field": "sex"
				}]
			}
		}
	},
	"query": {
		"bool": {
			"filter": [{
				"range": {
					"joinDate": {
						"from": "2000-08-02 15:30:45",
						"to": "2023-12-02 15:30:45",
						"format": "yyyy-MM-dd HH:mm:ss"
					}
				}
			}],
			"must": [{
				"multi_match": {
					"fields": ["schoolName", "userName.first"],
					"query": "中"
				}
			}]
		}
	}
}'

~~~

### es的类型和映射
~~~ 
参考：https://www.elastic.co/guide/cn/elasticsearch/guide/current/mapping.html
https://www.elastic.co/guide/en/elasticsearch/reference/current/release-highlights.html

~~~

### es查询类型
~~~
参考:https://blog.csdn.net/weixin_44688301/article/details/115916547
https://blog.csdn.net/z8756413/article/details/85068970

query：侧重在文档匹配度上，并返回匹配度计算_score，
filter：侧重在返回结果和查询条件的相关性上,适用于精确匹配，比如时间范围
term:代表完全匹配，即不进行分词器分析，文档中必须包含整个搜索的词汇
match:查询的时候,es会根据你给定的字段提供合适的分析器,而term查询不会有分析器分析的过程，match查询相当于模糊匹配,只包含其中一部分关键词就行

~~~

### es倒排序
参考:https://www.jianshu.com/p/ce6e87e4022e
~~~
正排索引：文档ID到文档内容和单词的关联
倒排索引：单词到文档ID的关系
备注：ES对文档每个字段都有自己的倒排索引，可以指定某些字段不做索引，这样可以节省存储空间，缺点是这个字段无法被搜索。

倒排索引不可变性
倒排索引采用Immutable Design，一旦生成，不可更改。

优点
（1）无需考虑并发写文件的问题，避免了锁机制带来的性能问题
（2）一旦读入内核的文件系统缓存，便留在那里。只要文件系统存有足够大的空间。大部分请求就会直接请求内存，不会命中磁盘，提升了很大的性能
缺点
不可变性也带来了另一个挑战，如果需要让一个新的文档可以被索引，需要重建整个索引。

~~~

### es分片和副本
参考：https://blog.csdn.net/WGBLW/article/details/105482541
https://juejin.cn/post/6844903862067789838
~~~
分片（shard）
当有大量的文档时，由于内存的限制、磁盘处理能力不足、无法足够快的响应客户端的请求等，一个节点可能不够。这种情况下，数据可以分为较小的分片。每个分片放到不同的服务器上。
当你查询的索引分布在多个分片上时，ES会把查询发送给每个相关的分片，并将结果组合在一起，而应用程序并不知道分片的存在。即：这个过程对用户来说是透明的。

副本（Replia）
为提高查询吞吐量或实现高可用性，可以使用分片副本。
副本是一个分片的精确复制，每个分片可以有零个或多个副本。ES中可以有许多相同的分片，其中之一被选择更改索引操作，这种特殊的分片称为主分片。
当主分片丢失时，如：该分片所在的数据不可用时，集群将副本提升为新的主分片。

分片与副本的区别在于：
当你分片设置为5，数据量为30G时，es会自动帮我们把数据均衡地分配到5个分片上，即每个分片大概有6G数据，当你查询数据时，ES会把查询发送给每个相关的分片，并将结果组合在一起。
而副本，就是对分布在5个分片的数据进行复制。因为分片是把数据进行分割而已，数据依然只有一份，这样的目的是保障查询的高效性，副本则是多复制几份分片的数据，这样的目的是保障数据的高可靠性，防止数据丢失。

~~~ 



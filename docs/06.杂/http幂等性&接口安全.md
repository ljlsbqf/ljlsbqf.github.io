---
title: http幂等性&接口安全
date: 2022-06-21 15:10:20
permalink: /pages/3c474c/
categories:
  - 杂
tags:
  - 
---

### 幂等性定义

HTTP方法的幂等性是指一次和多次请求某一个资源应该具有同样的副作用。幂等性属于语义范畴，正如编译器只能帮助检查语法错误一样，
HTTP规范也没有办法通过消息格式等语法手段来定义它，这可能是它不太受到重视的原因之一。
但实际上，幂等性是分布式系统设计中十分重要的概念，而HTTP的分布式本质也决定了它在HTTP中具有重要地位。

### http的幂等性

HTTP协议本身是一种面向资源的应用层协议，但对HTTP协议的使用实际上存在着两种不同的方式：一种是RESTful的，
它把HTTP当成应用层协议，比较忠实地遵守了HTTP协议的各种规定；另一种是SOA的，它并没有完全把HTTP当成应用层协议，
而是把HTTP协议作为了传输层协议，然后在HTTP之上建立了自己的应用层协议。
本文所讨论的HTTP幂等性主要针对RESTful风格的，不过正如上一节所看到的那样，幂等性并不属于特定的协议，它是分布式系统的一种特性；
所以，不论是SOA还是RESTful的Web API设计都应该考虑幂等性。

下面将介绍HTTP GET、DELETE、PUT、POST四种主要方法的语义和幂等性。

HTTP GET方法用于获取资源，不应有副作用，所以是幂等的。比如：GET http://www.bank.com/account/123456，不会改变资源的状态，
不论调用一次还是N次都没有副作用。请注意，这里强调的是一次和N次具有相同的副作用，而不是每次GET的结果相同。
GET http://www.news.com/latest-news这个HTTP请求可能会每次得到不同的结果，但它本身并没有产生任何副作用，因而是满足幂等性的。

HTTP DELETE方法用于删除资源，有副作用，但它应该满足幂等性。比如：DELETE http://www.forum.com/article/4231，
调用一次和N次对系统产生的副作用是相同的，即删掉id为4231的帖子；因此，调用者可以多次调用或刷新页面而不必担心引起错误。

比较容易混淆的是HTTP POST和PUT。POST和PUT的区别容易被简单地误认为“POST表示创建资源，PUT表示更新资源”；
而实际上，二者均可用于创建资源，更为本质的差别是在幂等性方面。

POST所对应的URI并非创建的资源本身，而是资源的接收者。比如：POST http://www.forum.com/articles的语义是在http://www.forum.com/articles下创建一篇帖子，
HTTP响应中应包含帖子的创建状态以及帖子的URI。两次相同的POST请求会在服务器端创建两份资源，它们具有不同的URI；所以，POST方法不具备幂等性。

而PUT所对应的URI是要创建或更新的资源本身。比如：PUT http://www.forum/articles/4231的语义是创建或更新ID为4231的帖子。
对同一URI进行多次PUT的副作用和一次PUT是相同的；因此，PUT方法具有幂等性。

参考：
https://stackoverflow.com/questions/630453/what-is-the-difference-between-post-and-put-in-http

https://www.rfc-editor.org/rfc/rfc2616#section-9.5

https://www.rfc-editor.org/rfc/rfc2616#section-9.6

### 接口安全
在官方http协议定义中，仅 get和head操作是被定义为安全的。其它方法都是不安全的实现。但是无法排除一些特殊操作导致比如get请求操作的不安全性。
具体使用，需要用户进行业务上的判断。

参考：https://www.rfc-editor.org/rfc/rfc2616#section-9.1
### 总结

如果要追根溯源，幂等性是数学中的一个概念，表达的是N次变换与1次变换的结果相同。因此在接口设计和业务实现上需要考虑各种业务请求的合理性，而不是局限于字面上的意义。

参考：https://www.cnblogs.com/weidagang2046/archive/2011/06/04/idempotence.html




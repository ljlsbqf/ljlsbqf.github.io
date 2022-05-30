---
title: 10、AbstractQueuedSynchronizer
date: 2022-05-30 23:55:40
permalink: /pages/f95237/
categories:
  - java
  - juc
tags:
  - 
---
参考：https://www.cnblogs.com/shoshana-kong/p/10831502.html

https://www.javazhiyin.com/66571.htm

https://cloud.tencent.com/developer/article/1187386


### clh队列
JUC中的Lock中最核心的类AQS,其中AQS使用到了CLH队列的变种，CLH是一种基于单向链表(隐式创建)的高性能、公平的自旋锁，申请加锁的线程只需要在其前驱节点的本地变量上自旋，从而极大地减少了不必要的处理器缓存同步的次数，降低了总线和内存的开销。


https://mp.weixin.qq.com/s?__biz=MzUyNzgyNzAwNg==&mid=2247483885&idx=1&sn=8fe2bf133cbc7932def11e407e76a783&scene=21#wechat_redirect
---
title: redis
date: 2022-06-15 16:31:21
permalink: /pages/0a8d0b/
categories:
  - 中间件
  - redis
tags:
  - 
---
### redis官方文档
https://redis.io/docs/
中文官网：redis.cn
狂神说笔记：https://blog.csdn.net/DDDDeng_/article/details/108118544

1. redis 持久化：rdb aof 概念
~~~
rdb：内存快照
aof：将写操作记录下来，通过执行这些命令恢复数据
~~~
2. redis-benchmarks 进行性能测试
3. redis单线程：基于内存操作，cpu不是redis的瓶颈，瓶颈在于内存和网络带宽
4. redis快速的原因：
5. redis数据类型：
~~~
String：最基本的数据类型，string 类型的值最大能存储 512MB

list：按照插入顺序排序。可以添加一个元素到列表的头部（左边）或者尾部（右边）

set： 是string 类型的无序集合，集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)

zset：zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。
不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。
zset的成员是唯一的,但分数(score)却可以重复。

hash：是一个 string 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。

~~~
6. redis事务
~~~
redis事务没有隔离机制的概念：所有命令在事务中，并没有直接被执行，只有发起执行命令的时候才会被执行：exec

开启事务multi
----各种命令
执行事务exec

取消事务：discard
~~~

7. redis实现乐观锁：使用watch进行监控
加锁 unwatch
解锁 watch

8. springboot2.x后将 jedis替换成letture
~~~
jedis：采用直连，多线程操作不安全，如果要避免不安全，要用jedis pool 连接池！像BIO模式
letture:采用netty,多实例可以在多个线程中进行共享，不存在线程不安全的情况，可以减少线程数量，更像NIO模式
~~~
9. 主从复制：最低配1主2从，主节点写，从节点复制




---
title: 15、ForkJoinPool
date: 2022-05-30 23:55:40
permalink: /pages/150c60/
categories:
  - java
  - juc
tags:
  - 
---
### 说明
>1、ForkJoinPool线程池最大的特点就是分叉(fork)合并(join)，将一个大任务拆分成多个小任务，并行执行，再结合工作窃取模式(worksteal)提高整体的执行效率，充分利用CPU资源。
2、适合执行计算密集型且可进行拆分任务并汇总结果(类似MapReduce)的任务，执行这种任务可以充分利用多核处理器优势提高任务处理速度，实际上ForkJoinPool内部的工作窃取队列的高性能(远高于普通线程池的BlockingQueue)也决定其适用于执行大量的简短的小任务

### 1.类继承关系
```
graph LR
ExecutorService-->Executor
AbstractExecutorService-->ExecutorService
ThreadPoolExecutor-->AbstractExecutorService
ForkJoinPool-->AbstractExecutorService
```

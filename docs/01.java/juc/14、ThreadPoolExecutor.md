---
title: 14、ThreadPoolExecutor
date: 2022-05-30 23:55:40
permalink: /pages/52e06b/
categories:
  - java
  - juc
tags:
  - 
---


### Executor

> executor接口定义了一个提交Runnable对象的接口,用于实现多线程任务的执行

### Executors

> Executors是一个工具类，定义了一些创建固定线程的方法,内部实现使用ThreadPoolExecutor


### 类继承关系
```
graph LR
ExecutorService-->Executor
AbstractExecutorService-->ExecutorService
ThreadPoolExecutor-->AbstractExecutorService
ForkJoinPool-->AbstractExecutorService
```


#### 1. 方法
方法名 | 说明
---|---
newFixedThreadPool(int nThreads, ThreadFactory threadFactory)  | 创建固定数目线程
newWorkStealingPool(int parallelism) | 创建使用ForkJoinPool实现的抢占式线程
newSingleThreadExecutor() | 创建只有一个线程的线程池
newCachedThreadPool(ThreadFactory threadFactory) | 创建无界线程池，池中的线程数可为Integer.MAX_VALUE
newSingleThreadScheduledExecutor() | 创建一个可延迟或定时执行的线程池
newScheduledThreadPool(int corePoolSize, ThreadFactory threadFactory)  | 创建可延迟或定时执行的线程池


#### 1.1 newSingleThreadScheduledExecutor
~~~
ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();
        executorService.schedule(()->{
            System.out.println("延迟1秒执行");
        },1, TimeUnit.SECONDS);
        //执行线程池关闭
executorService.shutdown();
System.out.println("判断线程池是否已经关闭:"+executorService.isShutdown());

executorService.scheduleAtFixedRate(()->{
            System.out.println("定时1秒执行一次");
        },0,1, TimeUnit.SECONDS);
~~~

#### 1.2 newWorkStealingPool
https://blog.csdn.net/winterking3/article/details/115917125

> newWorkStealingPool 是Java8添加的线程池。和别的4种不同，它用的是ForkJoinPool。
使用ForkJoinPool的好处是，把1个任务拆分成多个“小任务”，把这些“小任务”分发到多个线程上执行。这些“小任务”都执行完成后，再将结果合并。
之前的线程池中，多个线程共有一个阻塞队列，而newWorkStealingPool 中每一个线程都有一个自己的队列。
当线程发现自己的队列没有任务了，就会到别的线程的队列里获取任务执行。可以简单理解为”窃取“。
一般是自己的本地队列采取LIFO(后进先出)，窃取时采用FIFO(先进先出)，一个从头开始执行，一个从尾部开始执行，由于偷取的动作十分快速，会大量降低这种冲突，也是一种优化方式。
~~~
ExecutorService executorService = Executors.newWorkStealingPool(2);
        System.out.println(Runtime.getRuntime().availableProcessors());
        for(int i=0;i<100;i++){
            executorService.submit(new RunnableTest(""+i));
        }
        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        executorService.shutdown();
~~~


### executorService的shutdown和shutdownnow方法

shutdown 会使 ExecutorService 不再接受新的任务，但是已经 submit 的任务会继续执行
shutdownNow 会做同样的事，并且会通过中断( interrupt )相关线程来尝试取消已提交的任务，如果提交的任务忽略这个中断( interruption )，那么shutdownNow 方法的表现将和 shutdown 一致。


### ArrayBlockingQueue LinkedBlockingQueue SynchronousQueue
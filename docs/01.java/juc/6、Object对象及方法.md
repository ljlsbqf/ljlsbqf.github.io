---
title: 6、Object对象及方法
date: 2022-05-30 23:55:40
permalink: /pages/4960ef/
categories:
  - java
  - juc
tags:
  - 
---

## 1. 描述
> Java Object 类是所有类的父类，也就是说 Java 的所有类都继承了 Object，子类可以使用 Object 的所有方法。日常我们创建java类，隐式继承了Object类，当然也可以显示指明


## 2. 方法信息

方法 | 描述
---|---
protected Object clone() | 创建并返回一个对象的拷贝
boolean equals(Object obj) | 比较
protected void finalize() | 当 GC (垃圾回收器)确定不存在对该对象的有更多引用时，由对象的垃圾回收器调用此方法。
Class<?> getClass() | 获取对象的运行时对象的类
int hashCode() | 获取对象的 hash 值
String toString() | 返回对象的字符串表示形式
void notify() | 唤醒在该对象上等待的某个线程
void notifyAll() | 唤醒在该对象上等待的所有线程
void wait() | 让当前线程进入等待状态。直到其他线程调用此对象的 notify() 方法或 notifyAll() 方法。
void wait(long timeout) | 让当前线程处于等待(阻塞)状态，直到其他线程调用此对象的 notify() 方法或 notifyAll() 方法，或者超过参数设置的timeout超时时间。
void wait(long timeout, int nanos) | 与 wait(long timeout) 方法类似，多了一个 nanos 参数，这个参数表示额外时间（以纳秒为单位，范围是 0-999999）。 所以超时的时间还需要加上 nanos 纳秒。。


### 3. waiting() notify() notifyAll()
~~~
Object wait() 方法让当前线程进入等待状态。直到其他线程调用此对象的 notify() 方法或 notifyAll() 方法。
当前线程必须是此对象的监视器所有者，否则还是会发生 IllegalMonitorStateException 异常。
如果当前线程在等待之前或在等待时被任何线程中断，则会抛出 InterruptedException 异常。
~~~

~~~
Object notify() 方法用于唤醒一个在此对象监视器上等待的线程。
如果所有的线程都在此对象上等待，那么只会选择一个线程，选择是任意性的，并在对实现做出决定时发生。
一个线程在对象监视器上等待可以调用 wait() 方法。
notify() 方法只能被作为此对象监视器的所有者的线程来调用。
一个线程要想成为对象监视器的所有者，可以使用以下 3 种方法：
执行对象的同步实例方法
使用 synchronized 内置锁
对于 Class 类型的对象，执行同步静态方法
一次只能有一个线程拥有对象的监视器。
如果当前线程不是此对象监视器的所有者的话会抛出 IllegalMonitorStateException 异常。

Object notifyAll() 方法用于唤醒在该对象上等待的所有线程。
notifyAll() 方法跟 notify() 方法一样，区别在于 notifyAll() 方法唤醒在此对象监视器上等待的所有线程，notify() 方法是一个线程。
如果当前线程不是对象监视器的所有者，那么调用 notifyAll() 方法同样会发生 IllegalMonitorStateException 异常。
~~~


### 4.等待/通知机制
~~~
1、一个线程修改了一个对象的值，而另一个线程感知到了变化，然后进行相应的操作，整个过程开始于一个线程，而最终执行又是另一个线程。前者是生产者，后者就是消费者，这种模式隔离了“做什么”（what）和“怎么做”（How），在功能层面上实现了解耦，体系结构上具备了良好的伸缩性.

2、简单的方式是使用while(flag)不停判断，但是这样子增加了cpu使用，如果增加线程休眠时间又导致通知的时效性

3、通过内置的等待/通知机制能够很好地解决这个矛盾并实现。使用object对象的wait()和notify()方法可以很好实现。
4、等待/通知机制，是指一个线程A调用了对象O的wait()方法进入等待状态，而另一个线程B调用了对象O的notify()或者notifyAll()方法，线程A收到通知后从对象O的wait()方法返回，进而执行后续操作。上述两个线程通过对象O来完成交互，而对象上的wait()和notify/notifyAll()的关系就如同开关信号一样，用来完成等待方和通知方之间的交互工作。

~~~

---
title: 2、Semaphore
date: 2022-05-30 23:55:40
permalink: /pages/4d922c/
categories:
  - java
  - juc
tags:
  - 
---
# Semaphore: 
计数信号量： 从概念上讲，信号量保持一组许可。主要作用限制线程的并发访问的数量，主要通过参数permits的大小控制执行的并发线程的数量

## 1. 方法

有参构造函数主要有2个，
参数为：int permits 和 boolen fair
~~~
/**
 * Creates a {@code Semaphore} with the given number of
 * permits and nonfair fairness setting.
 *
 * @param permits the initial number of permits available.
 *        This value may be negative, in which case releases
 *        must occur before any acquires will be granted.
 */
public Semaphore(int permits) {
    sync = new NonfairSync(permits);
}

/**
 * Creates a {@code Semaphore} with the given number of
 * permits and the given fairness setting.
 *
 * @param permits the initial number of permits available.
 *        This value may be negative, in which case releases
 *        must occur before any acquires will be granted.
 * @param fair {@code true} if this semaphore will guarantee
 *        first-in first-out granting of permits under contention,
 *        else {@code false}
 */
public Semaphore(int permits, boolean fair) {
    sync = fair ? new FairSync(permits) : new NonfairSync(permits);
}

~~~

### 主要方法：

acquire(): 获取(消费)permits
当线程未获取到permits，当前请求将进入阻塞状态，继续申请获取permits

tryAcquire():尝试获取permits
如果设置公平参数为true，正常情况当前线程排在队尾，等待资源。但是使用tryAcquire()方法将打破平衡，让当前线程不断尝试获取permits

release():释放(增加)permits
当调用一次acquire()方法后，相应的需调用一次release()方法释放被消费的permits



## 2. fair公平参数定义

公平的概念是：获取锁的顺序同线程启动顺序相关，反之即无关。
当permits>1，多个线程将按照线程的启动顺序从semaphore获取permits并执行。除非调用tryacquire()方法打破这个平衡；
当permits=1，公平参数就没啥意义了。


semaphore类实现了2个内部类NofairSync和FairSync，继承至内部抽象静态类Sync ，继承至AQS抽象类实现
~~~
/**
 * Synchronization implementation for semaphore.  Uses AQS state
 * to represent permits. Subclassed into fair and nonfair
 * versions.
 */
abstract static class Sync extends AbstractQueuedSynchronizer {
    private static final long serialVersionUID = 1192457210091910933L;

    Sync(int permits) {
        setState(permits);
    }

    final int getPermits() {
        return getState();
    }
    
    //原子操作判断状态不断获取资源，执行cas操作
    final int nonfairTryAcquireShared(int acquires) {
        for (;;) {
            int available = getState();
            int remaining = available - acquires;
            if (remaining < 0 ||
                compareAndSetState(available, remaining))
                return remaining;
        }
    }

    protected final boolean tryReleaseShared(int releases) {
        for (;;) {
            int current = getState();
            int next = current + releases;
            if (next < current) // overflow
                throw new Error("Maximum permit count exceeded");
            if (compareAndSetState(current, next))
                return true;
        }
    }

    final void reducePermits(int reductions) {
        for (;;) {
            int current = getState();
            int next = current - reductions;
            if (next > current) // underflow
                throw new Error("Permit count underflow");
            if (compareAndSetState(current, next))
                return;
        }
    }

    final int drainPermits() {
        for (;;) {
            int current = getState();
            if (current == 0 || compareAndSetState(current, 0))
                return current;
        }
    }
}

~~~



#### FairSync 类
~~~
static final class FairSync extends Sync {
    private static final long serialVersionUID = 2014338818796000944L;

    FairSync(int permits) {
        super(permits);
    }
    //公平方法处理：是否有线程在处理，有的话，则cas自旋排到队尾
    protected int tryAcquireShared(int acquires) {
        for (;;) {
            if (hasQueuedPredecessors())
                return -1;
            int available = getState();
            int remaining = available - acquires;
            if (remaining < 0 ||
                compareAndSetState(available, remaining))
                return remaining;
        }
    }
}
~~~


#### NofairSync:
~~~
static final class NonfairSync extends Sync {
    private static final long serialVersionUID = -2694183684443567898L;

    NonfairSync(int permits) {
        super(permits);
    }
    //调用Sync的nonfairTryAcquireShared()获取资源
    protected int tryAcquireShared(int acquires) {
        return nonfairTryAcquireShared(acquires);
    }
}

~~~



## 3.线程安全：
当permits>1时，semaphore并不能保证线程安全，不能保证获取permits的线程操作安全。因此在操作时，需要加锁或者使用synchronized关键字
示例代码1：
~~~
private final static ReentrantLock reentrantLock = new ReentrantLock();
private final static Condition condition = reentrantLock.newCondition();
public T acquire(){
    T t = null;
    try {
        semaphore.acquire();
        reentrantLock.lock();
        while (list.size()==0){
            condition.await();
        }
        t = list.remove(0);
    }catch (InterruptedException e){
        e.printStackTrace();
    }finally {
    reentrantLock.unlock();
}
    return t;
}
~~~

示例代码2:
~~~
public synchronized DBConn getData(){
    DBConn t = null;
    while (list.size()==0){
        return acquire();
    }
    t = list.remove(0);
    return t;
}
public DBConn acquire(){
    DBConn t = null;
    try {
        semaphore.acquire();
        t= getData();
    }catch (InterruptedException e){
        e.printStackTrace();
    }
    return t;
}

~~~




4、总结

1、semaphore的实现依赖AQS，后续仔细了解AQS
2、semaphore不能保证线程安全，所以在获取permits后，后续对数据的操作需要加锁或者使用synchronized 关键字

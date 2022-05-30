---
title: 11、ThreadLocal如何存储信息
date: 2022-05-30 23:55:40
permalink: /pages/0af6c1/
categories:
  - java
  - juc
tags:
  - 
---
[参考](https://blog.csdn.net/qq_41257358/article/details/122352397)


### 介绍：
ThreadLocal是一个保存线程局部变量的工具，每一个线程都可以独立地通过ThreadLocal保存与获取自己的变量，而该变量不会受其它线程的影响。

### 原理：
ThreadLocal维护了一个本地的ThreadLocalMap类型数据，以当前线程为key存储数据。


```
 public void set(T value) {
        Thread t = Thread.currentThread();
        //使用当前线程作为key
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            map.set(this, value);
        } else {
            createMap(t, value);
        }
    }
    
 public T get() {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            ThreadLocalMap.Entry e = map.getEntry(this);
            if (e != null) {
                @SuppressWarnings("unchecked")
                T result = (T)e.value;
                return result;
            }
        }
        return setInitialValue();
    }
```

### ThreadLocalMap底层实现：
每个线程中都持有了一个ThreadLocalMap用来存放线程局部变量，而ThreadLocalMap是为了实现ThreadLocal功能特意编写的map类，为什么不用现成的HashMap呢？
1.  ThreadLocalMap中Entry的key设置为了弱引用。防止key的内存泄漏

```
static class ThreadLocalMap {
    //创建弱引用类型
    static class Entry extends WeakReference<ThreadLocal<?>> {
        /** The value associated with this ThreadLocal. */
        Object value;

        Entry(ThreadLocal<?> k, Object v) {
            super(k);
            value = v;
        }
    }
}
```

- 在使用ThreadLocal的get和set方法时，会进行判断，在碰上key为null的情况会执行replaceStaleEntry（）方法清理调entry。而对于线程复用导致的内存泄漏问题，则可以在执行完毕后调用threadLocal.remove（）方法手动清理。
---
title: 17、atomic原子操作类
date: 2022-05-30 23:55:40
permalink: /pages/34d058/
categories:
  - java
  - juc
tags:
  - 
---
参考：https://blog.csdn.net/weixin_42039228/article/details/123184198
### 原理
Atomic原子类：内部实现维护了一个volatile类型的value，并利用自旋和CAS来保证线程安全的

1、AtomicLong、AtomicInteger、AtomicBoolean：这些类实现了++，–，+delta的原子操作。
2、AtomicReference：作用是引用类型的原子修改，保证引用的修改不会出现线程问题。
并且通过AtomicStampedReference解决了ABA问题。

3、AtomicIntegerArray、AtomicLongArray、AtomicReferenceArray：
这个就是数组类型，和单独的对象操作基本一致，只不过在设置的时候需要填入下标罢了。

4、AtomicIntegerFieldUpdater、AtomicReferenceFieldUpdater、AtomicLongFieldUpdater：
AtomicReference是修改引用，而AtomicReferenceFieldUpdater这三个类是用来修改实例对象中的属性的值的。
AtomicIntegerFieldUpdater、AtomicLongFieldUpdater是AtomicReferenceFieldUpdater的一个特殊例子，是用来专门分别修改int和long属性的变量的。


### 原子类和 volatile 的使用场景
volatile 和原子类的使用场景是不一样的，如果我们有一个可见性问题，那么可以使用 volatile 关键字，但如果我们的问题是一个组合操作，需要用同步来解决原子性问题的话，那么可以使用原子变量，而不能使用 volatile 关键字。

通常情况下，volatile可以用来修饰boolean类型的标记位，因为对于标记位来讲，直接的赋值操作本身就是具备原子性的，再加上volatile保证了可见性，那么就是线程安全的了。

而对于会被多个线程同时操作的计数器Counter的场景，这种场景的一个典型特点就是，它不仅仅是一个简单的赋值操作，而是需要先读取当前的值，然后在此基础上进行一定的修改，再把它给赋值回去。这样一来，我们的volatile就不足以保证这种情况的线程安全了。我们需要使用原子类来保证线程安全。


```
    private volatile int countSafe = 0;
    private volatile int countUnSafe = 0;
    private AtomicInteger countAutomic = new AtomicInteger(0);
    //1、volatile 无法保证++操作的线程安全，因为一次++操作，实际是发生了一次读和一次写。并且他依赖于旧值进行更新
    //2、如果非要如此使用，可以增加关键字synchronized。 利用volatile保证读取操作的可见性；利用synchronized保证复合操作的原子性
    //3、建议使用原子类实现++，–，+delta等线程安全操作
    public synchronized  void getIncrementSafe(){
        for(int i=0;i<1000;i++){
            countSafe++;
        }
    }
    public void getIncrementUnSafe(){
        for(int i=0;i<1000;i++){
            countUnSafe++;
        }
    }
    public void getIncrementAtomic(){
        for(int i=0;i<1000;i++){
            countAutomic.getAndIncrement();
            //countAutomic.getAndAdd(1);
        }
    }
```

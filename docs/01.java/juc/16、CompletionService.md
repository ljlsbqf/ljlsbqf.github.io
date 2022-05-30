---
title: 16、CompletionService
date: 2022-05-30 23:55:40
permalink: /pages/0b91af/
categories:
  - java
  - juc
tags:
  - 
---
### 说明

> 接口CompletionService可以一边产生新的异步任务，一边处理已完成任务的返回值。这样可以让任务执行和任务返回分开处理。使用submit提交任务，使用take获取已经执行完成的任务，并按照任务执行完成的时间处理返回值。
可以避免FutureTask类阻塞的问题，可更加有效地处理Future的返回值，也就是哪个任务先执行完，CompletionService就先获取哪个任务的返回值优先处理。


```
public class MyCallable implements Callable<String> {

    private String name;

    public MyCallable(String name){
        this.name = name;
    }

    public Long getSleep(){
        Random r = new Random();
        int max=3000;
        int min=10;
        return Long.valueOf(r.nextInt(max)%(max-min+1) + min);
    }
    @Override
    public String call() throws Exception {
        TimeUnit.MILLISECONDS.sleep(getSleep());
        return Thread.currentThread().getName()+"---return:"+name;
    }
}

public class CompletionServiceTest {

    public static void main(String[] args) {

        //1、默认创建线程数:corePoolSize；最大创建线程数:maximumPoolSize
        //2、待执行任务submit()后，将存入队列等待执行
        //3、当待执行任务数超过队列大小,无法存入，则会根据maximumPoolSize参数继续创建新的线程，至只线程池中存活线程达到最大值：maximumPoolSize
        //4、当前配置的是有界队列，当队列达到最大值，将抛出异常：java.util.concurrent.RejectedExecutionException
        LinkedBlockingDeque queue = new LinkedBlockingDeque<>(5);
        ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(3,10,5, TimeUnit.SECONDS,queue);
        CompletionService completionService = new ExecutorCompletionService(threadPoolExecutor);

        List<Callable> callableList = new ArrayList<Callable>();
        int size =10;
        for(int i=0;i<size;i++){
            MyCallable myCallable = new MyCallable("call"+i);
            callableList.add(myCallable);
            System.out.println("添加任务"+"call"+i);
            completionService.submit(myCallable);
        }

        for(int i=0;i<size;i++){
            try {
                System.out.println("获取执行结果："+completionService.take().get());
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            } catch (ExecutionException e) {
                throw new RuntimeException(e);
            }
        }

        threadPoolExecutor.shutdown();

    }
}

```

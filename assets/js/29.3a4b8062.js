(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{534:function(s,e,t){"use strict";t.r(e);var a=t(30),n=Object(a.a)({},(function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h3",{attrs:{id:"redis官方文档"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#redis官方文档"}},[s._v("#")]),s._v(" redis官方文档")]),s._v(" "),t("p",[s._v("https://redis.io/docs/\n中文官网：redis.cn\n狂神说笔记：https://blog.csdn.net/DDDDeng_/article/details/108118544")]),s._v(" "),t("ol",[t("li",[s._v("redis 持久化：rdb aof 概念")])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("rdb：内存快照\naof：将写操作记录下来，通过执行这些命令恢复数据\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("ol",{attrs:{start:"2"}},[t("li",[s._v("redis-benchmarks 进行性能测试")]),s._v(" "),t("li",[s._v("redis单线程：基于内存操作，cpu不是redis的瓶颈，瓶颈在于内存和网络带宽")]),s._v(" "),t("li",[s._v("redis快速的原因：")]),s._v(" "),t("li",[s._v("redis数据类型：\nString、list、set、hash、zset")]),s._v(" "),t("li",[s._v("redis事务")])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("redis事务没有隔离机制的概念：所有命令在事务中，并没有直接被执行，只有发起执行命令的时候才会被执行：exec\n\n开启事务multi\n----各种命令\n执行事务exec\n\n取消事务：discard\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("ol",{attrs:{start:"7"}},[t("li",[t("p",[s._v("redis实现乐观锁：使用watch进行监控\n加锁 unwatch\n解锁 watch")])]),s._v(" "),t("li",[t("p",[s._v("springboot2.x后将 jedis替换成letture")])])]),s._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[s._v("jedis：采用直连，多线程操作不安全，如果要避免不安全，要用jedis pool 连接池！像BIO模式\nletture:采用netty,多实例可以在多个线程中进行共享，不存在线程不安全的情况，可以减少线程数量，更像NIO模式\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("ol",{attrs:{start:"9"}},[t("li",[s._v("主从复制：最低配1主2从，主节点写，从节点复制")])])])}),[],!1,null,null,null);e.default=n.exports}}]);
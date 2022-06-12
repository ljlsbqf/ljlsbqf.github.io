(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{532:function(e,s,r){"use strict";r.r(s);var n=r(31),t=Object(n.a)({},(function(){var e=this,s=e.$createElement,r=e._self._c||s;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h3",{attrs:{id:"说明"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#说明"}},[e._v("#")]),e._v(" 说明")]),e._v(" "),r("h4",{attrs:{id:"etc-resolv-conf-resolver类库使用的配置文件-每当一个程序需要通过域名来访问internet上面的其它主机时-需要利用该类库将域名转换成对应的ip-然后才可进行访问"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#etc-resolv-conf-resolver类库使用的配置文件-每当一个程序需要通过域名来访问internet上面的其它主机时-需要利用该类库将域名转换成对应的ip-然后才可进行访问"}},[e._v("#")]),e._v(" /etc/resolv.conf：resolver类库使用的配置文件，每当一个程序需要通过域名来访问internet上面的其它主机时，需要利用该类库将域名转换成对应的IP，然后才可进行访问.")]),e._v(" "),r("p",[e._v("它是DNS客户机配置文件，用于设置DNS服务器的IP地址及DNS域名，还包含了主机的域名搜索顺序。该文件是由域名解析器（resolver，一个根据主机名解析IP地址的库）使用的配置文件。它的格式很简单，每行以一个关键字开头，后接一个或多个由空格隔开的参数。")]),e._v(" "),r("p",[e._v("resolv.conf的关键字主要有四个，分别是：")]),e._v(" "),r("div",{staticClass:"language- line-numbers-mode"},[r("pre",{pre:!0,attrs:{class:"language-text"}},[r("code",[e._v("nameserver //定义DNS服务器的IP地址 \ndomain //定义本地域名 \nsearch //定义域名的搜索列表 \nsortlist //对返回的域名进行排序\n")])]),e._v(" "),r("div",{staticClass:"line-numbers-wrapper"},[r("span",{staticClass:"line-number"},[e._v("1")]),r("br"),r("span",{staticClass:"line-number"},[e._v("2")]),r("br"),r("span",{staticClass:"line-number"},[e._v("3")]),r("br"),r("span",{staticClass:"line-number"},[e._v("4")]),r("br")])]),r("p",[e._v("最主要是nameserver关键字，如果没指定nameserver就找不到DNS服务器，其它关键字是可选的。")]),e._v(" "),r("ol",[r("li",[r("p",[e._v("nameserver表示解析域名时使用该地址指定的主机为域名服务器。其中域名服务器是按照文件中出现的顺序来查询的,且只有当第一个nameserver没有反应时才查询下面的nameserver。")])]),e._v(" "),r("li",[r("p",[e._v("domain\n声明主机的域名。很多程序用到它，如邮件系统；当为没有域名的主机进行DNS查询时，也要用到。如果没有域名，主机名将被使用，删除所有在第一个点( .)前面的内容。")])]),e._v(" "),r("li",[r("p",[e._v("3.search\n它的多个参数指明域名查询顺序。当要查询没有域名的主机，主机将在由search声明的域中分别查找。\ndomain和search不能共存；如果同时存在，后面出现的将会被使用。")])]),e._v(" "),r("li",[r("p",[e._v("sortlist\n允许将得到域名结果进行特定的排序。它的参数为网络/掩码对，允许任意的排列顺序。")])])])])}),[],!1,null,null,null);s.default=t.exports}}]);
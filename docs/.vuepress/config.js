"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 提示：如您想使用JS版本的配置文件可参考：https://github.com/xugaoyi/vuepress-theme-vdoing/tree/a2f03e993dd2f2a3afdc57cf72adfc6f1b6b0c32/docs/.vuepress
 */
var path_1 = require("path");
var config_1 = require("vuepress/config");
var dayjs_1 = require("dayjs");
var baiduCode_1 = require("./config/baiduCode"); // 百度统计hm码
var htmlModules_1 = require("./config/htmlModules"); // 自定义插入的html块
exports.default = (0, config_1.defineConfig4CustomTheme)({
    //theme: 'vdoing', // 使用npm包主题
    theme: (0, path_1.resolve)(__dirname, '../../vdoing'),
    locales: {
        '/': {
            lang: 'zh-CN',
            title: "闲人路过",
            description: '个人学习网站。',
        }
    },
    // base: '/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/",（否则页面将失去样式等文件）
    // 主题配置
    themeConfig: {
        // 导航配置
        nav: [
            { text: '首页', link: '/' },
            /*{
              text: 'java',
              link: '/java/', //目录页链接，此处link是vdoing主题新增的配置项，有二级导航时，可以点击一级导航跳到目录页
              items: [
                // 说明：以下所有link的值只是在相应md文件头部定义的永久链接（不是什么特殊编码）。另外，注意结尾是有斜杠的
                {
                  text: 'juc',
                  items: [
                    { text: 'Semaphore', link: '/pages/4d922c/' },
                  ],
                }
      
              ],
            },
            {
              text: 'spring',
              link: '/spring/',
              items: [
                { text: 'HTML', link: '/pages/8309a5b876fc95e3/' },
              ],
            },
            { text: '中间件', link: '/plugin/' },
            { text: 'AIOPS', link: '/aiops/' },
            { text: '关于', link: '/about/' }*/
        ],
        sidebarDepth: 2,
        logo: '',
        repo: 'https://github.com/ljlsbqf',
        searchMaxSuggestions: 10,
        lastUpdated: '上次更新',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '编辑',
        //*** 以下是Vdoing主题相关配置，文档：https://doc.xugaoyi.com/pages/a20ce8/ ***//
        // category: false, // 是否打开分类功能，默认true
        // tag: false, // 是否打开标签功能，默认true
        // archive: false, // 是否打开归档功能，默认true
        // categoryText: '随笔', // 碎片化文章（_posts文件夹的文章）预设生成的分类值，默认'随笔'
        bodyBgImg: [
            '/img/bg.jpeg'
            //'https://cdn.jsdelivr.net/gh/xugaoyi/image_store/blog/20200507175845.jpeg',
        ],
        bodyBgImgOpacity: 0.5,
        titleBadge: false,
        //titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
        //   '图标地址1',
        //   '图标地址2'
        // ],
        // contentBgStyle: 1, // 文章内容块的背景风格，默认无. 1 方格 | 2 横线 | 3 竖线 | 4 左斜线 | 5 右斜线 | 6 点状
        // updateBar: { // 最近更新栏
        //   showToArticle: false, // 显示到文章页底部，默认true
        //   moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
        // },
        // rightMenuBar: false, // 是否显示右侧文章大纲栏，默认true (屏宽小于1300px下无论如何都不显示)
        // sidebarOpen: false, // 初始状态是否打开左侧边栏，默认true
        // pageButton: false, // 是否显示快捷翻页按钮，默认true
        // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | <自定义>    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页
        sidebar: 'structuring',
        // 文章默认的作者信息，(可在md文件中单独配置此信息) string | {name: string, link?: string}
        author: {
            name: 'ljlsbqf',
            link: 'https://github.com/ljlsbqf', // 可选的
        },
        // 博主信息 (显示在首页侧边栏)
        blogger: {
            avatar: '',
            name: '',
            slogan: '',
        },
        // 社交图标 (显示于博主信息栏和页脚栏。内置图标：https://doc.xugaoyi.com/pages/a20ce8/#social)
        social: {
            // iconfontCssFile: '//at.alicdn.com/t/xxx.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自己添加。阿里图片库：https://www.iconfont.cn/
            icons: [
                {
                    iconClass: 'icon-youjian',
                    title: 'qq',
                    content: '634607608'
                },
                {
                    iconClass: 'icon-github',
                    title: 'GitHub',
                    link: 'https://github.com/ljlsbqf'
                }
            ],
        },
        // 页脚信息
        footer: {
            createYear: 2022,
            copyrightInfo: '<a href="https://github.com/xugaoyi/vuepress-theme-vdoing/blob/master/LICENSE" target="_blank">MIT License</a>', // 博客版权信息，支持a标签或换行标签</br>
        },
        // 自定义hmtl(广告)模块
        htmlModules: htmlModules_1.default
    },
    // 注入到页面<head>中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
    head: [
        ['link', { rel: 'icon', href: '' }],
        [
            'meta',
            {
                name: 'keywords',
                content: 'web,java,中间件,技术文档,学习,git,github,markdown,sql',
            },
        ],
        ['meta', { name: 'baidu-site-verification', content: '7F55weZDDc' }],
        ['meta', { name: 'theme-color', content: '#11a8cd' }], // 移动浏览器主题颜色
        // [
        //   'script',
        //   {
        //     'data-ad-client': 'ca-pub-7828333725993554',
        //     async: 'async',
        //     src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
        //   },
        // ], // 网站关联Google AdSense 与 html格式广告支持（你可以去掉）
    ],
    // 插件配置
    plugins: {
        // 导入本地插件（供学习参考）
        // [resolve(__dirname, './plugins/love-me')]: { // 鼠标点击爱心特效
        //   color: '#11a8cd', // 爱心颜色，默认随机色
        //   excludeClassName: 'theme-vdoing-content' // 要排除元素的class, 默认空''
        // },
        // 百度自动推送
        'vuepress-plugin-baidu-autopush': {},
        // 百度统计
        'vuepress-plugin-baidu-tongji': {
            hm: baiduCode_1.default,
        },
        // 全文搜索
        'fulltext-search': {},
        // 可以添加第三方搜索链接的搜索框（继承原官方搜索框的配置参数）
        // 'thirdparty-search': {
        //   thirdparty: [
        //     {
        //       title: '在MDN中搜索',
        //       frontUrl: 'https://developer.mozilla.org/zh-CN/search?q=', // 搜索链接的前面部分
        //       behindUrl: '', // 搜索链接的后面部分，可选，默认 ''
        //     },
        //     {
        //       title: '在Runoob中搜索',
        //       frontUrl: 'https://www.runoob.com/?s=',
        //     },
        //     {
        //       title: '在Vue API中搜索',
        //       frontUrl: 'https://cn.vuejs.org/v2/api/#',
        //     },
        //     {
        //       title: '在Bing中搜索',
        //       frontUrl: 'https://cn.bing.com/search?q=',
        //     },
        //     {
        //       title: '通过百度搜索本站的',
        //       frontUrl: 'https://www.baidu.com/s?wd=site%3Axugaoyi.com%20',
        //     },
        //   ],
        // },
        // 代码块复制按钮
        'one-click-copy': {
            copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
            copyMessage: '复制成功',
            duration: 1000,
            showInMobile: false, // whether to display on the mobile side, default: false.
        },
        // DEMO演示模块, API: https://github.com/xiguaxigua/vuepress-plugin-demo-block
        'demo-block': {
            settings: {
                // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
                // cssLib: ['http://xxx'], // 在线示例中的css依赖
                // vue: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
                jsfiddle: false,
                codepen: true,
                horizontal: false, // 是否展示为横向样式
            },
        },
        // 放大图片
        'vuepress-plugin-zooming': {
            selector: '.theme-vdoing-content img:not(.no-zoom)',
            options: {
                bgColor: 'rgba(0,0,0,0.6)',
            },
        },
        // 评论区
        'vuepress-plugin-comment': {
            choosen: 'gitalk',
            options: {
                clientID: 'a6e1355287947096b88b',
                clientSecret: 'f0e77d070fabfcd5af95bebb82b2d574d7248d71',
                repo: 'blog-gitalk-comment',
                owner: 'ljlsbqf',
                admin: ['ljlsbqf'],
                // distractionFreeMode: true,
                pagerDirection: 'last',
                id: '<%- (frontmatter.permalink || frontmatter.to.path).slice(-16) %>',
                title: '「评论」<%- frontmatter.title %>',
                labels: ['Gitalk', 'Comment'],
                body: '页面：<%- window.location.origin + (frontmatter.to.path || window.location.pathname) %>', // GitHub issue 的内容
            },
        },
        // "上次更新"的时间格式
        '@vuepress/last-updated': {
            transformer: function (timestamp, lang) {
                return (0, dayjs_1.default)(timestamp).format('YYYY/MM/DD, HH:mm:ss');
            },
        },
    },
    markdown: {
        lineNumbers: true
    },
    // 监听文件变化并重新构建
    extraWatchFiles: [
        '.vuepress/config.ts'
    ]
});

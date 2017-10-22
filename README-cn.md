## hexo-theme-skapp

### 项目简介

项目为 hexo 主题 skapp。

附上预览地址： [demo][demo]

#### 主题效果
    
![screenshot][screenshot]

#### 语言支持

主题默认支持 `zh-cn`、`en` 两种语言，有需要其它语言的可以自行扩展，将相应语言写成 yml 文件放置于主题下的 `languages` 文件下。

### 使用方式

基本的 hexo 博客搭建请参照 [hexo官网][hexo]，配置完 hexo 项目后再进行下面的操作。

> 以下操作均默认当前路径为 hexo 博客项目目录，请自行进入项目中。

使用 git 将主题 clone 至你的 hexo 博客项目下的 themes 文件夹下

``` shell
cd themes && git clone https://github.com/Mrminfive/hexo-theme-skapp.git
```

clone 完后将根目录下的 `_config.yml` 文件中的 `theme` 字段设置为 `hexo-theme-skapp`，同时安装对应 node 依赖：

``` shell
npm install --save hexo-autoprefixer hexo-filter-cleanup hexo-generator-feed hexo-generator-sitemap hexo-renderer-sass hexo-renderer-swig mamboer/lunr.js moment node-sass object-assign
```

**注意**：如果安装失败可尝试用 cnpm 进行安装。另外，由于使用 `nodejieba` 分词库，所以 windows 下用户应提前安装好相应编译环境。操作如下：

``` shell
npm install -g windows-build-tools
npm install -g node-gyp
```

(确认 `PATH` 中 `python` 路径是否设置。)

安装完依赖后将以下配置写入根目录下的 `_config.yml` 文件中

``` yml
# Sass
node_sass:
  outputStyle: nested
  precision: 5
  sourceComments: false

# Autoprefixer
autoprefixer:
  exclude:
    - '*.min.css'
  browsers:
    - 'last 2 versions'

# Lunr
lunr:
  field: all
  fulltext: false
  path: assets/lunr/

# filter_cleanup
hfc_useref:
  enable: true
  concat: true

hfc_html:
  enable: true
  exclude:

hfc_css:
  enable: true
  exclude: 
    - '*.min.css'

hfc_js:
  enable: true
  mangle: true
  exclude: 
    - '*.min.js'

hfc_img:
  enable: false
  interlaced: false
  multipass: false
  optimizationLevel: 2
  pngquant: false
  progressive: false

hfc_favicons:
  enable: false
  src: img/blog-logo.png
  target: img/
  icons:
    android: true
    appleIcon: true
    appleStartup: false
    coast: false
    favicons: true
    firefox: false
    opengraph: false
    windows: true
    yandex: false
```

ok，走到这一步主题编译需要的环境配置完了，可以使用 `hexo s --debug` 进行本地预览了。

*注：*如果样式生成失败，请用 `hexo clean` 清除下缓存后在 `hexo s --debug`。

### 主题配置

#### 设置语言

编辑根 `_config.yml` 文件，将 `language` 设置为你想要的语言：

``` yml
language: zh-cn
```

目前主题支持的语言如下：

| 语言     |  代码  |
| ------- | ----- |
| English | en |
| 简体中文 | zh-cn |

#### 设置菜单

编辑根 `_config.yml` 文件，将 `menu` 设置为如下：

``` yml
menu:
  home: / 
  archive: /archives
  about: /about
```

主题默认的菜单项有：

| 键值 | 设定值 | 显示文本（简体中文）|
| --- | ----- | ---------------- |
| home | home: / | 首页 |
| archive | archive: /archives | 归档 |
| about | about: /about | 关于 |
| search | search: /search | 搜索页 | 

其中 `about`、`search` 与主题内置的 `404` 页面一样需要手动创建，创建方式如下：

创建 about 页面：

``` shell
hexo new page about
```

然后编辑 source 文件夹下的 about 文件夹中的 index.md 文件：

``` md
---
title: 关于
date: 2017-07-29 00:50:51
type: about
layout: about
---

...(以下内容将渲染在关于页面中)
```

创建 search 页面：

``` shell
hexo new page search
```

然后编辑 source 文件夹下的 about 文件夹中的 index.md 文件：

``` md
---
title: 关于
date: 2017-07-29 00:50:51
type: search
layout: search
---
```

404 页面则直接在 source 目录下创建 404.md 文件，文件内容如下：

``` md
---
title: 404 Page Not Found
date: 2017-08-04 23:36:59
type: error
layout: error
---
```

#### 博客信息配置

以下配置均在根 `_config.yml` 中：

``` yml
# Site
# 博客的标题
title: MINFIVE

# banner显示的子标题
subtitle: MINFIVE BLOG

# banner显示的简短介绍
subtitle_desc: 日常学习与兴趣交流

# seo关键字
keywords: minfive, minfive blog, 前端博客, 前端, 程序员, 前端开发, 全栈开发, node.js, javascript

# 博客介绍（同时用于seo）
description: 日常学习与兴趣交流的个人博客

# 个人介绍
introduction: 不思量，自难忘！

# 博客的favicon图标，支持本地及在线两种方式，本地请将图标放置于 themes/hexo-theme-skapp/source/img 目录下
favicon_ico: http://oo12ugek5.bkt.clouddn.com/blog/images/favicon.ico

# 博客的左上角logo图标，支持本地及在线两种方式
logo: http://oo12ugek5.bkt.clouddn.com/images/logo-text-white.png

# 头像/二维码（用于显示在底部）二选一
avatar: http://oo12ugek5.bkt.clouddn.com/images/qrcode.png
# qrcode: http://oo12ugek5.bkt.clouddn.com/images/qrcode.png

# 文章的默认封面
default_cover: http://oo12ugek5.bkt.clouddn.com/images/default_cover.png

# header 的背景图
header_cover: http://oo12ugek5.bkt.clouddn.com/blog/images/banner-bg.jpg

# 404 页面的背景图
error_page_bg: http://oo12ugek5.bkt.clouddn.com/blog/images/dogs.jpg

# 页面加载loading图标
loader_img: http://oo12ugek5.bkt.clouddn.com/blog/images/loader.gif

# 站长信息
author:
  name: minfive
  link: https://github.com/Mrminfive
# 用于页面 footer 的站长信息
about:
  info: 本站是基于 Hexo 搭建的静态资源博客，主要用于分享日常学习、生活及工作的一些心得总结，欢迎点击右下角订阅 rss。
  address: Guangzhou, Guangdong Province, China
  email: chenxiaowu1994@outlook.com
```

#### 联系方式

在 `/source/_data` 目录下创建 `contact.yml` 文件将在页面底部生成相应的标签链接，如：

![contact-img][contact-img]

配置内容如下：

``` yml
- title: github
  icon: icon-github
  link: https://github.com/Mrminfive
- title: email
  icon: icon-email
  link: mailto:chenxiaowu1994@outlook.com
- title: rss
  icon: icon-rss
  link: /atom.xml
```

其中 `title` 表示链接的 `title` 值，`icon` 表示使用css图标，`link` 表示跳转的链接。

`icon` 仅支持如下值：

* `icon-email`: 邮箱
* `icon-rss`: rss
* `icon-in`: linkedin
* `icon-twitter`: twitter
* `icon-facebook`: facebook
* `icon-github`: github
* `icon-zhihu`: 知乎
* `icon-douban`: 豆瓣
* `icon-weibo`: 微博

#### 外部链接

在 `source/_data` 目录下创建 `footer_link.yml` 文件将在页面底部生成相应的外部链接列表，如：

![footer-link][footer-link]

配置内容如下：

```
friend_links:
  - name: hexo-theme-skapp
    desc: hexo-theme-skapp
    link: https://github.com/Mrminfive/hexo-theme-skapp

build_tools:
  - name: Hexo
    desc: Blog Framework
    link: https://hexo.io/
```

其中 `name` 表示链接的显示值，`desc` 表示链接的 `title` 值，`link` 表示跳转的链接。

该文件中的每一个数组代表一列链接，数据的key 值代表对应该列的标题，如：`friend_links` 对应 `友情链接`，同时允许设置多列链接，只需要在 `hexo-theme-skapp/languages` 下的语言配置中设置好相应的对照值即可。


#### 个性化配置

主题使用 sass 预编译样式，笔者将所有基本样式参数封装在 `hexo-theme-skapp/source/scss` 下的 `_theme.scss` 文件文件中：

``` scss
/**
 * blog theme 
 */

$main-color: #19abd6                                !default;
$main-color--hover: lighten($main-color, 10%)       !default;

$font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,"PingFang SC","Lantinghei SC","Microsoft Yahei","Hiragino Sans GB","Microsoft Sans Serif","WenQuanYi Micro Hei",sans           !default;

$main-fc: #666                                      !default;
$main-fs: 14px                                      !default;
$main-lh: 1.7                                       !default;

$title-fc: #242f35                                  !default;

$hint-fc: #19abd6                                   !default;

$bgc--main: #fff                                    !default;
$bgc--bottom: #2d383e                               !default;
$bgc--footer: #242f35                               !default;

$border-c: #d8e5f3                                  !default;

$transition: .3s                                    !default;

$mq-desktop--wide: 1280px                           !default;
$mq-desktop: 980px                                  !default;
$mq-mobile: 736px                                   !default;

$pad: 15px                                          !default;

$z-index--bottom: 1                                 !default;
$z-index--center: 50                                !default;
$z-index--top: 100                                  !default;
```

有兴趣的可以自行修改。

#### 第三方服务

##### 统计

###### 百度统计

主题已集成百度统计，使用百度统计仅需要获取百度统计的脚本id并将其配置到根 `_config.yml` 中：

``` yml
# Baidu statistic
baidu_statistic: e3267498201dfa9699a5c509424709d6
```

###### 谷歌统计

主题已集成百度统计，使用谷歌统计仅需要获取谷歌统计的脚本id并将其配置到根 `_config.yml` 中：

``` yml
# Google statistic
google_statistic: UA-108468870-1
```

##### 不蒜子统计

主题使用不蒜了统计文章pv，默认不开启，可在根 `_config.yml` 配置开启:

``` yml
# Busuanzi
busuanzi: true
```

##### 内容搜索

主题使用 lunr 进行站内检索，暂不支持配置。

##### rss

将如下代码写入根 `_config.yml` 中：

``` yml
# Feed Atom
feed:
  type: atom
  path: atom.xml
  limit: 20

# Sitemap
sitemap:
  path: sitemap.xml
```

##### 评论系统

###### gitalk

主题集成 [gitalk][gitalk] 作为评论功能。开启评论功能需要注册 Github Application，具体请参照 [gitalk文档][gitalk doc]，申请完后在根 `_config.yml` 配置：

``` yml
# Gitalk
gitTalk:
  clientId: ***
  clientSecret: ***
  repo: ***
  owner: ***
  admin: 
    - ***
```

###### disqus

主题集成 [disqus][disqus] 作为评论功能。开启此评论功能请注册 Disqus 站点，具体参照官方指引，申请完成后在根 `_config.yml` 配置：

``` yml
# Disqus

disqus_shortname: ***
```

[demo]: http://blog.minfive.com/
[screenshot]: http://oo12ugek5.bkt.clouddn.com/blog/images/17-09-17/hexo-theme-skapp-screenshot.png
[hexo]: https://hexo.io/zh-cn/
[gitalk]: https://github.com/gitalk/gitalk
[gitalk doc]: https://github.com/gitalk/gitalk#usage
[contact-img]: http://oo12ugek5.bkt.clouddn.com/blog/images/17-09-17/hexo-theme-skapp-contact.png
[footer-link]: http://oo12ugek5.bkt.clouddn.com/blog/images/17-09-17/hexo-theme-skapp-footer.png
[disqus]: https://disqus.com/
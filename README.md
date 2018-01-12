## hexo-theme-skapp
- [中文文档](./README-cn.md)
### Project Introduction

This project is a hexo theme named skapp. 
[Demo](http://blog.minfive.com/)

#### theme effect
![](http://oo12ugek5.bkt.clouddn.com/blog/images/17-09-17/hexo-theme-skapp-screenshot.png)

#### language support
`skapp` supports `zh-cn` and `en` by default. If you need other languages, you can extend it by yourself(to put the language yml file into the `languages` folder under the `hexo-theme-skapp` directory).

### How to use
1. Follow the [hexo official document](https://hexo.io/) to build the basic blog.
>  the default path of the following operations is your hexo blog project directory, please enter the project.

2. use `git` to clone `hexo-theme-skapp` into the theme folder under your blog project directory.
```shell
cd theme
git clone https://github.com/Mrminfive/hexo-theme-skapp.git
```

3. To modify the root `_config.yml` and install node dependencies.
```shell
npm install --save hexo-autoprefixer hexo-filter-cleanup hexo-generator-feed hexo-generator-sitemap hexo-renderer-sass hexo-renderer-swig mamboer/lunr.js moment node-sass object-assign
```
**note**: If your OS is Windows, you may meet some problems when install the `mamboer/lunr.js`(because of the package`nodejieba`). To fix this problem, you should install `node-gyp`.
```shell
npm install -g windows-build-tools
npm install -g node-gyp
```

Then configure the root `_config.yml` file:
```yml
theme: hexo-theme-skapp
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
After finishing the configuration, you can preview your blog: `hexo s --debug`(If you meet the style problem, you can use the command `hexo clean` first).

### More Theme Configuration
#### set support language
To edit the root `_config.yml` file:
```yml
language: zh-cn
```
Now, skapp support two kinds of language:

| language|  code  |
| ------- | ----- |
| English | en |
| 简体中文 | zh-cn |

#### configure the menu
To edit the root `_config.yml` file and set the `menu` item：
``` yml
menu:
  home: / 
  archive: /archives
  about: /about
```

Default menu items：

| key | value | dispaly text|
| --- | ----- | ---------------- |
| home | home: / | home |
| archive | archive: /archives | archives |
| about | about: /about | about |
| search | search: /search | search | 

Then, you need create `about`,`search` and `404` page manually:
create the about page:
```shell
hexo new page about
```
edit the `index.md` file in the root `source/about` folder:

``` md
---
title: abbout
date: 2017-07-29 00:50:51
type: about
layout: about
---

...(the below content will be redenered in the about page)
```

create the search page：
``` shell
hexo new page search
```
edit the `index.md` file in the root `source/search` folder:
``` md
---
title: search
date: 2017-07-29 00:50:51
type: search
layout: search
---
```

create the 404 page:
create the `404.md` file in the source directory and edit this file:
``` md
---
title: 404 Page Not Found
date: 2017-08-04 23:36:59
type: error
layout: error
---
```

####  blog information configuration

to edit the root `_config.yml` file：
``` yml
# Site
# blog's title
title: MINFIVE

# subtitle in the banner header
subtitle: MINFIVE BLOG

# introduction  in the banner header
subtitle_desc: 日常学习与兴趣交流

# seo keyword
keywords: minfive, minfive blog, 前端博客, 前端, 程序员, 前端开发, 全栈开发, node.js, javascript

# blog description（for seo）
description: 日常学习与兴趣交流的个人博客

# self introduction
introduction: 不思量，自难忘！

# your blog favicon icon, support two ways: local and online. the local way need you to put the icon under  themes/hexo-theme-skapp/source/img directory
favicon_ico: http://oo12ugek5.bkt.clouddn.com/blog/images/favicon.ico

# blog logo icon in the upper left corner. support the local way and online way. 
logo: http://oo12ugek5.bkt.clouddn.com/images/logo-text-white.png

# avatar
avatar: http://oo12ugek5.bkt.clouddn.com/images/qrcode.png
# qrcode: http://oo12ugek5.bkt.clouddn.com/images/qrcode.png

# page default cover
default_cover: http://oo12ugek5.bkt.clouddn.com/images/default_cover.png

# header background picture
header_cover: http://oo12ugek5.bkt.clouddn.com/blog/images/banner-bg.jpg

# 404 page background picture
error_page_bg: http://oo12ugek5.bkt.clouddn.com/blog/images/dogs.jpg

# page loading icon
loader_img: http://oo12ugek5.bkt.clouddn.com/blog/images/loader.gif

# author information
author:
  name: minfive
  link: https://github.com/Mrminfive

# footer information
about:
  info: 本站是基于 Hexo 搭建的静态资源博客，主要用于分享日常学习、生活及工作的一些心得总结，欢迎点击右下角订阅 rss。
  address: Guangzhou, Guangdong Province, China
  email: chenxiaowu1994@outlook.com
```


#### contact information configuration
create `contact.yml` under the `/source/_data` (This configuration will create links in the page footer):

![contact-img](http://oo12ugek5.bkt.clouddn.com/blog/images/17-09-17/hexo-theme-skapp-contact.png)

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
`icon` only support these values：
* `icon-email`: email
* `icon-rss`: rss
* `icon-in`: linkedin
* `icon-twitter`: twitter
* `icon-facebook`: facebook
* `icon-github`: github
* `icon-zhihu`: zhihu
* `icon-douban`: douban
* `icon-weibo`: weibo
* `icon-telegram`: telegram

#### external link configuration
create `footer_link.yml` under the `source/_data` directory(This configuration will create links in the page footer):
![footer-link](http://oo12ugek5.bkt.clouddn.com/blog/images/17-09-17/hexo-theme-skapp-footer.png)

``` yml
friend_links:
  - name: hexo-theme-skapp
    desc: hexo-theme-skapp
    link: https://github.com/Mrminfive/hexo-theme-skapp

build_tools:
  - name: Hexo
    desc: Blog Framework
    link: https://hexo.io/
```
`name` means the link value, `desc` means the link `title` attribute value.
Each array in this file represents a list of link(e.g. friend_links). Skapp support multi-column links(you just need to edit your language configuration in the `hexo-theme-skapp/languages`).

#### personalized configuration
skapp uses `sass` precompiled style and packages all the baisc styles in the `_theme.scss` file under the `hexo-theme-skapp/source/scss` directory:
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

#### blog basic usage
To configure basic info  in your markdown blog file：
```
title: Hello World 
cover: http://oxnuwmm3w.bkt.clouddn.com/hello-world.jpeg
author: 
  nick: BruceYJ
  link: https://www.github.com/BruceYuj

# If the article is reproduced, you need to increase the article source
editor:
  name: Minfive
  link: https://www.github.com/Mrminfive

# post subtitle in your index page
subtitle: post introduction
```
`title` attribute is the blog's title. `cover` attribute is the blog's first picture and thumbnail. `author` attribute is the blog's author information and link.

#### third-part service

##### statistics
###### baidu statistics
skapp has integrated baidu statistics. You need to get the id and edit the root `_config.yml` file:
``` yml
# Baidu statistic
baidu_statistic: e3267498201dfa9699a5c509424709d6
```

###### google statistics
skapp has integrated google statistics. You need to get the id and edit the root `_config.yml` file:
``` yml
# Google statistic
google_statistic: UA-108468870-1
```
###### busuanzi statistics
skapp uses busuanzi to count page PV and closed by default. You can open this service by editing the `_config.yml` file:

``` yml
# Busuanzi
busuanzi: true
```

##### global search
skapp uses `lunr` to search in site and don't support configuration.

##### rss
to edit the root `_config.yml` file:
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

##### Comment system
###### gitalk 
skapp has integrated [gitalk](https://github.com/gitalk/gitalk).
If you want to use this comment function, you need to register the Github Application(follow the [gitalk document](https://github.com/gitalk/gitalk#usage)).
Then to edit the `_config.yml` configuration:
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

skapp has integrated[disqus](https://disqus.com/). If you want to use this comment function, you need to register Disqus(follow the official instruction).
Then to edit the `_config.yml` configuration:

``` yml
# Disqus

disqus_shortname: ***
```
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
<meta name="format-detection" content="telephone=no">
<meta name="author" content="{{ get_setting('author') }}" />
<meta name="designer" content="minfive" />
<meta name="keywords" content="{{ get_setting('keywords') }}"/>
<meta name="description" content="{{ get_setting('description') }}" />

<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telephone=yes" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="robots" content="all" />

<link rel="canonical" href="{{ url }}">

<link rel="icon" type="image/png" href="{{ get_setting('favicon_ico') }}" sizes="32x32">

{% if config.google_site_verification %}
  <meta name="google-site-verification" content="{{ config.google_site_verification }}" />
{% endif %}

{% if config.bing_site_verification %}
  <meta name="msvalidate.01" content="{{ config.bing_site_verification }}" />
{% endif %}

{% if config.yandex_site_verification %}
  <meta name="yandex-verification" content="{{ config.yandex_site_verification }}" />
{% endif %}


{% if config.baidu_site_verification %}
  <meta name="baidu-site-verification" content="{{ config.baidu_site_verification }}" />
{% endif %}


{% if config.qihu_site_verification %}
  <meta name="360-site-verification" content="{{ config.qihu_site_verification }}" />
{% endif %}


<!-- Prefetch -->
{% include './prefetch.swig' %}

<!-- CSS -->
{{ css('scss/base/index') }}

<!-- RSS -->
{{ feed_tag('atom.xml') }}

<!-- 统计 -->
{% include './analytics.swig' %}

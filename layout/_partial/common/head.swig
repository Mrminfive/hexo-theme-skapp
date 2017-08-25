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

<link rel="apple-touch-icon" sizes="57x57" href="{{ url_for('img/apple-touch-icon-57x57.png') }}">
<link rel="apple-touch-icon" sizes="114x114" href="{{ url_for('img/apple-touch-icon-114x114.png') }}">
<link rel="apple-touch-icon" sizes="72x72" href="{{ url_for('img/apple-touch-icon-72x72.png') }}">
<link rel="apple-touch-icon" sizes="144x144" href="{{ url_for('img/apple-touch-icon-144x144.png') }}">
<link rel="apple-touch-icon" sizes="60x60" href="{{ url_for('img/apple-touch-icon-60x60.png') }}">
<link rel="apple-touch-icon" sizes="120x120" href="{{ url_for('img/apple-touch-icon-120x120.png') }}">
<link rel="apple-touch-icon" sizes="76x76" href="{{ url_for('img/apple-touch-icon-76x76.png') }}">
<link rel="apple-touch-icon" sizes="152x152" href="{{ url_for('img/apple-touch-icon-152x152.png') }}">
<link rel="icon" type="image/png" href="{{ url_for('img/android-chrome-192x192.png') }}" sizes="192x192">
<link rel="icon" type="image/png" href="{{ url_for('img/android-chrome-144x144.png') }}" sizes="144x144">
<link rel="icon" type="image/png" href="{{ url_for('img/favicon-16x16.png') }}" sizes="16x16">
<link rel="icon" type="image/png" href="{{ url_for('img/favicon-32x32.png') }}" sizes="32x32">

<!-- Prefetch -->
{% include './prefetch.swig' %}

<!-- CSS -->
{{ css('scss/base/index') }}

<!-- RSS -->
{{ feed_tag('atom.xml') }}

<!-- 统计 -->
{% include './analytics.swig' %}
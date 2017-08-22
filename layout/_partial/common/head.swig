<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
<meta name="format-detection" content="telephone=no">
<meta name="author" content="{{ config.author|default(theme.author) }}" />
<meta name="designer" content="minfive" />
<meta name="keywords" content="{{ config.keywords|default(theme.keywords) }}"/>
<meta name="description" content="{{ config.description|default(theme.description) }}" />

<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telephone=yes" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="robots" content="all" />

<link rel="canonical" href="{{ url }}">

<link rel="icon" type="image/x-icon" href="{{ config.icon.16x16|default(theme.icon.16x16) }}" sizes="16x16">
<link rel="icon" type="image/x-icon" href="{{ config.icon.32x32|default(theme.icon.32x32) }}" sizes="32x32">
<link rel="icon" type="image/x-icon" href="{{ config.icon.48x48|default(theme.icon.48x48) }}" sizes="48x48">
<link rel="icon" type="image/x-icon" href="{{ config.icon.64x64|default(theme.icon.64x64) }}" sizes="64x64">
<link rel="icon" type="image/x-icon" href="{{ config.icon.128x128|default(theme.icon.128x128) }}" sizes="128x128">

<!-- Prefetch -->
{% include './prefetch.swig' %}

<!-- CSS -->
{{ css('sass/base/index') }}

<!-- RSS -->
{{ feed_tag('atom.xml') }}

<!-- 统计 -->
{% include './analytics.swig' %}
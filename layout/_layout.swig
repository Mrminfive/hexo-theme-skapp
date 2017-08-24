<!DOCTYPE html>
<html lang="{{ config.language|default(theme.language) }}">
<head>
    <meta charset="utf-8" />
    {% block title %}
    <title>{% if page.title %}{{ page.title }} | {% endif %}{{ config.subtitle|default(theme.subtitle) }}</title>
    {% endblock %}
    {% include './_partial/common/head.swig' %}
    
    {% block pageCss %}
    {% endblock %}
</head>
<body>
    {% block loader %}
        {% include './_partial/common/loader.swig' %}
    {% endblock %}
    
    {% block header %}
        {% include './_partial/common/header.swig' %}
    {% endblock %}

    {% block main %}
    {% endblock %}

    {% block footer %}
        {% include './_partial/common/footer.swig' %}
    {% endblock %}

    {% block backTop %}
        {% include './_partial/common/back-top.swig' %}
    {% endblock %}

    {% block pagejs %}
        <!-- build:js js/common.js -->
            <script type="text/javascript" src="js/common/utils.js"></script>
            <script type="text/javascript" src="js/common/pack.js"></script>
            <script type="text/javascript" src="js/common/animation.js"></script>
            <script type="text/javascript" src="js/layout/back-top.js"></script>
        <!-- endbuild -->
    {% endblock %}
</body>
</html>
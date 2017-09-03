{% extends '_layout.swig' %}

{% block pageCss %}
    {{ css('scss/views/page/category') }}
{% endblock %}

{% block header %}
    {% include './_partial/common/small-header.swig' %}
{% endblock %}

{% block main %}
    {% include './_partial/category/main.swig' %}
{% endblock %}
{% extends '_layout.swig' %}

{% block pageCss %}
    {{ css('scss/views/page/archive') }}
{% endblock %}

{% block header %}
    {% include './_partial/common/small-header.swig' %}
{% endblock %}

{% block main %}
    {% include './_partial/archive/main.swig' %}
{% endblock %}

{% extends '_layout.swig' %}

{% block pageCss %}
    {{ css('scss/views/page/error') }}
{% endblock %}

{% block header %}
    {% include './_partial/common/error-header.swig' %}
{% endblock %}

{% block main %}
    {% include './_partial/error/main.swig' %}
{% endblock %}

{% block footer %}
{% endblock %}

{% block backTop %}
{% endblock %}
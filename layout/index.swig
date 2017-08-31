{% extends '_layout.swig' %}

{% block pageCss %}
    {{ css('scss/views/page/index') }}
{% endblock %}

{% block main %}
    {% include './_partial/index/main.swig' %}
{% endblock %}
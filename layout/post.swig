{% extends '_layout.swig' %}

{% block pageCss %}
    {{ css('scss/views/page/post') }}
{% endblock %}

{% block main %}
    {% include './_partial/post/main.swig' %}
{% endblock %}
{% extends '_layout.swig' %}

{% block pageCss %}
    {{ css('scss/views/page/tag') }}
{% endblock %}

{% block header %}
    {% include './_partial/common/small-header.swig' %}
{% endblock %}

{% block main %}
    {% include './_partial/tag/main.swig' %}
{% endblock %}
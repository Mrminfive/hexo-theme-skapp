{% extends '_layout.swig' %}

{% block pageCss %}
    {{ css('scss/views/page/post') }}
{% endblock %}

{% block header %}
    {% include './_partial/common/small-header.swig' %}
{% endblock %}

{% block main %}
    {% include './_partial/post/main.swig' %}
{% endblock %}

{% block pagejs %}
    {{ js('js/page/post.js') }}
{% endblock %}

{% block other %}
    {% include './_partial/common/comment.swig' %}
    {% include './_partial/post/post-statistical.swig' %}
{% endblock %}
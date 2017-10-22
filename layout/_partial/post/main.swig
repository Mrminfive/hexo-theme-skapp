<main class="page__container page__main">
    <div class="page__content">
        {% include './content.swig' %}

        {% if page.comments && config.gitTalk %}
            <div id="comment-container"></div>
        {% endif %}
        {% if page.comments && config.disqus_shortname %}
            <div id="disqus_thread"></div>
        {% endif %}
    </div>

    {% include '../common/sidebar.swig' %}
</main>
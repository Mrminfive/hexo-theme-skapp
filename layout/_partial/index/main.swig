<main class="page__container page__main">
    <div class="page__content">
        <div class="page__posts clearfix">
            {% for post in page.posts %}
                {% if not post.draft %}
                    <div class="page__post">
                        {% include '../post/mini.swig' with { post: post } %}
                    </div>
                {% endif %}
            {% endfor %}
        </div>
    </div>

    {% include '../common/sidebar.swig' %}
</main>
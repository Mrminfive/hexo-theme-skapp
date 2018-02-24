
<main class="page__container page__main">
    <div class="page__content">
        {{ blog_archive_menu(page) }}

        <div class="page__posts clearfix">
            {% for post in blog_archive_post(page) %}
                <div class="page__post">
                    {% include '../post/mini.swig' with { post: post } %}
                </div>
            {% endfor %}
        </div>

        {% if page.base === config.archive_dir + '/' %}
            {{ archive_index_paginator(3) }}
        {% else %}
            {{ s_paginator(3) }}
        {% endif %}
    </div>

    {% include '../common/sidebar.swig' %}
</main>
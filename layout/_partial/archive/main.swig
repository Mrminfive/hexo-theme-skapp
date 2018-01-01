{% set mbArchives = blog_archives(page.posts) %}

<main class="page__container page__main">
    <div class="page__content">
        <nav id="mb-main-nav" class="mb-main__nav">
            <ul>
                {% for archive in mbArchives %}
                    <li class="nav__item {% if archive.index == 0 %}nav__item--selected{% endif %}" data-index="{{ archive.index }}">
                        {{ archive.year }} {{ __('other.year') }}
                    </li>
                {% endfor %}
            </ul>
        </nav>

        {% for archive in mbArchives %}
            <div class="page__posts clearfix {% if archive.index != 0 %}js-hidden{% endif %}">
                {% for post in archive.posts %}
                    <div class="page__post">
                        {% if not post.draft %}
                            {% include '../post/mini.swig' with { post: post } %}
                        {% endif %}
                    </div>
                {% endfor %}
            </div>
        {% endfor %}

        {{ s_paginator(3) }}
    </div>

    {% include '../common/sidebar.swig' %}
</main>
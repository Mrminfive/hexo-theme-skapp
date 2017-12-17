<article class="page__post">
    <div class="post__cover">
        <img src="{{ page.cover|default(get_setting('default_cover')) }}" alt="{{ page.title }}">
    </div>

    <header class="post__info">
        <h1 class="post__title">{{ page.title }}</h1>

        <div class="post__mark">
            <div class="mark__block">
                <i class="mark__icon iconfont icon-write"></i>
                <ul class="mark__list clearfix">
                    <li class="mark__item">
                        <a href="{{ url_for(page.author.link || '') }}">{{ page.author.nick|default(get_setting(author.name)) }}</a>
                    </li>
                </ul>
            </div>
            
            <div class="mark__block">
                <i class="mark__icon iconfont icon-time"></i>
                <ul class="mark__list clearfix">
                    <li class="mark__item"><span>{{ date(page.date) }}</span></li>
                </ul>
            </div>

            <div class="mark__block">
                <i class="mark__icon iconfont icon-tab"></i>
                <ul class="mark__list clearfix">
                    {% for tag in page.tags %}
                        <li class="mark__item">
                            <a href="{{ url_for(tag.path) }}">{{ titlecase(tag.name) }}</a>
                        </li>
                    {% endfor %}
                </ul>
            </div>

            {% if config.busuanzi %}
            <div class="mark__block">
                <i class="mark__icon iconfont icon-eye"></i>
                <ul class="mark__list clearfix">
                    <li id="busuanzi_container_page_pv" class="mark__item"><span id="busuanzi_value_page_pv"></span>{{ __('other.bout') }}</li>
                </ul>
            </div>
            {% endif %}
        </div>
    </header>

    <div class="post__content">
        {{ render(page.content) }}

        {% if page.editor %}
        <div class="post-announce">
            {{ __('copyright_statement.one') }}
            <a href="{{ page.editor.link }}">{{ page.editor.name }}</a> {{ __('copyright_statement.two') }}：{{ page.editor.name }}（<a href="{{ page.editor.link }}">{{ page.editor.link }}</a>）
        </div> 
        {% else %}
        <div class="post-announce">
            {{ __('copyright_statement.three') }}
            <a href="{{ config.url }}">{{ get_setting('title') }}</a>
            {{ __('copyright_statement.four') }}：{{ get_setting('title') }}（<a href="{{ config.url }}{{ url_for(page.path) }}">{{ config.url }}{{ url_for(page.path) }}</a>）
        </div>
        {% endif %}

        <div class="post__prevs">
            <div class="post__prev">
                {% if page.next %}
                <a href="{{ url_for(page.next.path) }}" title="{{ page.next.title }}"><i class="iconfont icon-prev"></i>{{ page.next.title }}</a>
                {% endif %}
            </div>
            <div class="post__prev post__prev--right">
                {% if page.prev %}
                <a href="{{ url_for(page.prev.path) }}" title="{{ page.prev.title }}">{{ page.prev.title }}<i class="iconfont icon-next"></i></a>
                {% endif %}
            </div>
        </div>
    </div>
</article>
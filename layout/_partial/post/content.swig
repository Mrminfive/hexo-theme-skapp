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
                    <li class="mark__item">{{ date(page.date) }}</li>
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
    </div>
</article>
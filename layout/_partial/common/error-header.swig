<!-- 页头 -->
<nav class="page__navbar">
    <div class="page__container navbar-container">
        <a class="page__logo" href="{{ url_for('/') }}" title="{{ get_setting('title') }}" alt="{{ get_setting('title') }}">
            <img src="{{ get_setting('logo') }}" alt="{{ get_setting('title') }}">
        </a>

        <nav class="page__nav">
            <ul class="nav__list clearfix">
                {% for item in get_setting('menu') %}
                    {% set name = __('menu.' + loop.key) %}
                    <li class="nav__item">
                        <a href="{{ item }}" alt="{{ name }}" title="{{ name }}">{{ name }}</a>
                    </li>
                {% endfor %}
            </ul>
        </nav>

        <button class="page__menu-btn" type="button">
            <i class="iconfont icon-menu"></i>
        </button>
    </div>
</nav>
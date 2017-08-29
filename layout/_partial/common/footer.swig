<footer class="page__footer">
    <section class="footer__top">
        <div class="page__container footer__container">
            
        </div>
    </section>
    <section class="footer__bottom">
        <div class="page__container footer__container">
            <p class="footer__copyright">©
                <a href="https://github.com/Mrminfive/hexo-theme-skapp" target="_blank">Skapp</a> 2017 powered by
                <a href="http://hexo.io/" target="_blank">Hexo</a>, made by 
                <a href="https://github.com/Mrminfive" target="_blank">minfive</a>.
            </p>
            <ul class="footer__social-network clearfix">
                {% for item in site.data.contact %}
                    <li class="social-network__item">
                        <a href="{{ item.link }}" target="_blank" title="{{ item.title }}">
                            <i class="iconfont {{ item.icon }}"></i>
                        </a>
                    </li>
                {% endfor %}
            </ul>
        </div>
    </section>
</footer>
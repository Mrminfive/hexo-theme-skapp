window.addEventListener('load', function() {
    (function() {
        var headerEle = document.getElementById('page-header');

        function toggleNavStyle() {
            var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

            headerEle.classList[ scrollTop > 30 ? 'add' : 'remove' ]('page__header--small');
        }

        document.addEventListener('scroll', toggleNavStyle);
    })();
    
    (function() {
        var 
            btn = document.querySelector('button.page__menu-btn'),
            menu = document.querySelector('nav.page__nav');

        var packMenu = new Pack(menu);

        packMenu.base('js-open').transfrom('page__nav--open');

        btn.addEventListener('click', function() {
            packMenu.toggle();
        });
    })();
});
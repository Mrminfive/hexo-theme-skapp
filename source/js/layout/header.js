window.addEventListener('load', function() {
    (function() {
        var headerEle = document.getElementById('page-header');

        function toggleNavStyle() {
            var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;

            headerEle.classList[ scrollTop > 30 ? 'add' : 'remove' ]('page__header--small');
        }

        headerEle && document.addEventListener('scroll', toggleNavStyle);
    })();
    
    (function() {
        var 
            btn = document.querySelector('button.page__menu-btn'),
            menu = document.querySelector('nav.page__nav');

        if (btn && menu) {
            var packMenu = new Pack(menu);

            packMenu.base('js-open').transfrom('page__nav--open');

            btn.addEventListener('click', function() {
                packMenu.toggle();
            });
        }
    })();
});
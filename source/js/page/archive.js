(function() {
    function arrayFrom(arr) {
        return Array.prototype.slice.call(arr);
    }

    var
        navs = arrayFrom(document.getElementById('mb-main-nav').querySelectorAll('.nav__item')),
        postBoxs = arrayFrom(document.querySelectorAll('.page__posts'));

    navs.forEach(function(nav) {
        nav.addEventListener('click', function(event) {
            var idx = Number(this.getAttribute('data-index'));

            if (this.classList.contains('nav__item--selected')) return;

            navs.forEach(function(item) { item.classList.remove('nav__item--selected') });
            postBoxs.forEach(function(postBox) { postBox.classList.add('js-hidden') });

            navs[idx].classList.add('nav__item--selected');
            postBoxs[idx].classList.remove('js-hidden');
            setTimeout(window._skappPostAnimation);
        })
    });
})();
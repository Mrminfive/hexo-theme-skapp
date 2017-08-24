// loading
window.addEventListener('load', function() {
    (function() {
        var
            page = document.getElementById('page'),
            loading = document.getElementById('page-loading');

        loading.classList.add('js-hidden');
        page.classList.remove('js-hidden');
    })()
});
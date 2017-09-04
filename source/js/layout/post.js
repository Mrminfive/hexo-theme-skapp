window.addEventListener('load', function() {
    function addListener(callback) {
        var 
            timer = null,
            requestAnimationFrame = window.requestAnimationFrame 
                || window.mozRequestAnimationFrame
                || window.webkitRequestAnimationFrame
                || window.msRequestAnimationFrame,
            cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

        function lintener() {
            cancelAnimationFrame(timer);

            timer = requestAnimationFrame(callback.bind(null, function() {
                document.removeEventListener('scroll', lintener);
            }));
        }

        document.addEventListener('scroll', lintener);

        lintener();
    }

    window._skappPostAnimation = function() {
        var posts = document.querySelectorAll('article.page__mini-article');
        
        posts.forEach(function(post) {
            var position = getPosition(post);

            var pack = new Pack(post);

            pack
                .base('js-ease-out-leave')
                .base('js-transition-ease-out')
                .transfrom('js-ease-out-enter')
                .end(function() {
                    var arr = ['js-transition-ease-out', 'js-ease-out-leave', 'js-ease-out-enter'];

                    arr.forEach(function(item) {
                        post.classList.remove(item);
                    });
                })

            addListener(function(remove) {
                var diff = position.y - window.scrollY - document.documentElement.clientHeight;

                if (diff < 50) {
                    remove();

                    pack.toggle();
                }
            });
        });
    }

    window._skappPostAnimation();
});
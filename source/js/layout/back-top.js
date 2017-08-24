window.addEventListener('load', function() {
    // 回到顶部
    (function() {
        var 
            backTopEle = document.getElementById('back-top'),
            packBackTop = new Pack(backTopEle);

        packBackTop.transfrom('back-top--hidden').base('js-hidden');

        function toggleBackTop() {
            var 
                scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
                clientHeight = document.documentElement.clientHeight,
                isHidden = backTopEle.classList.contains('back-top--hidden');

            if ((scrollTop > clientHeight && isHidden) || (scrollTop < clientHeight && !isHidden)) {
                packBackTop.toggle();
            }
        }

        toggleBackTop();
        document.addEventListener('scroll', toggleBackTop);

        backTopEle.addEventListener('click', function() {
            var backTopAmt = new Amt();

            backTopAmt
                .from({
                    top: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                })
                .to({
                    top: 0
                })
                .transition(1000)
                .on('frame', function(data) {
                    window.scrollTo(0, data.top);
                })
                .start();
        });
    })();
});

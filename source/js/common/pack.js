// 功能函数
(function(win) {
    function Pack(ele) {
        this.ele = ele;
        this.record = [];
        this.index = 0;
        this.dir = 1;
        this.status = false;
    }

    Pack.prototype = {
        _toggleClass: function(className, next) {
            this.ele.classList.toggle(className);

            next && setTimeout(next);
        },

        _transfromClass: function(className, next) {
            var self = this;

            this.ele.addEventListener('transitionend', function fun() {
                next();

                self.ele.removeEventListener('transitionend', fun);
            })

            this._toggleClass(className);
        },

        _toggle: function() {
            var opt = this.record[this.index];

            if (this.index === this.record.length || this.index === -1) {
                this.end && this.end();
                this.index = this.dir > 0 ? this.index - 1 : 0;
                this.dir *= -1;
                this.status = false;
                return;
            }

            switch(opt.type) {
                case 'class':
                    this._toggleClass(opt.className, this._toggle.bind(this));
                    break;
                case 'transfrom':
                    this._transfromClass(opt.className, this._toggle.bind(this));
                    break;
            }

            this.index += this.dir;
        },

        base: function(className) {
            this.record.push({
                className: className || 'js-open',
                type: 'class'
            });

            return this;
        },

        transfrom: function(className) {
            this.record.push({
                className: className,
                type: 'transfrom'
            });

            return this;
        },

        toggle: function() {
            if (this.status) return;
            this.status = true;

            this.index === 0 || this.index === this.record.length && (this.status = true);

            this._toggle();
        },

        end: function(fun) {
            this.end = fun;
        }
    }

    win.Pack = Pack;
})(window);
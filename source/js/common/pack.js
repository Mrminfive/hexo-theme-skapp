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
            var self = this;
            classArr = className.split(' ');

            classArr.forEach(function(cls) {
                self.ele.classList.toggle(cls);
            });

            next && setTimeout(next, 10);
        },

        _transfromClass: function(className, next) {
            var self = this;

            this.ele.addEventListener('transitionend', function fun(event) {
                if (self.ele === event.target) {
                    next();
                    self.ele.removeEventListener('transitionend', fun);
                }
            });

            this._toggleClass(className);
        },

        _animationClass: function(className, next) {
            var self = this;

            this.ele.addEventListener('animationend', function fun(event) {
                if (self.ele === event.target) {
                    next();
                    self.ele.removeEventListener('animationend', fun);
                }
            });

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
                case 'animation':
                    this._animationClass(opt.className, this._toggle.bind(this));
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

        animation: function(className) {
            this.record.push({
                className: className,
                type: 'animation'
            });

            return this;
        },

        toggle: function() {
            if (this.status) return;

            if (this.index === 0 || this.index === this.record.length - 1) {
                this.status = true;
            }

            this._toggle();
        },

        lastStart: function() {
            var self = this;

            this.status = false;
            this.index = this.record.length - 1;
            this.dir = -1;

            this.record.forEach(function(record) {
                self.ele.classList.add(record.className);
            });

            return this;
        },

        end: function(fun) {
            this.end = fun;
            return this;
        }
    }

    win.Pack = Pack;
})(window);
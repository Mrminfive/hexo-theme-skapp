(function() {
    function SearchPage() {
        this.config = {
            minScore: 1e-5,
            minNum: 3,
            language: document.querySelector('html').getAttribute('lang') 
        },
        this.init();
    }

    SearchPage.prototype = {
        init: function() {
            this.container = document.getElementById('page-content');
            this.loading = this.container.querySelector('.search__loader');
            this.tpl = [
                '<h2 class="search__result-wrap">',
                    this.config.language == 'en'?'Find <em>{{ num }}</em> {{ enDescription }} <em>{{ query }}</em>':'找到匹配<em>{{ query }}</em>的结果<em>{{ num }}</em>条',
                '</h2>',
                '<div class="page__posts clearfix">',
                    '{{ posts }}',
                '</div>'
            ].join('');
            this.articleTpl = [
                '<div class="page__post">',
                    '<article itemscope itemtype="http://schema.org/Article" class="page__mini-article">',
                        '<div class="mini-article__cover">',
                            '<img itemprop="image" src="{{ cover }}" alt="{{ title }}"/>',
                            '<div itemprop="datePublished" content="{{ date }}" class="mini-article__date">',
                                '<span class="date__day">{{ day }}</span>',
                                '<span class="date__month">{{ month }}</span>',
                            '</div>',
                            '<a itemprop="url" class="iconfont icon-enter" href="{{ url }}"></a>',
                        '</div>',
                        '<div class="mini-article__info">',
                            '<h3 itemprop="name" class="mini-article__title">',
                                '<a itemprop="url" href="{{ url }}" title="{{ title }}">{{ title }}</a>',
                            '</h3>',
                            '<p class="mini-article__author">by ',
                                '<span itemprop="author" itemscope itemtype="http://schema.org/Person">',
                                    '<a itemprop="url" href="{{ authorLink }}" target="_blank">',
                                        '<span itemprop="name">{{ authorNick }}</span>',
                                    '</a>',
                                '</span>',
                            '</p>',
                            '<p itemprop="articleSection" class="min-article__desc">',
                                '{{ desc }}',
                            '</p>',
                            '<div class="min-article__tags">',
                                '<i class="iconfont icon-tab"></i>',
                                '<ul class="tags__list clearfix">',
                                    '{{ tagsHtml }}',
                                '</ul>',
                            '</div>',
                        '</div>',
                    '</article>',
                '</div>'
            ].join('');
            this.tagsTpl = '<li class="tags__item"><a href="{{ path }}">{{ name }}</a></li>';
            this.queryString = decodeURIComponent(location.search.split('=')[1]);
            this.getData();
        },

        getData: function() {
            var self = this;

            axios
                .get('/assets/lunr/all.json')
                .then(function(res) { return res.data; })
                .then(function(data) { self.initSearch(data); });
        },

        initSearch: function(data) {
            this.index = lunr.Index.load(data.index);
            this.sourceData = data.store;
            this.result = this.index.search(this.queryString);
            this.filteredData = this.filterSourceData();

            this.render();
        },

        compileTemplate: function(tpl, data) {
            var 
                keyArr = tpl.match(/\{\{\s(\S+)\s\}\}/g),
                keys = [],
                result = '';

            function compile(item) {
                var rs = tpl;

                for(var i = 0 ; i < keyArr.length; i++) {
                    rs = rs.replace(/\{\{\s(\S+)\s\}\}/, item[keys[i]]);
                }

                result = rs + result;
            }

            for(var j = 0; j < keyArr.length; j++) {
                keys.push(keyArr[j].replace(/\{\{\s(\S+)\s\}\}/, '$1'));
            }

            if (Object.prototype.toString.apply(data) === '[object Array]') {
                data.forEach(function(item) { compile(item) });
            } else {
                compile(data);
            }

            return result;
        }, 

        render: function() {
            var filteredData = this.filteredData;
            var articlesHtml = '';
            var result = (this.config.language == 'en'?'Sorry,the content of your search does not exist!':'抱歉，您要的内容似乎没有哦，不如换个关键字试试吧。');
            var self = this;

            console.log("this:"+JSON.stringify(this));
            if (filteredData.length) {
                this.filteredData = this.filteredData.map(function(item) {
                    item.tagsHtml = self.compileTemplate(self.tagsTpl, item.tagArr);

                    return item;
                });

                articlesHtml = this.compileTemplate(this.articleTpl, this.filteredData);

                result = this.compileTemplate(this.tpl, {
                    query: this.queryString,
                    num: this.filteredData.length,
                    posts: articlesHtml,
                    enDescription: (this.filteredData.length > 1 ? 'results that match' : 'result that matches')
                });
            }

            this.container.innerHTML = result;

            setTimeout(function() {
                window._skappPostAnimation();
            });
        },

        filterSourceData: function() {
            var self = this,
                filteredData = [],
                minNum = self.config.minNum;
                
            this.result.forEach(function(row, idx){
                if (self.config.minScore > row.score && idx >= self.config.minScore.minNum) {
                    return;
                }
                filteredData.push(self.sourceData[row.ref])
            });
            return filteredData;
        }
    }

    window.addEventListener('load', function() {
        new SearchPage();
    });
})();
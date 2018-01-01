'use strict';

const
    Path = require('path'),
    Util = require('util'),
    _ = require('lodash');

const 
    publicDir   = hexo.public_dir,
    sourceDir   = hexo.source_dir;

hexo.extend.helper.register('blog_archives', function(posts) {
    let archives = [];

    const getTime = date => (new Date(this.date_xml(date))).getTime();

    posts.data.forEach(post => {
        if (post.draft) return;

        let 
            year = this.date(post.date, 'YYYY'),
            archiveIndex = archives.findIndex(archive => year === archive.year),
            archive;

        if (!~archiveIndex) {
            archive = {
                year: year,
                posts: [],
                index: archives.length
            };
            archives.push(archive);
        } else {
            archive = archives[archiveIndex];
        }

        archive.posts.push(post);
    });

    archives.forEach((archive, idx) => {
        archive.posts = archive.posts.sort((first, next) => getTime(next.date) - getTime(first.date));
    });
    
    return archives;
});

hexo.extend.helper.register('num_toArray', function(num) {
    let 
        ret = [],
        idx = 1;

    while(idx < num) {
        ret.push(idx);
        idx ++;
    }
    
    return ret;
});

hexo.extend.helper.register('get_setting', function(...keys) {
    return keys.reduce((p, key) => (p || this.config[key] || this.theme[key]), void 0);
});

hexo.extend.helper.register('tags', function() {
    let tags = this.site.tags.sort('name', 1).filter(tag => tag.length);

    return `
        <ul class="block-list tag-list clearfix">
            ${ tags.reduce((p, item) => {
                return p + `
                    <li class="tag-item">
                        <a class="tag-link" href="${ this.url_for(item.path) }">${ item.name }</a>
                    </li>  
                `;
            }, '') }
        </ul>
    `;
});

hexo.extend.helper.register('latest_post', function(len = 4) {
    const getTime = date => (new Date(this.date_xml(date))).getTime();

    let posts = this.site.posts.data
        .sort((first, next) => getTime(next.date) - getTime(first.date))
        .slice(0, len);

    return `
        <ul class="block-list latest-post-list">
            ${ posts.reduce((p, post) => {
                return p + `
                    <li class="latest-post-item">
                        <a href="${ this.url_for(post.path) }" title="${ post.title }">
                            <div class="item__cover">
                                <img src="${ post.cover|| hexo.config.default_cover || hexo.theme.config.default_cover }" alt="${ post.title }" />
                            </div>
                            <div class="item__info">
                                <h3 class="item__title">${ post.title }</h3>
                                <span class="item__text">${ this.date(post.date) }</span>
                            </div>
                        </a>
                    </li>
                `;
            }, '') }
        </ul>
    `;
});

hexo.extend.helper.register('s_paginator', function(size = 2) {
    let page = this.page;
    let url_for = this.url_for;
    let _p = this._p;
    let items = [];
    let link = `${page.base}${this.config.pagination_dir}/%d/`

    let current = page.current;

    function renderItem({ str, link, title }) {
        return `
            <li class="paginator__item">
                <a href="${link}" ${title ? `title="${title}"` : ''}>${str}</a>
            </li>
        `;
    }

    function renderCurrent({ str }) {
        return `
            <li class="paginator__item">
                <span>${str}</span>
            </li>
        `;
    }

    for(let i = 1; i <= page.total; i++) {
        if (i === current) {
            items.push(renderCurrent({ str: i }));
        } else {
            items.push(renderItem({
                str: i,
                link: url_for(i === 1 ? page.base : Util.format(link, i))
            }));
        }
    }

    if (current - 1 > size) {
        items.splice(1, current - size - 1, renderCurrent({ str: '...' }));
    }

    if (page.total - current > size) {
        let len = page.total - current - size;
        items.splice(items.length - len - 1, len, renderCurrent({ str: '...' }));
    }

    if (current !== 1) {
        items.unshift(renderItem({
            str: '<i class="iconfont icon-prev"></i>',
            link: url_for(page.prev_link),
            title: _p('paginator.prev')
        }));
    }

    if (current !== page.total) {
        items.push(renderItem({
            str: '<i class="iconfont icon-next"></i>',
            link: url_for(page.next_link),
            title: _p('paginator.next')
        }));
    }

    return `
        <nav class="page__paginator">
            <ul class="paginator__list clearfix">
                ${ items.join('') }
            </ul>
        </nav>
    `;
});
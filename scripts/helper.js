'use strict';

const
    Path = require('path'),
    _ = require('lodash');

const 
    publicDir   = hexo.public_dir,
    sourceDir   = hexo.source_dir;

// Hexo extensions
hexo.extend.helper.register('header_menu', function(className) {
    const 
        menu = this.site.data.menu || this.theme.menu,
        nowPath = this.path;

    let result = '';

    function isActive(path, nowPath) {
        return path === '/' ? nowPath === 'index.html' : nowPath.indexOf(path) !== -1;
    }

    function isExternal(path) {
        let except = ['http://blog.minfive.com'];

        return path.indexOf('http') === 0 && except.indexOf(path) !== -1;
    }

    _.each(menu, (path, title) => {
        title = this.__('menu.' + title);
        result += `
            <li class="${className}${isActive(path, nowPath) ? ' active' : ''}">
                <a
                    ${isExternal(path) ? ' target="_blank"' : ''} 
                    class="no-decoration" 
                    href="${isActive(path, nowPath) 
                        ? 'javascript:void(0)' 
                        : isExternal(path) 
                            ? path
                            : this.url_for(path) }"
                    title="${title}">
                    ${title}
                </a>
            </li>
        `
    });

    return result;
});

hexo.extend.helper.register('mb_paginator', function(isUnite) {
    let page = this.page;
    let url_for = this.url_for;

    if (page.total > 1) {
        if (page.current == 1 && !isUnite) {
            return `
                <a class="mb-posts__btn-more" href="${ page.next_link }" title="查看更多" alt="查看更多">
                    <span>查看更多</span>
                </a>
            `;
        } else {
            return `
                <div class="mb__paginator">
                    <a class="paginator__item ${ page.prev ? '' : 'js-disabled' }" href="${ 
                        page.prev 
                            ? url_for(page.prev_link)
                            : 'javascript:void(0)'
                        }" title="上一页" alt="上一页">
                        <i class="iconfont icon-prev"></i>
                    </a>
                    <a class="paginator__item ${ page.next ? '' : 'js-disabled' }" href="${
                        page.next
                            ? url_for(page.next_link)
                            : 'javascript:void(0)'
                        }" title="下一页" alt="下一页">
                        <i class="iconfont icon-next"></i>
                    </a>
                </div>
            `;
        }
    } else {
        return '';
    }
});

hexo.extend.helper.register('mb_post_tags', function(tags) {
    let result = '';

    tags.forEach(tag => {
        result += `<li class="post__tag">${tag.name}</li>`;
    });

    return result;
});

hexo.extend.helper.register('mb_archives', function(posts) {
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
                                <img src="${ post.cover }" alt="${ post.title }" />
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
                link: url_for(i === 1 ? '' : `page/${i}`)
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
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

hexo.extend.helper.register('blog_archive_menu', function(page) {
    let menu = [];
    let posts = this.site.posts;

    const getTime = date => (new Date(this.date_xml(date))).getTime();

    posts.data.forEach(post => {
        if (post.draft) return;

        let 
            year = this.date(post.date, 'YYYY'),
            menuIndex = menu.findIndex(item => year === item);
        
        if (!~menuIndex) {
            menu.push(year);
        }
    });

    menu = menu
        .sort((first, next) => first < next)
        .map((item, idx) => {
            let baseLink = idx === 0 ? `${this.config.archive_dir}/` : Util.format(`${this.config.archive_dir}/%d/`, item);
            return {
                label: item,
                baseLink: baseLink,
                link: this.url_for(baseLink)
            }
        });

    let menuHtml = menu.map(item => {
        let isSelect = page.base === item.baseLink || page.base === `${item.baseLink}${item.label}/`;

        return `
            <a
                class="nav__item${isSelect ? ' nav__item--selected' : ''}"
                href="${isSelect ? 'javascript:void(0)' : item.link}"
                alt="${item.label}年">
                ${item.label}年
            </a>
        `
    }).join('');

    page['_archive_menu'] = menu;

    return `
        <nav class="mb-main__nav">
            ${menuHtml}
        </nav> 
    `;
});

hexo.extend.helper.register('blog_archive_post', function(page) {
    const getTime = date => (new Date(this.date_xml(date))).getTime();
    let nowYear = page.year || page._archive_menu[0].label;

    return page.posts.data
        .filter(post => !post.draft)
        .filter(post => nowYear == this.date(post.date, 'YYYY'))
        .sort((first, next) => getTime(next.date) - getTime(first.date));
});

hexo.extend.helper.register('archive_index_paginator', function(size = 2) {
    let page = this.page;
    let archiveDir = this.config.archive_dir;
    let paginationDir = this.config.pagination_dir;
    let url_for = this.url_for;
    let _p = this._p;
    let items = [];
    let label = page['_archive_menu'][0].label;
    let link = `${page.base}${label}/${paginationDir}/%d/`;

    let current = page.current;
    let total = Math.ceil(this.site.posts
        .filter(post => !post.draft)
        .filter(post => label == this.date(post.date, 'YYYY'))
        .length / this.config.per_page);

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

    function fixLink(link = '') {
        let linkArr = link.split('/');
        let archiveDirIdx = linkArr.findIndex(item => archiveDir === item);
        
        if (linkArr[archiveDirIdx + 1] == paginationDir) {
            linkArr.splice(archiveDirIdx, 0, label);
        }

        if (linkArr[linkArr.length - 1] == paginationDir) {
            linkArr.pop();
        }

        return linkArr.join('/');
    }

    for (let i = 1; i <= total; i++) {
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

    if (total - current > size) {
        let len = total - current - size;
        items.splice(items.length - len - 1, len, renderCurrent({ str: '...' }));
    }

    if (current !== 1) {
        items.unshift(renderItem({
            str: '<i class="iconfont icon-prev"></i>',
            link: url_for(fixLink(page.prev_link)),
            title: _p('paginator.prev')
        }));
    }

    if (current !== total) {
        items.push(renderItem({
            str: '<i class="iconfont icon-next"></i>',
            link: url_for(fixLink(page.next_link)),
            title: _p('paginator.next')
        }));
    }

    return `
        <nav class="page__paginator">
            <ul class="paginator__list clearfix">
                ${ items.join('')}
            </ul>
        </nav>
    `;
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

hexo.extend.helper.register('json', function(data) {
    var cache = [];
    return JSON.stringify(data, function (key, value) {
        if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null;
});
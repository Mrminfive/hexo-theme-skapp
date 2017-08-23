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
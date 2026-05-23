'use strict';

const url = require('url');

const plugin = {};

plugin.filterMetaTags = async (data) => {
    if (!Array.isArray(data.tags)) {
        data.tags = [];
    }

    const parsed = url.parse(data.req.originalUrl || '');

    let cleanPath = parsed.pathname || '/';

    cleanPath = cleanPath
        .replace(/^\/topic\/(\d+)\/[^/?#]+(\/.*)?$/, '/topic/$1$2')
        .replace(/^\/category\/(\d+)\/[^/?#]+(\/.*)?$/, '/category/$1$2');

    const canonicalUrl =
        `${data.req.protocol}://${data.req.get('host')}${cleanPath}`;

    data.tags = data.tags.filter(tag => {
        return !(
            tag &&
            tag.tagName === 'link' &&
            tag.attributes &&
            tag.attributes.rel === 'canonical'
        );
    });

    data.tags.push({
        tagName: 'link',
        attributes: {
            rel: 'canonical',
            href: canonicalUrl,
        },
    });

    return data;
};

module.exports = plugin;
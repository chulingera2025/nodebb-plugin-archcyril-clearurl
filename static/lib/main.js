(function () {

    function cleanPath(path) {
        if (!path) return path;
        path = path.replace(
            /^\/topic\/(\d+)\/[^/?#]+(\/.*)?$/,
            '/topic/$1$2'
        );
        path = path.replace(
            /^\/category\/(\d+)\/[^/?#]+(\/.*)?$/,
            '/category/$1$2'
        );
        return path;
    }

    function cleanHref(href) {
        if (!href || typeof href !== 'string') return href;
        if (href.startsWith('http://') || href.startsWith('https://')) {
            try {
                var u = new URL(href);
                var cleaned = cleanPath(u.pathname);
                if (cleaned !== u.pathname) {
                    u.pathname = cleaned;
                    return u.toString();
                }
            } catch (e) { /* ignore */ }
            return href;
        }
        if (href.startsWith('//') || href.startsWith('#') || href.startsWith('javascript:')) {
            return href;
        }
        return cleanPath(href) || href;
    }

    var origPush = history.pushState;
    var origReplace = history.replaceState;

    history.pushState = function (state, title, url) {
        if (url && typeof url === 'string') {
            url = cleanHref(url);
        }
        return origPush.call(this, state, title, url);
    };

    history.replaceState = function (state, title, url) {
        if (url && typeof url === 'string') {
            url = cleanHref(url);
        }
        return origReplace.call(this, state, title, url);
    };

    function cleanCurrentUrl() {
        var current = window.location.pathname;
        var cleaned = cleanPath(current);
        if (current !== cleaned) {
            origReplace.call(
                history,
                {},
                '',
                cleaned + window.location.search + window.location.hash
            );
        }
    }

    function updateLinks() {
        $('a[href]').each(function () {
            var href = $(this).attr('href');
            var cleaned = cleanHref(href);
            if (cleaned !== href) {
                $(this).attr('href', cleaned);
            }
        });
    }

    function updateCanonical() {
        var cleaned =
            window.location.origin +
            cleanPath(window.location.pathname);

        var canonical =
            document.querySelector('link[rel="canonical"]');

        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }

        canonical.href = cleaned;
    }

    function run() {
        cleanCurrentUrl();
        updateLinks();
        updateCanonical();
    }

    $(window).on('action:ajaxify.end', run);
    $(document).ready(run);

})();
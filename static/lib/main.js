(function () {

    function cleanUrl(url) {
        if (!url) return url;

        return url
            .replace(/(\/topic\/\d+)\/[^/?#]+(?=\/|$)/, '$1')
            .replace(/(\/category\/\d+)\/[^/?#]+(?=\/|$)/, '$1');
    }

    document.addEventListener('copy', function (e) {
        const selection = window.getSelection().toString();

        if (!selection) return;

        const cleaned = cleanUrl(selection);

        if (cleaned !== selection) {
            e.preventDefault();
            e.clipboardData.setData('text/plain', cleaned);
        }
    });

})();
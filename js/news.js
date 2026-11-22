/* ========================================
NEWS LIST / PC・TB・SP
HTML記事を日付順に並べ替え、15件ごとに表示
ピン留め：<article class="news-item" data-pin="true"> を使用
======================================== */
(function () {
    const list = document.getElementById('news-list');
    const pagination = document.getElementById('news-pagination');
    if (!list || !pagination) return;

    const perPage = 15;
    const articles = Array.from(list.querySelectorAll(':scope > .news-item'));
    articles.sort((a, b) => {
        const pinA = a.dataset.pin === 'true' ? 1 : 0;
        const pinB = b.dataset.pin === 'true' ? 1 : 0;
        const dateA = a.querySelector('.news-date')?.dateTime || '';
        const dateB = b.querySelector('.news-date')?.dateTime || '';
        return pinB - pinA || dateB.localeCompare(dateA);
    });
    list.replaceChildren(...articles);

    const totalPages = Math.max(1, Math.ceil(articles.length / perPage));
    const params = new URLSearchParams(location.search);
    const requested = Number.parseInt(params.get('page') || '1', 10);
    let page = Number.isFinite(requested)
        ? Math.min(Math.max(requested, 1), totalPages) : 1;
    const hashId = decodeURIComponent(location.hash.slice(1));
    const targetIndex = articles.findIndex(article => article.id === hashId);
    if (targetIndex !== -1) page = Math.floor(targetIndex / perPage) + 1;

    function makeLink(label, targetPage, current = false) {
        const a = document.createElement('a');
        a.textContent = label;
        a.href = targetPage === 1 ? '/news.html' : '/news.html?page=' + targetPage;
        if (current) {
            a.classList.add('is-active');
            a.setAttribute('aria-current', 'page');
        }
        return a;
    }

    function render() {
        articles.forEach((article, index) => {
            article.hidden = index < (page - 1) * perPage || index >= page * perPage;
            article.style.display = article.hidden ? 'none' : '';
        });
        pagination.replaceChildren();
        if (totalPages > 1) {
            if (page > 1) pagination.appendChild(makeLink('Prev', page - 1));
            for (let n = 1; n <= totalPages; n++) {
                pagination.appendChild(makeLink(String(n), n, n === page));
            }
            if (page < totalPages) pagination.appendChild(makeLink('Next', page + 1));
        }
        if (targetIndex !== -1) {
            requestAnimationFrame(() => articles[targetIndex].scrollIntoView());
        }
    }
    render();
})();

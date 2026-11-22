/************* 共通のjs ***************/



/************* BACK TO TOP ***************/

/************* BACK TO TOP / PC・TB・SP ***************/

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    /*
    ========================================
    SHOW / HIDE
    スクロール位置で表示を切り替える
    ========================================
    */

    const toggleBackToTop = () => {

        const scrollPosition = Math.max(
            0,
            window.scrollY
        );

        const showThreshold =
            window.innerHeight * 0.4;

        backToTop.classList.toggle(
            "is-visible",
            scrollPosition > showThreshold
        );

    };


    /*
    ========================================
    SCROLL / RESIZE
    PC・TB・SP 共通
    ========================================
    */

    window.addEventListener(
        "scroll",
        toggleBackToTop,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        toggleBackToTop
    );


    /*
    ========================================
    TOUCH END / SP
    指を離した後にも表示状態を確認
    ========================================
    */

    window.addEventListener(
        "touchend",
        () => {
            requestAnimationFrame(toggleBackToTop);
        },
        { passive: true }
    );


    /*
    ========================================
    SCROLL END
    慣性スクロール終了後に再確認
    ========================================
    */

    if ("onscrollend" in window) {

        window.addEventListener(
            "scrollend",
            toggleBackToTop
        );

    }


    /*
    ========================================
    INITIAL / PAGE RESTORE
    ========================================
    */

    window.addEventListener(
        "pageshow",
        toggleBackToTop
    );

    toggleBackToTop();


    /*
    ========================================
    CLICK / BACK TO TOP
    ========================================
    */

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}



/************* HAMBURGER MENU ***************/

const hamburger =
    document.getElementById('js-hamburger');

const spNav =
    document.getElementById('js-sp-nav');

if (hamburger && spNav) {

    hamburger.addEventListener('click', function () {

        hamburger.classList.toggle('active');
        spNav.classList.toggle('active');

    });

}

const copyright = document.querySelector('#common-footer small');

if (copyright) {
    copyright.style.visibility =
        spNav.classList.contains('active') ? 'hidden' : '';
}

/*************** WORKS LIST / CREATE FROM WORK DATA ***************/

const worksList =
    document.querySelector('.works-list');

if (
    worksList &&
    typeof workData !== 'undefined'
) {

    worksList.innerHTML = '';

    workData.forEach(
        function (work) {

            const article =
                document.createElement('article');

            const link =
                document.createElement('a');

            const image =
                document.createElement('img');


            /*
            ========================================
            WORK ITEM CLASS
            ========================================
            */

            article.classList.add(
                'work-item'
            );

            if (
                work.size === 'large'
            ) {
                article.classList.add(
                    'work-item-large'
                );
            }


            /*
            ========================================
            FILTER DATA
            ========================================
            */

            article.dataset.category =
                work.category.join(' ');

            article.dataset.type =
                work.type;


            /*
            ========================================
            LINK
            ========================================
            */

            link.href =
                'work-pages/' +
                work.url;


            /*
            ========================================
            IMAGE
            ========================================
            */

            image.src = work.image;


            /*
            ========================================
            CREATE
            ========================================
            */

            link.appendChild(
                image
            );

            article.appendChild(
                link
            );

            worksList.appendChild(
                article
            );

        }
    );

}

/************* FLOATING NAVIGATION ***************/

function setupFloatingNavigation(floatingElement) {

    if (!floatingElement) {
        return;
    }

    let scrollTimer = null;


    function hideFloatingElement() {

        floatingElement.classList.remove(
            'is-visible'
        );

    }


    function showFloatingElement() {

        if (
            hamburger &&
            hamburger.classList.contains(
                'active'
            )
        ) {

            hideFloatingElement();

            return;

        }


        if (window.scrollY > 100) {

            floatingElement.classList.add(
                'is-visible'
            );

        } else {

            hideFloatingElement();

        }

    }


    function handleScroll() {

        /*
        スクロール開始・継続中は
        即非表示
        */

        hideFloatingElement();


        clearTimeout(
            scrollTimer
        );


        /*
        MENU展開中は表示しない
        */

        if (
            hamburger &&
            hamburger.classList.contains(
                'active'
            )
        ) {

            return;

        }


        /*
        スクロール停止1秒後に再表示
        */

        scrollTimer =
            setTimeout(
                showFloatingElement,
                1000
            );

    }


    window.addEventListener(
        'scroll',
        handleScroll,
        { passive: true }
    );


    if (hamburger) {

        hamburger.addEventListener(
            'click',
            function () {

                clearTimeout(
                    scrollTimer
                );


                if (
                    hamburger.classList.contains(
                        'active'
                    )
                ) {

                    hideFloatingElement();

                } else {

                    showFloatingElement();

                }

            }
        );

    }

}


/************* WORKS ***************/

const worksHeading =
    document.querySelector('.works-heading');

const workItems =
    document.querySelectorAll('.work-item');


if (worksHeading && workItems.length > 0) {

    /****************************************
    CURRENT FILTER FROM URL
    ****************************************/

    const worksParams =
        new URLSearchParams(
            window.location.search
        );

    let selectedCategory =
        worksParams.get('category') || 'all';

    let selectedType =
        worksParams.get('type') || 'all';


    /****************************************
    FLOATING MENU
    ****************************************/

    const floatingHeading =
        worksHeading.cloneNode(true);

    floatingHeading.classList.add(
        'works-heading-floating'
    );

    document.body.appendChild(
        floatingHeading
    );


    /****************************************
    FILTER BUTTONS
    ****************************************/

    const categoryButtons =
        document.querySelectorAll(
            '.works-filter-category button'
        );

    const typeButtons =
        document.querySelectorAll(
            '.works-filter-type button'
        );


    /****************************************
    WORKS ENTRANCE SETTING
    ****************************************/

    function createEntranceSetting(item) {

        const randomDistance =
            Math.floor(Math.random() * 201) + 160;

        const randomDuration =
            Math.floor(Math.random() * 501) + 700;

        const randomDelay =
            Math.floor(Math.random() * 351);


        item.dataset.entranceDistance =
            randomDistance;

        item.dataset.entranceDuration =
            randomDuration;

        item.dataset.entranceDelay =
            randomDelay;


        item.style.opacity = '0';

        item.style.transform =
            'translateY(' +
            randomDistance +
            'px)';


        item.style.transition =
            'opacity ' +
            randomDuration +
            'ms ease-out, ' +
            'transform ' +
            randomDuration +
            'ms cubic-bezier(0.22, 1, 0.36, 1)';
    }


    workItems.forEach(function (item) {

        createEntranceSetting(item);

    });


    /****************************************
    NORMAL ENTRANCE
    ****************************************/

    function showWork(item) {

        if (
            item.classList.contains('is-shown')
        ) {
            return;
        }


        item.classList.add('is-shown');


        const delay =
            Number(
                item.dataset.entranceDelay
            );


        setTimeout(function () {

            item.style.opacity = '1';

            item.style.transform =
                'translateY(0)';

        }, delay);
    }


    /****************************************
    FILTER REPLAY
    ****************************************/

    function replayWork(item) {

        const randomDistance =
            Math.floor(Math.random() * 201) + 160;

        const randomDuration =
            Math.floor(Math.random() * 501) + 700;

        const randomDelay =
            Math.floor(Math.random() * 351);


        item.style.transition = 'none';

        item.style.opacity = '0';

        item.style.transform =
            'translateY(' +
            randomDistance +
            'px)';


        requestAnimationFrame(function () {

            requestAnimationFrame(function () {

                item.style.transition =
                    'opacity ' +
                    randomDuration +
                    'ms ease-out, ' +
                    'transform ' +
                    randomDuration +
                    'ms cubic-bezier(0.22, 1, 0.36, 1)';


                setTimeout(function () {

                    item.style.opacity = '1';

                    item.style.transform =
                        'translateY(0)';

                }, randomDelay);

            });

        });
    }


    /****************************************
    CREATE FILTER QUERY
    ****************************************/

    function createFilterQuery() {

        const params =
            new URLSearchParams();


        if (
            selectedCategory !== 'all'
        ) {

            params.set(
                'category',
                selectedCategory
            );
        }


        if (
            selectedType !== 'all'
        ) {

            params.set(
                'type',
                selectedType
            );
        }


        return params;
    }


    /****************************************
    UPDATE CURRENT WORKS URL
    ****************************************/

    function updateWorksUrl() {

        const params =
            createFilterQuery();

        const query =
            params.toString();


        const newUrl =
            window.location.pathname +
            (
                query
                    ? '?' + query
                    : ''
            );


        window.history.replaceState(
            null,
            '',
            newUrl
        );
    }


    /****************************************
    UPDATE DETAIL LINKS
    ****************************************/

    function updateWorkDetailLinks() {

        const params =
            createFilterQuery();

        const query =
            params.toString();


        workItems.forEach(function (item) {

            const link =
                item.querySelector('a');

            if (!link) {
                return;
            }


            const originalPath =
                link.getAttribute('href')
                    .split('?')[0];


            link.setAttribute(
                'href',
                originalPath +
                (
                    query
                        ? '?' + query
                        : ''
                )
            );

        });
    }


    /****************************************
    CATEGORY ACTIVE
    ****************************************/

    function updateCategoryActive() {

        categoryButtons.forEach(
            function (button) {

                const buttonCategory =
                    button.textContent
                        .replace('#', '')
                        .trim()
                        .toLowerCase();


                if (
                    buttonCategory ===
                    selectedCategory
                ) {

                    button.classList.add(
                        'is-active'
                    );

                } else {

                    button.classList.remove(
                        'is-active'
                    );
                }

            }
        );
    }


    /****************************************
    TYPE ACTIVE
    ****************************************/

    function updateTypeActive() {

        typeButtons.forEach(
            function (button) {

                const buttonType =
                    button.dataset.type;


                if (
                    buttonType ===
                    selectedType
                ) {

                    button.classList.add(
                        'is-active'
                    );

                } else {

                    button.classList.remove(
                        'is-active'
                    );
                }

            }
        );
    }


    /****************************************
    FILTER WORKS
    ****************************************/

    function filterWorks(replay) {

        workItems.forEach(function (item) {

            const categories =
                item.dataset.category
                    .split(' ');

            const type =
                item.dataset.type;


            const categoryMatch =
                selectedCategory === 'all' ||
                categories.includes(
                    selectedCategory
                );


            const typeMatch =
                selectedType === 'all' ||
                type === selectedType;


            if (
                categoryMatch &&
                typeMatch
            ) {

                item.style.display = '';

            } else {

                item.style.display = 'none';
            }

        });


        updateCategoryActive();

        updateTypeActive();

        updateWorkDetailLinks();


        if (!replay) {
            return;
        }


        requestAnimationFrame(function () {

            workItems.forEach(
                function (item) {

                    if (
                        item.style.display !==
                        'none'
                    ) {

                        item.classList.add(
                            'is-shown'
                        );

                        replayWork(item);
                    }

                }
            );

        });
    }


    /****************************************
    INITIAL FILTER
    ****************************************/

    filterWorks(false);


    /****************************************
    FIRST VIEW
    ****************************************/

    workItems.forEach(function (item) {

        if (
            item.style.display === 'none'
        ) {
            return;
        }


        const rect =
            item.getBoundingClientRect();


        if (
            rect.top <
            window.innerHeight
        ) {

            showWork(item);
        }

    });


    /****************************************
    SCROLL ENTRANCE
    ****************************************/

    const worksObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            showWork(
                                entry.target
                            );

                            worksObserver.unobserve(
                                entry.target
                            );
                        }

                    }
                );

            },

            {
                rootMargin:
                    '0px 0px 15% 0px',

                threshold: 0
            }
        );


    workItems.forEach(function (item) {

        const rect =
            item.getBoundingClientRect();


        if (
            rect.top >=
            window.innerHeight
        ) {

            worksObserver.observe(
                item
            );
        }

    });




    /****************************************
    CATEGORY CLICK / PC・TB・SP
    ALL選択時はTYPEも解除
    ****************************************/

    categoryButtons.forEach(
        function (button) {

            button.addEventListener(
                'click',
                function () {

                    selectedCategory =
                        button.textContent
                            .replace('#', '')
                            .trim()
                            .toLowerCase();


                    /*
                    ========================================
                    ALL / PC・TB・SP
                    CategoryをALLにした場合は
                    TypeもALLへ戻す
                    ========================================
                    */

                    if (selectedCategory === 'all') {

                        selectedType = 'all';

                    }


                    /*
                    ========================================
                    FILTER UPDATE
                    作品表示・選択状態・詳細リンクを更新
                    ========================================
                    */

                    filterWorks(true);

                    updateWorksUrl();

                }
            );

        }
    );






    /****************************************
    TYPE CLICK
    ****************************************/

    typeButtons.forEach(
        function (button) {

            button.addEventListener(
                'click',
                function () {

                    const buttonType =
                        button.dataset.type;


                    if (
                        selectedType ===
                        buttonType
                    ) {

                        selectedType = 'all';

                    } else {

                        selectedType =
                            buttonType;
                    }


                    filterWorks(true);

                    updateWorksUrl();
                }
            );

        }
    );

    /****************************************
    FLOATING MENU
    ****************************************/

    setupFloatingNavigation(
        floatingHeading
    );
}



/*************** WORK DETAIL / OTHER WORKS ***************/

const workCarousel =
    document.querySelector('.work-carousel');

const prevWorks =
    document.querySelectorAll('.prev-work');

const nextWorks =
    document.querySelectorAll('.next-work');

const backWorks =
    document.querySelectorAll('.back-works');


if (workCarousel) {





    /*
    ========================================
    CURRENT WORK
    ========================================
    */

    const currentFile =
        window.location.pathname
            .split('/')
            .pop();


    const currentMatch =
        currentFile.match(
            /work-(\d+)\.html/
        );


    const currentId =
        currentMatch
            ? currentMatch[1]
            : '001';


    /*
    ========================================
    FILTER PARAMETER
    ========================================
    */

    const params =
        new URLSearchParams(
            window.location.search
        );


    const selectedCategory =
        params.get('category') || 'all';

    const selectedType =
        params.get('type') || 'all';


    /*
    ========================================
    DETAIL TOP FILTER
    ========================================
    */

    const detailWorksHeading =
        document.querySelector(
            '.works-heading'
        );


    let detailFloatingHeading = null;


    if (detailWorksHeading) {

        detailFloatingHeading =
            detailWorksHeading
                .cloneNode(true);

        detailFloatingHeading
            .classList
            .add(
                'works-heading-floating'
            );

        document.body.appendChild(
            detailFloatingHeading
        );
    }


    const detailCategoryButtons =
        document.querySelectorAll(
            '.works-filter-category button'
        );

    const detailTypeButtons =
        document.querySelectorAll(
            '.works-filter-type button'
        );


    /*
    ========================================
    WORKS URL CREATOR
    ========================================
    */

    function createWorksUrl(
        category,
        type
    ) {

        const newParams =
            new URLSearchParams();


        if (
            category &&
            category !== 'all'
        ) {

            newParams.set(
                'category',
                category
            );
        }


        if (
            type &&
            type !== 'all'
        ) {

            newParams.set(
                'type',
                type
            );
        }


        const query =
            newParams.toString();


        return (
            '/works.html' +
            (
                query
                    ? '?' + query
                    : ''
            )
        );
    }


    /*
    ========================================
    DETAIL CATEGORY ACTIVE + CLICK
    ========================================
    */

    detailCategoryButtons.forEach(
        function (button) {

            const buttonCategory =
                button.textContent
                    .replace('#', '')
                    .trim()
                    .toLowerCase();


            if (
                buttonCategory ===
                selectedCategory
            ) {

                button.classList.add(
                    'is-active'
                );

            } else {

                button.classList.remove(
                    'is-active'
                );
            }


            button.addEventListener(
                'click',
                function () {

                window.location.href =
                    createWorksUrl(
                        buttonCategory,
                        buttonCategory === 'all'
                            ? 'all'
                            : selectedType
                    );
                }
            );

        }
    );


    /*
    ========================================
    DETAIL TYPE ACTIVE + CLICK
    ========================================
    */


    const currentWork =
        workData.find(
            function (work) {
                return work.id === currentId;
            }
        );


const currentWorkType =
    currentWork
        ? currentWork.type
        : 'all';



/*
========================================
DETAIL META / PC・TB・SP
Category / Type / Date
works-data.js から自動生成
========================================
*/

const workMetaCategory =
    document.querySelector('.work-meta-category');

const workMetaType =
    document.querySelector('.work-meta-type');

const workMetaDate =
    document.querySelector('.work-meta-date');

if (currentWork) {

    /*
    ========================================
    CATEGORY
    複数カテゴリをリンクとして表示
    ========================================
    */

    if (workMetaCategory) {

        const categoryLinks =
            currentWork.category.map(function (category) {

                const link = document.createElement('a');

                link.href = createWorksUrl(category, 'all');

                link.textContent =
                    '#' +
                    category.charAt(0).toUpperCase() +
                    category.slice(1);

                return link;
            });

        workMetaCategory.replaceChildren();

        categoryLinks.forEach(function (link, index) {

            if (index > 0) {
                workMetaCategory.appendChild(
                    document.createTextNode(' ')
                );
            }

            workMetaCategory.appendChild(link);
        });
    }

    /*
    ========================================
    TYPE
    WORKS一覧へのリンクを維持
    ========================================
    */

    if (workMetaType) {

        const typeLink = document.createElement('a');

        typeLink.href =
            createWorksUrl('all', currentWork.type);

        typeLink.textContent =
            currentWork.type.charAt(0).toUpperCase() +
            currentWork.type.slice(1);

        workMetaType.replaceChildren(typeLink);
    }

    /*
    ========================================
    DATE
    未登録の場合は項目自体を非表示
    ========================================
    */

    if (workMetaDate) {

        const date = currentWork.date;

        workMetaDate.textContent = date || '';

        if (!date) {
            workMetaDate.parentElement.hidden = true;
        }
    }
}





detailTypeButtons.forEach(
        function (button) {

            const buttonType =
                button.dataset.type;


            /*
            現在の作品に該当するType
            → ACTIVE

            それ以外
            → グレー表示
            */

            if (
                buttonType ===
                currentWorkType
            ) {

                button.classList.add(
                    'is-active'
                );

                button.classList.remove(
                    'is-not-current-type'
                );

            } else {

                button.classList.remove(
                    'is-active'
                );

                button.classList.add(
                    'is-not-current-type'
                );
            }


            /*
            Typeをクリックした場合は
            そのTypeのWORKS一覧へ移動

            Categoryの流入状態は維持
            */

            button.addEventListener(
                'click',
                function () {

                    window.location.href =
                        createWorksUrl(
                            selectedCategory,
                            buttonType
                        );
                }
            );

        }
    );

    /*
    ========================================
    DETAIL FLOATING FILTER
    ========================================
    */

    if (detailFloatingHeading) {

        setupFloatingNavigation(
            detailFloatingHeading
        );

    }


    /*
    ========================================
    FILTER WORK DATA
    ========================================
    */

    const filteredWorks =
        workData.filter(
            function (work) {

                const categoryMatch =
                    selectedCategory ===
                    'all' ||
                    work.category.includes(
                        selectedCategory
                    );


                const typeMatch =
                    selectedType ===
                    'all' ||
                    work.type ===
                    selectedType;


                return (
                    categoryMatch &&
                    typeMatch
                );

            }
        );


    /*
    ========================================
    NAVIGATION WORKS
    ========================================
    */

    const navigationWorks =
        filteredWorks.length > 0
            ? filteredWorks
            : workData;


    /*
    ========================================
    CREATE DETAIL URL
    ========================================
    */

function createWorkUrl(work) {

    const newParams =
        new URLSearchParams();


    if (
        selectedCategory !== 'all'
    ) {

        newParams.set(
            'category',
            selectedCategory
        );
    }


    if (
        selectedType !== 'all'
    ) {

        newParams.set(
            'type',
            selectedType
        );
    }


    const query =
        newParams.toString();


    return (
        '/work-pages/' +
        work.url +
        (
            query
                ? '?' + query
                : ''
        )
    );
}

    /*
    ========================================
    CURRENT INDEX
    ========================================
    */

    let currentIndex =
        navigationWorks.findIndex(
            function (work) {

                return (
                    work.id === currentId
                );

            }
        );


    if (
        currentIndex === -1
    ) {

        currentIndex = 0;

    }


    /*
    ========================================
    PREV / NEXT
    ========================================
    */

    if (
        prevWorks.length > 0 &&
        nextWorks.length > 0 &&
        navigationWorks.length > 0
    ) {

        const prevIndex =
            (
                currentIndex -
                1 +
                navigationWorks.length
            ) %
            navigationWorks.length;


        const nextIndex =
            (
                currentIndex +
                1
            ) %
            navigationWorks.length;


        const prevUrl =
            createWorkUrl(
                navigationWorks[prevIndex]
            );


        const nextUrl =
            createWorkUrl(
                navigationWorks[nextIndex]
            );


        prevWorks.forEach(
            function (prevWork) {

                prevWork.href =
                    prevUrl;

            }
        );


        nextWorks.forEach(
            function (nextWork) {

                nextWork.href =
                    nextUrl;

            }
        );

    }


    /*
    ========================================
    BACK TO ALL WORKS
    ========================================
    */

    if (backWorks.length > 0) {

        const backParams =
            new URLSearchParams();


        if (
            selectedCategory !== 'all'
        ) {

            backParams.set(
                'category',
                selectedCategory
            );

        }


        if (
            selectedType !== 'all'
        ) {

            backParams.set(
                'type',
                selectedType
            );

        }


        const backQuery =
            backParams.toString();


        const backUrl =
            '/works.html' +
            (
                backQuery
                    ? '?' + backQuery
                    : ''
            );


        backWorks.forEach(
            function (backWork) {

                backWork.href =
                    backUrl;

            }
        );

    }


    /*
    ========================================
    OTHER WORKS
    ========================================
    */

    const carouselList =
        workCarousel.querySelector('ul');


    /*
    ========================================
    CREATE CAROUSEL ITEM
    ========================================
    */

    function createCarouselItem(work) {

        const li =
            document.createElement('li');


        const link =
            document.createElement('a');


        const image =
            document.createElement('img');


        li.dataset.category =
            work.category.join(' ');


        li.dataset.type =
            work.type;


        link.href =
            createWorkUrl(work);


        image.src =
            work.image;


        image.alt =
            work.alt;


        /*
        画像そのものの
        ブラウザ標準ドラッグをOFF
        */

        image.draggable = false;


        link.appendChild(image);

        li.appendChild(link);


        return li;

    }


    if (carouselList) {


        /*
        ========================================
        CREATE NORMAL TRACK
        ========================================

        無限ループなし
        複製なし

        フィルターされた作品を
        そのまま1回だけ生成
        ========================================
        */

        carouselList.innerHTML = '';


        filteredWorks.forEach(
            function (work) {

                carouselList.appendChild(
                    createCarouselItem(work)
                );

            }
        );


        /*
        ========================================
        0 WORKS
        ========================================
        */

        if (
            filteredWorks.length === 0
        ) {

            workCarousel.hidden = true;

        }


        /*
        ========================================
        SOFT VERTICAL BOUNCE
        ========================================

        0 → 上 → 0

        1回だけ
        ========================================
        */

        let bounceAnimations = [];

        // PC専用：横自動スクロールと縦バウンドを交互に動かす
        let pcBounceRunning = false;
        let pcBounceSequence = 0;


        function stopBounce() {

            // 古いバウンド終了通知を無効化する
            pcBounceSequence++;
            pcBounceRunning = false;

            bounceAnimations.forEach(
                function (animation) {

                    animation.cancel();

                }
            );


            bounceAnimations = [];

        }



function softBounce() {

    // SP：バウンドを実行しない
    if (window.matchMedia('(max-width: 767px)').matches) {
        stopBounce();
        return;
    }

    if (filteredWorks.length === 0) {
        return;
    }


    stopBounce();

    const pcMedia = window.matchMedia('(min-width: 1100px)');
    const bounceSequence = pcBounceSequence;

    if (pcMedia.matches) {
        pcBounceRunning = true;
    }

    const items =
        carouselList.querySelectorAll('li');

    items.forEach(function (item) {

        /*
        ========================================
        DELAY
        0〜180msの時間差
        ========================================
        */

        const delay =
            Math.random() * 180;

        /*
        ========================================
        LIFT
        3〜9pxの浮き上がり
        ========================================
        */

        const lift =
            3 + Math.random() * 6;

        /*
        ========================================
        DURATION
        480〜780ms
        ========================================
        */

        const duration =
            480 + Math.random() * 300;

        /*
        ========================================
        PEAK TIMING
        浮き上がりの頂点を25〜45%で変化
        ========================================
        */

        const peak =
            0.25 + Math.random() * 0.2;

        /*
        ========================================
        SOFT BOUNCE
        作品ごとに異なる動き
        ========================================
        */

        const animation = item.animate(
            [
                {
                    transform: 'translateY(0)',
                    easing: 'ease-out'
                },
                {
                    transform: `translateY(-${lift}px)`,
                    offset: peak,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
                },
                {
                    transform: 'translateY(0)'
                }
            ],
            {
                duration: duration,
                delay: delay,
                iterations: 1,
                fill: 'none'
            }
        );

        bounceAnimations.push(animation);

    });

    // PC：全作品のバウンドが終わったら横移動を再開できるようにする
    if (pcMedia.matches) {
        Promise.allSettled(
            bounceAnimations.map(function (animation) {
                return animation.finished;
            })
        ).then(function () {
            if (bounceSequence === pcBounceSequence) {
                pcBounceRunning = false;
            }
        });
    }

}

        /*
        ========================================
        VERTICAL PAGE SCROLL → BOUNCE
        ========================================

        縦スクロール停止20ms後
        1回だけバウンド
        ========================================
        */

        let pageScrollTimer = null;


        function carouselIsVisible() {

            if (
                workCarousel.hidden
            ) {

                return false;

            }


            const rect =
                workCarousel
                    .getBoundingClientRect();


            return (

                rect.top <
                window.innerHeight &&

                rect.bottom > 0

            );

        }


        window.addEventListener(
            'scroll',
            function () {


                clearTimeout(
                    pageScrollTimer
                );


                if (
                    !carouselIsVisible()
                ) {

                    return;

                }


                pageScrollTimer =
                    setTimeout(

                        function () {

                            if (
                                carouselIsVisible()
                            ) {

                                softBounce();

                            }

                        },

                        20

                    );

            }
        );


        /*
        ========================================
        PC HORIZONTAL DRAG
        ========================================

        通常クリックを最優先。

        pointerdownしただけでは
        何も奪わない。

        マウスが実際に5px以上動いた場合だけ
        ドラッグとして扱う。

        Pointer Captureは使用しない。
        ========================================
        */

        let mouseIsDown = false;

        let isDragging = false;

        let startX = 0;

        let lastX = 0;

        let totalDragDistance = 0;

        let dragFinishedAt =
            -Infinity;


        /*
        ========================================
        MOUSE DOWN
        ========================================
        */

        workCarousel.addEventListener(
            'mousedown',
            function (event) {


                /*
                左クリックのみ
                */

                if (
                    event.button !== 0
                ) {

                    return;

                }


                mouseIsDown = true;

                isDragging = false;


                startX =
                    event.clientX;


                lastX =
                    event.clientX;


                totalDragDistance = 0;

            }
        );


        /*
        ========================================
        MOUSE MOVE
        ========================================

        windowで監視するので
        カルーセル外までマウスが出ても
        ドラッグを継続できる。
        ========================================
        */

        window.addEventListener(
            'mousemove',
            function (event) {


                if (
                    !mouseIsDown
                ) {

                    return;

                }


                const totalDistance =
                    Math.abs(
                        event.clientX -
                        startX
                    );


                /*
                5px以上動いて初めて
                ドラッグ開始
                */

                if (
                    !isDragging &&
                    totalDistance > 5
                ) {

                    isDragging = true;

                    stopBounce();

                }


                /*
                まだ5px未満なら
                通常クリック候補なので
                何もしない
                */

                if (
                    !isDragging
                ) {

                    return;

                }


                const deltaX =
                    event.clientX -
                    lastX;


                /*
                現在位置から横スクロール
                */

                workCarousel.scrollLeft -=
                    deltaX;


                totalDragDistance +=
                    Math.abs(deltaX);


                lastX =
                    event.clientX;

            }
        );


        /*
        ========================================
        MOUSE UP
        ========================================
        */

        window.addEventListener(
            'mouseup',
            function () {


                if (
                    !mouseIsDown
                ) {

                    return;

                }


                const wasDragging =
                    isDragging;


                mouseIsDown = false;

                isDragging = false;


                /*
                実際にドラッグした場合だけ
                誤クリック防止用の時刻を記録
                */

                if (
                    wasDragging
                ) {

                    dragFinishedAt =
                        performance.now();


                    /*
                    ドラッグ終了後
                    1回だけバウンド
                    */

                    setTimeout(

                        function () {

                            softBounce();

                        },

                        60

                    );

                }

            }
        );


        /*
        ========================================
        MOUSE LEAVE SAFETY
        ========================================

        ブラウザウィンドウから
        マウスが外れた場合の保険
        ========================================
        */

        window.addEventListener(
            'blur',
            function () {

                mouseIsDown = false;

                isDragging = false;

            }
        );


        /*
        ========================================
        NATIVE DRAG PREVENT
        ========================================

        画像を掴んだときに
        半透明画像が付いてくる
        ブラウザ標準dragだけ防ぐ
        ========================================
        */

        workCarousel.addEventListener(
            'dragstart',
            function (event) {

                event.preventDefault();

            }
        );


        /*
        ========================================
        CLICK
        ========================================

        通常クリック
        → 何もしない
        → <a>本来の動作で遷移
        ========================================
        */

        carouselList.addEventListener(
            'click',
            function (event) {


                const timeFromDrag =
                    performance.now() -
                    dragFinishedAt;


                if (
                    timeFromDrag >= 0 &&
                    timeFromDrag < 300
                ) {

                    event.preventDefault();

                    event.stopPropagation();

                }

            }
        );


        /*
        ========================================
        WHOLE CAROUSEL HOVER
        ========================================

        li
        → 縦バウンド

        a
        → カルーセルhover時の微細なズレ

        img
        → CSS側の個別hover拡大
        ========================================
        */

        const carouselLinks =
            carouselList
                .querySelectorAll('a');


        function randomizeCarousel() {


            /*
            hover可能デバイスのみ
            */

            if (
                !window.matchMedia(
                    '(hover: hover)'
                ).matches
            ) {

                return;

            }


            carouselLinks.forEach(
                function (link) {


                    const randomX =
                        Math.random() * 4 - 2;


                    const randomY =
                        Math.random() * 3 - 1.5;


                    const randomRotate =
                        Math.random() * 0.5 -
                        0.25;


                    link.style.transform =
                        'translate(' +
                        randomX +
                        'px, ' +
                        randomY +
                        'px) rotate(' +
                        randomRotate +
                        'deg)';

                }
            );

        }


        function resetCarousel() {


            carouselLinks.forEach(
                function (link) {

                    link.style.transform =
                        'translate(0, 0) rotate(0deg)';

                }
            );

        }


        workCarousel.addEventListener(
            'mouseenter',
            randomizeCarousel
        );


        workCarousel.addEventListener(
            'mouseleave',
            resetCarousel
        );


/*
========================================
OTHER WORKS / SP FIRST SLIDE
SPのみ：初回表示時に横へ40px移動
PC・TBは変更しない
========================================
*/

(function setupSpCarouselHint() {

    const spMedia = window.matchMedia(
        '(max-width: 767px)'
    );

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    // SP以外・動きを減らす設定では実行しない
    if (!spMedia.matches || reduceMotion.matches) {
        return;
    }

    let hintTimer = null;
    let hintFinished = false;
    let userInteracted = false;

    function cancelHint() {
        userInteracted = true;
        clearTimeout(hintTimer);
    }

    // ユーザーの操作を最優先
    workCarousel.addEventListener(
        'touchstart',
        cancelHint,
        { passive: true }
    );

    workCarousel.addEventListener(
        'pointerdown',
        cancelHint,
        { passive: true }
    );

    const hintObserver = new IntersectionObserver(
        function (entries) {

            const entry = entries[0];

            if (!entry.isIntersecting || hintFinished) {
                return;
            }

            hintFinished = true;
            hintObserver.disconnect();

            // 横スクロールできない場合は何もしない
            if (
                workCarousel.scrollWidth <=
                workCarousel.clientWidth
            ) {
                return;
            }

            hintTimer = setTimeout(function () {

                if (
                    userInteracted ||
                    !spMedia.matches ||
                    workCarousel.scrollLeft > 0
                ) {
                    return;
                }


/*
========================================
SP FIRST SLIDE / SLOW SCROLL
120pxを2500msかけて移動
========================================
*/

const startLeft = workCarousel.scrollLeft;

const maxLeft =
    workCarousel.scrollWidth -
    workCarousel.clientWidth;

const targetLeft = maxLeft; // → カルーセルのスクロール可能な右端まで移動

const duration =
    Math.abs(targetLeft - startLeft) / 40 * 1000; // → 1秒あたり30pxの速度で移動

let startTime = null;

function animateSlide(timestamp) {

    if (userInteracted || !spMedia.matches) {
        return;
    }

    if (startTime === null) {
        startTime = timestamp;
    }

    const elapsed = timestamp - startTime;

    const progress = Math.min(
        elapsed / duration,
        1
    );

    // ゆっくり加速し、ゆっくり停止
    const eased =
        progress * progress * (3 - 2 * progress);

    workCarousel.scrollLeft =
        startLeft +
        (targetLeft - startLeft) * eased;

    if (progress < 1) {
        requestAnimationFrame(animateSlide);
    }
}

requestAnimationFrame(animateSlide);


            }, 500);
        },
        {
            threshold: 0.5
        }
    );

    hintObserver.observe(workCarousel);

})();




/*
========================================
OTHER WORKS / PC・TB AUTO SCROLL
PC・TB（768px以上）
15px/秒で右端までゆっくり横移動

・マウス操作中は一時停止
・タッチ操作中は一時停止
・タッチ終了後は1.5秒待って再開
・PCの縦バウンド中は一時停止
・SPの既存処理は変更しない
========================================
*/

(function setupCarouselAutoScroll() {

    const autoScrollMedia = window.matchMedia(
        '(min-width: 768px)'
    );

    const finePointerMedia = window.matchMedia(
        '(hover: hover) and (pointer: fine)'
    );

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    const scrollSpeed = 15;

    let pointerInside = false;
    let pointerPressed = false;
    let touchActive = false;
    let touchResumeTime = 0;

    let visible = false;
    let lastTime = null;
    let frameId = null;

    let preciseLeft = workCarousel.scrollLeft;


    /*
    ========================================
    PC・TB / MOVE CONDITION
    ========================================
    */

    function canMove() {

        return (
            autoScrollMedia.matches &&
            !reduceMotion.matches &&
            visible &&
            !pointerInside &&
            !pointerPressed &&
            !touchActive &&
            performance.now() >= touchResumeTime &&
            !mouseIsDown &&
            !pcBounceRunning &&
            !workCarousel.hidden
        );

    }


    /*
    ========================================
    PC・TB / AUTO SCROLL
    ========================================
    */

    function tick(timestamp) {

        frameId = null;

        if (
            !autoScrollMedia.matches ||
            reduceMotion.matches ||
            !visible
        ) {

            lastTime = null;
            return;

        }

        if (canMove()) {

            const maxLeft = Math.max(
                0,
                workCarousel.scrollWidth -
                workCarousel.clientWidth
            );

            if (lastTime === null) {

                preciseLeft = workCarousel.scrollLeft;

            } else if (preciseLeft < maxLeft) {

                const elapsed = Math.min(
                    timestamp - lastTime,
                    100
                );

                const distance =
                    elapsed / 1000 * scrollSpeed;

                preciseLeft = Math.min(
                    preciseLeft + distance,
                    maxLeft
                );

                workCarousel.scrollLeft = preciseLeft;

            }

            lastTime = timestamp;

        } else {

            lastTime = null;

        }

        frameId = requestAnimationFrame(tick);

    }


    /*
    ========================================
    PC・TB / START・STOP
    ========================================
    */

    function updateLoop() {

        if (frameId !== null) {

            cancelAnimationFrame(frameId);
            frameId = null;

        }

        lastTime = null;
        preciseLeft = workCarousel.scrollLeft;

        if (
            autoScrollMedia.matches &&
            !reduceMotion.matches &&
            visible
        ) {

            frameId = requestAnimationFrame(tick);

        }

    }


    /*
    ========================================
    PC / MOUSE HOVER
    タッチ端末の疑似hoverを除外
    ========================================
    */

    workCarousel.addEventListener(
        'mouseenter',
        function () {

            if (finePointerMedia.matches) {
                pointerInside = true;
            }

        }
    );

    workCarousel.addEventListener(
        'mouseleave',
        function () {

            pointerInside = false;

        }
    );


    /*
    ========================================
    PC / MOUSE OPERATION
    ========================================
    */

    workCarousel.addEventListener(
        'mousedown',
        function (event) {

            if (event.button === 0) {
                pointerPressed = true;
            }

        }
    );

    window.addEventListener(
        'mouseup',
        function () {

            pointerPressed = false;

        }
    );


    /*
    ========================================
    TB / TOUCH OPERATION
    スワイプ操作を優先
    ========================================
    */

    workCarousel.addEventListener(
        'touchstart',
        function () {

            touchActive = true;
            lastTime = null;

        },
        { passive: true }
    );

    function finishTouch() {

        touchActive = false;

        touchResumeTime =
            performance.now() + 1500;

        lastTime = null;

    }

    workCarousel.addEventListener(
        'touchend',
        finishTouch,
        { passive: true }
    );

    workCarousel.addEventListener(
        'touchcancel',
        finishTouch,
        { passive: true }
    );


    /*
    ========================================
    PC・TB / WINDOW BLUR
    ========================================
    */

    window.addEventListener(
        'blur',
        function () {

            pointerPressed = false;
            pointerInside = false;
            touchActive = false;

        }
    );


    /*
    ========================================
    PC・TB / VISIBILITY
    ========================================
    */

    const observer = new IntersectionObserver(
        function (entries) {

            visible = entries[0].isIntersecting;

            updateLoop();

        },
        {
            threshold: 0
        }
    );

    observer.observe(workCarousel);


    /*
    ========================================
    PC・TB / MEDIA CHANGE
    ========================================
    */

    autoScrollMedia.addEventListener(
        'change',
        updateLoop
    );

    reduceMotion.addEventListener(
        'change',
        updateLoop
    );

})();



/*
========================================
OTHER WORKS / PC FLOATING
PCのみ：作品画像がゆっくり上下に浮遊
横スクロール停止後も継続
縦バウンド・ドラッグ中は一時停止
TB・SPには適用しない
========================================
*/

(function setupPcCarouselFloating() {

    const pcMedia = window.matchMedia('(min-width: 0px)');
    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    const images = carouselList.querySelectorAll('li img');

    if (!images.length) {
        return;
    }

    /*
    ========================================
    PC / FLOAT ANIMATIONS
    作品ごとに周期と開始位置を変える
    ========================================
    */

    const floatAnimations = Array.from(images, function (image) {

        const duration = 4500 + Math.random() * 6500;

        const animation = image.animate(
            [
                { translate: '0 0px' },
                { translate: '0 -2.5px' },
                { translate: '0 2.5px' },
                { translate: '0 0px' }
            ],
            {
                duration: duration,
                delay: -Math.random() * duration,
                iterations: Infinity,
                easing: 'ease-in-out'
            }
        );

        animation.pause();

        return animation;
    });

    /*
    ========================================
    PC / PAUSE・RESUME
    バウンド・ドラッグ中だけ停止
    ========================================
    */

    let floatVisible = false;
    let floatPlaying = false;

    function updateFloating() {

        const enabled =
            pcMedia.matches &&
            !reduceMotion.matches &&
            floatVisible;

        const shouldPlay =
            enabled &&
            !pcBounceRunning &&
            !mouseIsDown &&
            !isDragging;

        if (!enabled) {

            if (floatPlaying) {
                floatPlaying = false;
            }

            floatAnimations.forEach(function (animation) {
                if (animation.playState !== 'idle') {
                    animation.cancel();
                }
            });

            return;
        }

        if (shouldPlay === floatPlaying) {
            return;
        }

        floatPlaying = shouldPlay;

        floatAnimations.forEach(function (animation) {

            if (shouldPlay) {
                animation.play();
            } else {
                animation.pause();
            }

        });
    }

    /*
    ========================================
    PC / VISIBILITY
    画面外ではアニメーションを停止
    ========================================
    */

    const floatObserver = new IntersectionObserver(
        function (entries) {
            floatVisible = entries[0].isIntersecting;
            updateFloating();
        },
        { threshold: 0 }
    );

    floatObserver.observe(workCarousel);

    pcMedia.addEventListener('change', updateFloating);
    reduceMotion.addEventListener('change', updateFloating);

    // 既存のバウンド・ドラッグ状態と同期
    setInterval(updateFloating, 80);

})();




    }
}




/**************** SERVICE / VIEW WORKS PATH ****************/

const serviceWorkCarousel =
    document.querySelector('.service-work-carousel');

if (serviceWorkCarousel) {

    const serviceWorkLinks =
        serviceWorkCarousel.querySelectorAll('a');

    serviceWorkLinks.forEach(function (link) {

        const workPath =
            link.getAttribute('href');

        if (
            workPath &&
            /^work-\d+\.html/.test(workPath)
        ) {
            link.setAttribute(
                'href',
                '/work-pages/' + workPath
            );
        }

    });

}

/* ========================================
   TYPEWRITER / SCROLL
======================================== */

(function () {

    const typewriterTargets = document.querySelectorAll(
        '.home-concept,' +
        '.works-title h2,' +
        '.works-title h3,' +
        '.works-statement .design dt,' +
        '.works-statement .process dt,' +
        '.works-statement .tools dt,' +
        '.works-statement .url dt,' +
        '.about-page h2,' +
        '.about-page h3,' +
        '.about-identity-name,' +
        '.about-identity-role,' +
        '.service-approach-lead,' +
        '.service-page h2,' +
        '.service-page h3,' +
        '.contact-lead h2,' +
        '.news-heading,' +
        '.news-title'
    );

    if (!typewriterTargets.length) {
        return;
    }


    function typeWriter(element) {

        if (element.dataset.typewriterDone === 'true') {
            return;
        }

        element.dataset.typewriterDone = 'true';


        /*
        ========================================
        元の文字と <br> を保存
        ========================================
        */

        const tokens = [];

        element.childNodes.forEach(function (node) {

            if (node.nodeType === Node.TEXT_NODE) {

                if (!node.textContent.trim()) {
                    return;
                }

                Array.from(node.textContent).forEach(
                    function (character) {

                        tokens.push({
                            type: 'text',
                            value: character
                        });

                    }
                );

            } else if (
                node.nodeType === Node.ELEMENT_NODE &&
                node.tagName === 'BR'
            ) {

                tokens.push({
                    type: 'br'
                });

            } else if (
                node.nodeType === Node.ELEMENT_NODE
            ) {

                Array.from(node.textContent).forEach(
                    function (character) {

                        tokens.push({
                            type: 'text',
                            value: character
                        });

                    }
                );

            }

        });



        /*
        ========================================
        SERVICE LEAD / PC・TB・SP
        タイプライター開始前に完成時の高さを確保
        ========================================
        */

        if (
            element.classList.contains(
                'service-approach-lead'
            )
        ) {

            /*
            元の全文が表示されている状態で
            実際の高さを取得する
            */

            const completedHeight =
                element.getBoundingClientRect().height;

            /*
            文字を消しても高さが縮まないように
            完成時の高さを最低限確保する
            */

            element.style.minHeight =
                completedHeight + 'px';
        }


        /*
        ========================================
        表示を空にしてカーソル生成
        ========================================
        */

        element.innerHTML = '';


        const cursor =
            document.createElement('span');

        cursor.className =
            'typewriter-cursor';

        cursor.setAttribute(
            'aria-hidden',
            'true'
        );

        element.appendChild(cursor);

        let index = 0;


        /*
        ========================================
        TYPEWRITER
        ========================================
        */

        function write() {

            if (index >= tokens.length) {

                setTimeout(
                    function () {

                        cursor.classList.add(
                            'is-finished'
                        );

                    },
                    2400
                );

                return;
            }


            const token = tokens[index];


            if (token.type === 'br') {

                element.insertBefore(
                    document.createElement('br'),
                    cursor
                );

                index++;

                write();
                return;
            }


            element.insertBefore(
                document.createTextNode(
                    token.value
                ),
                cursor
            );

            index++;


            /*
            人が入力しているように
            1文字ごとの速度をランダム化
            */
            let randomSpeed =
                Math.floor(
                    Math.random() * 46
                ) + 35;


            /*
            区切り文字では少し間を取る
            */
            if (
                token.value === '、' ||
                token.value === '。' ||
                token.value === '・' ||
                token.value === ',' ||
                token.value === '.'
            ) {

                randomSpeed +=
                    Math.floor(
                        Math.random() * 90
                    ) + 50;
            }


            setTimeout(
                write,
                randomSpeed
            );
        }


        /*
        カーソルを少し見せてから入力開始
        */
        setTimeout(
            write,
            Math.floor(
                Math.random() * 180
            ) + 120
        );

    }


    const observer =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        typeWriter(
                            entry.target
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {
                threshold: 0.35
            }

        );


    typewriterTargets.forEach(
        function (target) {

            observer.observe(
                target
            );

        }
    );

})();

/* ========================================
   PROCESS / SCROLL TIMELINE
======================================== */

(function () {

    const processes =
        document.querySelectorAll(
            '.works-statement .process'
        );

    if (!processes.length) {
        return;
    }


    processes.forEach(
        function (process) {

            const processList =
                process.querySelector('dd');

            if (!processList) {
                return;
            }


            const processItems =
                Array.from(
                    processList.querySelectorAll('p')
                );


            if (!processItems.length) {
                return;
            }


            /*
            ========================================
            元テキストを保存
            ========================================
            */

            processItems.forEach(
                function (item) {

                    const text =
                        item.textContent.trim();

                    item.dataset.processText =
                        text;

                    item.textContent = '';

                    const textSpan =
                        document.createElement('span');

                    textSpan.className =
                        'process-type-text';

                    item.appendChild(
                        textSpan
                    );

                }
            );


            /*
            ========================================
            進行ライン
            ========================================
            */

            const progressLine =
                document.createElement('span');

            progressLine.className =
                'process-progress-line';

            progressLine.setAttribute(
                'aria-hidden',
                'true'
            );

            processList.prepend(
                progressLine
            );


            /*
            ========================================
            Process専用タイプライター
            ========================================
            */

            function typeProcessItem(item) {

                if (
                    item.dataset.processTyped ===
                    'true'
                ) {
                    return;
                }

                item.dataset.processTyped =
                    'true';


                const target =
                    item.querySelector(
                        '.process-type-text'
                    );

                const text =
                    item.dataset.processText || '';

                const characters =
                    Array.from(text);


                target.textContent = '';


                const cursor =
                    document.createElement('span');

                cursor.className =
                    'typewriter-cursor';

                cursor.setAttribute(
                    'aria-hidden',
                    'true'
                );

                target.appendChild(
                    cursor
                );


                let index = 0;


                function write() {

                    if (
                        index >=
                        characters.length
                    ) {

                        setTimeout(
                            function () {

                                cursor.classList.add(
                                    'is-finished'
                                );

                            },
                            2400
                        );

                        return;
                    }


                    const character =
                        characters[index];


                    target.insertBefore(
                        document.createTextNode(
                            character
                        ),
                        cursor
                    );

                    index++;


                    /*
                    ========================================
                    TYPEWRITER SPEED
                    人が考えながら入力するように
                    速度と間を不規則に揺らす
                    ========================================
                    */


                    /*
                    通常入力
                    60〜120ms
                    */

                    let randomSpeed =
                        Math.floor(
                            Math.random() * 61
                        ) + 60;


                    /*
                    スペース
                    次の単語へ移る前に
                    不規則に間を取る

                    追加：200〜600ms
                    */

                    if (character === ' ') {

                        randomSpeed +=
                            Math.floor(
                                Math.random() * 401
                            ) + 200;

                    }


                    /*
                    句読点・区切り
                    少し長めに間を取る

                    追加：180〜330ms
                    */

                    else if (
                        character === '、' ||
                        character === '。' ||
                        character === '・' ||
                        character === ',' ||
                        character === '.'
                    ) {

                        randomSpeed +=
                            Math.floor(
                                Math.random() * 151
                            ) + 180;

                    }


                    /*
                    通常文字でも約18%の確率で
                    一瞬考えるように手が止まる

                    追加：100〜249ms
                    */

                    else if (
                        Math.random() < 0.18
                    ) {

                        randomSpeed +=
                            Math.floor(
                                Math.random() * 150
                            ) + 100;

                    }


                    setTimeout(
                        write,
                        randomSpeed
                    );

                }


                /*
                カーソルを少し見せてから入力開始
                */

                setTimeout(
                    write,
                    Math.floor(
                        Math.random() * 180
                    ) + 120
                );

            }


            /*
            ========================================
            スクロール進行
            ========================================
            */

            let maxProgressLineHeight = 0;


            function updateProcess() {

                const viewportTrigger =
                    window.innerHeight * 0.72;

                const listRect =
                    processList.getBoundingClientRect();


                /*
                Process内をどこまで通過したか
                */

                const progress =
                    viewportTrigger -
                    listRect.top;


                /*
                最初の● → 最後の●までの距離
                */

                const firstItem =
                    processItems[0];

                const lastItem =
                    processItems[
                    processItems.length - 1
                    ];

                const firstCenter =
                    firstItem.offsetTop +
                    firstItem.offsetHeight * 0.45;

                const lastCenter =
                    lastItem.offsetTop +
                    lastItem.offsetHeight * 0.45;


                const maxLineHeight =
                    Math.max(
                        0,
                        lastCenter -
                        firstCenter
                    );


                const currentLineHeight =
                    Math.min(
                        maxLineHeight,
                        Math.max(
                            0,
                            progress -
                            firstCenter
                        )
                    );


                /*
                一度伸びたラインは戻さない。

                ただしレスポンシブでレイアウトが
                変わった場合は、現在の
                「最初の● → 最後の●」の距離を
                上限にする。
                */

                maxProgressLineHeight =
                    Math.min(
                        maxLineHeight,
                        Math.max(
                            maxProgressLineHeight,
                            currentLineHeight
                        )
                    );


                progressLine.style.top =
                    firstCenter + 'px';

                progressLine.style.height =
                    maxProgressLineHeight + 'px';


                /*
                線が各●に到達したら
                ●表示＋タイプ開始
                */

                processItems.forEach(
                    function (item) {

                        const itemCenter =
                            item.offsetTop +
                            item.offsetHeight * 0.45;


                        if (
                            progress >=
                            itemCenter
                        ) {

                            item.classList.add(
                                'is-process-reached'
                            );

                            typeProcessItem(
                                item
                            );

                        }

                    }
                );

            }


            /*
            ========================================
            Reduced Motion
            ========================================
            */

            const reduceMotion =
                window.matchMedia(
                    '(prefers-reduced-motion: reduce)'
                );


            if (reduceMotion.matches) {

                processItems.forEach(
                    function (item) {

                        item.classList.add(
                            'is-process-reached'
                        );

                        const target =
                            item.querySelector(
                                '.process-type-text'
                            );

                        target.textContent =
                            item.dataset.processText;

                    }
                );

                return;
            }


            /*
            ========================================
            EVENT
            ========================================
            */

            window.addEventListener(
                'scroll',
                updateProcess,
                { passive: true }
            );

            window.addEventListener(
                'resize',
                updateProcess
            );

            updateProcess();

        }
    );

})();



/* ========================================
ABOUT / INDEX NAVIGATION
======================================== */

(() => {

    const aboutIndex =
        document.querySelector(
            ".about-index"
        );

    if (!aboutIndex) return;



    /*
    ========================================
    LINKS / ABOUT / PC・TB・SP
    通常INDEXのみ
    ========================================
    */

    const links = Array.from(
        document.querySelectorAll(
            '.about-index a[href^="#"]'
        )
    );


    const sectionIds = [
        ...new Set(
            links
                .map((link) =>
                    link.getAttribute("href")
                )
                .filter(
                    (id) =>
                        id &&
                        id !== "#"
                )
        )
    ];


    const sections =
        sectionIds
            .map((id) =>
                document.querySelector(id)
            )
            .filter(Boolean);


    if (
        !links.length ||
        !sections.length
    ) {
        return;
    }


    /*
    ========================================
    ACTIVE
    ========================================
    */

    const setActive = (id) => {

        links.forEach((link) => {

            const isActive =
                link.getAttribute("href") ===
                `#${id}`;

            link.classList.toggle(
                "is-active",
                isActive
            );

        });

    };


    /*
    ========================================
    CLICK
    ========================================
    */

    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const id =
                    link.getAttribute("href");


                /*
                About（href="#"）は
                通常のTOPリンクとして動かす
                */

                if (id === "#") {
                    return;
                }


                const target =
                    document.querySelector(id);

                if (!target) return;


                event.preventDefault();


                setActive(
                    target.id
                );


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                history.replaceState(
                    null,
                    "",
                    id
                );

            }
        );

    });


    /*
    ========================================
    CURRENT SECTION
    ========================================
    */

    const updateActiveSection = () => {

        const triggerY =
            window.innerHeight * 0.35;


        let currentSection =
            sections[0];


        sections.forEach(
            (section) => {

                const rect =
                    section.getBoundingClientRect();


                if (
                    rect.top <= triggerY
                ) {

                    currentSection =
                        section;

                }

            }
        );


        if (currentSection) {

            setActive(
                currentSection.id
            );

        }

    };


    /*
    ========================================
    SCROLL PERFORMANCE
    ========================================
    */

    let ticking = false;


    const handleScroll = () => {

        if (ticking) return;


        ticking = true;


        requestAnimationFrame(
            () => {

                updateActiveSection();

                ticking = false;

            }
        );

    };


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        handleScroll
    );


    /*
    ========================================
    INITIAL STATE
    ========================================
    */

    const initialHash =
        window.location.hash.replace(
            "#",
            ""
        );


    const initialSection =
        sections.find(
            (section) =>
                section.id ===
                initialHash
        );


    if (initialSection) {

        setActive(
            initialSection.id
        );

    } else {

        updateActiveSection();

    }

})();



/* ========================================
SERVICE MENU
SP MASONRY LAYOUT
======================================== */

(() => {

    const menuList =
        document.querySelector(".service-menu-list");

    if (!menuList) return;

    const menuItems =
        Array.from(
            menuList.querySelectorAll(".service-menu-item")
        );

    if (!menuItems.length) return;

    const SP_MAX_WIDTH = 767;
    const MIN_ITEM_WIDTH = 110;
    const MAX_COLUMNS = 2;
    const ROW_GAP = 56;


    /*
    ========================================
    INITIAL HASH / SP
    MENUの高さが確定してからアンカーへ移動
    ========================================
    */

    const initialHash = window.location.hash;

    const anchorTarget = initialHash
        ? document.getElementById(
            decodeURIComponent(initialHash.slice(1))
        )
        : null;

    let anchorPending = Boolean(anchorTarget);
    let anchorTimer;

    const alignInitialAnchor = () => {

        if (!anchorPending || !anchorTarget) return;

        clearTimeout(anchorTimer);

        anchorTimer = setTimeout(() => {

            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    if (!anchorPending) return;

                    anchorTarget.scrollIntoView({
                        behavior: "instant",
                        block: "start"
                    });

                });

            });

        }, 80);

    };

    // 初期表示の補正だけを対象とする
    if (anchorPending) {

        setTimeout(() => {
            anchorPending = false;
            clearTimeout(anchorTimer);
        }, 2000);

        // ユーザーが操作したら補正を終了
        window.addEventListener(
            "pointerdown",
            () => {
                anchorPending = false;
                clearTimeout(anchorTimer);
            },
            { once: true }
        );

        window.addEventListener(
            "load",
            alignInitialAnchor,
            { once: true }
        );

    }


    /*
    ========================================
    COLUMN GAP
    ========================================
    */

    const getColumnGap = () => {

        return Math.min(
            Math.max(
                window.innerWidth * 0.06,
                32
            ),
            48
        );

    };


    /*
    ========================================
    RESET LAYOUT
    ========================================
    */

    const resetLayout = () => {

        menuList.style.height = "";

        menuItems.forEach((item) => {

            item.style.width = "";
            item.style.left = "";
            item.style.top = "";

        });

    };


    /*
    ========================================
    UPDATE LAYOUT
    ========================================
    */

    const updateLayout = () => {

        if (window.innerWidth > SP_MAX_WIDTH) {

            resetLayout();
            return;

        }

        const listWidth = menuList.clientWidth;

        if (!listWidth) return;

        const columnGap = getColumnGap();


        /*
        ========================================
        COLUMN COUNT
        ========================================
        */

        const columnCount = Math.max(
            1,
            Math.min(
                MAX_COLUMNS,
                Math.floor(
                    (listWidth + columnGap) /
                    (MIN_ITEM_WIDTH + columnGap)
                )
            )
        );

        const columnWidth =
            (
                listWidth -
                columnGap * (columnCount - 1)
            ) / columnCount;


        /*
        ========================================
        DISPLAY ORDER
        ========================================
        */

        const priorityOrder = [
            "service-menu-branding",
            "service-menu-print",
            "service-menu-artwork",
            "service-menu-package",
            "service-menu-editorial",
            "service-menu-web",
            "service-menu-other"
        ];

        const orderedItems =
            [...menuItems].sort((a, b) => {

                const getPriority = (item) =>
                    priorityOrder.findIndex(
                        className =>
                            item.classList.contains(className)
                    );

                return getPriority(a) - getPriority(b);

            });


        /*
        ========================================
        MASONRY POSITIONING
        ========================================
        */

        const columnHeights =
            new Array(columnCount).fill(0);

        orderedItems.forEach((item, index) => {

            // 左 → 右 → 次段の順で配置
            const columnIndex =
                index % columnCount;

            const left =
                columnIndex *
                (columnWidth + columnGap);

            const top =
                columnHeights[columnIndex];

            item.style.width =
                `${columnWidth}px`;

            item.style.left =
                `${left}px`;

            item.style.top =
                `${top}px`;

            columnHeights[columnIndex] =
                top +
                item.offsetHeight +
                ROW_GAP;

        });


        /*
        ========================================
        MENU HEIGHT
        ========================================
        */

        const maxHeight =
            Math.max(...columnHeights);

        menuList.style.height =
            `${Math.max(0, maxHeight - ROW_GAP)}px`;


        /*
        MENUの高さが決まった後に
        アンカー位置を補正
        */

        alignInitialAnchor();

    };


    /*
    ========================================
    INITIAL
    ========================================
    */

    updateLayout();


    /*
    ========================================
    RESIZE
    ========================================
    */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(
                updateLayout,
                100
            );

        }
    );


    /*
    ========================================
    FONT / CONTENT SIZE CHANGE
    ========================================
    */

    const resizeObserver =
        new ResizeObserver(() => {

            updateLayout();

        });

    menuItems.forEach((item) => {

        resizeObserver.observe(item);

    });


    if (document.fonts) {

        document.fonts.ready.then(() => {

            updateLayout();
            alignInitialAnchor();

        });

    }

})();



/* ========================================
SERVICE / INDEX NAVIGATION
======================================== */

(() => {

    const serviceIndex =
        document.querySelector(
            ".service-index"
        );

    if (!serviceIndex) return;


    /*
    ========================================
    LINKS / SECTIONS
    ========================================
    */

    const links = Array.from(
        serviceIndex.querySelectorAll(
            'a[href^="#"]'
        )
    );


    const sections =
        links
            .map((link) => {

                const id =
                    link.getAttribute("href");

                if (
                    !id ||
                    id === "#"
                ) {
                    return null;
                }

                return document.querySelector(id);

            })
            .filter(Boolean);


    if (
        !links.length ||
        !sections.length
    ) {
        return;
    }


    /*
    ========================================
    ACTIVE
    ========================================
    */

    const setActive = (id) => {

        links.forEach((link) => {

            const isActive =
                link.getAttribute("href") ===
                `#${id}`;

            link.classList.toggle(
                "is-active",
                isActive
            );

        });

    };


    /*
    ========================================
    CLICK
    ========================================
    */

    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const id =
                    link.getAttribute("href");

                const target =
                    document.querySelector(id);

                if (!target) return;

                event.preventDefault();

                setActive(
                    target.id
                );

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(
                    null,
                    "",
                    id
                );

            }
        );

    });


    /*
    ========================================
    CURRENT SECTION
    ========================================
    */

    const updateActiveSection = () => {

        const triggerY =
            window.innerHeight * 0.35;

        let currentSection =
            sections[0];


        sections.forEach(
            (section) => {

                const rect =
                    section.getBoundingClientRect();

                if (
                    rect.top <= triggerY
                ) {
                    currentSection =
                        section;
                }

            }
        );


        if (currentSection) {

            setActive(
                currentSection.id
            );

        }

    };


    /*
    ========================================
    SCROLL PERFORMANCE
    ========================================
    */

    let ticking = false;


    const handleScroll = () => {

        if (ticking) return;

        ticking = true;

        requestAnimationFrame(
            () => {

                updateActiveSection();

                ticking = false;

            }
        );

    };


    window.addEventListener(
        "scroll",
        handleScroll,
        { passive: true }
    );


    window.addEventListener(
        "resize",
        handleScroll
    );


    /*
    ========================================
    INITIAL STATE
    ========================================
    */

    const initialHash =
        window.location.hash.replace(
            "#",
            ""
        );


    const initialSection =
        sections.find(
            (section) =>
                section.id ===
                initialHash
        );


    if (initialSection) {

        setActive(
            initialSection.id
        );

    } else {

        updateActiveSection();

    }

})();



/* ========================================
HOME NEWS / PC・TB・SP
news.html から最新3件を取得
======================================== */

(function () {

    const homeNewsList =
        document.getElementById('home-news-list');

    if (!homeNewsList) {
        return;
    }

    /*
    ========================================
    FETCH NEWS HTML
    ========================================
    */

    async function loadHomeNews() {

        try {

            const response = await fetch('/news.html');

            if (!response.ok) {
                throw new Error('NEWSの取得に失敗しました');
            }

            const html = await response.text();

            const parser = new DOMParser();

            const newsDocument =
                parser.parseFromString(html, 'text/html');

            /*
            ========================================
            GET + SORT NEWS
            ========================================
            */

            const newsItems = Array.from(
                newsDocument.querySelectorAll(
                    '#news-list .news-item'
                )
            );

            newsItems.sort(function (a, b) {

                const dateA =
                    a.querySelector('.news-date')?.dateTime || '';

                const dateB =
                    b.querySelector('.news-date')?.dateTime || '';

                return dateB.localeCompare(dateA);

            });

            const latestNews = newsItems.slice(0, 3);

            /*
            ========================================
            CREATE HOME NEWS
            ========================================
            */

            const fragment =
                document.createDocumentFragment();

            latestNews.forEach(function (item) {

                const date =
                    item.querySelector('.news-date');

                const title =
                    item.querySelector('.news-title');

                if (!item.id || !date || !title) {
                    return;
                }

                const article =
                    document.createElement('article');

                article.className = 'home-news-item';

                const time =
                    document.createElement('time');

                time.className = 'news-date';
                time.dateTime = date.dateTime;
                time.textContent = date.textContent.trim();


                /* ========================================
                HOME NEWS / ARTICLE + LINK
                タイトル文字と矢印を別々にアニメーション
                ======================================== */

                const heading =
                    document.createElement('h3');

                heading.className = 'news-title';

                const link =
                    document.createElement('a');

                link.className = 'home-news-link';

                link.href =
                    '/news.html#' +
                    encodeURIComponent(item.id);

                const linkText =
                    document.createElement('span');

                linkText.className = 'home-news-link-text';

                linkText.textContent =
                    title.textContent.trim();

                const linkArrow =
                    document.createElement('span');

                linkArrow.className = 'news-link-arrow';

                linkArrow.setAttribute('aria-hidden', 'true');

                link.appendChild(linkText);
                link.appendChild(linkArrow);

                heading.appendChild(link);

                article.appendChild(time);
                article.appendChild(heading);

                fragment.appendChild(article);


            });

            homeNewsList.replaceChildren(fragment);

        } catch (error) {

            console.error(
                'HOME NEWS 読み込みエラー:',
                error
            );

            homeNewsList.textContent =
                'お知らせを読み込めませんでした。';

        }

    }

    loadHomeNews();

})();

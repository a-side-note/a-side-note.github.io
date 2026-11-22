async function loadCommonParts() {
    try {
        // 共通headerを読み込む
        const headerResponse = await fetch("/common/header.html");

        if (!headerResponse.ok) {
            throw new Error("header.htmlの読み込みに失敗しました");
        }

        const headerHTML = await headerResponse.text();
        const headerTarget = document.getElementById("common-header");

        if (headerTarget) {
            headerTarget.innerHTML = headerHTML;
        }

        // WORKS専用ナビ
        const worksNavTarget = document.getElementById("common-works-nav");

        if (worksNavTarget) {
            const worksNavResponse = await fetch("/common/works-nav.html");

            if (!worksNavResponse.ok) {
                throw new Error("works-nav.htmlの読み込みに失敗しました");
            }

            const worksNavHTML = await worksNavResponse.text();
            worksNavTarget.innerHTML = worksNavHTML;
        }


                // WORK DETAIL専用ナビ
        const workDetailNavTargets =
            document.querySelectorAll(".common-work-detail-nav");

        if (workDetailNavTargets.length > 0) {
            const workDetailNavResponse =
                await fetch("/common/work-detail-nav.html");

            if (!workDetailNavResponse.ok) {
                throw new Error(
                    "work-detail-nav.htmlの読み込みに失敗しました"
                );
            }

            const workDetailNavHTML =
                await workDetailNavResponse.text();

            workDetailNavTargets.forEach(function (target) {
                target.innerHTML = workDetailNavHTML;
            });
        }


        // 共通footerを読み込む
        const footerResponse = await fetch("/common/footer.html");

        if (!footerResponse.ok) {
            throw new Error("footer.htmlの読み込みに失敗しました");
        }

        const footerHTML = await footerResponse.text();
        const footerTarget = document.getElementById("common-footer");

        if (footerTarget) {
            footerTarget.innerHTML = footerHTML;
        }

        // header・footerの準備が終わってから既存のfunction.jsを実行
        const functionScript = document.createElement("script");
        functionScript.src = "/js/function.js";
        document.body.appendChild(functionScript);

    } catch (error) {
        console.error("共通パーツの読み込みエラー:", error);
    }
}

loadCommonParts();
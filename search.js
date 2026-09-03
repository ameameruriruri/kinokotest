const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const result = document.getElementById("result");
const historyList = document.getElementById("historyList");

// ========================================
// 保存されているデータを読み込む
// ========================================

const savedData = localStorage.getItem("kinokoData");

let data = [];

if (savedData) {

    data = JSON.parse(savedData);

    console.log("公開データを読み込みました:", data);

} else {

    console.error("公開データが見つかりません。");

}


// ========================================
// 検索
// ========================================

searchInput.addEventListener("input", () => {

    const keyword = searchInput.value.trim();

    suggestions.innerHTML = "";
    result.innerHTML = "";

    if (keyword.length < 2) {
        return;
    }

    const matches = data.filter(item =>
        item.keyword.startsWith(keyword)
    );


    // ========================================
    // 検索候補を表示
    // ========================================

    matches.forEach(item => {

        const suggestion = document.createElement("button");

        // 候補にはキーワードだけ表示
        suggestion.textContent = item.keyword;


        // ========================================
        // 候補をクリック
        // ========================================

        suggestion.addEventListener("click", () => {

            searchInput.value = item.keyword;

            suggestions.innerHTML = "";


            // ========================================
            // 検索結果の詳細を表示
            // ========================================

            result.innerHTML = `
                <div class="result-title">
                    <h2>${item.keyword}</h2>
                    <span class="result-category">〈${item.category}〉</span>
                </div>

                <p>${item.description}</p>
            `;

            const historyItem = document.createElement("div");

            historyItem.className = "history-item";

            historyItem.innerHTML = `
                <span>${item.keyword}</span>
                <small>〈${item.category}〉</small>
            `;

            // 履歴をクリックしたとき
            historyItem.addEventListener("click", () => {

                searchInput.value = item.keyword;

                result.innerHTML = `
                    <div class="result-title">
                        <h2>${item.keyword}</h2>
                        <span class="result-category">〈${item.category}〉</span>
                    </div>

                    <p>${item.description}</p>
                `;

            });

            historyList.appendChild(historyItem);

        });

        suggestions.appendChild(suggestion);

    });

});
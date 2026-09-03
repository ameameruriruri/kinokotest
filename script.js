const API_URL = "https://script.google.com/macros/s/AKfycbw8QWFio5zj42dr_0AnXSyKCg4dsi-lmSb4qRETWtZ9gZrb33KnOjUGJTlB-05y7C7K/exec";

let data = [];
let dataLoaded = false;

// ========================================
// HTMLの要素を取得
// ========================================

const startButton = document.getElementById("startButton");
const message = document.getElementById("message");

// ========================================
// ページを開いたらデータ取得開始
// ========================================

async function loadData() {

    // ----------------------------------------
    // まず保存済みデータがあるか確認
    // ----------------------------------------

    const savedData = localStorage.getItem("kinokoData");

    if (savedData) {

        console.log("保存済みデータを使用します");

        data = JSON.parse(savedData);
        dataLoaded = true;

        console.log("公開データ:", data);

        return;
    }

    // ----------------------------------------
    // 保存されていなければGASから取得
    // ----------------------------------------

    try {

        console.time("GAS取得");

        const response = await fetch(API_URL);

        console.timeLog("GAS取得", "fetch完了");

        const text = await response.text();

        console.timeLog("GAS取得", "text取得完了");

        data = JSON.parse(text);

        console.timeLog("GAS取得", "JSON変換完了");

        // ----------------------------------------
        // ブラウザに保存
        // ----------------------------------------

        localStorage.setItem(
            "kinokoData",
            JSON.stringify(data)
        );

        dataLoaded = true;

        console.timeEnd("GAS取得");

        console.log("公開データ取得完了:", data);

    } catch (error) {

        console.error(
            "公開データの取得に失敗しました:",
            error
        );

        message.textContent =
            "データの読み込みに失敗しました。";

        startButton.disabled = false;
    }
}

loadData();

// ========================================
// ENTERボタン
// ========================================

startButton.addEventListener("click", () => {

    // データ取得済みならすぐ検索画面へ
    if (dataLoaded) {

        window.location.href = "search.html";

        return;
    }

    // まだ取得中
    message.textContent = "少々お待ちください……";

    startButton.disabled = true;

    // データ取得完了を待つ
    const waitForData = setInterval(() => {

        if (dataLoaded) {

            clearInterval(waitForData);

            window.location.href = "search.html";
        }

    }, 100);

});

// ========================================
// キーボードのEnterでもボタンを押す
// ========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        startButton.click();
    }

});
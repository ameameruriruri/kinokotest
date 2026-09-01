const data = [
    {
        name: "なぞ",
        description: "表面の意味の背後に別の意味を隠しておき，それを当てさせようと誘いかける言語表現の一方法。言語遊戯の一つ。"
    },
    {
        name: "なぞとき",
        description: "謎を解くこと。"
    },
    {
        name: "なぞときのこ",
        description: "神が作り上げたこの世のすべて"
    },
    {
        name: "うさみりと",
        description: "私の太陽"
    },
    {
        name: "とらぴ",
        description: "私の彼氏"
    }
];


const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const result = document.getElementById("result");


searchInput.addEventListener("input", () => {

    const keyword = searchInput.value.trim();

    suggestions.innerHTML = "";
    result.innerHTML = "";

    if (keyword === "") {
        return;
    }

    const matches = data.filter(item =>
        item.name.includes(keyword)
    );

    matches.forEach(item => {

        const suggestion = document.createElement("button");

        suggestion.textContent = item.name;

        suggestion.addEventListener("click", () => {

            searchInput.value = item.name;

            suggestions.innerHTML = "";

            result.innerHTML = `
                <h2>${item.name}</h2>
                <p>${item.description}</p>
            `;

        });

        suggestions.appendChild(suggestion);

    });

});
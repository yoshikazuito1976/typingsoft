// quest.js（まず動かすための互換版）
window.quest = [
  {
    category: "英語",
    items: [
      { display: "cat", kana: "cat", romaji: ["cat"] },
      { display: "dog", kana: "dog", romaji: ["dog"] }
    ]
  },
  {
    category: "日本語",
    items: [
      { display: "アームバンド", kana: "あーむばんど", romaji: ["a-mubando"] },
      { display: "おはよう",     kana: "おはよう",     romaji: ["ohayou", "ohayo"] },
      { display: "アールグレイ", kana: "あーるぐれい", romaji: ["a-rugurei"] },
      { display: "アイス",       kana: "あいす",       romaji: ["aisu"] }
    ]
  }
];

// 互換：既存 program.js が期待する mondailist を作る（先頭がタイトル、以降が「判定文字列」）
window.mondailist = window.quest.map(cat => [
  cat.category,
  ...cat.items.map(q => q.kana) // 判定はひらがなにしたいので kana を入れる
]);

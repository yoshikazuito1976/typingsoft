window.quest = [
  {
    category: "英語",
    items: [
      { display: "cat", romaji: ["cat"] },
      { display: "dog", romaji: ["dog"] },
      { display: "computer", romaji: ["computer"] },
      { display: "server", romaji: ["server"] },
      { display: "network", romaji: ["network"] },
      { display: "opensource", romaji: ["opensource"] },
      { display: "cloud", romaji: ["cloud"] },
      { display: "datascience", romaji: ["datascience"] },
      // …（英語はハイフンを使わない方針のまま）
    ]
  },

  {
    category: "日本語",
    items: [
      // --- ひらがな・漢字（ハイフンなし） ---
      { display: "おはよう", romaji: ["ohayou", "ohayo"] },
      { display: "こんにちは", romaji: ["konnichiwa", "konnitiwa"] },
      { display: "写真", romaji: ["shashin", "syasin"] },
      { display: "辞書", romaji: ["jisho", "zisyo"] },
      { display: "学校", romaji: ["gakkou", "gakko"] },
      { display: "東京", romaji: ["toukyou", "tokyo"] },
      { display: "勉強", romaji: ["benkyou", "benkyo"] },

      // --- カタカナ・外来語（ハイフン許容） ---
      { display: "コーヒー", romaji: ["ko-hi-", "kohii", "koohii"] },
      { display: "サーバー", romaji: ["sa-ba-", "saabaa"] },
      { display: "データベース", romaji: ["de-ta-be-su", "deetabeesu"] },
      { display: "ネットワーク", romaji: ["netto-wa-ku", "nettowaaku"] },
      { display: "セキュリティ", romaji: ["sekyu-ri-ti", "sekyuriti"] },

      // --- もともと提示されていた問題（ハイフンOK） ---
      { display: "アームバンド", romaji: ["a-mubando", "amubando"] },
      { display: "アールグレイ", romaji: ["a-rugurei", "arugurei"] },
      { display: "アイス", romaji: ["aisu"] },
      { display: "アイスクリーム", romaji: ["aisu-ku-ri-mu", "aisukuriimu"] }
    ]
  }
];

// 互換（既存 program.js 用）
window.mondailist = window.quest.map(cat => [
  cat.category,
  ...cat.items.map(q => q.display)
]);

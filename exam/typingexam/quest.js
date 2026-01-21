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
      { display: "datascience", romaji: ["datascience"] }
    ]
  },
  {
    category: "日本語",
    items: [
      // ひらがな・漢字（ハイフンなし）
      { display: "おはよう", romaji: ["ohayou", "ohayo"] },
      { display: "こんにちは", romaji: ["konnichiwa", "konnitiwa"] },
      { display: "こんばんは", romaji: ["konbanwa", "konbanha"] },
      { display: "ありがとう", romaji: ["arigatou", "arigato"] },
      { display: "よろしく", romaji: ["yoroshiku", "yorosiku"] },

      { display: "学校", romaji: ["gakkou", "gakko"] },
      { display: "専門学校", romaji: ["senmongakkou"] },
      { display: "授業", romaji: ["jugyou", "zyugyou"] },
      { display: "先生", romaji: ["sensei"] },
      { display: "学生", romaji: ["gakusei"] },

      { display: "情報処理", romaji: ["jouhoushori", "zyouhousyori"] },
      { display: "基本情報", romaji: ["kihonjouhou", "kihonzyouhou"] },
      { display: "応用情報", romaji: ["ouyoujouhou", "ouyouzyouhou"] },

      // カタカナ・外来語（ハイフン許容）
      { display: "コーヒー", romaji: ["ko-hi-", "kohii", "koohii"] },
      { display: "サーバー", romaji: ["sa-ba-", "saabaa"] },
      { display: "データベース", romaji: ["de-ta-be-su", "deetabeesu"] },
      { display: "ネットワーク", romaji: ["netto-wa-ku", "nettowaaku"] },
      { display: "セキュリティ", romaji: ["sekyu-ri-ti", "sekyuriti"] },

      { display: "アームバンド", romaji: ["a-mubando", "amubando"] },
      { display: "アールグレイ", romaji: ["a-rugurei", "arugurei"] },
      { display: "アイス", romaji: ["aisu"] },
      { display: "アイスクリーム", romaji: ["aisu-ku-ri-mu", "aisukuriimu"] },

      // ※ ここにあなたの長い日本語リストを追加してOK（ただし romaji の空白は除去）
      // 例：
      { display: "仮想環境", romaji: ["kasoukankyou"] },        // スペース禁止
      { display: "報告連絡相談", romaji: ["houkokurenrakusoudan"] }
    ]
  }
];

// 互換（既存 program.js 用）
window.mondailist = window.quest.map(cat => [
  cat.category,
  ...cat.items.map(q => q.display)
]);

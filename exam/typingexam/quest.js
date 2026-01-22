window.quest = [
  {
    category: "英語",
    items: [
      { display: "cat", kana: "cat", romaji: ["cat"] },
      { display: "dog", kana: "dog", romaji: ["dog"] },
      { display: "computer", kana: "computer", romaji: ["computer"] },
      { display: "server", kana: "server", romaji: ["server"] },
      { display: "network", kana: "network", romaji: ["network"] },
      { display: "opensource", kana: "opensource", romaji: ["opensource"] },
      { display: "cloud", kana: "cloud", romaji: ["cloud"] },
      { display: "datascience", kana: "datascience", romaji: ["datascience"] }
    ]
  },
  {
    category: "日本語",
    items: [
      // ひらがな
      { display: "おはよう", kana: "おはよう", romaji: ["ohayou", "ohayo"] },
      { display: "こんにちは", kana: "こんにちは", romaji: ["konnichiwa", "konnitiwa"] },
      { display: "こんばんは", kana: "こんばんは", romaji: ["konbanwa", "konbanha"] },
      { display: "ありがとう", kana: "ありがとう", romaji: ["arigatou", "arigato"] },
      { display: "よろしく", kana: "よろしく", romaji: ["yoroshiku", "yorosiku"] },

      // 漢字
      { display: "学校", kana: "がっこう", romaji: ["gakkou", "gakko"] },
      { display: "専門学校", kana: "せんもんがっこう", romaji: ["senmongakkou"] },
      { display: "授業", kana: "じゅぎょう", romaji: ["jugyou", "zyugyou"] },
      { display: "先生", kana: "せんせい", romaji: ["sensei"] },
      { display: "学生", kana: "がくせい", romaji: ["gakusei"] },

      { display: "情報処理", kana: "じょうほうしょり", romaji: ["jouhoushori", "zyouhousyori"] },
      { display: "基本情報", kana: "きほんじょうほう", romaji: ["kihonjouhou", "kihonzyouhou"] },
      { display: "応用情報", kana: "おうようじょうほう", romaji: ["ouyoujouhou", "ouyouzyouhou"] },

      // カタカナ・外来語（ハイフン許容）
      { display: "コーヒー", kana: "こーひー", romaji: ["ko-hi-", "kohii", "koohii"] },
      { display: "サーバー", kana: "さーばー", romaji: ["sa-ba-", "saabaa"] },
      { display: "データベース", kana: "でーたべーす", romaji: ["de-tabe-su", "deetabeesu"] },
      { display: "ネットワーク", kana: "ねっとわーく", romaji: ["nettowa-ku", "nettowaaku"] },
      { display: "セキュリティ", kana: "せきゅりてぃ", romaji: ["sekyu-ri-ti", "sekyuriti"] },

      { display: "アームバンド", kana: "あーむばんど", romaji: ["a-mubando", "amubando"] },
      { display: "アールグレイ", kana: "あーるぐれい", romaji: ["a-rugurei", "arugurei"] },
      { display: "アイス", kana: "あいす", romaji: ["aisu"] },
      { display: "アイスクリーム", kana: "あいすくりーむ", romaji: ["aisukuri-mu", "aisukuriimu"] },

      // 長語（スペースなし）
      { display: "仮想環境", kana: "かそうかんきょう", romaji: ["kasoukankyou"] },
      { display: "報告連絡相談", kana: "ほうこくれんらくそうだん", romaji: ["houkokurenrakusoudan"] }
    ]
  },
  {
    category: "日本語（文章）",
    items: [
    {
      display: "今日はタイピングの練習をします",
      kana: "きょうはたいぴんぐのれんしゅうをします",
      romaji: ["kyouhataipingunorenshuuwoshimasu"]
    },
    {
      display: "正しいキー入力を意識しましょう",
      kana: "ただしいきーにゅうりょくをいしきしましょう",
      romaji: ["tadashiikiinyuuryokuwoshikishimashou"]
    },
    {
      display: "ミスを恐れずに入力してください",
      kana: "みすをおそれずににゅうりょくしてください",
      romaji: ["misuwoosorezuninyuuryokushitekudasai"]
    },
    {
      display: "落ち着いて画面をよく見ましょう",
      kana: "おちついてがめんをよくみましょう",
      romaji: ["ochitsuitegamenwoyokumimashou"]
    },
    {
      display: "タイピングは継続が大切です",
      kana: "たいぴんぐはけいぞくがたいせつです",
      romaji: ["taipinguhakeizokugataisetsudesu"]
    },

    {
      display: "授業では基本操作を確認します",
      kana: "じゅぎょうではきほんそうさをかくにんします",
      romaji: ["jugyoudehakihonsousawokakuninshimasu"]
    },
    {
      display: "プログラムは少しずつ理解しましょう",
      kana: "ぷろぐらむはすこしずつりかいしましょう",
      romaji: ["puroguramuhasukoshizutsurikaishimashou"]
    },
    {
      display: "分からない時は質問してください",
      kana: "わからないときはしつもんしてください",
      romaji: ["wakaranaitokihashitsumonshitekudasai"]
    },

    {
      display: "入力速度より正確さを重視します",
      kana: "にゅうりょくそくどよりせいかくさをじゅうしします",
      romaji: ["nyuuryokusokudoyoriseikakusawojyuushishimasu"]
    },
    {
      display: "今日の内容は復習しておきましょう",
      kana: "きょうのないようはふくしゅうしておきましょう",
      romaji: ["kyounonaiyouhafukushuushiteokimashou"]
    }
  ]
}
];

// 互換（既存 program.js 用：当面維持）
window.mondailist = window.quest.map(cat => [
  cat.category,
  ...cat.items.map(q => q.kana)
]);




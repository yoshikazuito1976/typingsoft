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
    { display: "おはよう", kana: "おはよう", romaji: ["ohayou"] },
    { display: "こんにちは", kana: "こんにちは", romaji: ["konnichiwa"] },
    { display: "こんばんは", kana: "こんばんは", romaji: ["konbanwa"] },
    { display: "ありがとう", kana: "ありがとう", romaji: ["arigatou"] },
    { display: "よろしく", kana: "よろしく", romaji: ["yoroshiku"] },

    { display: "学校", kana: "がっこう", romaji: ["gakkou"] },
    { display: "専門学校", kana: "せんもんがっこう", romaji: ["senmongakkou"] },
    { display: "授業", kana: "じゅぎょう", romaji: ["jugyou"] },
    { display: "先生", kana: "せんせい", romaji: ["sensei"] },
    { display: "学生", kana: "がくせい", romaji: ["gakusei"] },

    { display: "情報処理", kana: "じょうほうしょり", romaji: ["jouhoushori"] },
    { display: "基本情報", kana: "きほんじょうほう", romaji: ["kihonjouhou"] },
    { display: "応用情報", kana: "おうようじょうほう", romaji: ["ouyoujouhou"] },
    { display: "資格試験", kana: "しかくしけん", romaji: ["shikakushiken"] },
    { display: "合格発表", kana: "ごうかくはっぴょう", romaji: ["goukakuhappyou"] },

    { display: "コンピュータ", kana: "こんぴゅーた", romaji: ["konpyu-ta"] },
    { display: "プログラム", kana: "ぷろぐらむ", romaji: ["puroguramu"] },
    { display: "データベース", kana: "でーたべーす", romaji: ["de-tabe-su"] },
    { display: "ネットワーク", kana: "ねっとわーく", romaji: ["nettowa-ku"] },
    { display: "サーバー", kana: "さーばー", romaji: ["sa-ba-"] },

    { display: "キーボード", kana: "きーぼーど", romaji: ["ki-bo-do"] },
    { display: "タイピング", kana: "たいぴんぐ", romaji: ["taipingu"] },
    { display: "入力速度", kana: "にゅうりょくそくど", romaji: ["nyuuryokusokudo"] },
    { display: "正確性", kana: "せいかくせい", romaji: ["seikakusei"] },
    { display: "練習問題", kana: "れんしゅうもんだい", romaji: ["renshuumondai"] },

    { display: "アプリケーション", kana: "あぷりけーしょん", romaji: ["apurike-shon"] },
    { display: "システム開発", kana: "しすてむかいはつ", romaji: ["shisutemukaihatsu"] },
    { display: "要件定義", kana: "ようけんていぎ", romaji: ["youkenteigi"] },
    { display: "設計書", kana: "せっけいしょ", romaji: ["sekkeisho"] },
    { display: "実装", kana: "じっそう", romaji: ["jissou"] },

    { display: "テスト工程", kana: "てすとこうてい", romaji: ["tesutokoutei"] },
    { display: "デバッグ", kana: "でばっぐ", romaji: ["debaggu"] },
    { display: "エラー処理", kana: "えらーしょり", romaji: ["era-shori"] },
    { display: "例外処理", kana: "れいがいしょり", romaji: ["reigaishori"] },
    { display: "ログ出力", kana: "ろぐしゅつりょく", romaji: ["rogushutsuryoku"] },

    { display: "クラウド", kana: "くらうど", romaji: ["kuraudo"] },
    { display: "仮想環境", kana: "かそうかんきょう", romaji: ["kasoukan kyou"] },
    { display: "Linux", kana: "りなっくす", romaji: ["rinakkusu"] },
    { display: "コマンド操作", kana: "こまんどそうさ", romaji: ["komandosousa"] },
    { display: "ファイル管理", kana: "ふぁいるかんり", romaji: ["fairukanri"] },

    { display: "就職活動", kana: "しゅうしょくかつどう", romaji: ["shuushokukatsudou"] },
    { display: "履歴書", kana: "りれきしょ", romaji: ["rirekisho"] },
    { display: "職務経歴", kana: "しょくむけいれき", romaji: ["shokumukeireki"] },
    { display: "面接対策", kana: "めんせつたいさく", romaji: ["mensetsutaisaku"] },
    { display: "自己分析", kana: "じこぶんせき", romaji: ["jikobunseki"] },

    { display: "チーム開発", kana: "ちーむかいはつ", romaji: ["chi-mukaihatsu"] },
    { display: "共同作業", kana: "きょうどうさぎょう", romaji: ["kyoudousagyou"] },
    { display: "進捗管理", kana: "しんちょくかんり", romaji: ["shinchokukanri"] },
    { display: "課題解決", kana: "かだいかいけつ", romaji: ["kadaikaiketsu"] },
    { display: "品質向上", kana: "ひんしつこうじょう", romaji: ["hinshitsukoujou"] },

    { display: "社会人基礎力", kana: "しゃかいじんきそりょく", romaji: ["shakaijinkisoryoku"] },
    { display: "報告連絡相談", kana: "ほうこくれんらくそうだん", romaji: ["houkoku renraku soudan"] },
    { display: "時間管理", kana: "じかんかんり", romaji: ["jikankanri"] },
    { display: "目標設定", kana: "もくひょうせってい", romaji: ["mokuhyousettei"] },
    { display: "自己成長", kana: "じこせいちょう", romaji: ["jikoseichou"] }
  ]
}

];

// 互換：既存 program.js が期待する mondailist を作る（先頭がタイトル、以降が「判定文字列」）
window.mondailist = window.quest.map(cat => [
  cat.category,
  ...cat.items.map(q => q.kana) // 判定はひらがなにしたいので kana を入れる
]);

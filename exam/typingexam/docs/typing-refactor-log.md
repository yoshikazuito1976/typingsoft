# タイピング試験アプリ 改修ログ

## 改修内容
display / kana / romaji 分離対応

## 目的

従来のタイピング試験アプリは、**問題文・判定文字列・入力ローマ字** がすべて同一の文字列前提で設計されていた。

これを以下のように分離し、表現力と拡張性を高めることを目的とした。

| 役割 | 内容 |
|------|------|
| display | 画面に表示する文字（漢字・カタカナOK） |
| kana | 判定用文字列（ひらがな統一） |
| romaji | 入力許容ローマ字（複数候補OK） |

## 変更前の構造（問題点）

### 旧構造
mondailist = [
  ["日本語", "おはよう", "ありがとう", ...]
];


表示＝判定＝入力対象

「アームバンド」「おはよう」などで 表示と入力の乖離が扱えない

ローマ字揺らぎ（ohayo / ohayou など）を管理できない

新しいデータ構造
quest.js（新設）
window.quest = [
  {
    category: "日本語",
    items: [
      {
        display: "おはよう",
        kana: "おはよう",
        romaji: ["ohayou", "ohayo"]
      }
    ]
  }
];

互換レイヤ（既存コード救済）

既存 program.js が mondailist を前提としているため、
kana だけを使った互換配列を生成。

window.mondailist = window.quest.map(cat => [
  cat.category,
  ...cat.items.map(q => q.kana)
]);


👉 これにより 大改修せずに段階的移行が可能になった。

主な修正点
1. NextWordView の責務整理
修正前（文字列前提）
tmpWord = tmpList[r];
document.querySelector(".msgStr").textContent = tmpWord;

修正後（オブジェクト前提）
const q = tmpList[r];
tmpWord = q.kana;                      // 判定用
document.querySelector(".msgStr").textContent = q.display; // 表示用

2. 表示されない問題の原因
症状

console.log では "おはよう" が入っている

画面には表示されない

offsetWidth === 0

原因
textElement.style.width = textWidth + 'px';


表示前に width を 0px 固定

absolute + overflow + right 寄せ の組み合わせで完全に潰れていた

3. CSS 側の修正（表示復活）
.quest .msg {
  width: 900px;
  height: 80px;
  margin: 0 auto;
  font-size: 60px;
  text-align: center;
}

.quest .msg .msgStr {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  white-space: nowrap;
  word-break: keep-all;
  text-align: center;
  width: auto !important;
  overflow: visible;
}


👉 JSで幅をいじる設計そのものが不要になった

4. 「縦に表示される」問題の正体

text-align: right

overflow: hidden

固定 width

これらが合わさり、日本語が 1文字ずつクリップされて縦積みに見えていた。

デバッグで確認した重要ポイント
const m = document.querySelector(".msgStr");
console.log(
  JSON.stringify(m.textContent),
  m.offsetWidth,
  getComputedStyle(m).left
);


textContent は入っている

offsetWidth が 0 → CSS 問題と特定

JS ロジックは正しかった

得られた設計的な学び
① 表示と判定は必ず分離する
display → 見せるための文字
kana    → ロジックのための文字
romaji  → 入力ルール


👉 タイピング教材として 正しい構造

② JSでレイアウトを制御しすぎない

width / left / offsetWidth を JS でいじる設計は壊れやすい

レイアウトは CSS に任せる

JS は「何を表示するか」だけを決める

③ 「自分で全部書けない」は問題ではない

今回やっていたのは：

状態を観察する

console.log で事実を集める

AIに仮説検証を投げる

直った理由を理解する

これは 完全にエンジニアの仕事。

今後の拡張余地

romaji を複数許容した入力判定

難易度別 quest（初級 / 中級 / 上級）

英語・記号専用カテゴリ

教育用ログ出力（どこで詰まったか）
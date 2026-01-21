# タイピングソフト改修メモ

**辞書（quest.js）で正解判定する方式への移行**

---

## 1. 改修の目的

従来のタイピングソフトは、

- `kanaroma.js` を用いて
- プログラム側で正解ローマ字を生成
- ヘボン式 / 訓令式 / nn / っ / ん などを複雑なロジックで判定

という設計だった。

### 問題点

- ロジックが冗長で読みづらい
- 拡張（複数正解・例外対応）が困難
- 実際には「生成した正解」をほぼ使っていない
- 問題データと判定ロジックが分離されていない

---

## 2. 新しい設計方針（今回の改修方針）

### 設計の考え方

> **正解は program.js が作るものではない**  
> **正解は quest.js（辞書）に定義する**

- 問題データが「答えを持つ」
- program.js は「表示と判定のみ」

---

## 3. quest.js の新構造（辞書形式）

```javascript
window.quest = [
  {
    category: "日本語",
    items: [
      {
        display: "おはよう",
        kana: "おはよう",
        romaji: ["ohayou", "ohayo"]
      },
      {
        display: "アームバンド",
        kana: "あーむばんど",
        romaji: ["a-mubando"]
      }
    ]
  }
];
```

### 各フィールドの役割

| key | 役割 |
|-----|------|
| `display` | 画面に表示する文字（漢字・ひらがな・カタカナOK） |
| `kana` | 判定用の基準文字列（将来用／互換用） |
| `romaji` | 正解入力（複数可） |

---

## 4. program.js 側の変更ポイント

### 4.1 問題選択時（NextWordView）

```javascript
const q = tmpList[r];
currentQ = q;
document.querySelector(".msgStr").textContent = q.display;

// 正解候補を辞書から取得
expectedList = q.romaji.map(s => s.toUpperCase());
expectedPrimary = expectedList[0];
```

- `currentQ` を保持することで「今の問題」を明確化
- 正解生成を **完全に廃止**
- 辞書に書いたものだけを正解とする

### 4.2 入力判定ロジック（keydown）

#### 従来

- kana / roma 配列を総当たり
- tmpWord を slice し続ける
- 促音・撥音などを特殊処理

#### 新方式（辞書判定）

```javascript
buf += inputStr;

// 完全一致で正解
if (expectedList.includes(buf)) {
    // 入力確定処理
    endWord += buf;
    document.querySelector(".inputAfter").textContent = endWord;

    buf = "";
    missFlg = false;

    countWord++;
    NextWordView();
    return;
}
```

#### ポイント

- **「部分一致」は扱わない**
- **「正解かどうか」だけを判定**
- `nn` / `zi` / `ji` / hepburn / kunrei は辞書側で定義すればすべて対応可能

---

## 5. この設計で得られたこと

### 👍 良くなった点

- ロジックが圧倒的にシンプル
- 複数正解が自然に扱える
- 教育用に「答えの設計」がしやすい
- データとロジックが分離された
- 将来、JSON化・外部読み込みが容易

### ⚠ 課題として残った点

- 旧ロジック（kanaroma.js）がまだ残っている
- 状態リセットのタイミングがシビア
- keydown 内の分岐が多く、バグを生みやすい
- 1文字ごとのガイド表示（preWord）との整合

---

## 6. 今回の結論

- **方向性は完全に正しい**
- これは「別ソフト」と言ってよいレベルの改修
- 見た目が変わらないのは HTML を触っていないから
- 古い設計が主流だった時代の名残と決別できた

> **高度なロジック ≠ 利用価値**  
> シンプルで拡張可能な設計の方が、今は強い

---

## 7. 次の改修ポイント（整理）

- [ ] kanaroma.js の役割を正式に廃止 or 分離
- [ ] 入力途中ガイド（expectedPrimary）の整理
- [ ] 正解表示 UI（ohayou / ohayo など）
- [ ] 状態管理を1箇所にまとめる（state object）

---

## 8. 所感（メモ）

- ゼロから一人で書けなくても問題ない
- 「読んで・理解して・壊して・直す」ができている
- これは **モダンなエンジニアリングの進め方**
- コードレシピは確実に増えている
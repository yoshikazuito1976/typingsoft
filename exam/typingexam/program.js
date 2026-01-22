//import quest from "./quest.js";

const quest = window.quest;

document.querySelector(".hit").style.display = "none";
document.querySelector(".miss").style.display = "none";

let currentQ = null; // 今の問題
let expectedList = []; // currentQ.romaji を大文字化した配列
let modelAns = ""; // 表示用の模範解答（ひとまず先頭）

let countStr = 0; //入力した文字数
let countWord = 0; //入力したワード数
let countMiss = 0; //ミスをした回数
let r = 0; //次に入力する文字の番号
let limitTime; //1回の練習時間
let startFlg = false; //練習開始か
let order = true; //順番かランダムか
let countdown; //タイマー用のカウントダウン変数
let tmpWord = ""; //一時的に入れておくワード用の変数
let tmpList = []; //mondailistの1つの問題を代入する配列
let endWord = ""; //入力後の文字を残しておく変数
let buf = ""; //入力中の文字を残しておく変数
let preWord = ""; //入力前の文字を残しておく変数
let missFlg = false; //ミス状態フラグ
let total = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
]; //全ての練習記録を残しておく2重配列

//全アスキーコードに対応するLeft位置とTop位置のリスト
let posi = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0], //アスキーコード0～9
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0], //アスキーコード10～19
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0], //アスキーコード20～29
  [0, 0],
  [0, 0],
  [428, 480],
  [84, 223],
  [150, 223],
  [216, 223],
  [282, 223],
  [348, 223],
  [414, 223],
  [480, 223],
  [546, 223],
  [612, 223], //!"#$%&'()
  [814, 353],
  [748, 353],
  [651, 418],
  [744, 223],
  [717, 418],
  [783, 418], //*+,-./
  [678, 223],
  [84, 223],
  [150, 223],
  [216, 223],
  [282, 223],
  [348, 223],
  [414, 223],
  [480, 223],
  [546, 223],
  [612, 223], //アスキーコード48～57（0123456789）
  [814, 353],
  [748, 353],
  [651, 418],
  [744, 223],
  [717, 418],
  [783, 418],
  [779, 288],
  [154, 353],
  [453, 418],
  [321, 418],
  [286, 353],
  [251, 288],
  [352, 353],
  [418, 353],
  [484, 353],
  [581, 288],
  [550, 353],
  [616, 353],
  [682, 353],
  [585, 418],
  [519, 418],
  [647, 288],
  [713, 288],
  [119, 288],
  [317, 288],
  [220, 353],
  [383, 288],
  [515, 288],
  [387, 418],
  [185, 288],
  [255, 418],
  [449, 288],
  [189, 418], //アスキーコード65～90（A～Z）
  [845, 288],
  [876, 223],
  [880, 353],
  [810, 223],
  [849, 418],
  [779, 288],
  [154, 353],
  [453, 418],
  [321, 418],
  [286, 353],
  [251, 288],
  [352, 353],
  [418, 353],
  [484, 353],
  [581, 288],
  [550, 353],
  [616, 353],
  [682, 353],
  [585, 418],
  [519, 418],
  [647, 288],
  [713, 288],
  [119, 288],
  [317, 288],
  [220, 353],
  [383, 288],
  [515, 288],
  [387, 418],
  [185, 288],
  [255, 418],
  [449, 288],
  [189, 418], //アスキーコード97～122（a～z）
  [845, 288],
  [876, 223],
  [880, 353],
  [810, 223],
];

//問題の配列の先頭の文字を抜き出し、タイトルにするための配列を作る
titleStr = [];
for (i = 0; i < Math.min(window.quest.length, 10); i++) {
  titleStr[i] = window.quest[i].category;
}

//ローマ字カナ対応表を1つの1次元配列で作り、それを2つの配列に分離している。
//これはのちのにデータの管理がやりやすくするため
kana = [];
roma = [];
for (i = 0, j = 0; i < kanaroma.length; i += 2, j++) {
  kana[j] = kanaroma[i];
  roma[j] = kanaroma[i + 1];
}

//ユーティリティ関数
function isPrefixOk(buf, list) {
  return list.some((ans) => ans.startsWith(buf));
}
function isExactOk(buf, list) {
  return list.includes(buf);
}

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//②これから入力する模範解答のローマ字を算出する関数
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

function preInputView(word) {
  preWord = "";
  tmp = word; //渡された引数をいったん仮の変数に代入
  while (tmp.length > 0) {
    for (i = 0; i < kana.length; i++) {
      if ("っ" + kana[i] == tmp.slice(0, kana[i].length + 1)) {
        preWord += roma[i].slice(0, 1) + roma[i];
        tmp = tmp.slice(kana[i].length + 1);
        break;
      } else if (kana[i] == tmp.slice(0, kana[i].length)) {
        preWord += roma[i];
        tmp = tmp.slice(kana[i].length);
        break;
      }
    }
  }
  document.querySelector(".inputBefore").textContent = preWord;
}

function normalizeRomaji(s) {
  // n 多打救済（あなたの思想）
  return s.replace(/n{3,}/gi, "nn");
}

function violatesPolicy(rawRomaji, targetKana) {
  // 「は」を含む語で wa を禁止（あなたの思想：はをwaとは書かない）
  // ※暫定：強めの制約。将来は位置対応で精密化できる。
  if (targetKana.includes("は") && /wa/i.test(rawRomaji)) return true;
  return false;
}

function splitConfirmedKanaAndPendingRomaji(typed) {
  // typed の末尾に a-z が残っていたら「未確定ローマ字」
  const m = typed.match(/^(.*?)([a-z]+)?$/i);
  return {
    confirmedKana: m?.[1] ?? "",
    pendingRomaji: m?.[2] ?? ""
  };
}

function adjustNBehavior(normalizedRomaji, confirmedKana, pendingRomaji) {
  // WanaKanaが「単独のn」を「ん」に確定してしまうケースを救済する
  // 例: 入学 "nyuugaku" の入力途中 "n" や "ny" で confirmedKana が "ん" になりがち
  //
  // 条件:
  // - ローマ字末尾が n または ny（= まだ「ん」を確定すべき状況ではない）
  // - ただし nn の場合は「ん」確定としてよいので除外
  const endsWithN = /n$/i.test(normalizedRomaji);
  const endsWithNY = /ny$/i.test(normalizedRomaji);
  const endsWithNN = /nn$/i.test(normalizedRomaji);

  if ((endsWithN || endsWithNY) && !endsWithNN) {
    if (confirmedKana.endsWith("ん")) {
      // 末尾の「ん」を未確定に戻す
      confirmedKana = confirmedKana.slice(0, -1);
      pendingRomaji = "n" + pendingRomaji; // pending先頭に n を戻す
    }
  }

  return { confirmedKana, pendingRomaji };
}

function judgeKanaMatch(rawRomaji, targetKana) {
  if (typeof wanakana === "undefined") {
    console.error("wanakana is not loaded");
    return { ok: false, done: false, typedKana: "", confirmedKana: "", pendingRomaji: "" };
  }

  // wa禁止（暫定：強め）
  if (targetKana.includes("は") && /wa/i.test(rawRomaji)) {
    return { ok: false, done: false, reason: "policy", typedKana: "", confirmedKana: "", pendingRomaji: "" };
  }

  const normalized = rawRomaji.replace(/n{3,}/gi, "nn");
  const typedKana = wanakana.toKana(normalized, { IMEMode: true });

  // 末尾の未確定ローマ字を分離
  let { confirmedKana, pendingRomaji } = splitConfirmedKanaAndPendingRomaji(typedKana);

  // ★ nの確定タイミングを補正
  ({ confirmedKana, pendingRomaji } = adjustNBehavior(normalized, confirmedKana, pendingRomaji));

  // 確定かな部分だけでprefix判定
  const ok = targetKana.startsWith(confirmedKana);

  // 完了判定：確定かなが完全一致 & pending無し
  const done = (confirmedKana === targetKana && pendingRomaji.length === 0);

  return { ok, done, typedKana, confirmedKana, pendingRomaji, normalized };
}


//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//③レッスン終了処理
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function lessonStop() {
  startFlg = false;
  //タイマーを終了させる
  clearInterval(countdown);
  countdown = null;
  document.querySelector(".hit").style.display = "none";
  document.querySelector(".miss").style.display = "none";

  // スペースキーの表示のリセット------------------------------------------
  document.querySelector(".space").textContent = "push Space Key"; //スペースキーの文字を設定
  document.querySelector(".space").style.backgroundColor = "yellow"; //スペースキーの背景色を黄色

  document.querySelector(".msgStr").textContent = "";

  //入力後の文字、入力中の文字、入力予定の文字をクリア
  endWord = "";
  document.querySelector(".inputAfter").textContent = endWord;
  buf = "";
  document.querySelector(".inputBuf").textContent = buf;
  preWord = modelAns;
  document.querySelector(".inputBefore").textContent = preWord;
}
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//④ヒット処理。黄色いキー表示
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function changeColor(key) {
  keyCode = key.charCodeAt(0);
  element = document.querySelector(".hit");
  element.style.left = posi[keyCode][0] + "px";
  element.style.top = posi[keyCode][1] + "px";
  element.textContent = String.fromCharCode(keyCode);
  document.querySelector(".hit").style.display = "block";
}
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//⑤ミス処理。赤いキー表示
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function missColor(key) {
  keyCode = key.charCodeAt(0);
  element = document.querySelector(".miss");
  element.style.left = posi[keyCode][0] + "px";
  element.style.top = posi[keyCode][1] + "px";
  element.textContent = String.fromCharCode(keyCode);
  document.querySelector(".miss").style.display = "block";
}
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//⑥次のワードを表示
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function centerMsgStr() {
  const el = document.querySelector(".msgStr");
  const parent = el.parentElement; // msgStrを囲ってる枠
  if (!parent) return;

  // 幅を取り直すため一旦 auto に戻す
  el.style.width = "auto";

  const parentW = parent.clientWidth;
  const elW = el.offsetWidth;

  el.style.left = (parentW - elW) / 2 + "px";
  el.style.width = elW + "px"; // 幅を固定（ズレ防止）
}

function NextWordView() {
  // tmpList が空なら補充（lessonNo が確定している前提）
  if (!tmpList || tmpList.length === 0) {
    tmpList = [...quest[lessonNo].items];
  }

  if (order) {
    // r が範囲外なら戻す
    if (r >= tmpList.length) r = 0;

    const q = tmpList[r];
    tmpWord = q.kana;
    document.querySelector(".msgStr").textContent = q.display;
    //centerMsgStr();

    currentQ = q;
    // romaji候補は将来消す前提。今は残してもOK（使わないだけ）
    expectedList = (currentQ.romaji || []).map((s) => String(s).toUpperCase());

    // かな一致方式では「模範」は kana を表示（最短）
    modelAns = currentQ.kana || "";

    r++;
    if (r >= tmpList.length) r = 0;
  } else {
    r = Math.floor(Math.random() * tmpList.length);

    const q = tmpList[r];
    tmpWord = q.kana;
    document.querySelector(".msgStr").textContent = q.display;

    currentQ = q;
    // romaji候補は将来消す前提。今は残してもOK（使わないだけ）
    expectedList = (currentQ.romaji || []).map((s) => String(s).toUpperCase());

    // かな一致方式では「模範」は kana を表示（最短）
    modelAns = currentQ.kana || "";

    tmpList.splice(r, 1);

    // 次回のために枯渇したら補充
    if (tmpList.length === 0) {
      tmpList = [...quest[lessonNo].items];
    }
  }

  // 表示系リセット（ここは元のままでOK）
  endWord = "";
  document.querySelector(".inputAfter").textContent = endWord;
  buf = "";
  document.querySelector(".inputBuf").textContent = buf;
  preWord = modelAns;
  document.querySelector(".inputBefore").textContent = preWord;

  // キー表示をクリア
  missFlg = false;
  document.querySelector(".hit").style.display = "none";
  document.querySelector(".miss").style.display = "none";
}

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//⑦レッスンスタート
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function lessonStart() {
  document.querySelector(".msgStr").style.background = "yellow"; //すぐ消す
  document.querySelector(".inputBefore").style.background = "lime"; //すぐ消す
  startFlg = true;

  document.querySelector(".space").textContent = ""; //スペースキーの文字クリア
  document.querySelector(".space").style.backgroundColor = "white"; //スペースキーの背景色を白

  document.querySelector(".unit").textContent = ""; //「文字/分」の単位をクリア

  lessonNo = document.getElementById("mondainoselect").selectedIndex;

  //1回の練習時間を決定
  limitTime = document.getElementById("selectTime").value;

  //登録順かランダムか（value値が文字列なので
  order = document.getElementById("selectOrder").value === "true";

  //入力文字数のクリア
  countStr = 0;
  document.querySelector(".score2").textContent = `${countStr} 文字`;
  //入力ワード数のクリア
  countWord = 0;
  document.querySelector(".score3").textContent = `${countWord} ワード`;
  countMiss = 0;
  document.querySelector(".score4").textContent = `${countMiss} 回`;

  r = 0;

  tmpList = [...quest[lessonNo].items];
  r = 0;
  NextWordView();

  //nullだったら実行されて、（つまり、あったらの反対なら実行）
  if (!countdown) {
    let seconds = limitTime;
    let count = 0;
    document.querySelector(".score5").textContent = `${seconds} 秒`;

    countdown = setInterval(function () {
      seconds--;
      count++;
      document.querySelector(".score1").textContent =
        `${Math.floor((600 * countStr) / count) / 10} 文字/分`;
      document.querySelector(".score5").textContent = `${seconds} 秒`;

      //練習時間が終了したら------------------------------
      if (seconds <= 0) {
        //終了処理を呼び出す
        lessonStop();

        //レッスンNoを変数Noに代入
        no = lessonNo;
        //記録を保存
        total[no][total[no].length] = Math.floor((600 * countStr) / count) / 10;
        //画面上に記録を表示
        document.querySelector(".msgStr").textContent =
          Math.floor((600 * countStr) / count) / 10;
        //画面上に記録の単位を表示
        document.querySelector(".unit").textContent = "文字/分";

        //「文字/分」という単位を結果表示のスコアのちょうど右側に表示する処理----------------------
        textElement = document.querySelector(".msgStr");
        textElement.style.width = "";
        textWidth = textElement.offsetWidth;
        textElement.style.left = (900 - textWidth) / 2 + "px";
        textElement.style.width = textWidth + "px";

        a = parseInt(
          textElement.style.left.slice(0, textElement.style.left.length - 2),
        );
        b = parseInt(
          textElement.style.width.slice(0, textElement.style.width.length - 2),
        );
        c = a + b + 10;
        document.querySelector(".unit").style.left = c + "px";

        //記録のソート----------------------------------------------
        for (j = 0; j < total[no].length; j++) {
          for (i = 0; i < total[no].length; i++) {
            if (total[no][i] < total[no][j]) {
              [total[no][i], total[no][j]] = [total[no][j], total[no][i]];
            }
          }
        }
        //記録の書き込み---------------------------------------------------
        if (no < Math.min(mondailist.length, 10)) {
          str = "";
          for (i = 0; i < Math.min(total[no].length, 10); i++) {
            str += `${i + 1}: ${total[no][i]} <span>文字/分</span><br>`;
          }
          document.querySelector(".total" + no).innerHTML = str;

          //表の1行目にタイトルと一緒に練習回数を括弧で囲んで表示
          document.querySelector(".title" + no).innerHTML =
            `${titleStr[no]}(${total[no].length})`;
        }
      }
    }, 1000);
  }
}

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//⑧キー入力を監視するためのイベントリスナーを追加
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
document.addEventListener("keydown", function (event) {
  //アスキーコードを取得
  let asciiCode = null;
  if (event.key && event.key.length === 1) {
    asciiCode = event.key.toUpperCase().charCodeAt(0);
  }

  if (event.key === "Tab") {
    event.preventDefault(); // Tabキーのデフォルト動作を無効にする
  } else if (startFlg) {
    //エスケイプキーを押した時の処理----------------------------------------
    if (event.key == "Escape" && event.code == "Escape") {
      lessonStop();
    }
    // 全角半角キーを押した場合の処理---------------------------------------
    else if (event.code === "Backquote") {
    }
    //CapsLockキーを押した場合の処理----------------------------------------
    else if (event.key == "Alphanumeric" && event.code == "CapsLock") {
    }
    //シフトキーを押した時の処理
    else if (event.shiftKey && asciiCode == 83) {
    }
    //コントロールキーを押した場合の処理------------------------------------
    else if (event.ctrlKey) {
    }
    //バックスペースキーを押した場合の処理------------------------------------
    else if (event.key == "Backspace" && event.code == "Backspace") {
      // BackSpaceは無視される（戻る仕様をなくした）
    }
    //エンターキーを押した場合の処理-----------------------------------------
    else if (event.code === "Enter") {
    }
    //それ以外のキーを押した場合の処理----------------------------------------
    else {
      // 1文字キー以外は無視（Shift / Arrow / F1 など）
      if (!event.key || event.key.length !== 1) return;

      const ch = event.key.toUpperCase();

      // currentQ / expectedList が未初期化なら何もしない（保険）
      if (!currentQ) return;
      // rawRomaji を貯める（buf は「ローマ字」バッファとして維持）
      const nextBuf = buf + ch;

      // 判定（かな一致）
      const targetKana = currentQ.kana || "";
      const judge = judgeKanaMatch(nextBuf, targetKana);

      // かな変換の途中一致が崩れたらミス
      if (!judge.ok) {
        missFlg = true;
        countMiss++;
        document.querySelector(".score4").textContent = `${countMiss} 回`;
        missColor(ch);
        return;
      }

      // OK: バッファ更新
      buf = nextBuf;

      // 表示：今打ってるローマ字はそのまま見せる（or 後でかな表示に切替可）
      document.querySelector(".inputBuf").textContent = buf;

      changeColor(ch);

      // ミス表示は正しい入力が来たら解除
      if (missFlg) {
        missFlg = false;
        document.querySelector(".miss").style.display = "none";
      }

      // 文字数はキー入力数として加算（現行踏襲）
      countStr++;
      document.querySelector(".score2").textContent = `${countStr} 文字`;

      // inputBefore を「残りかな」にする（modelAns＝targetKana なので素直に更新できる）
      document.querySelector(".inputBefore").textContent = targetKana.slice(
        judge.confirmedKana.length,
      );

      // 1問クリア：かな完全一致
      if (judge.done) {
        countWord++;
        document.querySelector(".score3").textContent = `${countWord} ワード`;
        NextWordView();
      }
    }
  } else {
    //スペースキーを押して練習開始（環境差に強い）
    if (
      event.code === "Space" ||
      event.key === " " ||
      event.key === "Spacebar"
    ) {
      event.preventDefault(); // ページスクロール等も抑止
      lessonStart();
    }
  }
});

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//関数外処理
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

for (i = 0; i < Math.min(quest.length, 10); i++) {
  document.querySelector(".title" + i).innerHTML = `${titleStr[i]}(0)`;
}

//選択したレッスンごとにキーボードの文字の色を変える----------------------------------------------------
changeLesson();

//関数を呼び出し、問題のリストを作成--------------------------------------------------------------------
mondaiadd();

//スペースキーの文字と背景色を設定----------------------------------------------------------------------
document.querySelector(".space").textContent = "push Space Key"; //スペースキーの文字を設定
document.querySelector(".space").style.backgroundColor = "yellow"; //スペースキーの背景色を黄色

// コンボボックスからフォーカスを外す--------------------------------------------------------------------
document.getElementById("selectTime").addEventListener("change", function () {
  document.getElementById("selectTime").blur();
});
document.getElementById("selectOrder").addEventListener("change", function () {
  document.getElementById("selectOrder").blur();
});
document
  .getElementById("mondainoselect")
  .addEventListener("change", function () {
    document.getElementById("mondainoselect").blur();
    changeLesson();
  });

document.querySelector(".hit").style.display = "none";
document.querySelector(".miss").style.display = "none";
let countStr = 0;         //入力した文字数
let countWord = 0;        //入力したワード数
let countMiss = 0;        //ミスをした回数
let r = 0;                //次に入力する文字の番号
let limitTime;            //1回の練習時間
let startFlg = false;     //練習開始か
let order = true;         //順番かランダムか
let countdown;            //タイマー用のカウントダウン変数
let tmpWord = "";         //一時的に入れておくワード用の変数
let tmpList = [];         //mondailistの1つの問題を代入する配列
let endWord = "";         //入力後の文字を残しておく変数
let buf = "";             //入力中の文字を残しておく変数
let preWord = "";         //入力前の文字を残しておく変数
let total = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];   //全ての練習記録を残しておく2重配列

//全アスキーコードに対応するLeft位置とTop位置のリスト
let posi = [
    [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
    [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
    [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0],
    [0, 0], [0, 0], [428, 480],
    [84, 223], [150, 223], [216, 223], [282, 223], [348, 223], [414, 223], [480, 223], [546, 223], [612, 223],//!"#$%&'()
    [814, 353], [748, 353], [651, 418], [744, 223], [717, 418], [783, 418],                                    //*+,-./
    [678, 223], [84, 223], [150, 223], [216, 223], [282, 223], [348, 223], [414, 223], [480, 223], [546, 223], [612, 223],//0123456789
    [814, 353], [748, 353], [651, 418], [744, 223], [717, 418], [783, 418], [779, 288],
    [154, 353], [453, 418], [321, 418], [286, 353], [251, 288], [352, 353], [418, 353], [484, 353], [581, 288], [550, 353], [616, 353], [682, 353], [585, 418], [519, 418], [647, 288], [713, 288], [119, 288], [317, 288], [220, 353], [383, 288], [515, 288], [387, 418], [185, 288], [255, 418], [449, 288], [189, 418],
    [845, 288], [876, 223], [880, 353], [810, 223], [849, 418], [779, 288],
    [154, 353], [453, 418], [321, 418], [286, 353], [251, 288], [352, 353], [418, 353], [484, 353], [581, 288], [550, 353], [616, 353], [682, 353], [585, 418], [519, 418], [647, 288], [713, 288], [119, 288], [317, 288], [220, 353], [383, 288], [515, 288], [387, 418], [185, 288], [255, 418], [449, 288], [189, 418],
    [845, 288], [876, 223], [880, 353], [810, 223],
];



titleStr = [];
for (i = 0; i <= 9; i++) {
    titleStr[i] = mondailist[i][0];
}



//ローマ字カナ対応表を1つの1次元配列で作り、それを2つの配列に分離している。
//これはのちのにデータの管理がやりやすくするため
kana = [];
roma = [];
for (i = 0, j = 0; i < kanaroma.length; i += 2, j++) {
    kana[j] = kanaroma[i];
    roma[j] = kanaroma[i + 1];
}

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//②これから入力する模範解答のローマ字を算出する関数
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function preInputView(word) {
    preWord = "";
    tmp = word;      //渡された引数をいったん仮の変数に代入
    while (tmp.length > 0) {
        for (i = 0; i < kana.length; i++) {
            if ("っ" + kana[i] == tmp.slice(0, kana[i].length + 1)) {
                preWord += roma[i].slice(0, 1) + roma[i];
                tmp = tmp.slice(kana[i].length + 1);
                break;
            }
            else if (kana[i] == tmp.slice(0, kana[i].length)) {
                preWord += roma[i];
                tmp = tmp.slice(kana[i].length);
                break;
            }
        }
    }
    document.querySelector(".inputBefore").textContent = preWord;
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
    document.querySelector(".space").textContent = "push Space Key";    //スペースキーの文字を設定
    document.querySelector(".space").style.backgroundColor = "yellow";  //スペースキーの背景色を黄色

    document.querySelector(".msgStr").textContent = '';

    //入力後の文字、入力中の文字、入力予定の文字をクリア
    endWord = "";
    document.querySelector(".inputAfter").textContent = endWord;
    buf = "";
    document.querySelector(".inputBuf").textContent = buf;
    preWord = "";
    document.querySelector(".inputBefore").textContent = preWord;
}
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//④ヒット処理。黄色いキー表示
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function changeColor(key) {
    keyCode = key.charCodeAt(0);
    element = document.querySelector('.hit');
    element.style.left = posi[keyCode][0] + 'px';
    element.style.top = posi[keyCode][1] + 'px';
    element.textContent = String.fromCharCode(keyCode);
    document.querySelector(".hit").style.display = "block";
}
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//⑤ミス処理。赤いキー表示
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function missColor(key) {
    keyCode = key.charCodeAt(0);
    element = document.querySelector('.miss');
    element.style.left = posi[keyCode][0] + 'px';
    element.style.top = posi[keyCode][1] + 'px';
    element.textContent = String.fromCharCode(keyCode);
    document.querySelector(".miss").style.display = "block";
}
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//⑥次のワードを表示
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function NextWordView() {
    //登録順に表示----------------------------------------------------
    if (order) {
        tmpWord = tmpList[r];
        document.querySelector(".msgStr").textContent = tmpWord;
        r++;
        if (r >= tmpList.length) {
            r = 0;
        }
    }
    //ランダムで表示--------------------------------------------------
    else {
        r = Math.floor(Math.random() * tmpList.length);   //乱数を求める
        tmpWord = tmpList[r];                             //配列から1件抜出し変数に代入
        tmpList.splice(r, 1);                             //代入したデータを配列から削除

        //配列にデータが1件もなくなったら
        if (tmpList.length == 0) {
            tmpList = [...mondailist[lessonNo]];    //大元の配列から今のレッスンNoのデータを練習用配列にコピー代入
            tmpList = tmpList.slice(1);             //先頭の文字列はタイトルなので必ず削除
        }
        document.querySelector(".msgStr").textContent = tmpWord;
    }
    //入力後の文字、入力中の文字、入力予定の文字をクリア
    endWord = "";
    document.querySelector(".inputAfter").textContent = endWord;
    buf = "";
    document.querySelector(".inputBuf").textContent = buf;
    preWord = "";
    document.querySelector(".inputBefore").textContent = preWord;

    //--------------------------------------------------------------
    textElement = document.querySelector(".msgStr");
    textElement.style.width = '';                          //一度幅をクリアする必要がある
    textWidth = textElement.offsetWidth;                   //幅を取得する
    textElement.style.left = (900 - textWidth) / 2 + 'px'; //幅から左位置を算出する
    textElement.style.width = textWidth + 'px';            //幅を固定として指定する
    //--------------------------------------------------------------
    //入力するべき文字を渡して、そこからローマ字の完成図を求める
    preInputView(tmpWord);

    //入力予定の文字が0文字じゃなかったら、先頭文字を渡して黄色いキーを表示
    if (preWord.length > 0) {
        changeColor(preWord.slice(0, 1));
    }
}

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//⑦レッスンスタート
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function lessonStart() {
    startFlg = true;

    document.querySelector(".space").textContent = "";                //スペースキーの文字クリア
    document.querySelector(".space").style.backgroundColor = "white"; //スペースキーの背景色を白

    document.querySelector(".unit").textContent = "";     //「文字/分」の単位をクリア

    lessonNo = document.getElementById("mondainoselect").selectedIndex;

    //1回の練習時間を決定
    limitTime = document.getElementById("selectTime").value;

    //登録順かランダムか（value値が文字列なので
    order = (document.getElementById("selectOrder").value === "true");

    //入力文字数のクリア
    countStr = 0;
    document.querySelector(".score2").textContent = `${countStr} 文字`;
    //入力ワード数のクリア
    countWord = 0;
    document.querySelector(".score3").textContent = `${countWord} ワード`;
    countMiss = 0;
    document.querySelector(".score4").textContent = `${countMiss} 回`;

    r = 0;

    tmpList = [...mondailist[lessonNo]];                   //大元の配列から今のレッスンNoのデータを練習用配列にコピー代入
    tmpList = tmpList.slice(1);                            //先頭の文字列はタイトルなので必ず削除

    NextWordView();

    //nullだったら実行されて、（つまり、あったらの反対なら実行）
    if (!countdown) {
        let seconds = limitTime;
        let count = 0;
        document.querySelector(".score5").textContent = `${seconds} 秒`;

        countdown = setInterval(function () {
            seconds--;
            count++;
            document.querySelector(".score1").textContent = `${Math.floor(600 * countStr / count) / 10} 文字/分`;
            document.querySelector(".score5").textContent = `${seconds} 秒`;

            //練習時間が終了したら------------------------------
            if (seconds <= 0) {
                //終了処理を呼び出す
                lessonStop();

                //レッスンNoを変数Noに代入
                no = lessonNo;
                //記録を保存
                total[no][total[no].length] = Math.floor(600 * countStr / count) / 10;
                //記録を表示
                document.querySelector(".msgStr").textContent = Math.floor(600 * countStr / count) / 10;
                //記録の単位を表示
                document.querySelector(".unit").textContent = "文字/分";

                //「文字/分」という単位を結果表示のスコアのちょうど右側に表示する処理----------------------
                textElement = document.querySelector(".msgStr");
                textElement.style.width = '';
                textWidth = textElement.offsetWidth;
                textElement.style.left = (900 - textWidth) / 2 + 'px';
                textElement.style.width = textWidth + 'px';

                unitElement = document.querySelector(".unit");
                a = parseInt(textElement.style.left.slice(0, textElement.style.left.length - 2));
                b = parseInt(textElement.style.width.slice(0, textElement.style.width.length - 2));
                c = a + b + 10;
                unitElement.style.left = c + 'px';

                //記録のソート----------------------------------------------
                for (j = 0; j < 10; j++) {
                    for (i = 0; i < total[no].length; i++) {
                        if (total[no][i] < total[no][j]) {
                            [total[no][i], total[no][j]] = [total[no][j], total[no][i]];
                        }
                    }
                }
                //記録の書き込み---------------------------------------------------
                if (no <= 9) {
                    str = "";
                    for (i = 0; i < Math.min(total[no].length, 10); i++) {
                        str += `${i + 1}: ${total[no][i]} <span>文字/分</span><br>`;
                    }
                    document.querySelector(".total" + no).innerHTML = str;

                    //表の1行目にタイトルと一緒に練習回数を括弧で囲んで表示
                    document.querySelector(".title" + no).innerHTML = `${titleStr[no]}(${total[no].length})`;
                }
            }
        }, 1000);
    }
}

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//⑧キー入力を監視するためのイベントリスナーを追加
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
document.addEventListener('keydown', function (event) {
    let asciiCode = event.key.charCodeAt(0);
    if (event.key === "Tab") {
        event.preventDefault(); // Tabキーのデフォルト動作を無効にする
    }
    else if (startFlg) {
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
        //バックスペースキーを押した時の処理------------------------------------
        else if (event.key == "Backspace" && event.code == "Backspace") {
            if (buf.length > 0) {
                buf = buf.slice(0, -1);                                 //文字列から末尾の1文字を削除
                document.querySelector(".inputBuf").textContent = buf;  //削除した文字列を表示
                //BSでbufを削除して、文字数が0文字になったら、
                if (buf.length == 0) {
                    preInputView(tmpWord);
                }
                document.querySelector(".miss").style.display = "none";
            }
        }
        //エンターキーを押した場合の処理-----------------------------------------
        else if (event.code === "Enter") {
        }
        //それ以外のキーを押した場合の処理----------------------------------------
        else {
            inputStr = String.fromCharCode(asciiCode).toUpperCase();
            questStr = tmpWord.slice(0, 1);

            buf += inputStr;
            document.querySelector(".inputBuf").textContent = buf;
            correct = false;
            //「バッファの最後の文字」と「入力予定文字の先頭の文字」が同じだったら
            if (buf.slice(-1) == preWord.slice(0, 1)) {
                preWord = preWord.slice(1);                                    //文字列から先頭の文字を削除
                document.querySelector(".inputBefore").textContent = preWord;  //削除後の文字を表示
                //入力予定文字がまだ1文字以上残っていたら、次の文字のキーを表示
                if (preWord.length > 0) {
                    changeColor(preWord.slice(0, 1));
                    correct = true;
                }
            }

            flag = false;
            for (i = 0; i < kana.length; i++) {
                //通常のローマ字判定
                if (kana[i] == tmpWord.slice(0, kana[i].length) && roma[i] == buf) {
                    tmpWord = tmpWord.slice(kana[i].length);
                    document.querySelector(".msgStr").textContent = tmpWord;
                    countStr += kana[i].length;

                    flag = true;
                    break;
                }
                //促音「っ」がある時のローマ字判定
                else if ("っ" + kana[i] == tmpWord.slice(0, kana[i].length + 1) && roma[i][0] + roma[i] == buf) {
                    tmpWord = tmpWord.slice(kana[i].length + 1);
                    document.querySelector(".msgStr").textContent = tmpWord;
                    countStr += kana[i].length + 1;

                    flag = true;
                    break;
                }
            }
            //文字が一致したら
            if (flag == true) {
                document.querySelector(".miss").style.display = "none";

                correct = true;
                //キーバッファを打ち終わった文字に移す--------------
                endWord += buf;
                document.querySelector(".inputAfter").textContent = endWord;
                //キーバッファをクリア-------------------------------
                buf = "";
                document.querySelector(".inputBuf").textContent = buf;
                document.querySelector(".score2").textContent = `${countStr} 文字`;
                //1単語打ち終わった後の処理
                if (tmpWord.length == 0) {
                    countWord++;
                    document.querySelector(".score3").textContent = `${countWord} ワード`;
                    NextWordView();
                }
                preInputView(tmpWord);
            }
            //ミスキー入力だったら
            if (correct == false) {
                console.log("miss");
                countMiss++;
                document.querySelector(".score4").textContent = `${countMiss} 回`;
                missColor(inputStr);
                console.log(inputStr);
            }
        }
    }
    else {
        //スペースキーを押して練習開始
        if (asciiCode == 32) {
            lessonStart();
        }
    }
});

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//関数外処理
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

for (i = 0; i <= 9; i++) {
    document.querySelector(".title" + i).innerHTML = `${titleStr[i]}(0)`;
}

//選択したレッスンごとにキーボードの文字の色を変える----------------------------------------------------
changeLesson();

//関数を呼び出し、問題のリストを作成--------------------------------------------------------------------
mondaiadd();

//スペースキーの文字と背景色を設定----------------------------------------------------------------------
document.querySelector(".space").textContent = "push Space Key";    //スペースキーの文字を設定
document.querySelector(".space").style.backgroundColor = "yellow";  //スペースキーの背景色を黄色

// コンボボックスからフォーカスを外す--------------------------------------------------------------------
document.getElementById("selectTime").addEventListener("change", function () {
    document.getElementById("selectTime").blur();
});
document.getElementById("selectOrder").addEventListener("change", function () {
    document.getElementById("selectOrder").blur();
});
document.getElementById("mondainoselect").addEventListener("change", function () {
    document.getElementById("mondainoselect").blur();
    changeLesson();
});

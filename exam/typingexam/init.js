//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//⑨全てグレー文字にする
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function grayLesson() {
    for (i = 2; i <= 14; i++) {
        document.querySelector(".dan1 ul li:nth-child(" + i + ")").style.color = '#ccc';
    }
    for (i = 2; i <= 13; i++) {
        document.querySelector(".dan2 ul li:nth-child(" + i + ")").style.color = '#ccc';
    }
    for (i = 2; i <= 13; i++) {
        document.querySelector(".dan3 ul li:nth-child(" + i + ")").style.color = '#ccc';
    }
    for (i = 2; i <= 12; i++) {
        document.querySelector(".dan4 ul li:nth-child(" + i + ")").style.color = '#ccc';
    }
}
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//⑩コンボボックスのレッスンによって、キーボードの文字の色を変更する
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function changeLesson() {
    //いったん、全てのボタンをグレーにする
    grayLesson();
    //今は何段目かを算出
    dan = document.getElementById("mondainoselect").value;
    dan = 9;
    //ここ以降で、段によって文字の色を変更している
    //FGJH--------------------------------------------------------------------------------------
    if (dan == 0) {
        //FGJHのみ色を黒にする
        for (i = 5; i <= 8; i++) {
            document.querySelector(".dan3 ul li:nth-child(" + i + ")").style.color = '#000';
        }
    }
    //中段往復＆中段練習--------------------------------------------------------------------------------------
    else if (dan == 1 || dan == 2) {
        //中段の文字の色を黒にする
        for (i = 2; i <= 11; i++) {
            document.querySelector(".dan3 ul li:nth-child(" + i + ")").style.color = '#000';
        }
    }
    //中段＋上段--------------------------------------------------------------------------------------
    else if (dan == 3) {
        //中段の文字の色を黒にする
        for (i = 2; i <= 11; i++) {
            document.querySelector(".dan3 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //上段の文字の色を黒にする
        for (i = 2; i <= 11; i++) {
            document.querySelector(".dan2 ul li:nth-child(" + i + ")").style.color = '#000';
        }
    }
    //中段＋上段＋下段--------------------------------------------------------------------------------------
    else if (dan == 4) {
        //上段の文字の色を黒にする
        for (i = 2; i <= 11; i++) {
            document.querySelector(".dan2 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //中段の文字の色を黒にする
        for (i = 2; i <= 11; i++) {
            document.querySelector(".dan3 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //下段の文字の色を黒にする
        for (i = 2; i <= 10; i++) {
            document.querySelector(".dan4 ul li:nth-child(" + i + ")").style.color = '#000';
        }
    }
    //中段＋上段＋下段＋数字--------------------------------------------------------------------------------------
    else if (dan == 5) {
        //数字段の文字の色を黒にする
        for (i = 2; i <= 11; i++) {
            document.querySelector(".dan1 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //上段の文字の色を黒にする
        for (i = 2; i <= 11; i++) {
            document.querySelector(".dan2 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //中段の文字の色を黒にする
        for (i = 2; i <= 11; i++) {
            document.querySelector(".dan3 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //下段の文字の色を黒にする
        for (i = 2; i <= 10; i++) {
            document.querySelector(".dan4 ul li:nth-child(" + i + ")").style.color = '#000';
        }
    }
    //中段＋上段＋下段＋数字＋記号--------------------------------------------------------------------------------------
    else if (dan == 6) {
        //数字段（記号含む）の文字の色を黒にする
        for (i = 2; i <= 14; i++) {
            document.querySelector(".dan1 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //上段（記号含む）の文字の色を黒にする
        for (i = 2; i <= 13; i++) {
            document.querySelector(".dan2 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //中段（記号含む）の文字の色を黒にする
        for (i = 2; i <= 13; i++) {
            document.querySelector(".dan3 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //下段（記号含む）の文字の色を黒にする
        for (i = 2; i <= 12; i++) {
            document.querySelector(".dan4 ul li:nth-child(" + i + ")").style.color = '#000';
        }
    }
    //記号のみ--------------------------------------------------------------------------------------
    else if (dan == 7) {
        //数字段（記号含む）の文字の色を黒にする
        for (i = 2; i <= 14; i++) {
            document.querySelector(".dan1 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //上段（記号含む）の文字の色を黒にする
        for (i = 12; i <= 13; i++) {
            document.querySelector(".dan2 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //中段（記号含む）の文字の色を黒にする
        for (i = 11; i <= 13; i++) {
            document.querySelector(".dan3 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //下段（記号含む）の文字の色を黒にする
        for (i = 9; i <= 12; i++) {
            document.querySelector(".dan4 ul li:nth-child(" + i + ")").style.color = '#000';
        }
    }
    //A-Z--------------------------------------------------------------------------------------
    else if (dan == 8) {
        //上段の文字の色を黒にする
        for (i = 2; i <= 11; i++) {
            document.querySelector(".dan2 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //中段の文字の色を黒にする
        for (i = 2; i <= 10; i++) {
            document.querySelector(".dan3 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //下段の文字の色を黒にする
        for (i = 2; i <= 8; i++) {
            document.querySelector(".dan4 ul li:nth-child(" + i + ")").style.color = '#000';
        }
    }
    //ローマ字練習以降--------------------------------------------------------------------------------------
    else if (dan >= 9) {
        //数字段（記号含む）の文字の色を黒にする
        for (i = 2; i <= 14; i++) {
            document.querySelector(".dan1 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //上段（記号含む）の文字の色を黒にする
        for (i = 2; i <= 13; i++) {
            document.querySelector(".dan2 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //中段（記号含む）の文字の色を黒にする
        for (i = 2; i <= 13; i++) {
            document.querySelector(".dan3 ul li:nth-child(" + i + ")").style.color = '#000';
        }
        //下段（記号含む）の文字の色を黒にする
        for (i = 2; i <= 12; i++) {
            document.querySelector(".dan4 ul li:nth-child(" + i + ")").style.color = '#000';
        }
    }
    //=====================================================================================================
    //表示する文字自体の変更
    //=====================================================================================================
    //記号のみの場合のみ、数字キーの場所には記号を表示する-------------------------------------------------
    if (dan == 7) {
        document.querySelector(".dan1 ul li:nth-child(2)").textContent = "!";
        document.querySelector(".dan1 ul li:nth-child(3)").textContent = "\"";
        document.querySelector(".dan1 ul li:nth-child(4)").textContent = "#";
        document.querySelector(".dan1 ul li:nth-child(5)").textContent = "$";
        document.querySelector(".dan1 ul li:nth-child(6)").textContent = "%";
        document.querySelector(".dan1 ul li:nth-child(7)").textContent = "&";
        document.querySelector(".dan1 ul li:nth-child(8)").textContent = "'";
        document.querySelector(".dan1 ul li:nth-child(9)").textContent = "(";
        document.querySelector(".dan1 ul li:nth-child(10)").textContent = ")";
        document.querySelector(".dan1 ul li:nth-child(11)").textContent = "";
    }
    //通常通り、数字キーの場所には数字を表示する-------------------------------------------------------------
    else {
        document.querySelector(".dan1 ul li:nth-child(2)").textContent = "1";
        document.querySelector(".dan1 ul li:nth-child(3)").textContent = "2";
        document.querySelector(".dan1 ul li:nth-child(4)").textContent = "3";
        document.querySelector(".dan1 ul li:nth-child(5)").textContent = "4";
        document.querySelector(".dan1 ul li:nth-child(6)").textContent = "5";
        document.querySelector(".dan1 ul li:nth-child(7)").textContent = "6";
        document.querySelector(".dan1 ul li:nth-child(8)").textContent = "7";
        document.querySelector(".dan1 ul li:nth-child(9)").textContent = "8";
        document.querySelector(".dan1 ul li:nth-child(10)").textContent = "9";
        document.querySelector(".dan1 ul li:nth-child(11)").textContent = "0";
    }
    //--------------------------------------------------------------------------------------
}
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//①テキストとバリューを渡してコンボボックスにデータを増やすためだけの関数
//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
function mondaiadd() {
    for (i = 0; i < mondailist.length; i++) {
        // 追加するオプションの内容をこの3行で生成
        const option = document.createElement("option");// 新しいオプションを作成
        option.text = mondailist[i][0];                 // オプションのテキスト。0番は問題リストのタイトルになっている
        option.value = i;                               // オプションの値

        // オプションをコンボボックスに追加
        document.getElementById("mondainoselect").add(option, null);
    }
}

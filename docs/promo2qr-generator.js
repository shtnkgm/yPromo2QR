"use strict";
// ロード時
$(function(){
    $('#outputBox').hide();
    $('#hiddenArea').hide();
});

// トースト表示
(function() {
    'use strict';
    var snackbarContainer = document.querySelector('#snackbar');
    var showToastButton = document.querySelector('#getQRCodeButton');
    showToastButton.addEventListener('click', function() {
        'use strict';

        var input = $('#input').val();

        // プロモコードが入力されていない場合のエラー処理
        if (input.length == 0) {
            return;
        }

        var data = {message: 'クリップボードにコピーしました'};
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    });
}());

// 「QRコードを作成する」ボタンがクリックされたとき
$('#getQRCodeButton').on("click", function() {
    var input = $('#input').val();

    // プロモコードが入力されていない場合のエラー処理
    if (input.length == 0) {
        alert("プロモコードを入力してください");
        return;
    }

    // 1行ごとに入力を配列に格納
    var inputArray = input.split(/\r\n|\r|\n/);

    // 出力用に変換して配列に格納
    var outputArray = [];
    jQuery.each(inputArray, function() {
        if (this.length == 0) {
            return true;
        }

        var installUrl = "https://phobos.apple.com/WebObjects/MZFinance.woa/wa/freeProductCodeWizard?code=" + this;
        var resultPageUrl = window.location.href.replace(/index.html/g, "") + "result.html" + "?" + installUrl;
        var outputString = this + "([QRコード](" + resultPageUrl + "))";

        // Todoプレフィックス付与
        if( $("#todoPrefixLabel").is('.is-checked') ) {
            outputString = "- [ ] " + outputString;
        }

        outputArray.push(outputString);
    });

    // 変換結果を画面に表示（改行区切りで表示）
    var outputString = outputArray.join("\n");
    var output = $('#output');
    var outputBox = $('#outputBox');
    output.text(outputString);
    outputBox.show('slow');

    // クリップボードにコピー
    var hiddenArea = $('#hiddenArea');
    hiddenArea.show();
    hiddenArea.val(outputString);
    hiddenArea.select();
    document.execCommand('copy');
    hiddenArea.hide();
});

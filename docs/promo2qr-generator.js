"use strict";

$('#outputBox' ).hide();
$('#hiddenArea').hide();


// 「QRコードを作成する」ボタンがクリックされたとき
$('#getQRCodeButton').on("click", function() {
    var input = $('#input').val();

    // プロモコードが入力されていない場合のエラー処理
    if (input.length == 0) {
	$('#snackbar').get(0).MaterialSnackbar.showSnackbar({
	    message: "プロモコードを入力してください"
	});

	return;
    }

    // 1行ごとに入力を配列に格納
    var inputArray = input.split(/\r\n|\r|\n/);

    // 不要な行を除去
    inputArray = inputArray.filter(function(i){ return (i.length > 0); });

    // 出力用に変換して配列に格納
    var outputArray = inputArray.map(function(i) {
	var installUrl    = "https://phobos.apple.com/WebObjects/MZFinance.woa/wa/freeProductCodeWizard?code=" + i;
	var resultPageUrl = window.location.href.replace(/index.html/g, "") + "result.html" + "?" + installUrl;
	var outputString  = i + "([QRコード](" + resultPageUrl + "))";

	return outputString;
    });

    // Todoプレフィックス付与
    if( $("#todoPrefixLabel").is('.is-checked') ) {
	outputArray = outputArray.map(function(i) {
	    return "- [ ] " + i;
	});
    }

    // 変換結果を画面に表示（改行区切りで表示）
    var outputString = outputArray.join("\n");
    $('#output'   ).text(outputString);
    $('#outputBox').show('slow');

    // クリップボードにコピー
    var hiddenArea = $('#hiddenArea');
    hiddenArea.show();
    hiddenArea.val(outputString);
    hiddenArea.select();
    document.execCommand('copy');
    hiddenArea.hide();

    // トースト表示
    $('#snackbar').get(0).MaterialSnackbar.showSnackbar({
	message: 'クリップボードにコピーしました'
    });
});

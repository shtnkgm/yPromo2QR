"use strict";

var url = location.search.substring(1);

var qr = qrcode(0, "L");
qr.addData(url);
qr.make();

$("div#qr-holder").html(qr.createSvgTag(5));
$("div#url"      ).text(url);

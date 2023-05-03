$(function() {
  // 监听 popup.html 页面的按钮点击事件
  $("#btn-copy").click(copyToClipboard);
  $("#btn-save").click(saveToFile);
  $("#btn-export").click(exportToFile);
  $("#btn-clear").click(clearData);

  // 监听 content.js 发送的消息
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateInfo") {
      $("#shop-name").text(request.info.name);
      $("#shop-score").text(request.info.score);
      $("#shop-phone").text(request.info.phone);
    }
  });

  // 复制文本到剪贴板
  function copyToClipboard() {
    var name = $("#shop-name").text();
    var score = $("#shop-score").text();
    var phone = $("#shop-phone").text();

    var text = "店铺名称：" + name + "\n分数：" + score + "\n联系电话：" + phone;

    var input = $("<textarea>")
      .val(text)
      .appendTo("body")
      .select();

    document.execCommand("copy");

    input.remove();

    alert("复制成功！");
  }

  // 将数据保存到本地文件
  function saveToFile() {
    var name = $("#shop-name").text();
    var score = $("#shop-score").text();
    var phone = $("#shop-phone").text();

    var data = "店铺名称：" + name + "\n分数：" + score + "\n联系电话：" + phone;

    var blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "shop_info.txt");

    alert("保存成功！");
  }

  // 将数据导出到 csv 文件
  function exportToFile() {
    var name = $("#shop-name").text();
    var score = $("#shop-score").text();
    var phone = $("#shop-phone").text();

    var csvData = [["店铺名称", "分数", "联系电话"], [name, score, phone]].join(
      "\r\n"
    );

    var blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "shop_info.csv");

    alert("导出成功！");
  }

  // 清空数据
  function clearData() {
    $("#shop-name").text("");
    $("#shop-score").text("");
    $("#shop-phone").text("");

    alert("数据已清空！");
  }
});

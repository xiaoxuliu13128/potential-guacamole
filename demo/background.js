chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "copy") {
    var data = {
      shopName: request.shopName,
      score: request.score,
      phoneNum: request.phoneNum,
    };
    chrome.storage.local.get("copyData", function(result) {
      var copyData = result.copyData || [];
      copyData.push(data);
      chrome.storage.local.set({ copyData: copyData }, function() {
        sendResponse("ok");
      });
    });
    return true;
  } else if (request.action == "export") {
    chrome.storage.local.get("copyData", function(result) {
      var csvContent =
        "data:text/csv;charset=utf-8," +
        "店铺名,分数,手机号\n" +
        result.copyData
          .map(function(item) {
            return [item.shopName, item.score, item.phoneNum];
          })
          .join("\n");
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "export.csv");
      document.body.appendChild(link);
      link.click();
    });
  }
});

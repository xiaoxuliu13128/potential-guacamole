// content.js

// 获取页面中店铺信息的函数
function getShopInfo() {
  const shopName = $('h1.shop-name-text').text();
  const score = $('span.score-num').text();
  const phone = $('div.phone span').text();
  return {
    shopName,
    score,
    phone
  }
}

// 监听来自 popup 的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'get_shop_info') {
    const shopInfo = getShopInfo();
    sendResponse({
      shopInfo
    });
  }
});

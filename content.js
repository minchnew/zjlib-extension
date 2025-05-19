function renderInStock(data) {
  var template = `<div class="gray_ad buyinfo">
  <div>
    <h2>
      <span>浙江图书馆</span>
      &nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·
    </h2>
    <ul class="bs">
      <li style="border-bottom:0;">
        <div class="cell price-btn-wrapper">
          <div class="vendor-name">
            <a
              target="_blank"
              href="https://ulib.interlib.cn/tcshop/1111/index"
            >
              <span>信阅</span>
            </a>
          </div>
          <div
            class="cell impression_track_mod_buyinfo"
          >
            <div class="cell price-wrapper">
              <a
                target="_blank"
                href="https://ulib.interlib.cn/tcshop/1111/product/${data.id}"
              >
                <span class="buylink-price"> ${data.price}元 </span>
              </a>
            </div>
            <div class="cell">
              <a
                target="_blank"
                href="https://ulib.interlib.cn/tcshop/1111/product/${data.id}"
                class="buy-book-btn paper-book-btn"
              >
                <span>借阅纸质书</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>`;
  return template;
}

function renderEmpty() {
  var template = `<div class="gray_ad buyinfo">
  <div>
    <h2>
      <span>浙江图书馆</span>
      &nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·&nbsp;·
    </h2>
    <ul class="bs">
      <li style="border-bottom:0;">
        <div class="cell price-btn-wrapper">
          <div class="vendor-name">
            <a
              target="_blank"
              href="https://ulib.interlib.cn/tcshop/1111/index"
            >
              <span>信阅</span>
            </a>
          </div>
          <div
            class="cell impression_track_mod_buyinfo"
          >
            <div class="cell price-wrapper">
              <a
                target="_blank"
                href="https://ulib.interlib.cn/tcshop/1111/index"
              >
              <span class="buylink-price">无库存</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>`;
  return template;
}

// Listen for the DOMContentLoaded event, then execute the function
window.addEventListener("load", function () {
  // Extract content from the content attribute of the meta tag, here is an example of the meta tag on the DOM: <meta property="book:isbn" content="9787301182444">
  var isbn = document
    .querySelector('meta[property="book:isbn"]')
    .getAttribute("content");

  // asking its background page to fetch the data using chrome.runtime.sendMessage
  chrome.runtime.sendMessage(
    { action: "fetchAndRenderData", isbn: isbn },
    function (response) {
      if (!response) {
        // print out runtTime.lastError
        console.error(chrome.runtime.lastError);
        return;
      }

      if (response.data.total > 0) { // in stock
        document
          .getElementById("buyinfo")
          .insertAdjacentHTML("beforebegin", renderInStock(response.data.list[0]));
      } else { // out of stock
        document
          .getElementById("buyinfo")
          .insertAdjacentHTML("beforebegin", renderEmpty());
      }
    }
  );
});

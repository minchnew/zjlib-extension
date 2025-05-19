function searchByISBN(isbn, callback) {
    // Make a fetch request
    fetch(`https://ulib.interlib.cn/tcshop/m/1111/product/productList?key=${isbn}&offset=0&bookType=0`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Request failed');
            }
        })
        .then(data => {
            callback(null, data);
        })
        .catch(error => {
            callback(error);
        });
}

function checkStock(id, callback) {
    fetch(`https://ulib.interlib.cn/tcshop/m/1111/product/${id}`)
        .then(response => response.text())
        .then(html => {
            if (html.indexOf('<div class="bIntrInfo fn-left" id="stock_span">有货</div>')) {
                callback(null, 1);
            } else {
                callback(null, 0);
            }
        })
        .catch(error => {
            callback(error);
        });
}

// Listening for an event with chrome.runtime.onMessage.addListener, and then executing the searchByISBN function and send the response back
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action == "fetchAndRenderData") {
            searchByISBN(request.isbn, function(error, data) {
                if (error) {
                    sendResponse(null);
                    return;
                }
                sendResponse({
                    data: data,
                });
            });
        }
        return true;
    }
);

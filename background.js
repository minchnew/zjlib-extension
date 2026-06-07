function searchByISBN(isbn, callback) {
    fetch('https://loan.zjlib.cn/bff-api/jeeshop-admin-service/portal-pc-api/home/search', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
        },
        body: JSON.stringify({ identification: '', isbn: isbn, current: 1, size: 30 }),
    })
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

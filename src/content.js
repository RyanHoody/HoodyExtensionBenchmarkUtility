// //TWO
chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "benchmark") {
        port.onMessage.addListener((request) => {
            if (request.message === 'test')
                port.postMessage({ message: Date.now() });
            else if (request.message === 'results') {
                //results
                console.log(request)
                window.postMessage({ type: 'FROM_CONTENT_SCRIPT', data: request.data, summary: request.summary }, '*');
            }
        });
    }
});
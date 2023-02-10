// function getTime() {
//     return performance.now()
// }

// if (SETTING_METHOD === 'ports') {
//     window.addEventListener("message", function (event) {
//         if (event.data && event.data.type === 'TO_CONTENT') {
//             const sendTime = performance.now();
//             window.postMessage({ type: 'TO_BACKGROUND', sendTime }, '*');
//         }
//     }, false);
// }

// if (SETTING_METHOD === 'ports') {
//     window.addEventListener("message", function (event) {
//         if (event.data && event.data.type === 'TO_CONTENT') {
//             const sendTime = performance.now();
//             window.postMessage({ type: 'TO_BACKGROUND', sendTime }, '*');
//         }
//     }, false);
// }


// WEBSOCKET_CONNECTION_STATUS = true
// const RECIEVE_MESSAGE_HANDLERS_PER_CHANNEL = {}

// // at this point the daemon has lost all mapping of current tabs
// // so we send all active tabs again, so the direct server can map them back
// ;(await chrome.tabs.query({})).map(async tab => {
//     const TabId = tab.id
//     SendMessageToChannel({ Type: 'NewTab', TabInfo: ConstrcutConnectionToken({
//         TabID: TabId,
//         Channel: 'direct-server',
//         Message: undefined
//     }), Channel:'direct-server' })
// })

// async function connectToContentScriptChannel(tabId, channel) {
//     let port
//     try {
//         port = chrome.tabs.connect(
//             Number(tabId),
//             { name: channel }
//         )
//         await MapConnectionToChannel(channel, tabId, port)
//         async function ConstructMessage(msg) {
//             // tabhostname of the tab can always change so we need to inject it each time dynamically
//             return { TabID: Number(tabId), Channel: channel, Message: msg }
//         }
//         port.postMessage({ Type: 'WebsocketOnlineNotification' })

//         port.onMessage.addListener(async message => {
//             // send message comming from the content script
//             SendMessageToChannel(await ConstructMessage(message))
//         })
//         return port
//     } catch (err) {
//         console.log(err.message, '_', tabId, '_', channel);
//         if (port) {
//             return port
//         } else {
//             return false
//         }
//     }
// }

console.log('content')
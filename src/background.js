chrome.alarms.create({ periodInMinutes: 4.5 })
chrome.alarms.onAlarm.addListener(() => console.log(`Keep alive alarm listener: ${Math.random() + Math.random()}`))

// try to keep alive with history change listener
chrome.webNavigation.onHistoryStateUpdated.addListener(() => console.log(`Keep alive history change listener: ${Math.random() + Math.random()}`))



//todo: replace with dynamic string
const TEST_TIME = 1 * 60 * 1000; // 1 minute
const TAB_COUNT = 5;
const testMethod = 'ports'
const htmlFilePath =
    "file://C:\\Users\\Administrator\\Desktop\\bench\\HoodyExtensionBenchmarkUtility\\index.html";


let testStartTime, lastTabId;

const results = {
    totalMessages: 0,
    averageTwoWayTime: 0,
    averageBackgroundToContentTime: 0,
    averageContentToBackgroundTime: 0
};

//TODO: graph should be graphed by time not message number, right now x axis doesnt really show results accurately, 
//graph should only be on the last tab opened, results section at the top should have the averages as well as results for each tab in a table
//combine all of the data points by a rounded time, say every 2ms, and then take the max time, reduces the number of points on teh graph signifcantly


function calculateResults() {
    let totalTwoWayTime = 0;
    let totalBackgroundToContentTime = 0;
    let totalContentToBackgroundTime = 0;
    for (let tabMessages of tabMap.values()) {
        results.totalMessages += tabMessages.length;
        for (let message of tabMessages) {
            totalTwoWayTime += message.twoWayTime;
            totalBackgroundToContentTime += message.backgroundToContentTime;
            totalContentToBackgroundTime += message.contentToBackgroundTime;
        }
    }
    results.averageTwoWayTime = totalTwoWayTime / results.totalMessages;
    results.averageBackgroundToContentTime =
        totalBackgroundToContentTime / results.totalMessages;
    results.averageContentToBackgroundTime =
        totalContentToBackgroundTime / results.totalMessages;
}



const tabMessages = new Map();
const tabPorts = {};

testStartTime = performance.now();

chrome.tabs.create({ url: htmlFilePath }, async tab => {
    const tabPromises = [];
    for (let i = 0; i < TAB_COUNT; i++) {
        tabPromises.push(
            new Promise(resolve => {
                chrome.tabs.create({ url: htmlFilePath }, async (tab) => {
                    tabMap.set(tab.id, []);
                    tabIds.push(tab.id)
                    const tabLoaded = await Promise.race([
                        new Promise(resolve => {
                            const tabCompleteListener = function (tabId, changeInfo) {
                                // make sure the status is 'complete' and it's the right tab
                                if (tabId == tab.id && changeInfo.status == 'complete') {
                                    chrome.tabs.onUpdated.removeListener(tabCompleteListener)
                                    resolve(true)
                                }
                            }
                            chrome.tabs.onUpdated.addListener(tabCompleteListener)
                        }),
                        //One second timeout if tab doesnt load
                        new Promise(resolve =>
                            setTimeout(() => resolve(false), 1_000)
                        )
                    ])
                    if (testMethod === 'ports') {
                        portTest(tab.id).then(() => {
                            resolve();
                        });
                    }
                    //todo: add other test methods
                });
            })
        );
    }
    //wait for all tests to complete
    await Promise.all(tabPromises);
    calculateResults();
    //send results to tab
    //todo: only send results to the last tab
    // tabPorts[tabIds[tabIds.length - 1]].postMessage({ message: 'results', summary: results, data: [...tabMap.values()] })
    for (let port of Object.values(tabPorts))
        port.postMessage({ message: 'results', summary: results, data: [...tabMap.values()] })
});

async function portTest(tabId) {
    const port = chrome.tabs.connect(tabId, { name: "benchmark" });
    tabPorts[tabId] = port
    const messages = []
    while (performance.now() < TestStartTime + TEST_TIME) {
        const startTime = performance.now();
        const contentTime = (await new Promise(resolve => {
            port.onMessage.addListener(message => {
                if (message && message.hasOwnProperty("message")) {
                    resolve(message.message);
                }
            });
            port.postMessage({ message: 'ping' });
        })) - performance.timeOrigin;
        const endTime = performance.now();
        const backgroundToContentTime = contentTime - startTime;
        const contentToBackgroundTime = endTime - contentTime;
        const twoWayTime = endTime - startTime;
        messages.push({ backgroundToContentTime, contentToBackgroundTime, twoWayTime, startTime });
    }
    tabMap.get(tabId).push(...messages);
    // port.disconnect();
}

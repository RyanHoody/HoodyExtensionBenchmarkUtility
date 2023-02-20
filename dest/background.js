chrome.alarms.create({ periodInMinutes: 4.5 })
chrome.alarms.onAlarm.addListener(() => console.log(`Keep alive alarm listener: ${Math.random() + Math.random()}`))

// try to keep alive with history change listener
chrome.webNavigation.onHistoryStateUpdated.addListener(() => console.log(`Keep alive history change listener: ${Math.random() + Math.random()}`))
const TEST_TIME = 1 * 60 * 1000; // 1 minute
const TAB_COUNT = 5;
const TestStartTime = performance.now();
let lastTabId;

const results = {
    totalMessages: 0,
    averageTwoWayTime: 0,
    averageBackgroundToContentTime: 0,
    averageContentToBackgroundTime: 0
};

//TODO: graph should be graphed by time, because right now x axis doesnt really show results accurately, graph should only be on the last tab opened, results section at the top should have the total results as well as results for each tab in a table
//combine all of the data points by a rounded time, say every 2ms, and then they can be either averaged or take the max time


function calculateResults() {
    let totalTwoWayTime = 0;
    let totalBackgroundToContentTime = 0;
    let totalContentToBackgroundTime = 0;
    console.log(tabMap.values());
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


const graphRounding = 1
const finalValues = []

function mergeArrays() {
    let result = {};
    
    [...Object.values(tabMap)].forEach(array => {
        array.forEach(obj => {
            let roundedStartTime = Math.round(obj.startTime);
            if (!result[roundedStartTime]) {
                result[roundedStartTime] = {
                    twoWayTime: [obj.twoWayTime],
                    startTime: roundedStartTime
                };
            } else {
                result[roundedStartTime].twoWayTime.push(obj.twoWayTime);
            }
        });
    });
    
    return Object.values(result).map(obj => {
        return {
            twoWayTime: obj.twoWayTime.reduce((sum, current) => sum + current) / obj.twoWayTime.length,
            startTime: obj.startTime
        };
    });
}

const tabMap = new Map();
const tabPorts = {};

const htmlFilePath =
"file://C:\\Users\\Administrator\\Desktop\\bench\\HoodyExtensionBenchmarkUtility\\index.html";

chrome.tabs.create({ url: htmlFilePath }, async tab => {
    const tabPromises = [];
    for (let i = 0; i < TAB_COUNT; i++) {
        tabPromises.push(
            new Promise(resolve => {
                chrome.tabs.create({ url: htmlFilePath }, async (tab) => {
                    tabMap.set(tab.id, []);
                    lastTabId = tab.id
                    const tabLoaded = await Promise.race([
                        new Promise(resolve => {
                            const CompleteListener = function (tabId, changeInfo) {
                                // make sure the status is 'complete' and it's the right tab
                                if (tabId == tab.id && changeInfo.status == 'complete') {
                                    chrome.tabs.onUpdated.removeListener(CompleteListener)
                                    resolve(true)
                                }
                            }
                            chrome.tabs.onUpdated.addListener(CompleteListener)
                        }),
                        new Promise(resolve =>
                            setTimeout(() => resolve(false), 1_000)
                        )
                    ])
                    beginTest(tab.id).then(() => {
                        resolve();
                    });
                });
            })
        );
    }
    await Promise.all(tabPromises);
    calculateResults();
    // tabPorts[tabId].postMessage({ message: 'results', summary: results, data: [...tabMap.values()] })
    for (let port of Object.values(tabPorts))
        port.postMessage({ message: 'results', summary: results, data: [...tabMap.values()], merged: mergeArrays() })
    console.log(results)
});

async function beginTest(tabId) {
    const port = chrome.tabs.connect(tabId, { name: "benchmark" });
    tabPorts[tabId] = port
    const messages = []
    while (performance.now() < TestStartTime + TEST_TIME) {
        const startTime = performance.now();
        const contentTime = (await new Promise(resolve => {

            port.postMessage({ message: 'test' });
            port.onMessage.addListener(message => {
                if (message && message.hasOwnProperty("message")) {
                    resolve(message.message);
                }
            });
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

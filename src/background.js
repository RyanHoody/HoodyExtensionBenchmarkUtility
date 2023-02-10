// // function get() { getTime() }


// // // Background Script

// // async function benchmark() {
// //     const res = await chrome.tabs.executeScript({
// //         func: get
// //     }, function (results) {
// //         return results
// //     });
// // }

// const tabMap = new Map();

// async function sendMessage(tabId) {
//   const port = chrome.tabs.connect(tabId);

//   for (let i = 0; i < 5; i++) {
//     const startTime = performance.now();
//     const contentTime = await new Promise((resolve) => {
//       port.postMessage({ message: i });
//       port.onMessage.addListener((message) => {
//         resolve(message);
//       });
//     });
//     const endTime = performance.now();
//     const backgroundToContentTime = contentTime - startTime
//     const contentToBackgroundTime = endTime - contentTime
//     const timeDiff = endTime - startTime;

//     if (!tabMap.has(tabId)) {
//       tabMap.set(tabId, []);
//     }

//     tabMap.get(tabId).push(timeDiff);
//   }

//   port.disconnect();
// }

// chrome.tabs.create({ url: "about:blank" }, async (tab) => {
//   for (let i = 0; i < 10; i++) {
//     await new Promise((resolve) => {
//       chrome.tabs.create({ url: "about:blank" }, (tab) => {
//         sendMessage(tab.id).then(() => {
//           resolve();
//         });
//       });
//     });
//   }
// });

// chrome.runtime.onConnect.addListener((port) => {
//   port.onMessage.addListener((message) => {
//     port.postMessage({ message: performance.now() });
//   });
// });
// This script creates 10 new tabs and opens a message channel with each of them using chrome.tabs.connect(). The sendMessage function sends 5 messages to each tab and calculates the time it took to send and receive each message. The results are saved in a Map object tabMap where the key is the tab ID and the value is an array of the response times for each message. Finally, you can calculate the average response time for each tab by dividing the sum of the response times by the number of messages sent.




// R D
// now write a nodejs script that uses playwright to inject the extension into a chrome browser
// Here is an example of a Node.js script that uses Playwright to inject a Chrome extension into a Chrome browser:

// javascript
// Copy code
// const playwright = require("playwright");

// async function run() {
//   const browser = await playwright.chromium.launch({ headless: false });
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   // Inject the extension into the browser
//   await context.addExtension(pathToExtension);

//   // Perform actions with the browser, such as navigating to a website, etc.
//   await page.goto("https://www.example.com");

//   await browser.close();
// }

// run();
// Replace pathToExtension with the path to your Chrome extension's .crx file or the directory containing the extension's files.

// In this example, Playwright launches a non-headless instance of the Chrome browser and creates a new context with a new page. The addExtension method is then used to inject the extension into the browser. Finally, the script performs actions with the browser, such as navigating to a website, using the goto method of the page object.




// R D
// how do i create a .crx file for my extension?
// A Chrome extension can be packaged as a .crx file to be distributed and installed. Here are the steps to create a .crx file for your Chrome extension:

// Go to chrome://extensions in your Chrome browser.
// Make sure "Developer mode" is turned on. You can do this by clicking the toggle switch in the top right corner of the page.
// Click the "Pack extension" button.
// In the "Extension root directory" field, select the directory that contains your extension's files.
// (Optional) If you want to include a private key to sign the extension, enter the path to the key file in the "Private key file" field.
// Click the "Pack extension" button.
// The .crx file will be created and saved to the directory you specified.
// Note that it is recommended to sign your extension before distributing it, as signed extensions have a higher level of trust in the Chrome Web Store.

; (async function () {
    console.log('background')
})()


const playwright = require("playwright");
const path = require('path')

const pathToExtension = path.join(__dirname, 'src/extension.zip')

async function run() {
    const browser = await playwright.chromium.launch({ headless: false, args: [`--load-extension=${pathToExtension}`] });
    const context = await browser.newContext({ incognito: false });
    const page = await context.newPage();

    // Perform actions with the browser, such as navigating to a website, etc.
    await page.goto("https://www.example.com");

    //   await browser.close();
}

run();
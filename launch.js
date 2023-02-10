const playwright = require("playwright");
const path = require('path')

const pathToExtension = path.join(__dirname, 'dest')
const userDataDir = path.join(__dirname, 'userDataDir')

async function run() {
    const context = await playwright.chromium.launchPersistentContext(userDataDir, { 
            headless: false, 
            args: [`--load-extension=${pathToExtension}`],
            ignoreDefaultArgs: [
                '--disable-field-trial-config',
                '--disable-background-networking',
                '--enable-features=NetworkService,NetworkServiceInProcess',
                '--disable-background-timer-throttling',
                '--disable-backgrounding-occluded-windows',
                '--disable-back-forward-cache',
                '--disable-breakpad',
                '--disable-client-side-phishing-detection',
                '--disable-component-extensions-with-background-pages',
                '--disable-component-update',
                '--no-default-browser-check',
                '--disable-default-apps',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--disable-features=ImprovedCookieControls,LazyFrameLoading,GlobalMediaControls,DestroyProfileOnBrowserClose,MediaRouter,DialMediaRouteProvider,AcceptCHFrame,AutoExpandDetailsElement,CertificateTransparencyComponentUpdater,AvoidUnnecessaryBeforeUnloadCheckSync,Translate',
                '--allow-pre-commit-input',
                '--disable-hang-monitor',
                '--disable-ipc-flooding-protection',
                '--disable-popup-blocking',
                '--disable-prompt-on-repost',
                '--disable-renderer-backgrounding',
                '--disable-sync',
                '--force-color-profile=srgb',
                '--metrics-recording-only',
                '--no-first-run',
                '--enable-automation',
                '--password-store=basic',
                '--use-mock-keychain',
                '--no-service-autorun',
                '--export-tagged-pdf',
                '--no-sandbox'
            ]
    });
    const page = await context.newPage();

    // Perform actions with the browser, such as navigating to a website, etc.
    await page.goto("https://www.example.com");

    //   await browser.close();
}

run();
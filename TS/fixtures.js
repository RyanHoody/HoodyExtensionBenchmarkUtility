"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.test = void 0;
// fixtures.ts
const test_1 = require("@playwright/test");
const path_1 = __importDefault(require("path"));
exports.test = test_1.test.extend({
    context: ({}, use) => __awaiter(void 0, void 0, void 0, function* () {
        const pathToExtension = path_1.default.join(__dirname, 'my-extension');
        const context = yield test_1.chromium.launchPersistentContext('', {
            headless: false,
            args: [
                `--headless=new`,
                `--disable-extensions-except=${pathToExtension}`,
                `--load-extension=${pathToExtension}`,
            ],
        });
        yield use(context);
        yield context.close();
    }),
    extensionId: ({ context }, use) => __awaiter(void 0, void 0, void 0, function* () {
        /*
        // for manifest v2:
        let [background] = context.backgroundPages()
        if (!background)
          background = await context.waitForEvent('backgroundpage')
        */
        // for manifest v3:
        let [background] = context.serviceWorkers();
        if (!background)
            background = yield context.waitForEvent('serviceworker');
        const extensionId = background.url().split('/')[2];
        yield use(extensionId);
    }),
});
exports.expect = exports.test.expect;

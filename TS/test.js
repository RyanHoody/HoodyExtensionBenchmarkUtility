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
Object.defineProperty(exports, "__esModule", { value: true });
const fixtures_1 = require("./fixtures");
(0, fixtures_1.test)('example test', ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto('https://example.com');
    yield (0, fixtures_1.expect)(page.locator('body')).toHaveText('Changed by my-extension');
}));
(0, fixtures_1.test)('popup page', ({ page, extensionId }) => __awaiter(void 0, void 0, void 0, function* () {
    yield page.goto(`chrome-extension://${extensionId}/popup.html`);
    yield (0, fixtures_1.expect)(page.locator('body')).toHaveText('my-extension popup');
}));

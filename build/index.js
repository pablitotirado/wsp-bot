"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const finance_1 = require("./commands/finance");
const client = new whatsapp_web_js_1.Client({ authStrategy: new whatsapp_web_js_1.LocalAuth() });
client.on("qr", (qr) => {
    qrcode_terminal_1.default.generate(qr, { small: true });
});
client.on("ready", () => {
    console.log("client ready");
});
client.on("message", (msg) => {
    const allow = (0, finance_1.isAllowUser)(msg);
    if (allow) {
        return (0, finance_1.filterCommand)(msg);
    }
    msg.reply("Usuario no authorizado.");
});
client.initialize();

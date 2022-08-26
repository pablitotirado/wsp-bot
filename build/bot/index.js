"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runBot = void 0;
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
const auth_1 = require("./auth");
const commands_1 = require("./commands");
const listen = (callback) => {
    const client = new whatsapp_web_js_1.Client({ authStrategy: new whatsapp_web_js_1.LocalAuth() });
    client.on("qr", (qr) => {
        qrcode_terminal_1.default.generate(qr, { small: true });
    });
    client.on("ready", () => {
        callback();
    });
    client.on("message", async (msg) => {
        const allow = (0, auth_1.isAllowUser)(msg);
        if (allow) {
            return await (0, commands_1.filterCommand)(msg, client);
        }
        msg.reply("Usuario no authorizado.");
    });
    client.initialize();
};
exports.runBot = {
    listen,
};

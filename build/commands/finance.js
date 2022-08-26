"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterCommand = exports.isAllowUser = exports.allowedUsers = void 0;
const fs_1 = __importDefault(require("fs"));
const expense = "!gasto";
exports.allowedUsers = ["5492215854337@c.us", "5491127797642@c.us"];
const isAllowUser = (msg) => exports.allowedUsers.includes(msg.from);
exports.isAllowUser = isAllowUser;
const getData = (msg) => {
    return msg.body
        .replace(/!gasto: /, "")
        .split(",")
        .map((item) => {
        const itemTrimed = item.trim();
        const [column, value] = itemTrimed.split(":");
        return {
            column,
            value,
        };
    });
};
const filterCommand = (msg) => {
    if (msg.body === expense) {
        msg.reply("Por favor ingresa tu gasto siguiendo el siguiente formato.");
        msg.reply("!gasto: Fecha: XXX, Monto: XXX, Concepto: XXX, Medio de Pago: XXX, Categoria: XXX");
    }
    if (msg.body.startsWith(expense) && msg.body !== expense) {
        const data = getData(msg);
        if (fs_1.default.existsSync("./data.json")) {
            console.log("existe");
            const oldData = require("./data.json");
            return fs_1.default.writeFileSync(__dirname + "/data.json", JSON.stringify({ ...oldData, [new Date().getTime()]: data }, null, 2), { mode: 1 });
        }
        console.log("no existe");
        fs_1.default.writeFileSync(__dirname + "/data.json", JSON.stringify({ [new Date().getTime()]: data }, null, 2), { mode: 1 });
    }
};
exports.filterCommand = filterCommand;

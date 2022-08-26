"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processData = void 0;
const users_1 = require("../../../entities/users");
const processData = (msg) => {
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
    })
        .reduce((acc, item) => {
        if (item.column.includes(users_1.Keys.Fecha)) {
            return {
                ...acc,
                date: item.value,
            };
        }
        if (item.column.includes(users_1.Keys.Monto)) {
            return {
                ...acc,
                amount: Number(item.value),
            };
        }
        if (item.column.includes(users_1.Keys.Concepto)) {
            return {
                ...acc,
                concept: item.value,
            };
        }
        if (item.column.includes(users_1.Keys.Pago)) {
            return {
                ...acc,
                paymentMethod: item.value,
            };
        }
        if (item.column.includes(users_1.Keys.Categoria)) {
            return {
                ...acc,
                category: item.value,
            };
        }
        return acc;
    }, {});
};
exports.processData = processData;

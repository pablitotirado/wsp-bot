"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.validate = void 0;
const db_1 = require("../../../db");
const processData_1 = require("./processData");
const expenseTrigger = "!gasto";
const expenseShowTrigger = "!gasto show";
const formatToWrite = "!gasto: Fecha: XXX, Monto: XXX, Concepto: XXX, Medio de Pago: XXX, Categoria: XXX";
const validate = (msg) => String(msg.body).toLowerCase().includes(expenseTrigger);
exports.validate = validate;
const run = async (msg, client) => {
    const greetingCommand = msg.body === expenseTrigger;
    const writeCommand = msg.body.startsWith(expenseTrigger) && msg.body !== expenseTrigger;
    const showData = String(msg.body).toLowerCase() === expenseShowTrigger;
    if (greetingCommand) {
        client.sendMessage(msg.from, "Por favor ingresa tu gasto siguiendo el siguiente formato.");
        client.sendMessage(msg.from, formatToWrite);
    }
    if (writeCommand) {
        const data = (0, processData_1.processData)(msg);
        try {
            await db_1.db.gastos.create({
                data,
            });
            client.sendMessage(msg.from, "Informacion guardada con exito.");
        }
        catch (err) {
            client.sendMessage(msg.from, "Ocurrio un error al guardar la informacion, favor, contactar al pabloministrador :-)");
        }
    }
    if (showData) {
        const data = await db_1.db.gastos.findMany();
        client.sendMessage(msg.from, JSON.stringify(data, null, 2));
    }
};
exports.run = run;

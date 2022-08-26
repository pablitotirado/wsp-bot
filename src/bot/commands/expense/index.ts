import { Client, Message } from "whatsapp-web.js";
import { db } from "../../../db";
import { Data, Keys } from "../../../entities/users";
import { processData } from "./processData";

const expenseTrigger = "!gasto";

const expenseShowTrigger = "!show";

const formatToWrite =
  "!gasto: Fecha: XXX, Monto: XXX, Concepto: XXX, Medio de Pago: XXX, Categoria: XXX";

export const validate = (msg: Message) => {
  const conditions = [
    String(msg.body).toLowerCase().includes(expenseTrigger),
    String(msg.body).toLowerCase().includes(expenseShowTrigger),
  ];

  return conditions.includes(true);
};

export const run = async (msg: Message, client: Client) => {
  const greetingCommand = msg.body === expenseTrigger;

  const writeCommand =
    msg.body.startsWith(expenseTrigger) && msg.body !== expenseTrigger;

  const showData = String(msg.body).toLowerCase() === expenseShowTrigger;

  if (greetingCommand) {
    client.sendMessage(
      msg.from,
      "Por favor ingresa tu gasto siguiendo el siguiente formato."
    );
    client.sendMessage(msg.from, formatToWrite);
  }

  if (writeCommand) {
    const data = processData(msg);

    try {
      await db.gastos.create({
        data,
      });

      client.sendMessage(msg.from, "Informacion guardada con exito.");
    } catch (err) {
      console.log("err", JSON.stringify(err, null, 2));
      client.sendMessage(
        msg.from,
        "Ocurrio un error al guardar la informacion, favor contactar al pabloministrador :-)"
      );
    }
  }

  if (showData) {
    try {
      const data = await db.gastos.findMany();
      console.log("execute", data);
      client.sendMessage(msg.from, JSON.stringify(data, null, 2));
    } catch (err) {
      client.sendMessage(
        msg.from,
        "Error al traer la informacion, favor contactar al pabloministrador :-)"
      );
      console.log(err);
    }
  }
};

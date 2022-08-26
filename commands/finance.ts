import { Message } from "whatsapp-web.js";
import { db } from "../db";

const expense = "!gasto";

export const allowedUsers = ["5492215854337@c.us", "5491127797642@c.us"];

export const isAllowUser = (msg: Message) => allowedUsers.includes(msg.from);

type Data = {
  amount: number;
  date: string;
  concept: string;
  paymentMethod: string;
  category: string;
};

enum Keys {
  Fecha = "Fecha",
  Monto = "Monto",
  Concepto = "Concepto",
  Pago = "Pago",
  Categoria = "Categoria",
}

const getData = (msg: Message): Data => {
  type Replaced = { column: string; value: string };

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
    .reduce((acc: Data, item: Replaced) => {
      if (item.column.includes(Keys.Fecha)) {
        return {
          ...acc,
          date: item.value,
        };
      }
      if (item.column.includes(Keys.Monto)) {
        return {
          ...acc,
          amount: Number(item.value),
        };
      }

      if (item.column.includes(Keys.Concepto)) {
        return {
          ...acc,
          concept: item.value,
        };
      }

      if (item.column.includes(Keys.Pago)) {
        return {
          ...acc,
          paymentMethod: item.value,
        };
      }
      if (item.column.includes(Keys.Categoria)) {
        return {
          ...acc,
          category: item.value,
        };
      }
      return acc;
    }, {} as Data);
};

let variable = "sdfs";

export const filterCommand = (msg: Message) => {
  if (msg.body === expense) {
    variable;
    msg.reply("Por favor ingresa tu gasto siguiendo el siguiente formato.");
    msg.reply(
      "!gasto: Fecha: XXX, Monto: XXX, Concepto: XXX, Medio de Pago: XXX, Categoria: XXX"
    );
  }

  if (msg.body.startsWith(expense) && msg.body !== expense) {
    const data = getData(msg);

    db.gastos.create({
      data,
    });
  }
};

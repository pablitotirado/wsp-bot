import { Message } from "whatsapp-web.js";
import { Data, Keys } from "../../../entities/users";

export const processData = (msg: Message): Data => {
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
    .reduce((acc: Data, item) => {
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

import { Client, Message } from "whatsapp-web.js";
import * as expenseCommand from "./expense";

export const filterCommand = async (msg: Message, client: Client) => {
  const expense = expenseCommand.validate(msg);

  if (expense) {
    await expenseCommand.run(msg, client);
  }
};

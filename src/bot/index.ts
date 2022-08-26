import qrcode from "qrcode-terminal";
import { Client, LocalAuth } from "whatsapp-web.js";
import { isAllowUser } from "./auth";
import { filterCommand } from "./commands";

const listen = (callback: () => void) => {
  const client = new Client({ authStrategy: new LocalAuth() });

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    callback();
  });

  client.on("message", async (msg) => {
    const allow = isAllowUser(msg);

    if (allow) {
      return await filterCommand(msg, client);
    }

    msg.reply("Usuario no authorizado.");
  });

  client.initialize();
};

export const runBot = {
  listen,
};

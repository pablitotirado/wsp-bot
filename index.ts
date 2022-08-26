import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { filterCommand, isAllowUser } from "./commands/finance";

const client = new Client({ authStrategy: new LocalAuth() });

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("client ready");
});

client.on("message", (msg) => {
  const allow = isAllowUser(msg);

  if (allow) {
    return filterCommand(msg);
  }

  msg.reply("Usuario no authorizado.");
});

client.initialize();

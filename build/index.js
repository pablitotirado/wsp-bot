"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const server_1 = require("./server");
const port = process.env.PORT || 3000;
server_1.server.listen(port, () => {
    console.log(`Server on port ${port}`);
});
bot_1.runBot.listen(() => {
    console.log(`Bot ready`);
});

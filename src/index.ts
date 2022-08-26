import "dotenv/config";
import { runBot } from "./bot";
import { server } from "./server";

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server on port ${port}`);
});

runBot.listen(() => {
  console.log(`Bot ready`);
});

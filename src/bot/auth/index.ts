import { Message } from "whatsapp-web.js";
import { allowedUsers } from "../../entities/users";

export const isAllowUser = (msg: Message) => allowedUsers.includes(msg.from);

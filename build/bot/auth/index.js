"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAllowUser = void 0;
const users_1 = require("../../entities/users");
const isAllowUser = (msg) => users_1.allowedUsers.includes(msg.from);
exports.isAllowUser = isAllowUser;

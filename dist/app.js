"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("@gieo/express"));
const user_controller_1 = require("./controllers/user.controller");
const app = new express_1.default();
app.get("/users", user_controller_1.getUsers);
app.post("/users", user_controller_1.createUser);
app.get("/users/:id", user_controller_1.getUserById);
app.put("/users/:id", user_controller_1.updateUser);
app.patch("/users/:id", user_controller_1.patchUser);
app.delete("/users/:id", user_controller_1.deleteUser);
exports.default = app;

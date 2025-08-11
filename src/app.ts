import ExpressPlus from "@gieo/express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
} from "./controllers/user.controller";

const app = new ExpressPlus();

app.get("/users", getUsers);
app.post("/users", createUser);
app.get("/users/:id", getUserById);
app.put("/users/:id", updateUser);
app.patch("/users/:id", patchUser);
app.delete("/users/:id", deleteUser);

export default app;

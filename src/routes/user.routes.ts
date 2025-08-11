import { Router } from "@gieo/express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
} from "../controllers/user.controller";

const router = Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.patch("/users/:id", patchUser);
router.delete("/users/:id", deleteUser);

export default router;

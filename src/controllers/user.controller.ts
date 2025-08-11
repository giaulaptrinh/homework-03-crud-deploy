import { db } from "../config/database";
import { users } from "../schemas/User.schema";
import { eq } from "drizzle-orm";

// ✅ GET /users
export const getUsers = async (req, res) => {
  const result = await db.select().from(users);
  res.status(200).json({
    message: "Users retrieved successfully",
    success: true,
    status: 200,
    payload: result,
  });
};

// ✅ GET /users/:id
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(id)));

  if (result.length === 0) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      status: 404,
      payload: [],
    });
  }

  res.status(200).json({
    message: "User retrieved successfully",
    success: true,
    status: 200,
    payload: result,
  });
};

// ✅ POST /users
export const createUser = async (req, res) => {
  const body = await req.getBody();

  if (!body.name || !body.email) {
    return res.status(400).json({
      message: "Name and email are required",
      success: false,
      status: 400,
      payload: [],
    });
  }

  const result = await db
    .insert(users)
    .values({
      name: body.name,
      email: body.email,
    })
    .returning();

  res.status(201).json({
    message: "User created successfully",
    success: true,
    status: 201,
    payload: result,
  });
};

// ✅ PUT /users/:id
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const body = await req.getBody();
  if (!body.name || !body.email) {
    return res.status(400).json({
      message: "Name and email are required",
      success: false,
      status: 400,
      payload: [],
    });
  }
  const existing = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(id)));

  if (existing.length === 0) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      status: 404,
      payload: [],
    });
  }

  const result = await db
    .update(users)
    .set({ name: body.name, email: body.email })
    .where(eq(users.id, Number(id)))
    .returning();

  res.status(200).json({
    message: "User updated successfully",
    success: true,
    status: 200,
    payload: result,
  });
};

// ✅ PATCH /users/:id
export const patchUser = async (req, res) => {
  const { id } = req.params;
  const body = await req.getBody();
  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({
      message: "No fields to update",
      success: false,
      status: 400,
      payload: [],
    });
  }

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(id)));

  if (existing.length === 0) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      status: 404,
      payload: [],
    });
  }

  const result = await db
    .update(users)
    .set(body)
    .where(eq(users.id, Number(id)))
    .returning();

  res.status(200).json({
    message: "User patched successfully",
    success: true,
    status: 200,
    payload: result,
  });
};

// ✅ DELETE /users/:id
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(id)));

  if (existing.length === 0) {
    return res.status(404).json({
      message: "User not found",
      success: false,
      status: 404,
      payload: [],
    });
  }

  const result = await db
    .delete(users)
    .where(eq(users.id, Number(id)))
    .returning();

  res.status(200).json({
    message: "User deleted successfully",
    success: true,
    status: 200,
    payload: result,
  });
};

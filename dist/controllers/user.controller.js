"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.patchUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const database_1 = require("../config/database");
const User_schema_1 = require("../schemas/User.schema");
const drizzle_orm_1 = require("drizzle-orm");
// ✅ GET /users
const getUsers = async (req, res) => {
    const result = await database_1.db.select().from(User_schema_1.users);
    res.status(200).json({
        message: "Users retrieved successfully",
        success: true,
        status: 200,
        payload: result,
    });
};
exports.getUsers = getUsers;
// ✅ GET /users/:id
const getUserById = async (req, res) => {
    const { id } = req.params;
    const result = await database_1.db
        .select()
        .from(User_schema_1.users)
        .where((0, drizzle_orm_1.eq)(User_schema_1.users.id, Number(id)));
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
exports.getUserById = getUserById;
// ✅ POST /users
const createUser = async (req, res) => {
    const body = await req.getBody();
    if (!body.name || !body.email) {
        return res.status(400).json({
            message: "Name and email are required",
            success: false,
            status: 400,
            payload: [],
        });
    }
    const result = await database_1.db
        .insert(User_schema_1.users)
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
exports.createUser = createUser;
// ✅ PUT /users/:id
const updateUser = async (req, res) => {
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
    const existing = await database_1.db
        .select()
        .from(User_schema_1.users)
        .where((0, drizzle_orm_1.eq)(User_schema_1.users.id, Number(id)));
    if (existing.length === 0) {
        return res.status(404).json({
            message: "User not found",
            success: false,
            status: 404,
            payload: [],
        });
    }
    const result = await database_1.db
        .update(User_schema_1.users)
        .set({ name: body.name, email: body.email })
        .where((0, drizzle_orm_1.eq)(User_schema_1.users.id, Number(id)))
        .returning();
    res.status(200).json({
        message: "User updated successfully",
        success: true,
        status: 200,
        payload: result,
    });
};
exports.updateUser = updateUser;
// ✅ PATCH /users/:id
const patchUser = async (req, res) => {
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
    const existing = await database_1.db
        .select()
        .from(User_schema_1.users)
        .where((0, drizzle_orm_1.eq)(User_schema_1.users.id, Number(id)));
    if (existing.length === 0) {
        return res.status(404).json({
            message: "User not found",
            success: false,
            status: 404,
            payload: [],
        });
    }
    const result = await database_1.db
        .update(User_schema_1.users)
        .set(body)
        .where((0, drizzle_orm_1.eq)(User_schema_1.users.id, Number(id)))
        .returning();
    res.status(200).json({
        message: "User patched successfully",
        success: true,
        status: 200,
        payload: result,
    });
};
exports.patchUser = patchUser;
// ✅ DELETE /users/:id
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const existing = await database_1.db
        .select()
        .from(User_schema_1.users)
        .where((0, drizzle_orm_1.eq)(User_schema_1.users.id, Number(id)));
    if (existing.length === 0) {
        return res.status(404).json({
            message: "User not found",
            success: false,
            status: 404,
            payload: [],
        });
    }
    const result = await database_1.db
        .delete(User_schema_1.users)
        .where((0, drizzle_orm_1.eq)(User_schema_1.users.id, Number(id)))
        .returning();
    res.status(200).json({
        message: "User deleted successfully",
        success: true,
        status: 200,
        payload: result,
    });
};
exports.deleteUser = deleteUser;

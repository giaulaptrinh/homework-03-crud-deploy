"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "123456",
    database: "homework_db",
});
exports.db = (0, node_postgres_1.drizzle)(pool);
(async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("✅ Kết nối thành công:", result.rows[0]);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("❌ Kết nối thất bại:", err.message);
        }
        else {
            console.error("❌ Lỗi không xác định:", err);
        }
    }
})();

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123456",
  database: "homework_db",
});

export const db = drizzle(pool);

(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("✅ Kết nối thành công:", result.rows[0]);
  } catch (err) {
    if (err instanceof Error) {
      console.error("❌ Kết nối thất bại:", err.message);
    } else {
      console.error("❌ Lỗi không xác định:", err);
    }
  }
})();

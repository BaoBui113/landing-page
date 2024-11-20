import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import bcrypt from "bcrypt";
let db: Database | null = null;
const ADMIN_USERNAME = process.env.NEXT_PUBLIC_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_PASSWORD || "123456";
export const getDbConnection = async (): Promise<Database> => {
  if (!db) {
    const dbPath = path.join(process.cwd(), "landing_page.sqlite");
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  }
  return db;
};

export const initializeDatabase = async () => {
  const connection = await getDbConnection();
  await connection.exec(`
    CREATE TABLE IF NOT EXISTS websites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      telegram TEXT,
      list_domain TEXT[],
      domain_main_website TEXT,
      description TEXT,
      name_page TEXT,
      api_key TEXT
    );
  `);

  await connection.exec(`
    CREATE TABLE IF NOT EXISTS admin (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );
  `);
};

export const seedAdminAccount = async () => {
  const connection = await getDbConnection();

  // Check if admin account already exists
  const adminExists = await connection.get(
    "SELECT * FROM admin WHERE username = ?",
    ADMIN_USERNAME
  );

  if (!adminExists) {
    // Hash the password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Insert the new admin account
    await connection.run(
      "INSERT INTO admin (username, password) VALUES (?, ?)",
      ADMIN_USERNAME,
      hashedPassword
    );
  }
};

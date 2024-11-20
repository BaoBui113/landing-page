import DuckDB from "duckdb";
import path from "path";
const dbFilePath = path.join(process.cwd(), "src/scripts/my_database.duckdb");
export const db = new DuckDB.Database(dbFilePath);
const connection = db.connect();

connection.run("CREATE TABLE users (id INTEGER, name TEXT)");
connection.run("INSERT INTO users VALUES (1, 'Alice'), (2, 'Bob')");

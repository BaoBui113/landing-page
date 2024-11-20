import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnection, initializeDatabase, seedAdminAccount } from "@/db/db";
import { NextResponse } from "next/server";

// Secret for JWT
const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key";

export async function POST(req: Request) {
  await initializeDatabase();
  const db = await getDbConnection();

  await seedAdminAccount();

  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required" },
      { status: 400 }
    );
  }

  try {
    const admin = await db.get(
      "SELECT * FROM admin WHERE username = ?",
      username
    );

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ access_token: token });
  } catch (err) {
    console.error("Login Error:", err);
    return NextResponse.json({ error: "Login Error" }, { status: 500 });
  }
}

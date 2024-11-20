import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_secret_key";

const authMiddleware = async (req: Request) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { error: "Access denied, no token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as {
      id: string;
      username: string;
    };

    (req as Request & { user: { id: string; username: string } }).user =
      decoded;

    return null;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
};

export default authMiddleware;

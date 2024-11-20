import { NextResponse } from "next/server";
import { getDbConnection, initializeDatabase } from "@/db/db";
export async function GET(req: Request) {
  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, x-api-key");

  if (req.method === "OPTIONS") {
    return res;
  }
  await initializeDatabase();
  const db = await getDbConnection();

  const apiKey = req.headers.get("x-api-key");

  if (!apiKey) {
    return NextResponse.json({ error: "API key is required" }, { status: 400 });
  }

  try {
    const websites = await db.get(
      "SELECT * FROM websites WHERE api_key = ?",
      apiKey
    );

    if (!websites) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    const parsedWebsites = {
      ...websites,
      list_domain: JSON.parse(websites.list_domain),
    };

    return NextResponse.json(parsedWebsites);
  } catch (err) {
    console.error("Fetch Error:", err);
    return NextResponse.json({ error: "Fetch Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getDbConnection, initializeDatabase } from "@/db/db";
import { v4 as uuidv4 } from "uuid";
import { middleware } from "./middleware";

export async function POST(req: Request) {
  const authResponse = await middleware(req);
  if (authResponse) return authResponse;

  await initializeDatabase();
  const db = await getDbConnection();

  const {
    telegram,
    list_domain,
    domain_main_website,
    description = null,
    name_page,
  } = await req.json();

  if (!domain_main_website || !name_page) {
    return NextResponse.json(
      { error: "list_domain, domain_main_website, and name_page are required" },
      { status: 400 }
    );
  }

  try {
    const api_key = uuidv4();
    const insertQuery = `
      INSERT INTO websites (telegram, list_domain, domain_main_website, description, name_page, api_key)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.run(insertQuery, [
      telegram,
      JSON.stringify(list_domain),
      domain_main_website,
      description,
      name_page,
      api_key,
    ]);
    return NextResponse.json({ message: "Insert successful" });
  } catch (err) {
    console.error("Insert Error:", err);
    return NextResponse.json({ error: "Insert Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const authResponse = await middleware(req);
  if (authResponse) return authResponse;

  await initializeDatabase();
  const db = await getDbConnection();

  try {
    const websites = await db.all("SELECT * FROM websites");
    const parsedWebsites = websites.map((website) => ({
      ...website,
      list_domain: JSON.parse(website.list_domain),
    }));
    return NextResponse.json(parsedWebsites);
  } catch (err) {
    console.error("Fetch Error:", err);
    return NextResponse.json({ error: "Fetch Error" }, { status: 500 });
  }
}

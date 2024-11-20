// pages/api/websites/[id].ts
import { NextResponse } from "next/server";
import { getDbConnection, initializeDatabase } from "@/db/db";
import { middleware } from "../middleware";

export async function PUT(req: Request) {
  const authResponse = await middleware(req);
  if (authResponse !== null) return authResponse;

  const id = req.url.split("/").pop();
  await initializeDatabase();
  const db = await getDbConnection();
  const updateData = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  if (updateData.list_domain) {
    updateData.list_domain = JSON.stringify(updateData.list_domain);
  }

  try {
    const website = await db.get("SELECT * FROM websites WHERE id = ?", id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    const updateFields = Object.keys(updateData)
      .map((key) => `${key} = ?`)
      .join(", ");
    const updateValues = Object.values(updateData);
    const updateQuery = `UPDATE websites SET ${updateFields} WHERE id = ?`;
    await db.run(updateQuery, [...updateValues, id]);

    return NextResponse.json({ message: "Update successful" });
  } catch (err) {
    console.error("Update Error:", err);
    return NextResponse.json({ error: "Update Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const authResponse = await middleware(req);
  if (authResponse !== null) return authResponse;

  const id = req.url.split("/").pop();
  await initializeDatabase();
  const db = await getDbConnection();

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const website = await db.get("SELECT * FROM websites WHERE id = ?", id);
    if (!website) {
      return NextResponse.json({ error: "Website not found" }, { status: 404 });
    }

    const deleteQuery = `DELETE FROM websites WHERE id = ?`;
    await db.run(deleteQuery, id);
    return NextResponse.json({ message: "Delete successful" });
  } catch (err) {
    console.error("Delete Error:", err);
    return NextResponse.json({ error: "Delete Error" }, { status: 500 });
  }
}

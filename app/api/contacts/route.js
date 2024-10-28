// app/api/contacts/route.js
import { openDb } from "../../../db";

// GET contacts
export async function GET(req) {
  const db = await openDb();
  const contacts = await db.all("SELECT * FROM contacts");
  return new Response(JSON.stringify(contacts), { status: 200 });
}

// POST contact
export async function POST(req) {
  const { name, email, phone } = await req.json();
  const db = await openDb();
  await db.run("INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)", [
    name,
    email,
    phone,
  ]);
  return new Response("Contact created", { status: 201 });
}

// PUT contact
export async function PUT(req) {
  const { id, name, email, phone } = await req.json();
  const db = await openDb();
  await db.run(
    "UPDATE contacts SET name = ?, email = ?, phone = ? WHERE id = ?",
    [name, email, phone, id]
  );
  return new Response("Contact updated", { status: 200 });
}

// DELETE contact
export async function DELETE(req) {
  const { id } = await req.json();
  const db = await openDb();
  await db.run("DELETE FROM contacts WHERE id = ?", [id]);
  return new Response("Contact deleted", { status: 200 });
}

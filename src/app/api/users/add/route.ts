import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema/users";

export async function POST(req: Request) {
  try {
    const { id, email, name, avatar } = await req.json();
    if (!id || !email || !name || !avatar) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    await db.insert(users).values({
      id,
      email,
      name,
      avatar,
      createdAt: Date.now(), // Ensure createdAt is set to the current timestamp
    });
    return NextResponse.json(
      { message: "User added successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error adding user" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { expenses } from "@/db/schema/expense";

export async function POST(req: Request) {
  try {
    const { id, userId, title, description, amount, date, type } =
      await req.json();
    console.log("Received data:", {
      id,
      userId,
      title,
      description,
      amount,
      date,
      type,
    });

    if (!id || !userId || !title || !description || !amount || !date || !type) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await db.insert(expenses).values({
      id,
      userId,
      title,
      description,
      amount: Number(amount), // Ensure amount is a number
      date,
      type,
    });

    return NextResponse.json(
      { message: "Expense added successfully" },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Error adding expense" },
      { status: 500 }
    );
  }
}

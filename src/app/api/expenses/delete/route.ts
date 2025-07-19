import { expenses } from "@/db/schema/expense";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();
  console.log(id);
  try {
    await db.delete(expenses).where(eq(expenses.id, id));
    return NextResponse.json(
      { message: "Expense deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting expense:", err);
    return NextResponse.json(
      { message: "Failed to delete expense" },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { expenses } from '@/db/schema/expense';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    console.log("Received userId:", userId);

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const userExpenses = await db.select().from(expenses).where(eq(expenses.userId, userId));

    return NextResponse.json(userExpenses, { status: 200 });
  } catch (err) {
    console.error("Error fetching expenses:", err);
    return NextResponse.json(
      { message: "Error fetching expenses" },
      { status: 500 }
    );
  }
}
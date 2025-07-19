"use client";
import { useAtom } from "jotai";
import { expensesAtom } from "@/lib/atoms";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DisplayExpense({ params }) {
  const { id } = params;
  const [expenses] = useAtom(expensesAtom);
  const [expense, setExpense] = useState({
    id: "",
    userId: "",
    title: "",
    description: "",
    amount: 0,
    date: "",
    type: "",
  });

  const fetchExpense = async () => {
    const exp = expenses.find((expense) => expense.id === id);
    setExpense(exp);
  };

  useEffect(() => {
    fetchExpense();
  });
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-background rounded-2xl shadow-md border border-muted">
      <Button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Back
      </Button>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-xl font-semibold text-muted-foreground">
          Expense Details
        </h1>
        <p className="text-sm text-muted-foreground">ID: {id}</p>
      </div>

      {expense ? (
        <div className="mt-6 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary">
              Title: {expense.title}
            </h2>
            <Badge className="mt-2 inline-block rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
              {expense.type}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <p className="font-bold text-black/70">Date</p>
              <p className="text-foreground">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="font-bold text-black/70">Amount</p>
              <p className="font-semibold text-green-600 text-lg">
                ₹ {expense.amount}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="font-bold text-black/70">Description</p>
              <p className="text-foreground">{expense.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center text-destructive font-medium">
          Expense not found.
        </div>
      )}
    </div>
  );
}

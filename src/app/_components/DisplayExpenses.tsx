"use client";
import { expensesAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

export default function DisplayExpenses() {
  const [expenses] = useAtom(expensesAtom);

  return (
    <div className="flex flex-col p-4 gap-5 bg-white text-black h-full rounded-lg shadow-lg w-full">
      <h1 className="font-extrabold text-2xl text-left">Your expenses</h1>
      <div className="overflow-y-auto h-full w-full max-h-44 p-2">
        {expenses &&
          expenses.map((expense) => (
            <span
              className="flex justify-between items-center bg-yellow-400/70 p-4 rounded-lg mb-2"
              key={expense.id}
            >
              <div>
                <h1 className="font-bold">{expense.title}</h1>
                <p>
                  {new Date(expense.date).toLocaleString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <h3 className="font-bold flex gap-1.5">
                  ₹
                  <p>
                    {Number(expense.amount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </h3>
              </div>
            </span>
          ))}
      </div>
    </div>
  );
}

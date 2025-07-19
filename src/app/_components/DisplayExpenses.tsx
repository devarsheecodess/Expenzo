"use client";

import { expensesAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Funnel } from "lucide-react";

export default function DisplayExpenses() {
  const [expenses] = useAtom(expensesAtom);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses); // local filtered state

  useEffect(() => {
    // Initialize with all expenses on mount
    setFilteredExpenses(expenses);
  }, [expenses]);

  const handleTypeFilter = (type: string) => {
    if (type === "all") {
      setFilteredExpenses(expenses); // reset to all
    } else {
      const filtered = expenses.filter((exp) => exp.type === type);
      setFilteredExpenses(filtered);
    }
  };

  return (
    <div className="flex flex-col p-4 gap-5 bg-white text-black h-full rounded-lg shadow-lg w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-extrabold text-2xl text-left">Your expenses</h1>
        <Select onValueChange={handleTypeFilter}>
          <SelectTrigger className="w-[180px] mr-1">
            <Funnel className="h-4 w-4" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Types</SelectLabel>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Household">Household</SelectItem>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Transport">Transport</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
              <SelectItem value="all">Show All</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-y-auto h-full w-full max-h-44 p-2">
        {filteredExpenses.length === 0 ? (
          <p className="text-center text-gray-500">No expenses found.</p>
        ) : (
          filteredExpenses.map((expense) => (
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
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import { expensesAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Funnel, Eye, Trash } from "lucide-react";
import axios from "axios";

export default function DisplayExpenses() {
  const [expenses, setExpenses] = useAtom(expensesAtom);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses); // local filtered state
  const Router = useRouter();

  useEffect(() => {
    console.log(expenses);
  }, [expenses]);

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

  const handleDelete = async (id: string) => {
    try {
      const cf = confirm("Are you sure you want to delete this expense?");
      if (!cf) return;
      const response = await axios.post("/api/expenses/delete", {
        id: id,
      });
      if (response.status === 200) {
        setFilteredExpenses((prev) => prev.filter((exp) => exp.id !== id));
        setExpenses((prev) => prev.filter((exp) => exp.id !== id));
        alert("Expense deleted successfully");
      }
    } catch (err) {
      console.log(err);
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
      <div className="overflow-y-auto h-full w-full max-h-44 flex flex-col gap-3 p-2">
        {filteredExpenses.length === 0 ? (
          <p className="text-center text-gray-500">No expenses found.</p>
        ) : (
          filteredExpenses.map((expense) => (
            <Card
              key={expense.id}
              className="w-full max-w-4xl bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-400 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-3 pl-5 pr-5">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-amber-900">
                      {expense.title}
                    </h3>
                    <p className="text-sm font-medium text-amber-800/80 mt-1">
                      {expense.date}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-xl font-bold text-amber-900">
                      ₹ {expense.amount}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => Router.push(`/expense/${expense.id}`)}
                        className="bg-amber-900/10 px-2 py-1 rounded-full mt-2"
                      >
                        <p className="text-xs font-semibold text-amber-900">
                          <Eye />
                        </p>
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="px-2 py-1 mt-2"
                      >
                        <p className="text-xs font-bold text-red-800">
                          <Trash />
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

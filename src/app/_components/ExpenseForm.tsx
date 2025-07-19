"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { expenseAtom, expTypesAtom, expensesAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { v4 } from "uuid";
import axios from "axios";
import { useEffect } from "react";

export default function ExpenseForm() {
  const [expense, setExpense] = useAtom(expenseAtom);
  const [expTypes] = useAtom(expTypesAtom);
  const [expenses, setExpenses] = useAtom(expensesAtom);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const populateStorage = async () => {
    const userId = localStorage.getItem("userId");
    try {
      if (!userId) {
        console.warn("User ID not found in localStorage");
        return;
      }
      const storedExpenses = await axios.post("/api/expenses/show", { userId });
      if (storedExpenses.status === 200) {
        setExpenses(storedExpenses.data);
      }
    } catch (err) {
      console.error("Error populating storage:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(expense);
      const data = {
        ...expense,
        id: v4(),
        userId: localStorage.getItem("userId") || "", // Ensure userId is set
      };
      const response = await axios.post(`/api/expenses/add`, {
        id: data.id,
        userId: data.userId,
        title: data.title,
        description: data.description,
        amount: data.amount,
        date: data.date,
        type: data.type,
      });
      if (response.status !== 201) {
        throw new Error("Failed to add expense");
      }
      alert("Expense added successfully!");
      setExpenses((prev) => [...prev, data]);
      console.log(expenses);
      setExpense({
        id: v4(),
        userId: localStorage.getItem("userId")!,
        title: "",
        description: "",
        amount: 0,
        date: "",
        type: "",
      });
    } catch (err) {
      console.error("Error submitting expense:", err);
    }
  };

  useEffect(() => {
    populateStorage();
  }, []);

  return (
    <form
      className="flex flex-col h-full p-4 gap-3 bg-white text-black w-xl rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="font-extrabold text-2xl mb-5">Add Expense</h1>
      <Label htmlFor="title" className="text-md">
        Title of expense
      </Label>
      <Input
        type="text"
        name="title"
        value={expense.title}
        onChange={handleChange}
        placeholder="Title"
        className="p-5"
      />
      <Label htmlFor="description" className="text-md">
        Description
      </Label>
      <Input
        type="text"
        name="description"
        value={expense.description}
        placeholder="Description"
        className="p-5"
        onChange={handleChange}
      />
      <Label htmlFor="amount" className="text-md">
        Amount
      </Label>
      <Input
        type="number"
        name="amount"
        value={expense.amount}
        placeholder="Amount"
        className="p-5"
        onChange={handleChange}
      />
      <Label htmlFor="date" className="text-md">
        Date of expense
      </Label>
      <Input
        type="date"
        name="date"
        value={expense.date}
        onChange={handleChange}
        placeholder="Date"
        className="p-5"
      />
      <Label htmlFor="type" className="text-md">
        Type of expense
      </Label>
      <section className="flex gap-2 text-black">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full text-left">
              {expense.type || "Select Type"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {expTypes.map((type) => (
              <DropdownMenuItem
                key={type}
                onSelect={() => setExpense((prev) => ({ ...prev, type }))}
              >
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
      <Button className="mt-8 text-[#E1FF21]" type="submit">
        Button
      </Button>
    </form>
  );
}

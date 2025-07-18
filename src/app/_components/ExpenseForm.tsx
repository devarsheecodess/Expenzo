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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(expense);
      setExpenses((prev) => [...prev, expense]);
      alert("Expense added successfully!");
      console.log(expenses);
      setExpense({
        id: v4(),
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

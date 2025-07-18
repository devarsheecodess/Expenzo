import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { v4 } from "uuid";

export const expenseAtom = atom({
  id: v4(),
  title: "",
  description: "",
  amount: 0,
  date: "",
  type: "",
});

export const expTypesAtom = atom([
  "Entertainment",
  "Shopping",
  "Household",
  "Food",
  "Transport",
  "Other",
]);

type Expense = {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: string;
};

export const expensesAtom = atomWithStorage<Expense[]>("expenses", []);

type weeklyExpense = {
  day: string;
  desktop: number;
};

type monthlyExpense = {
  month: string;
  desktop: number;
};

export const weeklyExpenseAtom = atomWithStorage<weeklyExpense[]>(
  "weeklyExpense",
  []
);
export const monthlyExpense = atomWithStorage<monthlyExpense[]>(
  "monthlyExpense",
  []
);

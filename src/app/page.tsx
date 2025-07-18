"use client";
import dynamic from "next/dynamic";
import ExpenseForm from "./_components/ExpenseForm";
import { SkeletonCard } from "@/components/ui/skeletonLoader";
import { RESET } from "jotai/utils";
import { expensesAtom } from "@/lib/atoms";
import { useAtom } from "jotai";

// Lazy load Graphs and DisplayExpenses
const Graphs = dynamic(() => import("./_components/Graphs"), {
  loading: () => (
    <>
      <SkeletonCard />
    </>
  ),
  ssr: false,
});

const DisplayExpenses = dynamic(() => import("./_components/DisplayExpenses"), {
  loading: () => (
    <>
      <SkeletonCard />
    </>
  ),
  ssr: false,
});

export default function Home() {
  // const [expenses, setExpenses] = useAtom(expensesAtom);

  return (
    <div className="flex ml-20 mt-1">
      {/* <button onClick={() => setExpenses(RESET)}>CLick me</button> */}

      <ExpenseForm />
      <div className="flex flex-col items-center justify-center pl-5 pr-20 gap-5">
        <Graphs />
        <DisplayExpenses />
      </div>
    </div>
  );
}

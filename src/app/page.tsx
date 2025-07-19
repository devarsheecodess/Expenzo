"use client";
import dynamic from "next/dynamic";
import ExpenseForm from "./_components/ExpenseForm";
import { SkeletonCard } from "@/components/ui/skeletonLoader";
import { DisplayAIinfo } from "./_components/AIInfo";
import { SkeletonCardPie } from "@/components/skeletonLoaderPie";
import { SkeletonLoaderCard } from "@/components/skeletonLoaderCard";

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

const PieGraph = dynamic(() => import("./_components/(Graphs)/PieGraph"), {
  loading: () => (
    <>
      <SkeletonCardPie />
    </>
  ),
  ssr: false,
});

const Statistics = dynamic(() => import("./_components/Statistics"), {
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <SkeletonLoaderCard />
      <SkeletonLoaderCard />
      <SkeletonLoaderCard />
    </div>
  ),
  ssr: false,
});

export default function Home() {
  return (
    <div className="ml-20 mr-20">
      <div className="flex mt-1">
        <ExpenseForm />
        <div className="flex flex-col items-center justify-center pl-5 gap-5">
          <Graphs />
          <DisplayExpenses />
        </div>
      </div>

      <div>
        <div className="mb-8 mt-10">
          <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
            AI Insights
          </h1>
          <p className="text-gray-600 text-lg">
            Smart analytics for your spending patterns
          </p>
        </div>
        <Statistics />
        <div className="mt-5 h-96 flex gap-6 mb-10">
          <DisplayAIinfo />
          <PieGraph />
        </div>
      </div>
    </div>
  );
}

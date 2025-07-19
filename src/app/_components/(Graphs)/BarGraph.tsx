"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { monthlyExpense, expensesAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const description = "A bar chart";

const chartData = [
  { month: "Jan", desktop: 186 },
  { month: "Feb", desktop: 305 },
  { month: "Mar", desktop: 237 },
  { month: "Apr", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "Jun", desktop: 214 },
  { month: "Jul", desktop: 186 },
  { month: "Aug", desktop: 0 },
  { month: "Sept", desktop: 237 },
  { month: "Oct", desktop: 73 },
  { month: "Nov", desktop: 209 },
  { month: "Dec", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Monthly Expense ",
    color: "#E1FF21",
  },
} satisfies ChartConfig;

export function BarGraph() {
  const [chartData, setChartData] = useAtom(monthlyExpense);
  const [expenses] = useAtom(expensesAtom);

  const calculateYearlyExpense = () => {
    try {
      const today = new Date();
      const currentYear = today.getFullYear();

      // Filter expenses from the current year
      const yearlyExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === currentYear;
      });

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];

      const monthlyData: { month: string; desktop: number }[] = months.map(
        (month) => ({
          month,
          desktop: 0,
        })
      );

      // Aggregate expenses month-wise
      for (const expense of yearlyExpenses) {
        const expenseDate = new Date(expense.date);
        const monthIndex = expenseDate.getMonth(); // 0 for Jan, 11 for Dec
        monthlyData[monthIndex].desktop += Number(expense.amount);
      }

      setChartData(monthlyData);
      console.log(monthlyData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    calculateYearlyExpense();
  }, [expenses]);

  return (
    <Card className="w-md bg-gradient-to-br from-black to-gray-800 text-white shadow-lg shadow-black/70 border-1 border-black">
      <CardHeader>
        <CardTitle>Monthly Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

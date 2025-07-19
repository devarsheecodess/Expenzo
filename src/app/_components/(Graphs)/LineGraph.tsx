"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
import { weeklyExpenseAtom, expensesAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const description = "A simple area chart";

const chartConfig = {
  desktop: {
    label: "Daily Expense ",
    color: "#E1FF21",
  },
} satisfies ChartConfig;

export function LineGraph() {
  const [chartData, setChartData] = useAtom(weeklyExpenseAtom);
  const [expenses] = useAtom(expensesAtom);

  const calculateWeeklyExpense = () => {
    try {
      const today = new Date();

      // Set start of the week to Sunday at 00:00:00
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      // Set end of the week to Saturday at 23:59:59
      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
      endOfWeek.setHours(23, 59, 59, 999);

      console.log("Week range:", startOfWeek, endOfWeek);

      const weeklyExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= startOfWeek && expenseDate <= endOfWeek;
      });

      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const weeklyData: { day: string; desktop: number }[] = weekdays.map(
        (day) => ({
          day,
          desktop: 0,
        })
      );

      for (const expense of weeklyExpenses) {
        const expenseDate = new Date(expense.date);
        const dayIndex = expenseDate.getDay();
        weeklyData[dayIndex].desktop += Number(expense.amount);
      }

      setChartData(weeklyData);
      console.log(weeklyData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    calculateWeeklyExpense();
  }, [expenses]);

  return (
    <Card className="w-sm bg-gradient-to-br from-black to-gray-800 text-white shadow-lg shadow-black/70 border-1 border-transparent">
      <CardHeader>
        <CardTitle>Weekly Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

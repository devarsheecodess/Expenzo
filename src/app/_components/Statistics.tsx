import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar, DollarSign } from "lucide-react";

export default function DisplayStatistics() {
  const stats = [
    {
      title: "Spent Most On",
      value: "Entertainment",
      amount: "₹12,460",
      icon: Calendar,
      gradient: "from-gray-900 to-black",
    },
    {
      title: "Highest Spent Day",
      value: "Saturday",
      amount: "₹7,480",
      icon: TrendingUp,
      gradient: "from-black to-gray-800",
    },
    {
      title: "Highest Spent Month",
      value: "October",
      amount: "₹29,460",
      icon: DollarSign,
      gradient: "from-gray-800 to-black",
    },
  ];

  return (
    <div className="w-full mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={index}
              className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}`}
              />
              <div className="relative z-10">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white/90 text-sm font-medium uppercase tracking-wider">
                      {stat.title}
                    </CardTitle>
                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Amount:</span>
                      <span className="text-xl font-semibold text-white">
                        {stat.amount}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/30 rounded-full transform origin-left group-hover:scale-x-110 transition-transform duration-300"
                      style={{ width: "75%" }}
                    />
                  </div>
                </CardContent>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          );
        })}
      </div>
    </div>
  );
}

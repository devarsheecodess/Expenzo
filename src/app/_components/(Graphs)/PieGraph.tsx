import { PieChart, Pie, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Fixed Expenses", value: 58, fill: "#7e8f13" },
  { name: "Variable Expenses", value: 42, fill: "#a4ba18" },
];

export default function PieGraph() {
  return (
    <div className="w-full h-96 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
        Fixed VS Variable expenses
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              outerRadius={80}
              dataKey="value"
              stroke="#fff"
              strokeWidth={2}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              wrapperStyle={{
                fontSize: "14px",
                fontWeight: "500",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { data, formatNumber } from "@/lib/data";

export function BirthsDeathsChart() {
  const chartData = data.demographics.natural_movement;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nascite e Decessi (2002–2024)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} tickLine={false} interval={2} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} />
            <Tooltip
              formatter={(value: any, name: any) => {
                const labels: Record<string, string> = {
                  births: "Nascite",
                  deaths: "Decessi",
                  natural_balance: "Saldo naturale",
                };
                return [formatNumber(value), labels[name] ?? name];
              }}
            />
            <Legend
              formatter={(value: any) => {
                const labels: Record<string, string> = {
                  births: "Nascite",
                  deaths: "Decessi",
                  natural_balance: "Saldo naturale",
                };
                return labels[value] ?? value;
              }}
            />
            <Bar dataKey="births" fill="#10b981" radius={[2, 2, 0, 0]} />
            <Bar dataKey="deaths" fill="#ef4444" radius={[2, 2, 0, 0]} />
            <Line
              type="monotone"
              dataKey="natural_balance"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

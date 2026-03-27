"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { data, formatNumber } from "@/lib/data";

const STATUS_LABELS: Record<string, string> = {
  celibi: "Celibi",
  nubili: "Nubili",
  coniugati: "Coniugati",
  coniugate: "Coniugate",
  divorziati: "Divorziati",
  divorziate: "Divorziate",
  vedovi: "Vedovi",
  vedove: "Vedove",
};

const COLORS = [
  "#3b82f6", "#ec4899", "#2563eb", "#db2777",
  "#60a5fa", "#f472b6", "#93c5fd", "#f9a8d4",
];

export function CivilStatusChart() {
  const chartData = data.demographics.civil_status_2023.map((item) => ({
    ...item,
    name: STATUS_LABELS[item.status] ?? item.status,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stato Civile (2023)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              dataKey="count"
              nameKey="name"
              label={(props: any) =>
                `${props.name} ${props.pct?.toFixed(1) ?? ""}%`
              }
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => [formatNumber(value), "Persone"]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

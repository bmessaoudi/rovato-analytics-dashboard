"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { data, formatNumber } from "@/lib/data";

export function AgeStructureChart() {
  const chartData = data.demographics.age_structure_trend;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Struttura per Eta nel Tempo</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} tickFormatter={(v) => formatNumber(v)} />
            <Tooltip
              formatter={(value: any, name: any) => {
                const labels: Record<string, string> = {
                  age_0_14: "0–14 anni",
                  age_15_64: "15–64 anni",
                  age_65_plus: "65+ anni",
                };
                return [formatNumber(value), labels[name] ?? name];
              }}
            />
            <Legend
              formatter={(v: any) => {
                const labels: Record<string, string> = {
                  age_0_14: "0–14 anni",
                  age_15_64: "15–64 anni",
                  age_65_plus: "65+ anni",
                };
                return labels[v] ?? v;
              }}
            />
            <Area type="monotone" dataKey="age_0_14" stackId="1" fill="#10b981" stroke="#10b981" />
            <Area type="monotone" dataKey="age_15_64" stackId="1" fill="#3b82f6" stroke="#3b82f6" />
            <Area type="monotone" dataKey="age_65_plus" stackId="1" fill="#f59e0b" stroke="#f59e0b" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

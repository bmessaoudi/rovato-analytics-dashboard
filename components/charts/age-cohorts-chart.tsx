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
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { data, formatNumber } from "@/lib/data";

export function AgeCohortsChart() {
  const chartData = data.demographics.age_cohorts_2023;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuzione per Fascia d&apos;Eta (2023)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} tickFormatter={(v) => formatNumber(v)} />
            <Tooltip
              formatter={(value: any, name: any) => [
                formatNumber(value),
                name === "male" ? "Maschi" : "Femmine",
              ]}
              labelFormatter={(label) => `Fascia ${label} anni`}
            />
            <Legend formatter={(v: any) => (v === "male" ? "Maschi" : "Femmine")} />
            <Bar dataKey="male" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="female" stackId="a" fill="#ec4899" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

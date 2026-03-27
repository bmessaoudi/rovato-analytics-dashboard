"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { data, formatNumber } from "@/lib/data";

export function CensusHistoryChart() {
  const chartData = data.demographics.census_history;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Censimenti Storici (1861–2021)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} tickLine={false} interval={1} angle={-45} textAnchor="end" height={50} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} tickFormatter={(v) => formatNumber(v)} />
            <Tooltip
              formatter={(value: any) => [formatNumber(value), "Popolazione"]}
              labelFormatter={(label) => `Censimento ${label}`}
            />
            <Bar dataKey="population" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

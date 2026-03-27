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

export function ForeignersChart() {
  const chartData = data.demographics.foreigners.by_nationality;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stranieri per Nazionalita (2023)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 70 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} />
            <YAxis
              type="category"
              dataKey="country"
              tick={{ fontSize: 12 }}
              tickLine={false}
              width={65}
            />
            <Tooltip
              formatter={(value: any) => [formatNumber(value), "Residenti"]}
            />
            <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

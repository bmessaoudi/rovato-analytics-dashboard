"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { data, formatNumber } from "@/lib/data";

export function FamilyTrendChart() {
  const chartData = data.demographics.family_trend;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trend Famiglie (2018–2023)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} tickLine={false} />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12 }}
              tickLine={false}
              tickFormatter={(v) => formatNumber(v)}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              tickLine={false}
              domain={[2.3, 2.5]}
            />
            <Tooltip
              formatter={(value: any, name: any) => {
                if (name === "families") return [formatNumber(value), "Famiglie"];
                return [value.toFixed(2), "Media componenti"];
              }}
            />
            <Legend
              formatter={(v: any) =>
                v === "families" ? "N. Famiglie" : "Media componenti"
              }
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="families"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avg_members"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

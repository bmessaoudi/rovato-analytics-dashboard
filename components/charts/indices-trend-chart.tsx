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
import { data } from "@/lib/data";

export function IndicesTrendChart() {
  const chartData = data.demographics.indices_trend;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Indici Demografici nel Tempo</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} />
            <Tooltip />
            <Legend
              formatter={(v: string) => {
                const labels: Record<string, string> = {
                  aging_index: "Ind. Vecchiaia",
                  dependency_index: "Ind. Dipendenza",
                };
                return labels[v] ?? v;
              }}
            />
            <Line type="monotone" dataKey="aging_index" name="aging_index" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} connectNulls />
            <Line type="monotone" dataKey="dependency_index" name="dependency_index" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} connectNulls />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

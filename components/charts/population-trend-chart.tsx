"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { data, formatNumber } from "@/lib/data";

export function PopulationTrendChart({ mini = false }: { mini?: boolean }) {
  const chartData = data.demographics.population_trend;

  return (
    <Card>
      <CardHeader className={mini ? "pb-2" : undefined}>
        <CardTitle className={mini ? "text-sm" : undefined}>
          Trend Popolazione {mini ? "" : "2001–2024"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={mini ? 200 : 350}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="popGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12 }}
              tickLine={false}
              interval={mini ? 5 : 2}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              tickFormatter={(v) => formatNumber(v)}
              domain={["dataMin - 500", "dataMax + 500"]}
              hide={mini}
            />
            <Tooltip
              formatter={(value: any) => [formatNumber(value), "Popolazione"]}
              labelFormatter={(label) => `Anno ${label}`}
            />
            <Area
              type="monotone"
              dataKey="population"
              stroke="#3b82f6"
              fill="url(#popGrad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

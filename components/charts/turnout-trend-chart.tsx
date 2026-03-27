"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { data } from "@/lib/data";

const TYPE_COLORS: Record<string, string> = {
  referendum: "#f59e0b",
  camera: "#3b82f6",
  senato: "#6366f1",
  europee: "#10b981",
  comunali: "#ef4444",
};

export function TurnoutTrendChart({ mini = false }: { mini?: boolean }) {
  const events = Object.fromEntries(
    data.elections.events.map((e) => [e.id, e])
  );
  const chartData = data.elections.turnout_trend
    .filter((t) => t.affluenza_pct != null)
    .map((t) => ({
      ...t,
      label: events[t.election_id]?.short_name ?? t.election_id,
    }));

  return (
    <Card>
      <CardHeader className={mini ? "pb-2" : undefined}>
        <CardTitle className={mini ? "text-sm" : undefined}>
          Affluenza alle Urne
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={mini ? 200 : 350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11 }}
              tickLine={false}
              angle={mini ? -30 : 0}
              textAnchor={mini ? "end" : "middle"}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              hide={mini}
            />
            <Tooltip
              formatter={(value: any) => [
                `${value.toFixed(1)}%`,
                "Affluenza",
              ]}
            />
            <Bar dataKey="affluenza_pct" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={TYPE_COLORS[entry.type ?? ""] ?? "#94a3b8"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

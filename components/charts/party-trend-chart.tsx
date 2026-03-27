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
import { data, getPartyColor, getPartyName } from "@/lib/data";

export function PartyTrendChart({ mini = false }: { mini?: boolean }) {
  const partyTrend = data.elections.party_trend;

  // Collect all unique dates and build chart data
  const dateSet = new Set<string>();
  for (const pt of partyTrend) {
    for (const d of pt.data) {
      dateSet.add(d.date);
    }
  }
  const dates = Array.from(dateSet).sort();

  const events = Object.fromEntries(
    data.elections.events.map((e) => [e.date, e.short_name])
  );

  const chartData = dates.map((date) => {
    const point: Record<string, string | number | null> = {
      date,
      label: events[date] ?? date,
    };
    for (const pt of partyTrend) {
      const match = pt.data.find((d) => d.date === date);
      point[pt.party_id] = match?.vote_pct ?? null;
    }
    return point;
  });

  return (
    <Card>
      <CardHeader className={mini ? "pb-2" : undefined}>
        <CardTitle className={mini ? "text-sm" : undefined}>
          Trend Partiti Principali
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={mini ? 200 : 400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11 }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              hide={mini}
            />
            <Tooltip
              formatter={(value: any, name: any) => [
                `${value.toFixed(1)}%`,
                getPartyName(name),
              ]}
            />
            {!mini && (
              <Legend
                formatter={(value: any) => getPartyName(value)}
                wrapperStyle={{ fontSize: 12 }}
              />
            )}
            {partyTrend.map((pt) => (
              <Line
                key={pt.party_id}
                type="monotone"
                dataKey={pt.party_id}
                stroke={getPartyColor(pt.party_id)}
                strokeWidth={2}
                dot={{ r: mini ? 2 : 4 }}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

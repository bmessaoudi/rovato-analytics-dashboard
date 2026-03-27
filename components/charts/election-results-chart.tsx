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
import { formatNumber, getPartyColor } from "@/lib/data";

interface ElectionResultsChartProps {
  parties: Array<{
    party_id: string;
    label: string;
    votes: number;
    vote_pct: number;
  }>;
  title?: string;
}

export function ElectionResultsChart({
  parties,
  title = "Risultati per Lista",
}: ElectionResultsChartProps) {
  // Show top 12 parties, group rest as "Altri"
  const sorted = [...parties].sort((a, b) => b.votes - a.votes);
  const top = sorted.slice(0, 12);
  const rest = sorted.slice(12);
  const chartData = [
    ...top.map((p) => ({
      name: p.label.length > 25 ? p.label.slice(0, 22) + "..." : p.label,
      fullName: p.label,
      votes: p.votes,
      pct: p.vote_pct,
      party_id: p.party_id,
    })),
  ];
  if (rest.length > 0) {
    const altriVotes = rest.reduce((s, p) => s + p.votes, 0);
    const altriPct = rest.reduce((s, p) => s + p.vote_pct, 0);
    chartData.push({
      name: "Altri",
      fullName: "Altri partiti",
      votes: altriVotes,
      pct: altriPct,
      party_id: "ALTRI",
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={Math.max(300, chartData.length * 35)}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis type="number" tick={{ fontSize: 12 }} tickLine={false} tickFormatter={(v) => `${v}%`} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11 }}
              tickLine={false}
              width={180}
            />
            <Tooltip
              formatter={(value: any, _name: any, props: any) => [
                `${value.toFixed(1)}% (${formatNumber(props.payload.votes)} voti)`,
                props.payload.fullName,
              ]}
            />
            <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={getPartyColor(entry.party_id)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

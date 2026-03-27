"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { data, formatNumber } from "@/lib/data";
import type { ElectionResult } from "@/lib/data";

const COALITION_COLORS: Record<string, string> = {
  CENTRODESTRA: "#003DA5",
  CENTROSINISTRA: "#E2001A",
  M5S: "#FFD700",
  TERZO_POLO: "#1E3A5F",
  LIBERI_E_UGUALI: "#C41E3A",
  BELOTTI: "#003DA5",
  BONASSI: "#E2001A",
  REMONATO: "#FF8C00",
  MANENTI: "#228B22",
};

interface CoalitionChartProps {
  electionId: string;
  mini?: boolean;
}

export function CoalitionChart({ electionId, mini = false }: CoalitionChartProps) {
  const result = (data.elections.results as Record<string, ElectionResult>)[
    electionId
  ];
  if (!result?.municipality?.coalitions) return null;

  const chartData = result.municipality.coalitions.map((c) => ({
    name: c.name ?? c.coalition_id,
    value: c.votes,
    pct: c.vote_pct,
    color: COALITION_COLORS[c.coalition_id] ?? "#94a3b8",
  }));

  return (
    <Card>
      <CardHeader className={mini ? "pb-2" : undefined}>
        <CardTitle className={mini ? "text-sm" : undefined}>
          Coalizioni
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={mini ? 200 : 350}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={mini ? 40 : 70}
              outerRadius={mini ? 80 : 130}
              dataKey="value"
              nameKey="name"
              label={
                mini
                  ? false
                  : (props: any) =>
                      `${props.name} ${props.pct?.toFixed(1) ?? ""}%`
              }
            >
              {chartData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => [formatNumber(value), "Voti"]}
            />
            {!mini && <Legend />}
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

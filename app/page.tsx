import { KpiCard } from "@/components/kpi-card";
import { PopulationTrendChart } from "@/components/charts/population-trend-chart";
import { PartyTrendChart } from "@/components/charts/party-trend-chart";
import { TurnoutTrendChart } from "@/components/charts/turnout-trend-chart";
import { CoalitionChart } from "@/components/charts/coalition-chart";
import { data, formatNumber, formatPct } from "@/lib/data";
import { Users, Home, Clock, Globe, TrendingUp, Vote } from "lucide-react";

export default function OverviewPage() {
  const demo = data.demographics;
  const lastPop = demo.population_trend[demo.population_trend.length - 1];
  const lastTurnout = data.elections.turnout_trend.filter(
    (t) => t.affluenza_pct != null
  );
  const latest = lastTurnout[lastTurnout.length - 1];
  const eventsMap = Object.fromEntries(
    data.elections.events.map((e) => [e.id, e])
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Panoramica</h2>
        <p className="text-muted-foreground">
          Comune di Rovato (BS) — Dati demografici ed elettorali
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard
          title="Popolazione"
          value={formatNumber(lastPop.population)}
          icon={Users}
          subtitle={`Anno ${lastPop.year}`}
          trend={
            lastPop.var_pct != null
              ? `${lastPop.var_pct > 0 ? "+" : ""}${lastPop.var_pct}% vs anno prec.`
              : undefined
          }
          trendPositive={lastPop.var_pct != null ? lastPop.var_pct > 0 : undefined}
        />
        <KpiCard
          title="Famiglie"
          value={formatNumber(lastPop.families)}
          icon={Home}
          subtitle={`Media ${lastPop.avg_family_size} componenti`}
        />
        <KpiCard
          title="Eta Media"
          value={`${demo.snapshot.avg_age} anni`}
          icon={Clock}
          subtitle={`M: ${demo.snapshot.avg_age_male} — F: ${demo.snapshot.avg_age_female}`}
        />
        <KpiCard
          title="Stranieri"
          value={formatPct(demo.snapshot.foreigners_pct)}
          icon={Globe}
          subtitle={`${formatNumber(demo.snapshot.foreigners_total)} residenti`}
        />
        <KpiCard
          title="Indice Vecchiaia"
          value={demo.snapshot.aging_index.toFixed(1)}
          icon={TrendingUp}
          subtitle="> 100 = popolazione anziana"
          trend={demo.snapshot.aging_index > 100 ? "Popolazione che invecchia" : "Popolazione giovane"}
          trendPositive={demo.snapshot.aging_index <= 100}
        />
        <KpiCard
          title="Ultima Affluenza"
          value={latest?.affluenza_pct != null ? formatPct(latest.affluenza_pct) : "N/D"}
          icon={Vote}
          subtitle={eventsMap[latest?.election_id]?.short_name}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PopulationTrendChart mini />
        <PartyTrendChart mini />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TurnoutTrendChart mini />
        <CoalitionChart electionId="comunali_2020" mini />
      </div>
    </div>
  );
}

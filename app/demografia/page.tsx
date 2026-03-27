import { KpiCard } from "@/components/kpi-card";
import { PopulationTrendChart } from "@/components/charts/population-trend-chart";
import { BirthsDeathsChart } from "@/components/charts/births-deaths-chart";
import { AgeCohortsChart } from "@/components/charts/age-cohorts-chart";
import { ForeignersChart } from "@/components/charts/foreigners-chart";
import { CensusHistoryChart } from "@/components/charts/census-history-chart";
import { CivilStatusChart } from "@/components/charts/civil-status-chart";
import { FamilyTrendChart } from "@/components/charts/family-trend-chart";
import { AgeStructureChart } from "@/components/charts/age-structure-chart";
import { IndicesTrendChart } from "@/components/charts/indices-trend-chart";
import { data, formatNumber, formatPct } from "@/lib/data";
import {
  Baby,
  Skull,
  ArrowUpDown,
  Globe,
  Users,
  PlaneTakeoff,
  PlaneLanding,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DemografiaPage() {
  const demo = data.demographics;
  const bal = demo.demographic_balance;
  const foreigners = demo.foreigners;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Demografia</h2>
        <p className="text-muted-foreground">
          Analisi demografica del Comune di Rovato
        </p>
      </div>

      {/* Popolazione */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Popolazione</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PopulationTrendChart />
          <CensusHistoryChart />
        </div>
      </section>

      <Separator />

      {/* Bilancio demografico */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Bilancio Demografico 2023</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <KpiCard
            title="Nascite"
            value={formatNumber(bal.births)}
            icon={Baby}
            trendPositive={true}
          />
          <KpiCard
            title="Decessi"
            value={formatNumber(bal.deaths)}
            icon={Skull}
          />
          <KpiCard
            title="Saldo Naturale"
            value={`${bal.natural_balance > 0 ? "+" : ""}${bal.natural_balance}`}
            icon={ArrowUpDown}
            trendPositive={bal.natural_balance > 0}
          />
          <KpiCard
            title="Iscritti"
            value={formatNumber(bal.immigrants)}
            icon={PlaneLanding}
          />
          <KpiCard
            title="Cancellati"
            value={formatNumber(bal.emigrants)}
            icon={PlaneTakeoff}
          />
          <KpiCard
            title="Saldo Totale"
            value={`${bal.total_balance > 0 ? "+" : ""}${bal.total_balance}`}
            icon={ArrowUpDown}
            trendPositive={bal.total_balance > 0}
          />
        </div>
        <BirthsDeathsChart />
      </section>

      <Separator />

      {/* Struttura eta' */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Struttura per Eta</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AgeCohortsChart />
          <AgeStructureChart />
        </div>
        <IndicesTrendChart />
      </section>

      <Separator />

      {/* Famiglie e stato civile */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Famiglie e Stato Civile</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FamilyTrendChart />
          <CivilStatusChart />
        </div>
      </section>

      <Separator />

      {/* Stranieri */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Stranieri Residenti</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Totale Stranieri"
            value={formatNumber(foreigners.total)}
            icon={Globe}
            subtitle={`${formatPct(foreigners.total_pct_population)} della popolazione`}
          />
          <KpiCard
            title="Maschi"
            value={formatNumber(foreigners.male)}
            icon={Users}
            subtitle={formatPct(foreigners.male_pct_foreigners)}
          />
          <KpiCard
            title="Femmine"
            value={formatNumber(foreigners.female)}
            icon={Users}
            subtitle={formatPct(foreigners.female_pct_foreigners)}
          />
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                Saldo Migratorio Stranieri
              </p>
              <p className="text-2xl font-bold">
                {foreigners.balance.total_balance > 0 ? "+" : ""}
                {foreigners.balance.total_balance}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Iscritti: {foreigners.balance.immigrants} — Cancellati:{" "}
                {foreigners.balance.emigrants}
              </p>
            </CardContent>
          </Card>
        </div>
        <ForeignersChart />
      </section>
    </div>
  );
}

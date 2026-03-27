"use client";

import { useState } from "react";
import { KpiCard } from "@/components/kpi-card";
import { TurnoutTrendChart } from "@/components/charts/turnout-trend-chart";
import { PartyTrendChart } from "@/components/charts/party-trend-chart";
import { ElectionResultsChart } from "@/components/charts/election-results-chart";
import { CoalitionChart } from "@/components/charts/coalition-chart";
import { SectionHeatmap } from "@/components/charts/section-heatmap";
import { CandidatesTable } from "@/components/charts/candidates-table";
import { data, formatNumber, formatPct } from "@/lib/data";
import type { ElectionResult } from "@/lib/data";
import { Users, Vote, FileX, FileCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function ElezioniPage() {
  const events = data.elections.events;
  const [selectedId, setSelectedId] = useState(events[events.length - 1].id);

  const selectedEvent = events.find((e) => e.id === selectedId)!;
  const result = (data.elections.results as Record<string, ElectionResult>)[
    selectedId
  ];
  const mun = result?.municipality;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Elezioni</h2>
        <p className="text-muted-foreground">
          Analisi elettorale del Comune di Rovato (2016–2024)
        </p>
      </div>

      {/* Cross-election overview */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Panoramica</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TurnoutTrendChart />
          <PartyTrendChart />
        </div>
      </section>

      <Separator />

      {/* Election detail selector */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h3 className="text-lg font-semibold">Dettaglio Elezione</h3>
          <Select value={selectedId} onValueChange={(v) => { if (v) setSelectedId(v); }}>
            <SelectTrigger className="w-[300px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {events.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {mun && (
          <>
            {/* KPI cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <KpiCard
                title="Elettori"
                value={mun.elettori != null ? formatNumber(mun.elettori) : "N/D"}
                icon={Users}
              />
              <KpiCard
                title="Votanti"
                value={formatNumber(mun.votanti)}
                icon={Vote}
                subtitle={
                  mun.affluenza_pct != null
                    ? `Affluenza: ${formatPct(mun.affluenza_pct)}`
                    : undefined
                }
              />
              <KpiCard
                title="Schede Bianche"
                value={formatNumber(mun.schede_bianche)}
                icon={FileX}
              />
              <KpiCard
                title="Voti Validi"
                value={formatNumber(mun.voti_validi)}
                icon={FileCheck}
              />
            </div>

            {/* Results + Coalitions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ElectionResultsChart
                parties={mun.parties}
                title={`Risultati — ${selectedEvent.short_name}`}
              />
              {mun.coalitions && (
                <CoalitionChart electionId={selectedId} />
              )}
            </div>

            {/* Candidates (only for politiche_2022_camera) */}
            {result.candidates && result.candidates.length > 0 && (
              <CandidatesTable candidates={result.candidates} />
            )}

            {/* Section heatmap */}
            {result.sections && result.sections.length > 0 && (
              <SectionHeatmap
                sections={result.sections.map((s) => ({
                  section: s.section,
                  coalitions: s.coalitions,
                  parties: s.parties,
                  votanti: s.votanti,
                  affluenza_pct: s.affluenza_pct,
                }))}
              />
            )}

            {/* Section detail table */}
            {result.sections && result.sections.length > 0 && (
              <SectionDetailTable
                sections={result.sections}
                hasCoalitions={mun.coalitions != null}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}

function SectionDetailTable({
  sections,
  hasCoalitions,
}: {
  sections: NonNullable<ElectionResult["sections"]>;
  hasCoalitions: boolean;
}) {
  return (
    <div className="rounded-lg border bg-card overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-3 text-left font-medium">Sez.</th>
            <th className="px-4 py-3 text-right font-medium">Votanti</th>
            <th className="px-4 py-3 text-right font-medium">Affluenza</th>
            {hasCoalitions && (
              <th className="px-4 py-3 text-left font-medium">
                Coalizione Vincente
              </th>
            )}
            <th className="px-4 py-3 text-left font-medium">
              Primo Partito
            </th>
            <th className="px-4 py-3 text-right font-medium">Voti</th>
            <th className="px-4 py-3 text-right font-medium">%</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((sec) => {
            const topParty = [...sec.parties].sort(
              (a, b) => b.votes - a.votes
            )[0];
            const topCoalition = sec.coalitions
              ? [...sec.coalitions].sort((a, b) => b.votes - a.votes)[0]
              : null;

            return (
              <tr key={sec.section} className="border-b last:border-0">
                <td className="px-4 py-2.5 font-medium">{sec.section}</td>
                <td className="px-4 py-2.5 text-right">
                  {formatNumber(sec.votanti)}
                </td>
                <td className="px-4 py-2.5 text-right">
                  {sec.affluenza_pct != null
                    ? formatPct(sec.affluenza_pct)
                    : "N/D"}
                </td>
                {hasCoalitions && (
                  <td className="px-4 py-2.5">
                    {topCoalition
                      ? `${topCoalition.coalition_id} (${topCoalition.vote_pct?.toFixed(1)}%)`
                      : "—"}
                  </td>
                )}
                <td className="px-4 py-2.5">{topParty?.label ?? "—"}</td>
                <td className="px-4 py-2.5 text-right">
                  {topParty ? formatNumber(topParty.votes) : "—"}
                </td>
                <td className="px-4 py-2.5 text-right">
                  {topParty ? `${topParty.vote_pct.toFixed(1)}%` : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

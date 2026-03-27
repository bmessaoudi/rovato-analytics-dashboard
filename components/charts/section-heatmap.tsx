"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SectionData {
  section: number;
  coalitions: Array<{
    coalition_id: string;
    votes: number;
    vote_pct: number;
  }> | null;
  parties: Array<{
    party_id: string;
    label: string;
    votes: number;
    vote_pct: number;
  }>;
  votanti: number;
  affluenza_pct: number | null;
}

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

const COALITION_NAMES: Record<string, string> = {
  CENTRODESTRA: "Centrodestra",
  CENTROSINISTRA: "Centrosinistra",
  M5S: "M5S",
  TERZO_POLO: "Terzo Polo",
  LIBERI_E_UGUALI: "Liberi e Uguali",
  BELOTTI: "Belotti",
  BONASSI: "Bonassi",
  REMONATO: "Remonato",
  MANENTI: "Manenti",
};

export function SectionHeatmap({ sections }: { sections: SectionData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mappa Sezioni Elettorali</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2">
          {sections.map((sec) => {
            const winner = sec.coalitions
              ? sec.coalitions.reduce((a, b) =>
                  a.votes > b.votes ? a : b
                )
              : sec.parties.reduce((a, b) =>
                  a.votes > b.votes ? a : b
                );
            const winnerColor =
              "coalition_id" in winner
                ? COALITION_COLORS[winner.coalition_id] ?? "#94a3b8"
                : "#94a3b8";
            const winnerName =
              "coalition_id" in winner
                ? COALITION_NAMES[winner.coalition_id] ?? winner.coalition_id
                : (winner as { label: string }).label;
            const winnerPct = ("vote_pct" in winner ? winner.vote_pct : 0).toFixed(0);

            const tooltip = `Sez. ${sec.section} — ${winnerName} (${winnerPct}%) — Votanti: ${sec.votanti}${sec.affluenza_pct ? ` — Affluenza: ${sec.affluenza_pct.toFixed(1)}%` : ""}`;

            return (
              <div
                key={sec.section}
                title={tooltip}
                className="aspect-square rounded-lg flex flex-col items-center justify-center text-white font-bold cursor-default hover:opacity-80 transition-opacity"
                style={{ backgroundColor: winnerColor }}
              >
                <span className="text-lg">{sec.section}</span>
                <span className="text-[10px] opacity-80">{winnerPct}%</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

import dataset from "@/public/rovato_mega_dataset.json";

export type Dataset = typeof dataset;
export type Municipality = Dataset["municipality"];
export type Demographics = Dataset["demographics"];
export type Elections = Dataset["elections"];
export type Administration = Dataset["administration"];

export type PopulationTrendItem = Demographics["population_trend"][number];
export type NaturalMovementItem = Demographics["natural_movement"][number];
export type AgePyramidItem = Demographics["age_pyramid"][number];
export type AgeCohortItem = Demographics["age_cohorts_2023"][number];
export type CivilStatusItem = Demographics["civil_status_2023"][number];
export type FamilyTrendItem = Demographics["family_trend"][number];
export type CensusHistoryItem = Demographics["census_history"][number];
export type NationalityItem = Demographics["foreigners"]["by_nationality"][number];
export type AgeStructureItem = Demographics["age_structure_trend"][number];
export type IndicesTrendItem = Demographics["indices_trend"][number];

export type ElectionEvent = Elections["events"][number];
export type TurnoutItem = Elections["turnout_trend"][number];
export type PartyTrendItem = Elections["party_trend"][number];

export type ElectionResult = {
  municipality: {
    elettori: number | null;
    votanti: number;
    affluenza_pct: number | null;
    schede_bianche: number;
    schede_nulle: number | null;
    voti_validi: number;
    parties: Array<{
      party_id: string;
      label: string;
      votes: number;
      vote_pct: number;
      coalition: string | null;
    }>;
    coalitions: Array<{
      coalition_id: string;
      name?: string;
      votes: number;
      vote_pct: number;
    }> | null;
  };
  candidates: Array<{
    name: string;
    liste_collegate: string;
    votes: number;
    vote_pct: number;
  }> | null;
  sections: Array<{
    section: number;
    elettori: number | null;
    votanti: number;
    affluenza_pct: number | null;
    schede_bianche: number;
    schede_nulle: number;
    voti_validi: number;
    parties: Array<{
      party_id: string;
      label: string;
      votes: number;
      vote_pct: number;
      coalition: string | null;
    }>;
    coalitions: Array<{
      coalition_id: string;
      votes: number;
      vote_pct: number;
    }> | null;
    candidates: Array<{
      name: string;
      liste_collegate: string;
      votes: number;
      vote_pct: number;
    }> | null;
  }> | null;
};

export const data = dataset;

export function formatNumber(n: number | null | undefined): string {
  if (n == null) return "N/D";
  return n.toLocaleString("it-IT");
}

export function formatPct(n: number | null | undefined): string {
  if (n == null) return "N/D";
  return n.toFixed(1).replace(".", ",") + "%";
}

export function getPartyColor(partyId: string): string {
  const registry = data.elections.party_registry as Record<
    string,
    { color: string }
  >;
  return registry[partyId]?.color ?? "#94a3b8";
}

export function getPartyName(partyId: string): string {
  const registry = data.elections.party_registry as Record<
    string,
    { canonical_name: string }
  >;
  return registry[partyId]?.canonical_name ?? partyId;
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/data";

interface Candidate {
  name: string;
  liste_collegate: string;
  votes: number;
  vote_pct: number;
}

export function CandidatesTable({ candidates }: { candidates: Candidate[] }) {
  const sorted = [...candidates].sort((a, b) => b.votes - a.votes);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidati Uninominale</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidato</TableHead>
              <TableHead>Liste Collegate</TableHead>
              <TableHead className="text-right">Voti</TableHead>
              <TableHead className="text-right">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((c, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-[300px] truncate">
                  {c.liste_collegate}
                </TableCell>
                <TableCell className="text-right">
                  {formatNumber(c.votes)}
                </TableCell>
                <TableCell className="text-right">
                  {c.vote_pct.toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

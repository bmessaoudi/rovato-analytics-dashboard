import { data, formatNumber } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, GraduationCap, Briefcase } from "lucide-react";

export default function AmministrazionePage() {
  const admin = data.administration;
  const mayor = admin.mayor;

  // Calculate mandate progress
  const start = new Date(admin.term_start).getTime();
  const end = new Date(admin.term_end).getTime();
  const now = Date.now();
  const progressPct = Math.min(
    100,
    Math.max(0, ((now - start) / (end - start)) * 100)
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Amministrazione</h2>
        <p className="text-muted-foreground">
          Giunta e Consiglio Comunale di Rovato — Mandato 2020–2025
        </p>
      </div>

      {/* Mandate progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Mandato: {new Date(admin.term_start).toLocaleDateString("it-IT")} —{" "}
              {new Date(admin.term_end).toLocaleDateString("it-IT")}
            </span>
            <span className="text-sm font-medium">
              {progressPct.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sindaco */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">Sindaco</h3>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="rounded-full bg-muted w-20 h-20 flex items-center justify-center flex-shrink-0">
                <User className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="text-xl font-bold">{mayor.name}</h4>
                  <p className="text-muted-foreground">{mayor.coalition}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Nato il{" "}
                      {new Date(mayor.born_date).toLocaleDateString("it-IT")} a{" "}
                      {mayor.born_at}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{mayor.education}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span>{mayor.profession_category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Eletto il{" "}
                      {new Date(mayor.election_date).toLocaleDateString(
                        "it-IT"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Assessori */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">
          Giunta — Assessori ({admin.assessors.length})
        </h3>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Eta</TableHead>
                  <TableHead>Nato/a a</TableHead>
                  <TableHead>Titolo di Studio</TableHead>
                  <TableHead>Categoria Prof.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admin.assessors.map((a, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{a.name}</TableCell>
                    <TableCell>{a.age}</TableCell>
                    <TableCell>{a.born_at}</TableCell>
                    <TableCell>{a.education}</TableCell>
                    <TableCell>{a.profession_category ?? "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Consiglio */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">
          Consiglio Comunale ({admin.council.length} membri)
        </h3>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Eta</TableHead>
                  <TableHead>Partito/Lista</TableHead>
                  <TableHead>Ruolo</TableHead>
                  <TableHead>Titolo di Studio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admin.council.map((c, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell>{c.age}</TableCell>
                    <TableCell>{c.party ?? "—"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          c.role === "majority"
                            ? "default"
                            : c.role === "opposition"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {c.role === "majority"
                          ? "Maggioranza"
                          : c.role === "opposition"
                          ? "Opposizione"
                          : "—"}
                      </Badge>
                    </TableCell>
                    <TableCell>{c.education}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

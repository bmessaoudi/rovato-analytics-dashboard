import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
}

export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive,
}: KpiCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {trend && (
              <p
                className={`text-xs font-medium ${
                  trendPositive === true
                    ? "text-emerald-600"
                    : trendPositive === false
                    ? "text-red-600"
                    : "text-muted-foreground"
                }`}
              >
                {trend}
              </p>
            )}
          </div>
          <div className="rounded-lg bg-muted p-2.5">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

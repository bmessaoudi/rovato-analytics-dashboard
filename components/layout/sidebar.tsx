"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Vote, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Panoramica", icon: LayoutDashboard },
  { href: "/demografia", label: "Demografia", icon: Users },
  { href: "/elezioni", label: "Elezioni", icon: Vote },
  { href: "/amministrazione", label: "Amministrazione", icon: Building2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card">
      <div className="p-6 border-b">
        <h1 className="text-lg font-bold">Rovato Analytics</h1>
        <p className="text-sm text-muted-foreground">Comune di Rovato (BS)</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground">
          Dati: ISTAT, Ministero Interno, Urbistat
        </p>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden flex border-b bg-card overflow-x-auto">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

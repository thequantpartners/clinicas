"use client";

import Link from "next/link";

type MenuItem = "diagnostico" | "control" | "reporte" | "cuenta";

type AppMenuProps = {
  active: MenuItem;
};

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
      <path d="M5 20V9M12 20V4M19 20v-8" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      <path d="M3 20h18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
      <path d="M3 12h3l2-5 4 10 3-7 2 2h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.9" />
      <path d="M5.2 20c.8-3.3 3.2-5 6.8-5s6 1.7 6.8 5H5.2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

function itemClass(isActive: boolean) {
  return [
    "flex flex-col items-center justify-center rounded-[22px]",
    isActive ? "bg-[#e0f2fe] text-[#075985]" : "text-[#34343a]",
  ].join(" ");
}

export function AppMenu({ active }: AppMenuProps) {
  return (
    <nav className="fixed bottom-3 left-1/2 z-50 grid h-[66px] w-[calc(100%-28px)] max-w-[400px] -translate-x-1/2 grid-cols-4 rounded-[28px] bg-white p-1.5 shadow-[0_20px_45px_rgba(7,89,133,0.18)] ring-1 ring-sky-900/10">
      <Link href="/diagnostico" className={itemClass(active === "diagnostico")} aria-label="Diagnóstico">
        <TargetIcon />
        <span className="text-[11px] font-black">Diagnóstico</span>
      </Link>
      <Link href="/control" className={itemClass(active === "control")} aria-label="Control">
        <PulseIcon />
        <span className="text-[11px] font-black">Control</span>
      </Link>
      <Link href="/reporte" className={itemClass(active === "reporte")} aria-label="Reporte">
        <ChartIcon />
        <span className="text-[11px] font-black">Reporte</span>
      </Link>
      <Link href="/cuenta" className={itemClass(active === "cuenta")} aria-label="Cuenta">
        <AccountIcon />
        <span className="text-[11px] font-black">Cuenta</span>
      </Link>
    </nav>
  );
}

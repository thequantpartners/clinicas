"use client";

import Link from "next/link";
import { AuthGate } from "./auth-gate";

const steps = [
  "Agenda y reservas",
  "WhatsApp e Instagram",
  "Confirmacion de citas",
  "Seguimiento post-atencion",
  "Control de ventas",
];

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden="true">
      <path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-5.2v-5.5h-3.6V21H5a1 1 0 0 1-1-1v-8.8Z" />
    </svg>
  );
}

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

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.5 9.6a2.7 2.7 0 0 1 5.2.7c0 2.2-2.7 2.3-2.7 4.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.9" />
      <path d="M12 17.4h.1" stroke="currentColor" strokeLinecap="round" strokeWidth="2.8" />
    </svg>
  );
}

function AppMenu() {
  return (
    <nav className="fixed bottom-3 left-1/2 z-50 grid h-[64px] w-[calc(100%-44px)] max-w-[386px] -translate-x-1/2 grid-cols-4 rounded-[28px] bg-white p-1.5 shadow-[0_20px_45px_rgba(23,23,23,0.14)] ring-1 ring-black/5">
      <Link href="/" className="flex flex-col items-center justify-center text-[#34343a]" aria-label="Inicio">
        <HomeIcon />
        <span className="text-xs font-medium">Inicio</span>
      </Link>
      <Link href="/diagnostico" className="flex flex-col items-center justify-center rounded-[22px] bg-[#eaf2ec] text-[#0b4a3d]" aria-label="Diagnostico">
        <TargetIcon />
        <span className="text-xs font-bold">Diagnostico</span>
      </Link>
      <a className="flex flex-col items-center justify-center text-[#34343a]" aria-label="Reporte">
        <ChartIcon />
        <span className="text-xs font-medium">Reporte</span>
      </a>
      <a className="flex flex-col items-center justify-center text-[#34343a]" aria-label="Ayuda">
        <HelpIcon />
        <span className="text-xs font-medium">Ayuda</span>
      </a>
    </nav>
  );
}

export default function DiagnosticoPage() {
  return (
    <AuthGate>
      {(user) => {
        const firstName = user.displayName?.split(" ")[0] ?? "cliente";

        return (
          <main className="min-h-screen bg-mist text-ink">
            <section className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col px-5 pb-28 pt-5">
              <nav className="flex items-center justify-between">
                <Link
                  href="/"
                  className="grid size-11 place-items-center rounded-full bg-white text-xl shadow-panel"
                  aria-label="Volver"
                >
                  ‹
                </Link>
                <p className="text-sm font-semibold text-ink/55">Diagnostico</p>
                <span className="size-11" />
              </nav>

              <header className="pt-8">
                <p className="text-sm font-semibold text-pine/70">
                  Hola, {firstName} · Paso 1 de 5
                </p>
                <h1 className="mt-2 text-[38px] font-medium leading-none">
                  Empecemos por tu agenda.
                </h1>
                <p className="mt-4 text-[15px] leading-5 text-ink/65">
                  Responde rapido. El reporte gratis mostrara tus fugas principales.
                </p>
              </header>

              <div className="mx-auto mt-8 w-full max-w-[340px] space-y-3">
                {steps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-3 rounded-[22px] bg-white p-4 shadow-panel"
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-mist text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold">{step}</span>
                  </div>
                ))}
              </div>

              <form className="mx-auto mt-auto w-full max-w-[340px] rounded-[26px] bg-white p-4 shadow-panel">
                <label
                  htmlFor="business"
                  className="text-sm font-semibold text-ink/70"
                >
                  Nombre del negocio
                </label>
                <input
                  id="business"
                  name="business"
                  type="text"
                  placeholder="Ej. Clinica Sonrisa Lima"
                  className="mt-3 h-[52px] w-full rounded-[18px] border border-line bg-mist px-4 text-base outline-none focus:border-amber focus:ring-4 focus:ring-amber/20"
                />
                <button
                  type="button"
                  className="mt-4 flex min-h-14 w-full items-center justify-center rounded-[22px] bg-amber px-5 text-base font-bold text-ink transition active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-amber/30"
                >
                  Continuar
                </button>
              </form>
              <AppMenu />
            </section>
          </main>
        );
      }}
    </AuthGate>
  );
}

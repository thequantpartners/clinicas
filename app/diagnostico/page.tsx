"use client";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getFirebaseAuth } from "@/lib/firebase";
import { AuthGate } from "./auth-gate";

const steps = [
  {
    title: "Agenda y reservas",
    detail: "Citas pendientes, canceladas y sin confirmar.",
  },
  {
    title: "WhatsApp e Instagram",
    detail: "Leads que preguntan y no reciben seguimiento.",
  },
  {
    title: "Seguimiento post-atención",
    detail: "Pacientes que no vuelven por falta de recordatorio.",
  },
  {
    title: "Control de ventas",
    detail: "Presupuestos enviados sin cierre.",
  },
];

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

function AccountIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.9" />
      <path d="M5.2 20c.8-3.3 3.2-5 6.8-5s6 1.7 6.8 5H5.2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.9" />
    </svg>
  );
}

function AppMenu() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(getFirebaseAuth());
    router.replace("/");
  }

  return (
    <nav className="fixed bottom-3 left-1/2 z-50 grid h-[66px] w-[calc(100%-44px)] max-w-[386px] -translate-x-1/2 grid-cols-3 rounded-[28px] bg-white p-1.5 shadow-[0_20px_45px_rgba(7,89,133,0.18)] ring-1 ring-sky-900/10">
      <Link href="/diagnostico" className="flex flex-col items-center justify-center rounded-[22px] bg-[#e0f2fe] text-[#075985]" aria-label="Diagnostico">
        <TargetIcon />
        <span className="text-xs font-black">Diagnóstico</span>
      </Link>
      <a className="flex flex-col items-center justify-center text-[#34343a]" aria-label="Reporte">
        <ChartIcon />
        <span className="text-xs font-semibold">Reporte</span>
      </a>
      <button type="button" onClick={handleLogout} className="flex flex-col items-center justify-center text-[#34343a]" aria-label="Cuenta">
        <AccountIcon />
        <span className="text-xs font-semibold">Cuenta</span>
      </button>
    </nav>
  );
}

export default function DiagnosticoPage() {
  return (
    <AuthGate>
      {(user) => {
        const firstName = user.displayName?.split(" ")[0] ?? "cliente";

        return (
          <main className="min-h-screen bg-[#f6f4ef] text-[#101112]">
            <section className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-[radial-gradient(circle_at_62%_18%,rgba(14,165,233,0.18),transparent_30%),linear-gradient(180deg,#f8fcff_0%,#eef8ff_100%)] px-5 pb-28 pt-7 shadow-[0_0_70px_rgba(23,23,23,0.08)]">
              <header>
                <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-[15px] font-black tracking-normal text-[#075985] shadow-[0_10px_24px_rgba(7,89,133,0.10)] ring-1 ring-sky-900/5">
                  Hola, {firstName} · Paso 1 de 4
                </p>
                <h1 className="mt-5 text-[38px] font-black leading-[0.96]">
                  Detectemos dónde se escapa tu dinero.
                </h1>
                <p className="mt-4 text-[16px] font-medium leading-6 text-[#5a5a63]">
                  Responde sobre tu agenda, mensajes y recompras. Tu reporte gratis priorizará las fugas con más impacto.
                </p>
              </header>

              <section className="mt-6 rounded-[26px] bg-[#075985] p-4 text-white shadow-[0_18px_35px_rgba(7,89,133,0.22)]">
                <p className="text-sm font-bold text-white/75">Diagnóstico en curso</p>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/18">
                  <div className="h-full w-1/4 rounded-full bg-[#38bdf8]" />
                </div>
                <p className="mt-3 text-[22px] font-black">25% completado</p>
              </section>

              <div className="mt-6 space-y-3">
                {steps.map((step, index) => (
                  <div key={step.title} className="flex items-center gap-3 rounded-[22px] bg-white/90 p-4 shadow-[0_12px_26px_rgba(23,23,23,0.07)] ring-1 ring-sky-900/5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#e0f2fe] text-sm font-black text-[#075985]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-[15px] font-black">{step.title}</p>
                      <p className="mt-0.5 text-xs font-medium leading-4 text-[#5a5a63]">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <form className="mt-6 rounded-[26px] bg-white/92 p-4 shadow-[0_16px_32px_rgba(23,23,23,0.08)] ring-1 ring-sky-900/5">
                <label htmlFor="business" className="text-sm font-black text-[#075985]">
                  Nombre del negocio
                </label>
                <input
                  id="business"
                  name="business"
                  type="text"
                  placeholder="Ej. Clínica Sonrisa Lima"
                  className="mt-3 h-[52px] w-full rounded-[18px] border border-sky-900/10 bg-[#f8fcff] px-4 text-base font-semibold outline-none focus:border-[#0ea5e9] focus:ring-4 focus:ring-[#0ea5e9]/20"
                />
                <button type="button" className="mt-4 flex min-h-14 w-full items-center justify-center rounded-[22px] bg-[#0ea5e9] px-5 text-base font-black text-white shadow-[0_14px_28px_rgba(14,165,233,0.28)] transition active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-[#0ea5e9]/30">
                  Continuar diagnóstico
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

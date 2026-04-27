"use client";

import { AppFrame } from "../app-frame";
import { AppMenu } from "../app-menu";
import { AuthGate } from "../auth-gate";

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

export default function DiagnosticoPage() {
  return (
    <AuthGate>
      {(user) => {
        const firstName = user.displayName?.split(" ")[0] ?? "cliente";

        return (
          <AppFrame>
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
              <AppMenu active="diagnostico" />
          </AppFrame>
        );
      }}
    </AuthGate>
  );
}

"use client";

import { AppFrame } from "../app-frame";
import { AppMenu } from "../app-menu";
import { AuthGate } from "../auth-gate";
import { proPrice, whatsappProUrl } from "@/lib/diagnosis";

export default function UpgradePage() {
  return (
    <AuthGate>
      {() => (
        <AppFrame>
          <header>
            <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-[15px] font-black text-[#075985] shadow-[0_10px_24px_rgba(7,89,133,0.10)] ring-1 ring-sky-900/5">
              Recovery Control PRO
            </p>
            <h1 className="mt-5 text-[37px] font-black leading-[0.96]">
              Sigue midiendo fugas cada semana.
            </h1>
            <p className="mt-4 text-[16px] font-medium leading-6 text-[#5a5a63]">
              El diagnóstico inicial abre la puerta. El control mensual evita que vuelvas a perder ingresos.
            </p>
          </header>

          <section className="mt-6 rounded-[28px] bg-[#075985] p-5 text-white shadow-[0_18px_35px_rgba(7,89,133,0.22)]">
            <p className="text-sm font-bold text-white/72">Plan mensual</p>
            <p className="mt-2 text-[42px] font-black">
              {proPrice.currency} {proPrice.monthly}
              <span className="text-base font-bold text-white/70"> / mes</span>
            </p>
            <p className="mt-2 text-sm font-semibold text-white/78">
              Para clínicas que quieren controlar fugas, no solo diagnosticarlas una vez.
            </p>
          </section>

          <section className="mt-4 rounded-[28px] bg-white/92 p-5 shadow-[0_18px_35px_rgba(23,23,23,0.08)] ring-1 ring-sky-900/5">
            <h2 className="text-[24px] font-black">Incluye</h2>
            <div className="mt-4 space-y-3">
              {[
                "Control diario ilimitado.",
                "Historial mensual de fugas.",
                "Reportes mensuales PDF.",
                "Comparativo semana a semana.",
                "Recomendaciones de recuperación.",
                "Prioridad para implementación Quant Partners.",
              ].map((item) => (
                <div key={item} className="rounded-[18px] bg-[#e0f2fe] px-4 py-3 text-sm font-black text-[#075985]">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-4 rounded-[28px] bg-white/70 p-5 shadow-[0_12px_26px_rgba(23,23,23,0.05)] ring-1 ring-sky-900/5">
            <p className="text-sm font-black text-[#075985]">Alternativa</p>
            <p className="mt-2 text-[24px] font-black">
              PDF PRO pago único
            </p>
            <p className="mt-1 text-lg font-black text-[#075985]">
              {proPrice.currency} {proPrice.oneTime}
            </p>
            <p className="mt-2 text-sm font-medium leading-5 text-[#5a5a63]">
              Desbloquea todas las fugas del diagnóstico actual, pero no incluye control mensual.
            </p>
          </section>

          <a href={whatsappProUrl} target="_blank" rel="noreferrer" className="mt-5 flex min-h-14 items-center justify-center rounded-[22px] bg-[#0ea5e9] px-5 text-base font-black text-white shadow-[0_14px_28px_rgba(14,165,233,0.28)]">
            Activar Recovery Control
          </a>

          <AppMenu active="control" />
        </AppFrame>
      )}
    </AuthGate>
  );
}

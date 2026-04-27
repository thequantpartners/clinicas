"use client";

import { AppFrame } from "../app-frame";
import { AppMenu } from "../app-menu";
import { AuthGate } from "../auth-gate";

const reports: Array<{
  id: string;
  title: string;
  date: string;
}> = [];

export default function ReportePage() {
  return (
    <AuthGate>
      {() => (
        <AppFrame>
          <header>
            <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-[15px] font-black text-[#075985] shadow-[0_10px_24px_rgba(7,89,133,0.10)] ring-1 ring-sky-900/5">
              Reportes gratis
            </p>
            <h1 className="mt-5 text-[38px] font-black leading-[0.96]">
              Tus diagnósticos generados.
            </h1>
            <p className="mt-4 text-[16px] font-medium leading-6 text-[#5a5a63]">
              Aquí verás los reportes free creados desde tus diagnósticos. Luego se guardarán en Supabase.
            </p>
          </header>

          {reports.length === 0 ? (
            <section className="mt-8 rounded-[28px] bg-white/92 p-6 text-center shadow-[0_18px_35px_rgba(23,23,23,0.08)] ring-1 ring-sky-900/5">
              <div className="mx-auto grid size-16 place-items-center rounded-3xl bg-[#e0f2fe] text-[30px] font-black text-[#075985]">
                0
              </div>
              <h2 className="mt-5 text-[24px] font-black">
                No tienes reportes aún.
              </h2>
              <p className="mt-3 text-sm font-medium leading-5 text-[#5a5a63]">
                Completa tu primer diagnóstico para generar un reporte gratis con tus fugas principales.
              </p>
              <a href="/diagnostico" className="mt-5 flex min-h-14 items-center justify-center rounded-[22px] bg-[#0ea5e9] px-5 text-base font-black text-white shadow-[0_14px_28px_rgba(14,165,233,0.28)]">
                Crear mi primer reporte
              </a>
            </section>
          ) : (
            <div className="mt-6 space-y-3">
              {reports.map((report) => (
                <article key={report.id} className="rounded-[22px] bg-white/92 p-4 shadow-[0_12px_26px_rgba(23,23,23,0.07)] ring-1 ring-sky-900/5">
                  <p className="text-base font-black">{report.title}</p>
                  <p className="mt-1 text-xs font-semibold text-[#5a5a63]">{report.date}</p>
                </article>
              ))}
            </div>
          )}

          <AppMenu active="reporte" />
        </AppFrame>
      )}
    </AuthGate>
  );
}

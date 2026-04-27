"use client";

import { useEffect, useState } from "react";
import { AppFrame } from "../app-frame";
import { AppMenu } from "../app-menu";
import { AuthGate } from "../auth-gate";
import { type DiagnosisReport, reportsKey, whatsappFreeUrl, whatsappProUrl } from "@/lib/diagnosis";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatMoney(value: number) {
  return `S/${value.toLocaleString("es-PE")}`;
}

export default function ReportePage() {
  return (
    <AuthGate>
      {(user) => <ReportList userId={user.uid} />}
    </AuthGate>
  );
}

function ReportList({ userId }: { userId: string }) {
  const [reports, setReports] = useState<DiagnosisReport[]>([]);

  useEffect(() => {
    setReports(JSON.parse(localStorage.getItem(reportsKey(userId)) || "[]"));
  }, [userId]);

  return (
    <AppFrame>
      <header>
        <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-[15px] font-black text-[#075985] shadow-[0_10px_24px_rgba(7,89,133,0.10)] ring-1 ring-sky-900/5">
          Reportes gratis
        </p>
        <h1 className="mt-5 text-[38px] font-black leading-[0.96]">
          Tus diagnósticos generados.
        </h1>
        <p className="mt-4 text-[16px] font-medium leading-6 text-[#5a5a63]">
          Aquí verás los reportes FREE. Luego se guardarán en Supabase.
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
            Completa tu primer diagnóstico para generar un reporte gratis con tu fuga principal.
          </p>
          <a href="/diagnostico" className="mt-5 flex min-h-14 items-center justify-center rounded-[22px] bg-[#0ea5e9] px-5 text-base font-black text-white shadow-[0_14px_28px_rgba(14,165,233,0.28)]">
            Crear mi primer reporte
          </a>
        </section>
      ) : (
        <div className="mt-6 space-y-4">
          {reports.map((report) => (
            <article key={report.id} className="rounded-[26px] bg-white/92 p-4 shadow-[0_12px_26px_rgba(23,23,23,0.07)] ring-1 ring-sky-900/5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.08em] text-[#075985]">
                    {formatDate(report.createdAt)}
                  </p>
                  <h2 className="mt-2 text-xl font-black leading-tight">
                    {report.businessName}
                  </h2>
                </div>
                <span className="rounded-full bg-[#e0f2fe] px-3 py-1 text-xs font-black text-[#075985]">
                  FREE
                </span>
              </div>
              <div className="mt-4 rounded-[22px] bg-[#f8fcff] p-4 ring-1 ring-sky-900/5">
                <p className="text-sm font-black">{report.freeLeak.title}</p>
                <p className="mt-2 text-[28px] font-black text-[#075985]">
                  {formatMoney(report.freeLeak.impact)}
                </p>
                <p className="text-xs font-semibold text-[#5a5a63]">
                  impacto mensual estimado
                </p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a href={whatsappFreeUrl} target="_blank" rel="noreferrer" className="flex min-h-12 items-center justify-center rounded-[18px] bg-[#0ea5e9] px-3 text-center text-xs font-black text-white">
                  Recuperar fuga
                </a>
                <a href={whatsappProUrl} target="_blank" rel="noreferrer" className="flex min-h-12 items-center justify-center rounded-[18px] bg-[#075985] px-3 text-center text-xs font-black text-white">
                  Ver PRO
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      <AppMenu active="reporte" />
    </AppFrame>
  );
}

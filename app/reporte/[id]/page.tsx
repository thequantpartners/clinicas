"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AppFrame } from "../../app-frame";
import { AppMenu } from "../../app-menu";
import { AuthGate } from "../../auth-gate";
import {
  type DiagnosisReport,
  proPrice,
  reportsKey,
  whatsappFreeUrl,
  whatsappProUrl,
} from "@/lib/diagnosis";
import { downloadReportPdf } from "@/lib/download-report";

function money(value: number) {
  return `S/${value.toLocaleString("es-PE")}`;
}

export default function ReportDetailPage() {
  return (
    <AuthGate>
      {(user) => <ReportDetail userId={user.uid} />}
    </AuthGate>
  );
}

function ReportDetail({ userId }: { userId: string }) {
  const params = useParams<{ id: string }>();
  const [report, setReport] = useState<DiagnosisReport | null>(null);

  useEffect(() => {
    const reports = JSON.parse(localStorage.getItem(reportsKey(userId)) || "[]") as DiagnosisReport[];
    const localReport = reports.find((item) => item.id === params.id) ?? null;
    setReport(localReport);

    fetch(`/api/reports?userId=${encodeURIComponent(userId)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { reports?: DiagnosisReport[] } | null) => {
        const remoteReport = data?.reports?.find((item) => item.id === params.id);
        if (remoteReport) {
          setReport(remoteReport);
          localStorage.setItem(reportsKey(userId), JSON.stringify(data?.reports ?? []));
        }
      })
      .catch(() => {});
  }, [params.id, userId]);

  if (!report) {
    return (
      <AppFrame>
        <section className="mt-16 rounded-[28px] bg-white/92 p-6 text-center shadow-[0_18px_35px_rgba(23,23,23,0.08)] ring-1 ring-sky-900/5">
          <h1 className="text-[26px] font-black">Reporte no encontrado</h1>
          <a href="/reporte" className="mt-5 flex min-h-14 items-center justify-center rounded-[22px] bg-[#0ea5e9] px-5 text-base font-black text-white">
            Volver a reportes
          </a>
        </section>
        <AppMenu active="reporte" />
      </AppFrame>
    );
  }

  return (
    <AppFrame>
      <header>
        <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-[15px] font-black text-[#075985] shadow-[0_10px_24px_rgba(7,89,133,0.10)] ring-1 ring-sky-900/5">
          Reporte FREE
        </p>
        <h1 className="mt-5 text-[37px] font-black leading-[0.96]">
          {report.businessName}
        </h1>
        <p className="mt-4 text-[16px] font-medium leading-6 text-[#5a5a63]">
          Este reporte muestra 1 fuga crítica. El PRO desbloquea todas las fugas y el plan de solución.
        </p>
      </header>

      <section className="mt-6 rounded-[28px] bg-white/92 p-5 shadow-[0_18px_35px_rgba(23,23,23,0.08)] ring-1 ring-sky-900/5">
        <p className="text-sm font-black uppercase tracking-[0.08em] text-[#075985]">
          Fuga visible
        </p>
        <h2 className="mt-3 text-[25px] font-black leading-tight">
          {report.freeLeak.title}
        </h2>
        <p className="mt-4 text-[34px] font-black text-[#075985]">
          {money(report.freeLeak.impact)}
        </p>
        <p className="text-sm font-bold text-[#5a5a63]">impacto mensual estimado</p>
        <p className="mt-5 text-sm font-medium leading-5 text-[#34343a]">
          <span className="font-black text-[#075985]">Causa: </span>
          {report.freeLeak.cause}
        </p>
        <p className="mt-3 text-sm font-medium leading-5 text-[#34343a]">
          <span className="font-black text-[#075985]">Acción: </span>
          {report.freeLeak.action}
        </p>
      </section>

      <section className="mt-4 rounded-[28px] bg-[#075985] p-5 text-white shadow-[0_18px_35px_rgba(7,89,133,0.22)]">
        <p className="text-sm font-bold text-white/72">Desbloquear PRO</p>
        <h2 className="mt-2 text-[25px] font-black leading-tight">
          Todas las fugas + soluciones.
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-[18px] bg-white/12 p-3">
            <p className="text-xs font-bold text-white/70">Mensual</p>
            <p className="text-xl font-black">{proPrice.currency} {proPrice.monthly}</p>
          </div>
          <div className="rounded-[18px] bg-white/12 p-3">
            <p className="text-xs font-bold text-white/70">Pago único</p>
            <p className="text-xl font-black">{proPrice.currency} {proPrice.oneTime}</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2 text-sm font-semibold text-white/82">
          <li>{report.leaks.length} fugas priorizadas por impacto.</li>
          <li>Soluciones IA/proceso por fuga.</li>
          <li>Roadmap 30/60/90 días.</li>
          <li>CTA para implementación Quant Partners.</li>
        </ul>
        <a href={whatsappProUrl} target="_blank" rel="noreferrer" className="mt-5 flex min-h-12 items-center justify-center rounded-[18px] bg-white px-4 text-sm font-black text-[#075985]">
          Quiero desbloquear PRO
        </a>
      </section>

      <div className="mt-4 grid gap-3">
        <button type="button" onClick={() => downloadReportPdf(report, "free")} className="flex min-h-14 items-center justify-center rounded-[22px] bg-[#0ea5e9] px-5 text-base font-black text-white shadow-[0_14px_28px_rgba(14,165,233,0.28)]">
          Descargar PDF FREE
        </button>
        <a href={whatsappFreeUrl} target="_blank" rel="noreferrer" className="flex min-h-14 items-center justify-center rounded-[22px] bg-white px-5 text-base font-black text-[#075985] shadow-[0_10px_22px_rgba(23,23,23,0.06)]">
          Quiero recuperar esta fuga
        </a>
      </div>

      <AppMenu active="reporte" />
    </AppFrame>
  );
}

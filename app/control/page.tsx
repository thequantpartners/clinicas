"use client";

import { useEffect, useMemo, useState } from "react";
import { AppFrame } from "../app-frame";
import { AppMenu } from "../app-menu";
import { AuthGate } from "../auth-gate";
import {
  type DailyMetric,
  type DailyMetricsInput,
  createDailyMetric,
  metricsKey,
} from "@/lib/control";
import { freeControlLimit } from "@/lib/diagnosis";
import { loadClinicProfile } from "@/lib/profile";

const fields: Array<{ id: keyof DailyMetricsInput; label: string }> = [
  { id: "leadsNew", label: "Leads nuevos" },
  { id: "leadsAnswered", label: "Leads respondidos" },
  { id: "appointmentsBooked", label: "Citas agendadas" },
  { id: "appointmentsAttended", label: "Citas asistidas" },
  { id: "salesClosed", label: "Ventas cerradas" },
  { id: "avgTicket", label: "Ticket promedio" },
];

function money(value: number) {
  return `S/${value.toLocaleString("es-PE")}`;
}

function saveLocal(userId: string, metric: DailyMetric) {
  const key = metricsKey(userId);
  const current = JSON.parse(localStorage.getItem(key) || "[]") as DailyMetric[];
  const withoutToday = current.filter((item) => item.date !== metric.date);
  localStorage.setItem(key, JSON.stringify([metric, ...withoutToday]));
}

export default function ControlPage() {
  return (
    <AuthGate>
      {(user) => <ControlDashboard userId={user.uid} />}
    </AuthGate>
  );
}

function ControlDashboard({ userId }: { userId: string }) {
  const [metrics, setMetrics] = useState<DailyMetric[]>([]);
  const [form, setForm] = useState<DailyMetricsInput>({
    leadsNew: 0,
    leadsAnswered: 0,
    appointmentsBooked: 0,
    appointmentsAttended: 0,
    salesClosed: 0,
    avgTicket: 700,
  });

  useEffect(() => {
    const profile = loadClinicProfile(userId);
    setForm((current) => ({ ...current, avgTicket: profile.avgTicket || current.avgTicket }));

    const localMetrics = JSON.parse(localStorage.getItem(metricsKey(userId)) || "[]") as DailyMetric[];
    setMetrics(localMetrics);

    fetch(`/api/control?userId=${encodeURIComponent(userId)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { metrics?: DailyMetric[] } | null) => {
        if (data?.metrics?.length) {
          setMetrics(data.metrics);
          localStorage.setItem(metricsKey(userId), JSON.stringify(data.metrics));
        }
      })
      .catch(() => {});
  }, [userId]);

  const week = metrics.slice(0, 7);
  const weeklyLeak = useMemo(
    () => week.reduce((total, metric) => total + metric.estimatedLeak, 0),
    [week],
  );
  const today = metrics[0]?.date === new Date().toISOString().slice(0, 10) ? metrics[0] : null;
  const isLocked = metrics.length >= freeControlLimit && !today;
  const remainingFreeDays = Math.max(0, freeControlLimit - metrics.length);

  async function handleSubmit() {
    if (isLocked) return;

    const metric = createDailyMetric(userId, form);
    saveLocal(userId, metric);
    setMetrics((current) => [metric, ...current.filter((item) => item.date !== metric.date)]);

    try {
      await fetch("/api/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metric),
      });
    } catch {}
  }

  return (
    <AppFrame>
      <header>
        <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-[15px] font-black text-[#075985] shadow-[0_10px_24px_rgba(7,89,133,0.10)] ring-1 ring-sky-900/5">
          Recovery Control
        </p>
        <h1 className="mt-5 text-[37px] font-black leading-[0.96]">
          Mide tus fugas cada día.
        </h1>
        <p className="mt-4 text-[16px] font-medium leading-6 text-[#5a5a63]">
          Registra 5 números. El sistema estima la fuga diaria y el riesgo principal.
        </p>
      </header>

      <section className="mt-6 rounded-[26px] bg-[#075985] p-5 text-white shadow-[0_18px_35px_rgba(7,89,133,0.22)]">
        <p className="text-sm font-bold text-white/75">Fuga estimada semanal</p>
        <p className="mt-2 text-[34px] font-black">{money(weeklyLeak)}</p>
        <p className="mt-1 text-sm font-semibold text-white/75">
          {week.length} días registrados
        </p>
      </section>

      {isLocked ? (
        <section className="mt-4 rounded-[26px] bg-white/92 p-5 shadow-[0_18px_35px_rgba(23,23,23,0.08)] ring-1 ring-sky-900/5">
          <p className="text-sm font-black text-[#075985]">Prueba FREE completa</p>
          <h2 className="mt-2 text-[24px] font-black leading-tight">
            Ya usaste tus {freeControlLimit} días de control.
          </h2>
          <p className="mt-3 text-sm font-medium leading-5 text-[#5a5a63]">
            Desbloquea Recovery Control para seguir midiendo fugas y generar reportes mensuales.
          </p>
          <a href="/upgrade" className="mt-5 flex min-h-14 items-center justify-center rounded-[22px] bg-[#0ea5e9] px-5 text-base font-black text-white shadow-[0_14px_28px_rgba(14,165,233,0.28)]">
            Activar control mensual
          </a>
        </section>
      ) : (
        <section className="mt-4 rounded-[22px] bg-white/70 px-4 py-3 shadow-[0_10px_22px_rgba(23,23,23,0.05)] ring-1 ring-sky-900/5">
          <p className="text-sm font-black text-[#075985]">
            FREE: {remainingFreeDays} registros disponibles
          </p>
        </section>
      )}

      {today ? (
        <section className="mt-4 rounded-[24px] bg-white/92 p-4 shadow-[0_12px_26px_rgba(23,23,23,0.07)] ring-1 ring-sky-900/5">
          <p className="text-sm font-black text-[#075985]">Hoy</p>
          <p className="mt-1 text-[26px] font-black">{money(today.estimatedLeak)}</p>
          <p className="text-sm font-semibold text-[#5a5a63]">
            Mayor riesgo: {today.mainRisk}
          </p>
        </section>
      ) : null}

      <section className={["mt-5 rounded-[28px] bg-white/92 p-5 shadow-[0_18px_35px_rgba(23,23,23,0.08)] ring-1 ring-sky-900/5", isLocked ? "opacity-55" : ""].join(" ")}>
        <p className="text-sm font-black uppercase tracking-[0.08em] text-[#075985]">
          Registro de hoy
        </p>
        <div className="mt-4 grid gap-3">
          {fields.map((field) => (
            <label key={field.id} className="grid grid-cols-[1fr_96px] items-center gap-3">
              <span className="text-sm font-black">{field.label}</span>
              <input
                type="number"
                min={0}
                value={form[field.id]}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    [field.id]: Number(event.target.value),
                  }))
                }
                className="h-11 rounded-[16px] border border-sky-900/10 bg-[#f8fcff] px-3 text-right text-sm font-black outline-none focus:border-[#0ea5e9] focus:ring-4 focus:ring-[#0ea5e9]/20"
              />
            </label>
          ))}
        </div>
        <button type="button" onClick={handleSubmit} disabled={isLocked} className="mt-5 flex min-h-14 w-full items-center justify-center rounded-[22px] bg-[#0ea5e9] px-5 text-base font-black text-white shadow-[0_14px_28px_rgba(14,165,233,0.28)] disabled:opacity-50">
          {isLocked ? "Control bloqueado" : "Guardar control de hoy"}
        </button>
      </section>

      <section className="mt-5 rounded-[28px] bg-white/70 p-4 shadow-[0_12px_26px_rgba(23,23,23,0.05)] ring-1 ring-sky-900/5">
        <p className="text-sm font-black text-[#075985]">Historial reciente</p>
        <div className="mt-3 space-y-2">
          {metrics.slice(0, 5).length === 0 ? (
            <p className="text-sm font-semibold text-[#5a5a63]">
              Aún no tienes registros.
            </p>
          ) : (
            metrics.slice(0, 5).map((metric) => (
              <div key={metric.id} className="flex items-center justify-between rounded-[18px] bg-white px-4 py-3">
                <div>
                  <p className="text-sm font-black">{metric.date}</p>
                  <p className="text-xs font-semibold text-[#5a5a63]">{metric.mainRisk}</p>
                </div>
                <p className="text-sm font-black text-[#075985]">
                  {money(metric.estimatedLeak)}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      <AppMenu active="control" />
    </AppFrame>
  );
}

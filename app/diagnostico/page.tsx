"use client";

import { useEffect, useState } from "react";
import { AppFrame } from "../app-frame";
import { AppMenu } from "../app-menu";
import { AuthGate } from "../auth-gate";
import {
  type AnswerValue,
  type Answers,
  type DiagnosisReport,
  questions,
  reportsKey,
  scoreDiagnosis,
  whatsappFreeUrl,
  whatsappProUrl,
} from "@/lib/diagnosis";
import { downloadReportPdf } from "@/lib/download-report";
import { type ClinicProfile, loadClinicProfile, saveClinicProfile } from "@/lib/profile";

async function saveReport(report: DiagnosisReport) {
  const key = reportsKey(report.userId);
  const current = JSON.parse(localStorage.getItem(key) || "[]") as DiagnosisReport[];
  localStorage.setItem(key, JSON.stringify([report, ...current]));

  try {
    await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    });
  } catch {}
}

function formatMoney(value: number) {
  return `S/${value.toLocaleString("es-PE")}`;
}

export default function DiagnosticoPage() {
  return (
    <AuthGate>
      {(user) => {
        const firstName = user.displayName?.split(" ")[0] ?? "cliente";
        return <DiagnosisForm firstName={firstName} userId={user.uid} />;
      }}
    </AuthGate>
  );
}

function DiagnosisForm({ firstName, userId }: { firstName: string; userId: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [report, setReport] = useState<DiagnosisReport | null>(null);
  const [profile, setProfile] = useState<ClinicProfile>(() => loadClinicProfile(userId));
  const question = questions[step];
  const progress = Math.round(((step + 1) / questions.length) * 100);
  const canContinue = answers[question.id] !== undefined && String(answers[question.id]).trim() !== "";

  useEffect(() => {
    fetch(`/api/profile?userId=${encodeURIComponent(userId)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { profile?: ClinicProfile | null } | null) => {
        if (data?.profile) {
          setProfile(data.profile);
          saveClinicProfile(userId, data.profile);
        }
      })
      .catch(() => {});
  }, [userId]);

  function setAnswer(value: AnswerValue) {
    setAnswers((current) => ({ ...current, [question.id]: value }));
  }

  function next() {
    if (!canContinue) return;
    if (step < questions.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    const generated = scoreDiagnosis(
      {
        ...answers,
        businessName: profile.clinicName || "Clínica",
        avgTicket: answers.avgTicket || profile.avgTicket,
      },
      userId,
    );
    void saveReport(generated);
    setReport(generated);
  }

  if (report) {
    return (
      <AppFrame>
        <header>
          <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-[15px] font-black text-[#075985] shadow-[0_10px_24px_rgba(7,89,133,0.10)] ring-1 ring-sky-900/5">
            Reporte FREE generado
          </p>
          <h1 className="mt-5 text-[37px] font-black leading-[0.96]">
            Tu fuga más crítica está aquí.
          </h1>
          <p className="mt-4 text-[16px] font-medium leading-6 text-[#5a5a63]">
            El reporte light muestra 1 punto de fuga. El PRO desbloquea todas las fugas, soluciones y roadmap.
          </p>
        </header>

        <section className="mt-6 rounded-[28px] bg-white/92 p-5 shadow-[0_18px_35px_rgba(23,23,23,0.08)] ring-1 ring-sky-900/5">
          <p className="text-sm font-black uppercase tracking-[0.08em] text-[#075985]">
            Fuga principal
          </p>
          <h2 className="mt-3 text-[26px] font-black leading-tight">
            {report.freeLeak.title}
          </h2>
          <p className="mt-4 text-[34px] font-black text-[#075985]">
            {formatMoney(report.freeLeak.impact)}
          </p>
          <p className="text-sm font-bold text-[#5a5a63]">impacto mensual estimado</p>
          <div className="mt-5 space-y-3 text-sm">
            <p>
              <span className="font-black text-[#075985]">Causa: </span>
              {report.freeLeak.cause}
            </p>
            <p>
              <span className="font-black text-[#075985]">Acción inmediata: </span>
              {report.freeLeak.action}
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-[26px] bg-[#075985] p-5 text-white shadow-[0_18px_35px_rgba(7,89,133,0.22)]">
          <h3 className="text-[22px] font-black">Reporte PRO bloqueado</h3>
          <p className="mt-2 text-sm font-semibold leading-5 text-white/80">
            Incluye {report.leaks.length} fugas, soluciones IA, prioridad por ROI y roadmap 30/60/90 días.
          </p>
          <a href={whatsappProUrl} target="_blank" rel="noreferrer" className="mt-4 flex min-h-12 items-center justify-center rounded-[18px] bg-white px-4 text-sm font-black text-[#075985]">
            Quiero el reporte completo
          </a>
        </section>

        <div className="mt-4 grid gap-3">
          <a href="/control" className="flex min-h-14 items-center justify-center rounded-[22px] bg-[#075985] px-5 text-base font-black text-white shadow-[0_14px_28px_rgba(7,89,133,0.24)]">
            Activar control semanal
          </a>
          <button type="button" onClick={() => downloadReportPdf(report, "free")} className="flex min-h-14 items-center justify-center rounded-[22px] bg-[#0ea5e9] px-5 text-base font-black text-white shadow-[0_14px_28px_rgba(14,165,233,0.28)]">
            Descargar PDF FREE
          </button>
          <a href={whatsappFreeUrl} target="_blank" rel="noreferrer" className="flex min-h-14 items-center justify-center rounded-[22px] bg-white px-5 text-base font-black text-[#075985] shadow-[0_10px_22px_rgba(23,23,23,0.06)]">
            Quiero recuperar esta fuga
          </a>
        </div>

        <AppMenu active="diagnostico" />
      </AppFrame>
    );
  }

  return (
    <AppFrame>
      <header>
        <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-[15px] font-black text-[#075985] shadow-[0_10px_24px_rgba(7,89,133,0.10)] ring-1 ring-sky-900/5">
          Hola, {firstName} · Paso {step + 1} de {questions.length}
        </p>
        <h1 className="mt-5 text-[37px] font-black leading-[0.96]">
          Detectemos dónde se escapa tu dinero.
        </h1>
        <p className="mt-4 text-[16px] font-medium leading-6 text-[#5a5a63]">
          Responde con aproximados. {profile.clinicName ? `Usaremos el perfil de ${profile.clinicName}.` : "Puedes guardar el nombre de tu clínica en Cuenta."}
        </p>
      </header>

      {!profile.clinicName ? (
        <a href="/cuenta" className="mt-5 rounded-[22px] bg-white/92 px-4 py-3 text-sm font-black text-[#075985] shadow-[0_10px_22px_rgba(23,23,23,0.06)] ring-1 ring-sky-900/5">
          Guardar perfil de clínica una sola vez
        </a>
      ) : null}

      <section className="mt-6 rounded-[26px] bg-[#075985] p-4 text-white shadow-[0_18px_35px_rgba(7,89,133,0.22)]">
        <p className="text-sm font-bold text-white/75">Diagnóstico en curso</p>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/18">
          <div className="h-full rounded-full bg-[#38bdf8]" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-[22px] font-black">{progress}% completado</p>
      </section>

      <section className="mt-6 rounded-[28px] bg-white/92 p-5 shadow-[0_18px_35px_rgba(23,23,23,0.08)] ring-1 ring-sky-900/5">
        <p className="text-sm font-black uppercase tracking-[0.08em] text-[#075985]">
          Pregunta crítica
        </p>
        <label htmlFor={question.id} className="mt-3 block text-[25px] font-black leading-tight">
          {question.label}
        </label>
        <p className="mt-2 text-sm font-medium leading-5 text-[#5a5a63]">
          {question.helper}
        </p>

        {question.type === "select" ? (
          <div className="mt-5 space-y-2">
            {question.options?.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setAnswer(option.value)}
                className={[
                  "w-full rounded-[18px] border px-4 py-3 text-left text-sm font-black",
                  answers[question.id] === option.value
                    ? "border-[#0ea5e9] bg-[#e0f2fe] text-[#075985]"
                    : "border-sky-900/10 bg-[#f8fcff] text-[#34343a]",
                ].join(" ")}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <input
            id={question.id}
            type={question.type}
            inputMode={question.type === "number" ? "numeric" : "text"}
            value={answers[question.id] ?? ""}
            onChange={(event) => setAnswer(question.type === "number" ? Number(event.target.value) : event.target.value)}
            className="mt-5 h-[56px] w-full rounded-[18px] border border-sky-900/10 bg-[#f8fcff] px-4 text-base font-bold outline-none focus:border-[#0ea5e9] focus:ring-4 focus:ring-[#0ea5e9]/20"
          />
        )}
      </section>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setStep((current) => Math.max(0, current - 1))}
          disabled={step === 0}
          className="min-h-14 rounded-[22px] bg-white/92 px-5 text-base font-black text-[#075985] shadow-[0_10px_22px_rgba(23,23,23,0.06)] disabled:opacity-40"
        >
          Atrás
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canContinue}
          className="min-h-14 rounded-[22px] bg-[#0ea5e9] px-5 text-base font-black text-white shadow-[0_14px_28px_rgba(14,165,233,0.28)] disabled:opacity-40"
        >
          {step === questions.length - 1 ? "Generar reporte" : "Continuar"}
        </button>
      </div>

      <AppMenu active="diagnostico" />
    </AppFrame>
  );
}

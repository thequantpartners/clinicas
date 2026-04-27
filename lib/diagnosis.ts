export type AnswerValue = string | number;

export type Answers = Record<string, AnswerValue>;

export type Leak = {
  id: string;
  title: string;
  impact: number;
  cause: string;
  action: string;
  solution: string;
};

export type DiagnosisReport = {
  id: string;
  userId: string;
  businessName: string;
  createdAt: string;
  freeLeak: Leak;
  leaks: Leak[];
  answers: Answers;
};

export type Question = {
  id: string;
  label: string;
  helper: string;
  type: "text" | "number" | "select";
  options?: Array<{ label: string; value: string | number }>;
};

export const whatsappFreeUrl =
  "https://wa.me/51924464410?text=Hola%20Quant%20Partners%2C%20vi%20mi%20diagn%C3%B3stico%20FREE%20y%20quiero%20implementar%20la%20soluci%C3%B3n%20para%20recuperar%20la%20fuga%20detectada.";

export const whatsappProUrl =
  "https://wa.me/51924464410?text=Hola%20Quant%20Partners%2C%20vi%20mi%20diagn%C3%B3stico%20PRO%20y%20quiero%20implementar%20el%20plan%20completo%20para%20recuperar%20ingresos%20perdidos.";

export const proPrice = {
  monthly: 49,
  oneTime: 149,
  currency: "USD",
};

export const freeControlLimit = 7;

export const questions: Question[] = [
  {
    id: "businessName",
    label: "Nombre de la clínica",
    helper: "Usaremos esto para nombrar tu reporte.",
    type: "text",
  },
  {
    id: "weeklyLeads",
    label: "¿Cuántos pacientes consultan por semana?",
    helper: "Incluye WhatsApp, Instagram, llamadas y referidos.",
    type: "number",
  },
  {
    id: "avgTicket",
    label: "Ticket promedio por tratamiento vendido",
    helper: "Monto aproximado en soles.",
    type: "number",
  },
  {
    id: "responseTime",
    label: "Tiempo promedio de respuesta a un lead",
    helper: "La velocidad afecta cierre y reserva.",
    type: "select",
    options: [
      { label: "Menos de 5 minutos", value: 0 },
      { label: "5 a 30 minutos", value: 1 },
      { label: "30 minutos a 2 horas", value: 2 },
      { label: "Más de 2 horas", value: 3 },
    ],
  },
  {
    id: "unansweredLeads",
    label: "¿Cuántos leads quedan sin seguimiento por semana?",
    helper: "Pacientes que preguntan y nadie vuelve a contactar.",
    type: "number",
  },
  {
    id: "bookingRate",
    label: "De cada 10 consultas, ¿cuántas agendan cita?",
    helper: "Ejemplo: si agendan 4 de 10, escribe 4.",
    type: "number",
  },
  {
    id: "noShowRate",
    label: "De cada 10 citas, ¿cuántas no asisten?",
    helper: "Incluye cancelaciones de último minuto.",
    type: "number",
  },
  {
    id: "confirmationSystem",
    label: "¿Cómo confirman citas?",
    helper: "Mide riesgo de ausencias y agenda vacía.",
    type: "select",
    options: [
      { label: "Automático", value: 0 },
      { label: "Manual con responsable", value: 1 },
      { label: "A veces", value: 2 },
      { label: "No confirmamos", value: 3 },
    ],
  },
  {
    id: "budgetFollowUp",
    label: "¿Dan seguimiento a presupuestos enviados?",
    helper: "Especialmente tratamientos high-ticket.",
    type: "select",
    options: [
      { label: "Sí, con fecha y responsable", value: 0 },
      { label: "Manual, sin control claro", value: 1 },
      { label: "Solo si el paciente escribe", value: 2 },
      { label: "No", value: 3 },
    ],
  },
  {
    id: "returnCampaigns",
    label: "¿Reactivan pacientes que no vuelven?",
    helper: "Limpiezas, controles, estética, láser, sesiones.",
    type: "select",
    options: [
      { label: "Sí, segmentado", value: 0 },
      { label: "A veces", value: 1 },
      { label: "Solo campañas generales", value: 2 },
      { label: "No", value: 3 },
    ],
  },
  {
    id: "manualHours",
    label: "Horas semanales en tareas manuales",
    helper: "Confirmar citas, copiar datos, perseguir pagos, reportes.",
    type: "number",
  },
  {
    id: "crm",
    label: "¿Usan CRM o registro centralizado?",
    helper: "Agenda, estado del lead, historial y próximo paso.",
    type: "select",
    options: [
      { label: "CRM completo", value: 0 },
      { label: "Excel/Sheets", value: 1 },
      { label: "Agenda + WhatsApp", value: 2 },
      { label: "Nada centralizado", value: 3 },
    ],
  },
];

function n(value: AnswerValue | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function money(value: number) {
  return Math.max(0, Math.round(value));
}

export function scoreDiagnosis(answers: Answers, userId: string): DiagnosisReport {
  const weeklyLeads = n(answers.weeklyLeads);
  const avgTicket = n(answers.avgTicket);
  const bookingRate = Math.min(10, n(answers.bookingRate));
  const noShowRate = Math.min(10, n(answers.noShowRate));
  const closeRate = Math.max(0.05, bookingRate / 10);
  const responseRisk = n(answers.responseTime);
  const confirmationRisk = n(answers.confirmationSystem);
  const budgetRisk = n(answers.budgetFollowUp);
  const returnRisk = n(answers.returnCampaigns);
  const crmRisk = n(answers.crm);
  const unansweredLeads = n(answers.unansweredLeads);
  const manualHours = n(answers.manualHours);

  const leaks: Leak[] = [
    {
      id: "lead_response",
      title: "Leads que consultan y no compran",
      impact: money((unansweredLeads * closeRate * avgTicket + weeklyLeads * responseRisk * avgTicket * 0.025) * 4),
      cause: "Respuesta lenta o seguimiento irregular después del primer contacto.",
      action: "Definir SLA de respuesta, guion de cierre y alerta diaria de leads sin respuesta.",
      solution: "Sistema IA de seguimiento WhatsApp con estado del lead, recordatorios y próxima acción.",
    },
    {
      id: "appointments",
      title: "Citas que no se concretan",
      impact: money((weeklyLeads * closeRate * (noShowRate / 10) * avgTicket + confirmationRisk * avgTicket * 0.2) * 4),
      cause: "Confirmación débil, ausencia de recordatorios y agenda sin recuperación automática.",
      action: "Confirmar 24h/3h antes y reubicar cancelaciones con lista de espera.",
      solution: "Automatización de confirmación, reprogramación y recuperación de no-shows.",
    },
    {
      id: "budgets",
      title: "Presupuestos enviados sin cierre",
      impact: money((weeklyLeads * closeRate * budgetRisk * avgTicket * 0.04) * 4),
      cause: "No hay fecha, responsable ni secuencia de seguimiento para presupuestos.",
      action: "Crear pipeline de presupuestos con seguimiento a 1, 3 y 7 días.",
      solution: "CRM ligero con alertas y mensajes IA por etapa de decisión.",
    },
    {
      id: "return",
      title: "Pacientes que no vuelven",
      impact: money((weeklyLeads * returnRisk * avgTicket * 0.035) * 4),
      cause: "La recompra depende de memoria del equipo y no de un sistema.",
      action: "Segmentar pacientes por tratamiento y programar reactivaciones mensuales.",
      solution: "Campañas automáticas de retorno, control y recompra por historial.",
    },
    {
      id: "manual_ops",
      title: "Procesos que consumen tiempo",
      impact: money(manualHours * 35 * 4 + crmRisk * 250),
      cause: "Datos dispersos entre agenda, WhatsApp y hojas de cálculo.",
      action: "Centralizar estados: nuevo lead, citado, asistió, presupuesto, cerrado.",
      solution: "Tablero operativo con tareas, responsables y alertas semanales.",
    },
  ].sort((a, b) => b.impact - a.impact);

  return {
    id: `rep_${Date.now()}`,
    userId,
    businessName: String(answers.businessName || "Clínica"),
    createdAt: new Date().toISOString(),
    freeLeak: leaks[0],
    leaks,
    answers,
  };
}

export function reportsKey(userId: string) {
  return `qp_reports_${userId}`;
}

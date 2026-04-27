export type DailyMetricsInput = {
  leadsNew: number;
  leadsAnswered: number;
  appointmentsBooked: number;
  appointmentsAttended: number;
  salesClosed: number;
  avgTicket: number;
};

export type DailyMetric = DailyMetricsInput & {
  id: string;
  userId: string;
  date: string;
  estimatedLeak: number;
  mainRisk: string;
  createdAt: string;
};

function clean(value: number) {
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
}

export function calculateDailyLeak(input: DailyMetricsInput) {
  const leadsNoResponse = Math.max(0, clean(input.leadsNew) - clean(input.leadsAnswered));
  const missedAppointments = Math.max(0, clean(input.appointmentsBooked) - clean(input.appointmentsAttended));
  const lostSales = Math.max(0, clean(input.appointmentsAttended) - clean(input.salesClosed));
  const avgTicket = clean(input.avgTicket);

  const estimatedLeak = Math.round(
    leadsNoResponse * avgTicket * 0.25 +
      missedAppointments * avgTicket * 0.4 +
      lostSales * avgTicket * 0.2,
  );

  const risks = [
    { label: "leads sin respuesta", value: leadsNoResponse * avgTicket * 0.25 },
    { label: "citas no asistidas", value: missedAppointments * avgTicket * 0.4 },
    { label: "ventas no cerradas", value: lostSales * avgTicket * 0.2 },
  ].sort((a, b) => b.value - a.value);

  return {
    estimatedLeak,
    mainRisk: risks[0]?.value > 0 ? risks[0].label : "sin fuga crítica hoy",
  };
}

export function createDailyMetric(userId: string, input: DailyMetricsInput): DailyMetric {
  const result = calculateDailyLeak(input);

  return {
    id: `metric_${Date.now()}`,
    userId,
    date: new Date().toISOString().slice(0, 10),
    leadsNew: clean(input.leadsNew),
    leadsAnswered: clean(input.leadsAnswered),
    appointmentsBooked: clean(input.appointmentsBooked),
    appointmentsAttended: clean(input.appointmentsAttended),
    salesClosed: clean(input.salesClosed),
    avgTicket: clean(input.avgTicket),
    estimatedLeak: result.estimatedLeak,
    mainRisk: result.mainRisk,
    createdAt: new Date().toISOString(),
  };
}

export function metricsKey(userId: string) {
  return `qp_daily_metrics_${userId}`;
}

import { NextResponse } from "next/server";
import type { DailyMetric } from "@/lib/control";
import { getSupabaseServiceClient, hasSupabaseServiceConfig } from "@/lib/supabase";

type MetricRow = {
  id: string;
  user_id: string;
  date: string;
  leads_new: number;
  leads_answered: number;
  appointments_booked: number;
  appointments_attended: number;
  sales_closed: number;
  avg_ticket: number;
  estimated_leak: number;
  main_risk: string;
  created_at: string;
};

function toMetric(row: MetricRow): DailyMetric {
  return {
    id: row.id,
    userId: row.user_id,
    date: row.date,
    leadsNew: row.leads_new,
    leadsAnswered: row.leads_answered,
    appointmentsBooked: row.appointments_booked,
    appointmentsAttended: row.appointments_attended,
    salesClosed: row.sales_closed,
    avgTicket: row.avg_ticket,
    estimatedLeak: row.estimated_leak,
    mainRisk: row.main_risk,
    createdAt: row.created_at,
  };
}

export async function GET(request: Request) {
  if (!hasSupabaseServiceConfig()) {
    return NextResponse.json({ metrics: [] });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId requerido" }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("daily_metrics")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(30);

  if (error) {
    return NextResponse.json({ metrics: [], fallback: true, error: error.message });
  }

  return NextResponse.json({ metrics: (data as MetricRow[]).map(toMetric) });
}

export async function POST(request: Request) {
  if (!hasSupabaseServiceConfig()) {
    return NextResponse.json({ stored: false });
  }

  const metric = (await request.json()) as DailyMetric;
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("daily_metrics").upsert({
    id: metric.id,
    user_id: metric.userId,
    date: metric.date,
    leads_new: metric.leadsNew,
    leads_answered: metric.leadsAnswered,
    appointments_booked: metric.appointmentsBooked,
    appointments_attended: metric.appointmentsAttended,
    sales_closed: metric.salesClosed,
    avg_ticket: metric.avgTicket,
    estimated_leak: metric.estimatedLeak,
    main_risk: metric.mainRisk,
    created_at: metric.createdAt,
  });

  if (error) {
    return NextResponse.json({ stored: false, fallback: true, error: error.message });
  }

  return NextResponse.json({ stored: true });
}

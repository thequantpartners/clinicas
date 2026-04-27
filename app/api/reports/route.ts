import { NextResponse } from "next/server";
import type { DiagnosisReport } from "@/lib/diagnosis";
import { getSupabaseServiceClient, hasSupabaseServiceConfig } from "@/lib/supabase";

type ReportRow = {
  id: string;
  user_id: string;
  business_name: string;
  created_at: string;
  free_leak: DiagnosisReport["freeLeak"];
  leaks: DiagnosisReport["leaks"];
  answers: DiagnosisReport["answers"];
};

function toReport(row: ReportRow): DiagnosisReport {
  return {
    id: row.id,
    userId: row.user_id,
    businessName: row.business_name,
    createdAt: row.created_at,
    freeLeak: row.free_leak,
    leaks: row.leaks,
    answers: row.answers,
  };
}

export async function GET(request: Request) {
  if (!hasSupabaseServiceConfig()) {
    return NextResponse.json({ reports: [] });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId requerido" }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("diagnosis_reports")
    .select("id,user_id,business_name,created_at,free_leak,leaks,answers")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ reports: [], fallback: true, error: error.message });
  }

  return NextResponse.json({ reports: (data as ReportRow[]).map(toReport) });
}

export async function POST(request: Request) {
  if (!hasSupabaseServiceConfig()) {
    return NextResponse.json({ stored: false });
  }

  const report = (await request.json()) as DiagnosisReport;
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("diagnosis_reports").upsert({
    id: report.id,
    user_id: report.userId,
    business_name: report.businessName,
    created_at: report.createdAt,
    free_leak: report.freeLeak,
    leaks: report.leaks,
    answers: report.answers,
    pro_unlocked: false,
    payment_status: "free",
  });

  if (error) {
    return NextResponse.json({ stored: false, fallback: true, error: error.message });
  }

  return NextResponse.json({ stored: true });
}

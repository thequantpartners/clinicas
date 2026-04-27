import { NextResponse } from "next/server";
import type { ClinicProfile } from "@/lib/profile";
import { getSupabaseServiceClient, hasSupabaseServiceConfig } from "@/lib/supabase";

type ProfileRow = {
  user_id: string;
  clinic_name: string;
  category: string;
  city: string;
  avg_ticket: number;
};

function toProfile(row: ProfileRow): ClinicProfile {
  return {
    clinicName: row.clinic_name,
    category: row.category,
    city: row.city,
    avgTicket: row.avg_ticket,
  };
}

export async function GET(request: Request) {
  if (!hasSupabaseServiceConfig()) {
    return NextResponse.json({ profile: null });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId requerido" }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();
  const { data, error } = await supabase
    .from("clinic_profiles")
    .select("user_id,clinic_name,category,city,avg_ticket")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ profile: null, fallback: true, error: error.message });
  }

  return NextResponse.json({ profile: data ? toProfile(data as ProfileRow) : null });
}

export async function POST(request: Request) {
  if (!hasSupabaseServiceConfig()) {
    return NextResponse.json({ stored: false });
  }

  const body = (await request.json()) as { userId: string; profile: ClinicProfile };
  const supabase = getSupabaseServiceClient();
  const { error } = await supabase.from("clinic_profiles").upsert({
    user_id: body.userId,
    clinic_name: body.profile.clinicName,
    category: body.profile.category,
    city: body.profile.city,
    avg_ticket: body.profile.avgTicket,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json({ stored: false, fallback: true, error: error.message });
  }

  return NextResponse.json({ stored: true });
}

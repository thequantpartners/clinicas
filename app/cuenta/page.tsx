"use client";

import { signOut, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppFrame } from "../app-frame";
import { AppMenu } from "../app-menu";
import { AuthGate } from "../auth-gate";
import { getFirebaseAuth } from "@/lib/firebase";
import { type ClinicProfile, loadClinicProfile, saveClinicProfile } from "@/lib/profile";

export default function CuentaPage() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(getFirebaseAuth());
    router.replace("/");
  }

  return (
    <AuthGate>
      {(user) => <AccountContent user={user} onLogout={handleLogout} />}
    </AuthGate>
  );
}

function AccountContent({ user, onLogout }: { user: User; onLogout: () => Promise<void> }) {
  const [profile, setProfile] = useState<ClinicProfile>({
    clinicName: "",
    category: "",
    city: "",
    avgTicket: 700,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(loadClinicProfile(user.uid));
  }, [user.uid]);

  function updateProfile(field: keyof ClinicProfile, value: string | number) {
    setSaved(false);
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function handleSaveProfile() {
    saveClinicProfile(user.uid, profile);
    setSaved(true);
  }

  return (
    <AppFrame>
      <header>
        <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-[15px] font-black text-[#075985] shadow-[0_10px_24px_rgba(7,89,133,0.10)] ring-1 ring-sky-900/5">
          Cuenta
        </p>
        <h1 className="mt-5 text-[38px] font-black leading-[0.96]">
          Perfil de tu clínica.
        </h1>
        <p className="mt-4 text-[16px] font-medium leading-6 text-[#5a5a63]">
          Estos datos se usan en diagnósticos, reportes y control diario.
        </p>
      </header>

      <section className="mt-8 rounded-[28px] bg-white/92 p-5 shadow-[0_18px_35px_rgba(23,23,23,0.08)] ring-1 ring-sky-900/5">
        <div className="flex items-center gap-4">
          {user.photoURL ? (
            <img src={user.photoURL} alt="" className="size-16 rounded-full ring-4 ring-[#e0f2fe]" />
          ) : (
            <div className="grid size-16 place-items-center rounded-full bg-[#e0f2fe] text-2xl font-black text-[#075985]">
              {user.displayName?.[0] ?? "C"}
            </div>
          )}
          <div>
            <p className="text-lg font-black">{user.displayName ?? "Cliente"}</p>
            <p className="mt-1 text-sm font-semibold text-[#5a5a63]">{user.email}</p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] bg-white/92 p-5 shadow-[0_18px_35px_rgba(23,23,23,0.08)] ring-1 ring-sky-900/5">
        <p className="text-sm font-black uppercase tracking-[0.08em] text-[#075985]">
          Perfil clínica
        </p>
        <div className="mt-4 grid gap-3">
          <ProfileInput label="Nombre clínica" value={profile.clinicName} placeholder="Ej. Clínica Sonrisa Lima" onChange={(value) => updateProfile("clinicName", value)} />
          <ProfileInput label="Rubro" value={profile.category} placeholder="Dental, estética, láser..." onChange={(value) => updateProfile("category", value)} />
          <ProfileInput label="Ciudad" value={profile.city} placeholder="Lima" onChange={(value) => updateProfile("city", value)} />
          <ProfileInput label="Ticket promedio" type="number" value={profile.avgTicket} onChange={(value) => updateProfile("avgTicket", Number(value))} />
        </div>
        <button type="button" onClick={handleSaveProfile} className="mt-4 flex min-h-12 w-full items-center justify-center rounded-[18px] bg-[#0ea5e9] px-4 text-sm font-black text-white">
          {saved ? "Perfil guardado" : "Guardar perfil"}
        </button>
      </section>

      <section className="mt-4 space-y-3">
        <div className="rounded-[22px] bg-white/92 p-4 shadow-[0_12px_26px_rgba(23,23,23,0.07)] ring-1 ring-sky-900/5">
          <p className="text-sm font-black text-[#075985]">Proveedor</p>
          <p className="mt-1 text-base font-bold">Google</p>
        </div>
        <div className="rounded-[22px] bg-white/92 p-4 shadow-[0_12px_26px_rgba(23,23,23,0.07)] ring-1 ring-sky-900/5">
          <p className="text-sm font-black text-[#075985]">Contraseña</p>
          <p className="mt-1 text-sm font-medium leading-5 text-[#5a5a63]">
            Se administra desde tu cuenta Google. No guardamos password.
          </p>
        </div>
      </section>

      <button type="button" onClick={onLogout} className="mt-6 flex min-h-14 items-center justify-center rounded-[22px] bg-[#0ea5e9] px-5 text-base font-black text-white shadow-[0_14px_28px_rgba(14,165,233,0.28)]">
        Cerrar sesión
      </button>

      <AppMenu active="cuenta" />
    </AppFrame>
  );
}

function ProfileInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-[16px] border border-sky-900/10 bg-[#f8fcff] px-4 text-sm font-bold outline-none focus:border-[#0ea5e9] focus:ring-4 focus:ring-[#0ea5e9]/20"
        placeholder={placeholder}
      />
    </label>
  );
}

import Link from "next/link";
import { GoogleLoginButton } from "./google-login-button";
import { LoginRedirect } from "./login-redirect";

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-2 pt-1 text-[16px] font-extrabold">
      <span>9:41</span>
      <span className="tracking-[3px]">●●●</span>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] text-[#101112]">
      <LoginRedirect />
      <section className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-[radial-gradient(circle_at_62%_18%,rgba(11,74,61,0.10),transparent_28%),linear-gradient(180deg,#fbfaf7_0%,#f3f1eb_100%)] px-6 pb-8 pt-2 shadow-[0_0_70px_rgba(23,23,23,0.08)]">
        <StatusBar />

        <nav className="mt-4">
          <Link
            href="/"
            className="grid size-12 place-items-center rounded-full bg-white text-2xl shadow-[0_12px_28px_rgba(23,23,23,0.10)] ring-1 ring-black/5"
            aria-label="Volver"
          >
            ‹
          </Link>
        </nav>

        <section className="mt-10">
          <p className="text-[21px] font-extrabold text-[#0b4a3d]">
            Diagnóstico IA
          </p>
          <h1 className="mt-5 text-[42px] font-black leading-[0.98]">
            Entra y empieza tu diagnóstico.
          </h1>
          <p className="mt-4 text-[18px] font-medium leading-[1.42] text-[#5a5a63]">
            Guarda tu avance, genera tu reporte gratis y vuelve cuando quieras.
          </p>
        </section>

        <section className="mt-8 rounded-[28px] border border-black/5 bg-white/86 p-4 shadow-[0_18px_35px_rgba(23,23,23,0.10)]">
          <div className="rounded-[24px] bg-[#0b4a3d] p-5 text-white">
            <p className="text-sm font-semibold text-white/70">Acceso rápido</p>
            <h2 className="mt-2 text-[26px] font-black leading-tight">
              Sin contraseña.
              <span className="block">Sin registro largo.</span>
            </h2>
          </div>

          <div className="mt-4">
            <GoogleLoginButton />
          </div>

          <p className="mt-4 text-center text-sm font-medium leading-5 text-[#5a5a63]">
            Gratis para empezar. Solo usaremos tu cuenta para iniciar sesión.
          </p>
        </section>

        <div className="mt-auto rounded-[24px] bg-white/70 p-4 shadow-[0_12px_28px_rgba(23,23,23,0.06)]">
          <p className="text-sm font-bold text-[#0b4a3d]">Incluye</p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-bold text-[#34343a]">
            <span className="rounded-2xl bg-[#eaf2ec] px-2 py-3">8 min</span>
            <span className="rounded-2xl bg-[#eaf2ec] px-2 py-3">PDF gratis</span>
            <span className="rounded-2xl bg-[#eaf2ec] px-2 py-3">3 fugas</span>
          </div>
        </div>
      </section>
    </main>
  );
}

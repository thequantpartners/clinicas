import Link from "next/link";
import { GoogleLoginButton } from "./google-login-button";
import { LoginRedirect } from "./login-redirect";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] text-[#101112]">
      <LoginRedirect />
      <section className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-[radial-gradient(circle_at_62%_18%,rgba(14,165,233,0.18),transparent_28%),linear-gradient(180deg,#f8fcff_0%,#eef8ff_100%)] px-6 pb-8 pt-8 shadow-[0_0_70px_rgba(23,23,23,0.08)]">
        <nav>
          <Link
            href="/"
            className="grid size-12 place-items-center rounded-full bg-white text-2xl shadow-[0_12px_28px_rgba(23,23,23,0.10)] ring-1 ring-black/5"
            aria-label="Volver"
          >
            ‹
          </Link>
        </nav>

        <section className="mt-10">
          <p className="text-[21px] font-extrabold text-[#075985]">
            Diagnóstico IA
          </p>
          <h1 className="mt-5 text-[42px] font-black leading-[0.98]">
            Descubre cuánto dinero se fuga hoy.
          </h1>
          <p className="mt-4 text-[18px] font-medium leading-[1.42] text-[#5a5a63]">
            Entra con Google y recibe un diagnóstico gratis de pacientes, citas
            y recompras perdidas.
          </p>
        </section>

        <section className="mt-8 rounded-[28px] border border-black/5 bg-white/86 p-4 shadow-[0_18px_35px_rgba(23,23,23,0.10)]">
          <div className="rounded-[24px] bg-[#075985] p-5 text-white">
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
            Gratis para empezar. Solo usamos tu cuenta para guardar tu avance.
          </p>
        </section>

        <div className="mt-auto rounded-[24px] bg-white/82 p-4 shadow-[0_12px_28px_rgba(23,23,23,0.06)]">
          <p className="text-sm font-black uppercase tracking-[0.08em] text-[#075985]">
            Qué recibes
          </p>
          <div className="mt-3 grid gap-2 text-sm font-bold text-[#34343a]">
            <span className="rounded-2xl bg-[#e0f2fe] px-4 py-3">
              8 min para detectar pérdidas.
            </span>
            <span className="rounded-2xl bg-[#e0f2fe] px-4 py-3">
              Reporte gratis con 3 fugas.
            </span>
            <span className="rounded-2xl bg-[#e0f2fe] px-4 py-3">
              Próximo paso para recuperar ventas.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

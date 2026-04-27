import Link from "next/link";
import { LeaksAccordion } from "./leaks-accordion";

type IconProps = {
  className?: string;
};

const leaks = [
  {
    title: "Pacientes que consultan y no compran",
    color: "bg-[#0ea5e9]",
    icon: "chat",
    examples: [
      "Mensajes respondidos horas despues.",
      "Preguntas por precio sin cierre.",
      "Leads de Instagram sin seguimiento.",
    ],
  },
  {
    title: "Citas que no se concretan",
    color: "bg-[#0369a1]",
    icon: "calendar",
    examples: [
      "Pacientes interesados sin fecha definida.",
      "Citas separadas sin confirmacion.",
      "Reprogramaciones manuales que se pierden.",
    ],
  },
  {
    title: "Clientes que no vuelven",
    color: "bg-[#101112]",
    icon: "user",
    examples: [
      "No hay recordatorio post-atencion.",
      "Pacientes sin proxima sesion agendada.",
      "Recompras dependen de memoria del equipo.",
    ],
  },
  {
    title: "Procesos que consumen tiempo",
    color: "bg-[#0ea5e9]",
    icon: "clock",
    examples: [
      "Confirmaciones hechas una por una.",
      "Datos repetidos en agenda y Excel.",
      "Dueño revisa todo manualmente.",
    ],
  },
  {
    title: "Ingresos sin seguimiento",
    color: "bg-[#0369a1]",
    icon: "calendar",
    examples: [
      "Presupuestos enviados sin control.",
      "Pagos pendientes sin alerta.",
      "Campañas sin medicion de conversion.",
    ],
  },
] as const;

const plan = [
  { title: "Prioridad", icon: TargetIcon },
  { title: "Impacto", icon: ChartIcon },
  { title: "Acción", icon: WhatsAppIcon },
];

function SignalIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 34 24" className={className} aria-hidden="true">
      <rect x="2" y="14" width="5" height="8" rx="2" fill="currentColor" />
      <rect x="11" y="10" width="5" height="12" rx="2" fill="currentColor" />
      <rect x="20" y="6" width="5" height="16" rx="2" fill="currentColor" />
      <rect x="29" y="2" width="5" height="20" rx="2" fill="currentColor" />
    </svg>
  );
}

function WifiIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 24" className={className} aria-hidden="true">
      <path
        d="M2 8.5C9.8 2.3 22.2 2.3 30 8.5l-4 4.1c-5.6-4.4-14.4-4.4-20 0L2 8.5Z"
        fill="currentColor"
      />
      <path
        d="M8.4 15c4.2-3.2 10.8-3.2 15.2 0l-4.1 4.1a5.6 5.6 0 0 0-7 0L8.4 15Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BatteryIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 42 22" className={className} aria-hidden="true">
      <rect
        x="1"
        y="3"
        width="34"
        height="16"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="37" y="8" width="4" height="6" rx="1" fill="currentColor" />
      <rect x="5" y="6.5" width="26" height="9" rx="2" fill="currentColor" />
    </svg>
  );
}

function BellIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M18 9.8c0-3.1-1.7-5.4-4.4-6.1V2.9a1.6 1.6 0 0 0-3.2 0v.8C7.7 4.4 6 6.7 6 9.8v3.4l-1.5 2.5a1.2 1.2 0 0 0 1 1.8h13a1.2 1.2 0 0 0 1-1.8L18 13.2V9.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.4 19a2.8 2.8 0 0 0 5.2 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7.3v5l3.4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WalletIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 7.5h14.5A2.5 2.5 0 0 1 21 10v7a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17V8.8A2.8 2.8 0 0 1 5.8 6h10.7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M16.8 13.5h4.2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M6.2 6 16 3.9"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlertIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 3.6 21 19H3L12 3.6Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M12 9v4.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 16.5h.1"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChatIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M5 17.8 3.8 21 8 19.7a8.8 8.8 0 1 0-3-1.9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8.4 12h.1M12 12h.1M15.6 12h.1"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect
        x="4"
        y="5.5"
        width="16"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M8 3.8v3.4M16 3.8v3.4M4 10h16" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 13h2M12 13h2M16 13h.2M8 16h2M12 16h2M16 16h.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.9" />
      <path
        d="M5.2 20c.8-3.3 3.2-5 6.8-5s6 1.7 6.8 5H5.2Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="m6.2 19.2.8-2.8a7.4 7.4 0 1 1 2.9 2.5l-3.7.3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.8c.2 3.3 2.4 5.5 5.6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GroupIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="9" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3.5 20c.7-3.4 2.6-5 5.5-5s4.8 1.6 5.5 5M14.8 15.4c2.6.2 4.4 1.7 5 4.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HomeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4 11.2 12 4l8 7.2V20a1 1 0 0 1-1 1h-5.2v-5.5h-3.6V21H5a1 1 0 0 1-1-1v-8.8Z" />
    </svg>
  );
}

function TargetIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChartIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 20V9M12 20V4M19 20v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3 20h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HelpIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9.5 9.6a2.7 2.7 0 0 1 5.2.7c0 2.2-2.7 2.3-2.7 4.2"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path d="M12 17.4h.1" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StatusBar() {
  return (
    <div className="h-7" aria-hidden="true" />
  );
}

function Avatar() {
  return (
    <div className="grid size-[58px] place-items-center rounded-full border-[5px] border-white bg-[#ead7c7] shadow-[0_14px_35px_rgba(23,23,23,0.1)]">
      <div className="relative size-[44px] overflow-hidden rounded-full bg-[#f4d4bd]">
        <div className="absolute left-[15px] top-[7px] h-[23px] w-[23px] rounded-full bg-[#d9a17b]" />
        <div className="absolute left-[9px] top-[4px] h-[34px] w-[34px] rounded-t-full bg-[#5f341f]" />
        <div className="absolute left-[16px] top-[13px] h-[25px] w-[22px] rounded-full bg-[#f1c6a2]" />
        <div className="absolute bottom-[-12px] left-[8px] h-[28px] w-[36px] rounded-t-full bg-white" />
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] text-[#101112]">
      <section className="mx-auto min-h-screen w-full max-w-[430px] bg-[radial-gradient(circle_at_62%_18%,rgba(14,165,233,0.18),transparent_30%),linear-gradient(180deg,#f8fcff_0%,#eef8ff_100%)] px-6 pb-28 pt-2 shadow-[0_0_70px_rgba(23,23,23,0.08)]">
        <StatusBar />

        <header className="animate-fade-up mt-3 flex items-center justify-between">
          <p className="text-[21px] font-extrabold text-[#075985]">
            Diagnóstico IA
          </p>
        </header>

        <section className="animate-fade-up mt-5 [animation-delay:80ms]">
          <p className="text-[18px] font-extrabold tracking-normal text-[#075985]">
            Consultoría de Puntos de Fuga
          </p>
          <h1 className="mt-3 text-[37px] font-black leading-[0.98] tracking-normal">
            Tu clínica puede perder
            <span className="block text-[#075985]">S/2,500+ al mes</span>
          </h1>
          <p className="mt-3 text-[17px] font-medium leading-[1.38] text-[#5a5a63]">
            En pacientes que preguntan y no compran, citas que no se concretan y recompras que nadie sigue antes de invertir más en publicidad.
          </p>
        </section>

        <Link
          href="/login"
          className="animate-soft-pulse mt-5 grid min-h-[58px] grid-cols-[32px_1fr_32px] items-center gap-2 rounded-[21px] bg-[#0ea5e9] px-5 text-white shadow-[0_16px_35px_rgba(14,165,233,0.30)] ring-2 ring-white transition active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-[#0ea5e9]/30"
        >
          <span className="text-center text-2xl" aria-hidden="true">
            ✨
          </span>
          <span className="truncate text-center text-[16px] font-extrabold min-[390px]:text-[18px]">
            Detectar mis fugas gratis
          </span>
          <ArrowIcon className="size-8" />
        </Link>

        <p className="mt-3 text-center text-sm font-extrabold text-[#075985]">
          Gratis · 8 min · Sin compromiso
        </p>

        <section className="animate-fade-up mt-5 grid grid-cols-3 rounded-[24px] border border-black/5 bg-white/82 px-5 py-3 shadow-[0_18px_35px_rgba(23,23,23,0.10)] [animation-delay:160ms]">
          <div className="pr-3">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-[#e0f2fe] text-[#075985]">
                <ClockIcon className="size-6" />
              </span>
              <span className="text-[13px] font-semibold text-[#5a5a63]">
                Tiempo
              </span>
            </div>
            <p className="mt-3 whitespace-nowrap text-[28px] font-black leading-none">8 min</p>
          </div>
          <div className="border-x border-[#d9d7d1] px-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-[#e0f2fe] text-[#075985]">
                <WalletIcon className="size-6" />
              </span>
              <span className="text-[13px] font-semibold text-[#5a5a63]">
                Inversión
              </span>
            </div>
            <p className="mt-3 whitespace-nowrap text-[28px] font-black leading-none">S/0</p>
          </div>
          <div className="pl-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-[#e0f2fe] text-[#075985]">
                <AlertIcon className="size-6" />
              </span>
              <span className="text-[13px] font-semibold text-[#5a5a63]">
                Resultado
              </span>
            </div>
            <p className="mt-3 whitespace-nowrap text-[25px] font-black leading-none">3 fugas</p>
          </div>
        </section>

        <section className="animate-fade-up mt-4 rounded-[24px] border border-black/5 bg-white/82 p-2.5 shadow-[0_16px_30px_rgba(23,23,23,0.08)] [animation-delay:240ms]">
          <div className="flex items-center justify-between px-2 py-1.5">
            <h2 className="text-[21px] font-black leading-tight">
              Puntos de fuga detectables
            </h2>
          </div>

          <LeaksAccordion leaks={leaks} />

          <div className="animate-float-card mt-3 rounded-[22px] bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.18),transparent_30%),linear-gradient(135deg,#075985,#0ea5e9)] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
            <h3 className="text-[21px] font-black">Fuga estimada mensual</h3>
            <p className="mt-1 text-sm font-semibold text-white/78">
              Con solo 1 tratamiento high-ticket perdido.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-2xl bg-white/14 p-3 ring-1 ring-white/15">
                <p className="text-[11px] font-bold text-white/70">Dental</p>
                <p className="mt-1 text-lg font-black">S/2,500</p>
              </div>
              <div className="rounded-2xl bg-white/14 p-3 ring-1 ring-white/15">
                <p className="text-[11px] font-bold text-white/70">Estética</p>
                <p className="mt-1 text-lg font-black">S/700+</p>
              </div>
              <div className="rounded-2xl bg-white/14 p-3 ring-1 ring-white/15">
                <p className="text-[11px] font-bold text-white/70">Laser</p>
                <p className="mt-1 text-lg font-black">S/250</p>
              </div>
            </div>
          </div>

          <Link
            href="/login"
            className="animate-soft-pulse mt-3 grid min-h-[58px] grid-cols-[1fr_32px] items-center gap-2 rounded-[21px] bg-[#0ea5e9] px-5 text-white shadow-[0_16px_35px_rgba(14,165,233,0.30)] ring-2 ring-white transition active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-[#0ea5e9]/30"
          >
            <span className="truncate text-center text-[16px] font-extrabold min-[390px]:text-[17px]">
              Ver cuánto estoy perdiendo
            </span>
            <ArrowIcon className="size-8" />
          </Link>
        </section>

        <p className="animate-fade-up mt-5 text-center text-[24px] font-black leading-tight text-[#075985] [animation-delay:320ms]">
          Antes de vender más,
          <span className="block text-[#101112]">recupera lo que ya pierdes.</span>
        </p>

      </section>
    </main>
  );
}

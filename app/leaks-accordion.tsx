"use client";

import { useState } from "react";

type LeakItem = {
  title: string;
  color: string;
  icon: "chat" | "calendar" | "user" | "clock";
  examples: readonly string[];
};

function ChatIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M5 17.8 3.8 21 8 19.7a8.8 8.8 0 1 0-3-1.9Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M8.4 12h.1M12 12h.1M15.6 12h.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.8"
      />
    </svg>
  );
}

function CalendarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="4" y="5.5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3.8v3.4M16 3.8v3.4M4 10h16" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 13h2M12 13h2M16 13h.2M8 16h2M12 16h2M16 16h.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  );
}

function UserIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.9" />
      <path
        d="M5.2 20c.8-3.3 3.2-5 6.8-5s6 1.7 6.8 5H5.2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

function ClockIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7.3v5l3.4 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

const icons = {
  chat: ChatIcon,
  calendar: CalendarIcon,
  user: UserIcon,
  clock: ClockIcon,
};

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="m9 5 7 7-7 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function LeaksAccordion({ leaks }: { leaks: readonly LeakItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-2 space-y-1.5">
      {leaks.map((leak, index) => {
        const Icon = icons[leak.icon];
        const open = openIndex === index;

        return (
          <div
            key={leak.title}
            className="overflow-hidden rounded-[18px] border border-black/5 bg-white shadow-[0_8px_22px_rgba(23,23,23,0.06)]"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              className="flex min-h-[48px] w-full items-center gap-3 px-3 text-left transition hover:bg-[#f0f9ff] focus:outline-none focus:ring-4 focus:ring-[#075985]/10"
              aria-expanded={open}
            >
              <span
                className={`grid size-8 place-items-center rounded-full ${leak.color} text-white shadow-[0_9px_18px_rgba(23,23,23,0.12)]`}
              >
                <Icon className="size-[18px]" />
              </span>
              <span className="flex-1 text-[14px] font-extrabold leading-tight">
                {leak.title}
              </span>
              <ChevronIcon
                className={`size-6 text-[#9b9b9b] transition-transform ${
                  open ? "rotate-90" : ""
                }`}
              />
            </button>

            {open ? (
              <div className="border-t border-black/5 bg-[#f0f9ff] px-4 pb-3 pt-2">
                <p className="text-[11px] font-black uppercase tracking-[0.08em] text-[#075985]">
                  Ejemplos
                </p>
                <ul className="mt-2 space-y-1.5">
                  {leak.examples.map((example) => (
                    <li
                      key={example}
                      className="flex gap-2 text-[13px] font-semibold leading-snug text-[#34343a]"
                    >
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#0ea5e9]" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

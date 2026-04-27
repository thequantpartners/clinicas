import type { ReactNode } from "react";

type AppFrameProps = {
  children: ReactNode;
};

export function AppFrame({ children }: AppFrameProps) {
  return (
    <main className="min-h-screen bg-[#f6f4ef] text-[#101112]">
      <section className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-[radial-gradient(circle_at_62%_18%,rgba(14,165,233,0.18),transparent_30%),linear-gradient(180deg,#f8fcff_0%,#eef8ff_100%)] px-5 pb-28 pt-7 shadow-[0_0_70px_rgba(23,23,23,0.08)]">
        {children}
      </section>
    </main>
  );
}

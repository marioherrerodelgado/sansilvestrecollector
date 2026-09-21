"use client";

import { useState } from "react";
import type { ShirtYear } from "@/data/shirts";
import { RealisticShirt } from "./RealisticShirt";

type Props = {
  shirts: ShirtYear[];
  images: Record<number, string>;
};

export function Closet({ shirts, images }: Props) {
  const sorted = [...shirts].sort((a, b) => b.year - a.year);
  const [selectedYear, setSelectedYear] = useState(sorted[0].year);
  const selected = sorted.find((s) => s.year === selectedYear) ?? sorted[0];

  return (
    <div className="space-y-6">
      <div className="relative h-[460px] overflow-hidden rounded-2xl bg-gradient-to-b from-[#111113] via-[#0a0a0b] to-black sm:h-[540px]">
        {/* lavado de luz ambiental arriba, como en una sala con focos cenitales */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(255,255,255,0.06),transparent)]" />
        {/* repisa/zócalo tenue donde "apoyan" las camisetas */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[13%] h-px bg-white/10 sm:bottom-[15%]" />

        <div className="no-scrollbar absolute inset-x-0 bottom-0 top-0 overflow-x-auto overflow-y-hidden">
          <div className="flex h-full min-w-max items-end gap-7 px-10 pb-[13%] sm:gap-9 sm:pb-[15%]">
            {sorted.map((shirt) => {
              const isSelected = shirt.year === selectedYear;
              const image = images[shirt.year];
              return (
                <button
                  key={shirt.year}
                  type="button"
                  onClick={() => setSelectedYear(shirt.year)}
                  aria-pressed={isSelected}
                  aria-label={`Camiseta de ${shirt.year}`}
                  className="group relative flex shrink-0 flex-col items-center bg-transparent"
                  style={{ zIndex: isSelected ? 50 : 1 }}
                >
                  {/* cono de luz de foco, más intenso sobre la seleccionada */}
                  <div
                    className={`pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 rounded-full blur-2xl transition-all duration-500 ${
                      isSelected
                        ? "h-56 w-48 bg-[radial-gradient(ellipse,rgba(255,244,220,0.30),transparent_70%)] sm:h-64 sm:w-56"
                        : "h-28 w-20 bg-[radial-gradient(ellipse,rgba(255,255,255,0.08),transparent_70%)] group-hover:bg-[radial-gradient(ellipse,rgba(255,255,255,0.16),transparent_70%)]"
                    }`}
                  />

                  <div
                    className={`relative flex flex-col items-center transition-all duration-500 ease-out ${
                      isSelected ? "-translate-y-2" : "translate-y-0 group-hover:-translate-y-1.5"
                    }`}
                  >
                    <svg
                      viewBox="0 0 28 20"
                      className={`transition-all duration-500 ${
                        isSelected ? "h-7 w-9 text-white/70" : "h-[15px] w-[21px] text-white/25 group-hover:text-white/45"
                      }`}
                    >
                      <path
                        d="M14 2c-2 0-3 1.6-3 3.4 0 1 .4 1.7 1.1 2.3L2 14.6C1 15.2 1.6 17 3 17h22c1.4 0 2-1.8 1-2.4L16.9 7.7c.7-.6 1.1-1.3 1.1-2.3C18 3.6 16 2 14 2z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>

                    <div
                      className={`relative -mt-0.5 transition-all duration-500 ease-out ${
                        isSelected
                          ? "h-[190px] w-[172px] animate-shirt-sway drop-shadow-[0_22px_40px_rgba(0,0,0,0.6)] sm:h-[230px] sm:w-[208px]"
                          : "h-[86px] w-[78px] opacity-60 brightness-[0.55] saturate-[0.7] drop-shadow-[0_8px_14px_rgba(0,0,0,0.5)] group-hover:opacity-90 group-hover:brightness-90"
                      }`}
                    >
                      <RealisticShirt
                        year={shirt.year}
                        color={shirt.color}
                        sleeveColor={shirt.sleeveColor}
                        image={image}
                        className="h-full w-full"
                      />
                    </div>

                    {/* sombra de suelo, como si un foco cayera sobre la pieza */}
                    <div
                      className={`-mt-1 rounded-full bg-black/70 blur-sm transition-all duration-500 ${
                        isSelected ? "h-2 w-24 opacity-70 sm:w-28" : "h-1.5 w-10 opacity-40"
                      }`}
                    />
                  </div>

                  <span
                    className={`mt-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-500 ${
                      isSelected ? "text-white/90" : "text-white/35 group-hover:text-white/60"
                    }`}
                  >
                    {shirt.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        key={selected.year}
        className="animate-fade-in-up rounded-2xl border border-black/5 bg-[#f7f3ea] p-6 text-[#2b2b2b]"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold">{selected.year}</h2>
          {selected.sponsor && (
            <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs uppercase tracking-wide text-black/60">
              {selected.sponsor}
            </span>
          )}
        </div>

        {selected.design ? (
          <p className="mt-3 text-black/80">{selected.design}</p>
        ) : (
          <p className="mt-3 italic text-black/40">
            Diseño sin documentar todavía — sube tu foto de {selected.year} como{" "}
            <code className="text-black/60">public/camisetas/{selected.year}.jpg</code> y cuéntanos cómo era.
          </p>
        )}

        <div className="mt-4 grid gap-1.5 text-sm text-black/70 sm:grid-cols-2">
          {selected.menWinner && (
            <p>
              🥇 Masculina: <span className="font-medium text-black">{selected.menWinner.name}</span> ({selected.menWinner.country}
              {selected.menWinner.time ? ` · ${selected.menWinner.time}` : ""})
            </p>
          )}
          {selected.womenWinner && (
            <p>
              🥇 Femenina: <span className="font-medium text-black">{selected.womenWinner.name}</span> ({selected.womenWinner.country}
              {selected.womenWinner.time ? ` · ${selected.womenWinner.time}` : ""})
            </p>
          )}
        </div>

        {selected.notes && <p className="mt-3 text-sm text-black/40">{selected.notes}</p>}
      </div>
    </div>
  );
}

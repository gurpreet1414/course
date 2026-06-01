"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CalendarCheck,
  Check,
  ChevronDown,
  SlidersHorizontal,
  ArrowUpRight,
  BadgePoundSterling,
  ShieldCheck,
  BookOpen,
  X,
} from "lucide-react";

import coursesData from "../../data/courses.json";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AppointmentModal from "../../components/AppointmentModal";

const tradeImages = {
  "general-labourer":
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  carpentry:
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  bricklaying:
    "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?auto=format&fit=crop&w=1200&q=80",
  "painting-decorating":
    "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80",
  plastering:
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
  roofing:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80";

const getBadgeStyles = (text = "") => {
  const lowerText = text.toLowerCase();

  if (lowerText.includes("black")) {
    return "border-white/15 bg-white/[0.06] text-white";
  }

  return "border-lime-400/25 bg-lime-400/10 text-lime-200";
};

function CoursesListing() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialTrade = searchParams.get("trade") || "all";
  const initialLevel = searchParams.get("level") || "all";

  const [selectedTrade, setSelectedTrade] = useState(initialTrade);
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);
  const [selectedCard, setSelectedCard] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [appointmentCourse, setAppointmentCourse] = useState(null);

  useEffect(() => {
    setSelectedTrade(initialTrade);
    setSelectedLevel(initialLevel);
  }, [initialTrade, initialLevel]);

  const uniqueCards = [
    "all",
    ...new Set(coursesData.flatMap((trade) => trade.levels.map((lvl) => lvl.card))),
  ].filter(Boolean);

  const uniqueLevels = [
    ...new Set(coursesData.flatMap((trade) => trade.levels.map((lvl) => lvl.level))),
  ].sort((a, b) => a - b);

  const totalPathways = coursesData.reduce(
    (total, trade) => total + trade.levels.length,
    0
  );

  const updateFilters = (trade, level) => {
    const params = new URLSearchParams();

    if (trade && trade !== "all") params.set("trade", trade);
    if (level && level !== "all") params.set("level", level);

    router.push(params.toString() ? `/courses?${params.toString()}` : "/courses", {
      scroll: false,
    });
  };

  const clearFilters = () => {
    setSelectedTrade("all");
    setSelectedLevel("all");
    setSelectedCard("all");
    setSearchQuery("");
    router.push("/courses", { scroll: false });
  };

  const filteredData = coursesData.filter((trade) => {
    if (selectedTrade !== "all" && trade.slug !== selectedTrade) return false;

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      const searchText = [
        trade.trade,
        trade.slug,
        trade.description,
        trade.info,
        ...trade.levels.flatMap((level) => [
          level.course,
          level.card,
          level.tier,
          `level ${level.level}`,
        ]),
      ]
        .join(" ")
        .toLowerCase();

      if (!searchText.includes(query)) return false;
    }

    if (selectedLevel !== "all") {
      const hasLevel = trade.levels.some(
        (level) => level.level.toString() === selectedLevel.toString()
      );
      if (!hasLevel) return false;
    }

    if (selectedCard !== "all") {
      const hasCard = trade.levels.some((level) => level.card === selectedCard);
      if (!hasCard) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen overflow-hidden bg-[#020202] text-white">
      <Navbar />

      <main className="relative pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-px bg-lime-400/35" />
          <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-lime-400/[0.055] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1600px] px-4 pb-20 lg:px-8">
          <section className="mb-9 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime-400/25 bg-lime-400/10 px-4 py-2 text-xs font-black text-lime-300">
                <ShieldCheck className="h-4 w-4" />
                Accredited Construction Training
              </div>

              <h1 className="max-w-4xl text-4xl font-black leading-[1.02] text-white sm:text-5xl lg:text-7xl">
                Find the right
                <span className="block text-lime-300">CSCS and NVQ course</span>
              </h1>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-white/60 sm:text-base">
                Explore construction training by trade, level, card type and course
                pathway. Filter quickly, compare options and book guidance with our
                advisors.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Trades", value: coursesData.length },
                { label: "Pathways", value: totalPathways },
                { label: "Support", value: "1:1" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl"
                >
                  <div className="text-2xl font-black text-lime-300">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] font-bold text-white/45">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="sticky top-24 z-30 mb-8 rounded-2xl border border-white/10 bg-[#070707]/90 p-3 shadow-[0_22px_70px_rgba(0,0,0,0.45),0_0_34px_rgba(163,230,53,0.08)] backdrop-blur-2xl">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-lime-300" />
                <input
                  type="text"
                  placeholder="Search courses, trades, cards..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.055] pl-11 pr-4 text-sm font-semibold text-white outline-none transition placeholder:text-white/35 focus:border-lime-400/55 focus:bg-white/[0.075] focus:shadow-[0_0_0_4px_rgba(163,230,53,0.12)]"
                />
              </div>

              <select
                value={selectedCard}
                onChange={(e) => setSelectedCard(e.target.value)}
                className="h-12 rounded-xl border border-white/10 bg-[#0b0b0b] px-4 text-sm font-semibold text-white outline-none transition focus:border-lime-400/55 focus:shadow-[0_0_0_4px_rgba(163,230,53,0.12)] lg:w-[250px]"
              >
                {uniqueCards.map((card) => (
                  <option key={card} value={card}>
                    {card === "all" ? "All CSCS Cards" : card}
                  </option>
                ))}
              </select>

              <button
                onClick={clearFilters}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 text-sm font-bold text-white/75 transition hover:border-lime-400/35 hover:bg-lime-400/10 hover:text-lime-200"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            </div>
          </section>

          <div className="flex flex-col gap-8 lg:flex-row">
            <aside className="lg:w-[300px] lg:shrink-0">
              <div className="sticky top-44 rounded-2xl border border-white/10 bg-[#070707]/88 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.38)] backdrop-blur-2xl">
                <div className="mb-6 flex items-center gap-2 text-sm font-black text-white">
                  <SlidersHorizontal className="h-4 w-4 text-lime-300" />
                  Filters
                </div>

                <FilterGroup title="Trade">
                  <FilterOption
                    label="All Trades"
                    active={selectedTrade === "all"}
                    onChange={() => {
                      setSelectedTrade("all");
                      updateFilters("all", selectedLevel);
                    }}
                  />
                  {coursesData.map((trade) => (
                    <FilterOption
                      key={trade.slug}
                      label={trade.trade}
                      active={selectedTrade === trade.slug}
                      onChange={() => {
                        setSelectedTrade(trade.slug);
                        updateFilters(trade.slug, selectedLevel);
                      }}
                    />
                  ))}
                </FilterGroup>

                <div className="my-6 border-t border-white/10" />

                <FilterGroup title="Level">
                  <FilterOption
                    label="All Levels"
                    active={selectedLevel === "all"}
                    onChange={() => {
                      setSelectedLevel("all");
                      updateFilters(selectedTrade, "all");
                    }}
                  />
                  {uniqueLevels.map((level) => (
                    <FilterOption
                      key={level}
                      label={`Level ${level}`}
                      active={selectedLevel === level.toString()}
                      onChange={() => {
                        setSelectedLevel(level.toString());
                        updateFilters(selectedTrade, level.toString());
                      }}
                    />
                  ))}
                </FilterGroup>
              </div>
            </aside>

            <section className="min-w-0 flex-1">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white/55">
                  Showing <span className="text-lime-300">{filteredData.length}</span>{" "}
                  courses
                </p>

                <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-semibold text-white/65">
                  Sort by: A-Z
                  <ChevronDown className="h-4 w-4 text-lime-300" />
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <AnimatePresence mode="popLayout">
                  {filteredData.map((trade, idx) => {
                    const imgSrc = tradeImages[trade.slug] || DEFAULT_IMAGE;
                    const cards = [...new Set(trade.levels.map((level) => level.card))].filter(Boolean);
                    const displayLevels = trade.levels.map((level) => level.level).join(", ");
                    const pricedLevels = trade.levels.filter(
                      (level) => level.bookingType === "booking" && level.price > 0
                    );
                    const minPrice = pricedLevels.length
                      ? Math.min(...pricedLevels.map((level) => level.price))
                      : null;

                    return (
                      <motion.article
                        key={trade.slug}
                        layout
                        initial={{ opacity: 0, y: 26, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.985 }}
                        transition={{ delay: idx * 0.025, duration: 0.3, ease: "easeOut" }}
                        className="group overflow-hidden rounded-2xl border border-white/10 bg-[#070707]/88 shadow-[0_18px_52px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition-all duration-300 hover:border-lime-400/35 hover:bg-white/[0.045] hover:shadow-[0_24px_70px_rgba(0,0,0,0.48),0_0_34px_rgba(163,230,53,0.08)]"
                      >
                        <div className="flex flex-col lg:flex-row">
                          <Link
                            href={`/courses/${trade.slug}`}
                            className="relative m-3 h-[210px] overflow-hidden rounded-xl lg:w-[300px] lg:shrink-0"
                          >
                            <div className="absolute inset-0 z-10 bg-black/35" />
                            <img
                              src={imgSrc}
                              alt={trade.trade}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                            />
                            <div className="absolute bottom-4 left-4 z-20 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-xl">
                              Level {displayLevels}
                            </div>
                          </Link>

                          <div className="flex min-w-0 flex-1 flex-col justify-between p-5">
                            <div>
                              <div className="mb-4 flex flex-wrap gap-2">
                                {cards.map((card) => (
                                  <span
                                    key={card}
                                    className={`rounded-full border px-3 py-1.5 text-[11px] font-bold ${getBadgeStyles(card)}`}
                                  >
                                    {card}
                                  </span>
                                ))}
                              </div>

                              <Link href={`/courses/${trade.slug}`}>
                                <h2 className="text-2xl font-black leading-tight text-white transition group-hover:text-lime-300 lg:text-3xl">
                                  {trade.trade}
                                </h2>
                              </Link>

                              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/50">
                                <span className="inline-flex items-center gap-1.5">
                                  <BookOpen className="h-4 w-4 text-lime-300" />
                                  Level {displayLevels}
                                </span>
                                <span className="h-1 w-1 rounded-full bg-white/25" />
                                <span>{trade.levels.length} pathways available</span>
                              </div>

                              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/58">
                                {trade.description}
                              </p>
                            </div>

                            <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
                              <div>
                                {minPrice !== null ? (
                                  <>
                                    <div className="text-xs font-bold text-white/40">
                                      Starting From
                                    </div>
                                    <div className="mt-1 flex items-center gap-1 text-3xl font-black text-white">
                                      <BadgePoundSterling className="h-6 w-6 text-lime-300" />
                                      {"\u00a3"}
                                      {minPrice}
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-sm font-bold text-lime-300">
                                    Contact For Pricing
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-3">
                                <Link
                                  href={`/courses/${trade.slug}`}
                                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white/80 transition hover:border-lime-400/35 hover:bg-lime-400/10 hover:text-lime-200"
                                >
                                  View Details
                                  <ArrowUpRight className="h-4 w-4" />
                                </Link>

                                <button
                                  onClick={() =>
                                    setAppointmentCourse({
                                      trade: trade.trade,
                                      course: trade.levels[0].course,
                                    })
                                  }
                                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-black text-black transition hover:bg-lime-300 hover:shadow-[0_0_28px_rgba(163,230,53,0.25)]"
                                >
                                  <CalendarCheck className="h-4 w-4" />
                                  Book Appointment
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>

                {filteredData.length === 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-6 py-16 text-center">
                    <p className="text-2xl font-black text-white">No courses found</p>
                    <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-white/55">
                      Try clearing one filter or searching for another trade, card or
                      level.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      <AppointmentModal
        open={Boolean(appointmentCourse)}
        course={appointmentCourse}
        onClose={() => setAppointmentCourse(null)}
      />

      <Footer />
    </div>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-black uppercase text-lime-300">{title}</h3>
      <div className="max-h-[310px] space-y-2 overflow-y-auto pr-1 custom-scrollbar">
        {children}
      </div>
    </div>
  );
}

function FilterOption({ label, active, onChange }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-white/[0.035]">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${
          active
            ? "border-lime-400 bg-lime-400"
            : "border-white/20 bg-white/[0.03] group-hover:border-lime-400/45"
        }`}
      >
        {active && <Check className="h-3 w-3 text-black" />}
      </span>

      <span
        className={`text-sm transition ${
          active ? "font-bold text-white" : "text-white/58 group-hover:text-white/80"
        }`}
      >
        {label}
      </span>

      <input type="radio" className="hidden" checked={active} onChange={onChange} />
    </label>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#020202]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-lime-400 border-t-transparent" />
        </div>
      }
    >
      <CoursesListing />
    </Suspense>
  );
}

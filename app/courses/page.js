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
} from "lucide-react";

import coursesData from "../../data/courses.json";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AppointmentModal from "../../components/AppointmentModal";

/* =========================================================
   TRADE IMAGES
========================================================= */

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
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80";

/* =========================================================
   BADGE STYLES
========================================================= */

const getBadgeStyles = (text = "") => {
  const lowerText = text.toLowerCase();

  if (lowerText.includes("green"))
    return "bg-green-50 text-green-700 border-green-200";

  if (lowerText.includes("blue"))
    return "bg-blue-50 text-blue-700 border-blue-200";

  if (lowerText.includes("gold"))
    return "bg-yellow-50 text-yellow-700 border-yellow-200";

  if (lowerText.includes("black"))
    return "bg-gray-900 text-white border-gray-900";

  return "bg-white text-secondary border-gray-200";
};

/* =========================================================
   MAIN
========================================================= */

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

  /* =========================================================
     FILTER OPTIONS
  ========================================================= */

  const uniqueCards = [
    "all",
    ...new Set(
      coursesData.flatMap((trade) =>
        trade.levels.map((lvl) => lvl.card)
      )
    ),
  ];

  /* =========================================================
     URL UPDATE
  ========================================================= */

  const updateFilters = (trade, level) => {
    let url = `/courses`;

    const params = new URLSearchParams();

    if (trade && trade !== "all") params.set("trade", trade);

    if (level && level !== "all") params.set("level", level);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    router.push(url, { scroll: false });
  };

  /* =========================================================
     FILTER LOGIC
  ========================================================= */

  const filteredData = coursesData.filter((trade) => {
    /* TRADE */

    if (
      selectedTrade !== "all" &&
      trade.slug !== selectedTrade
    ) {
      return false;
    }

    /* SEARCH */

    if (
      searchQuery &&
      !trade.trade
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    /* LEVEL */

    if (selectedLevel !== "all") {
      const hasLevel = trade.levels.some(
        (l) => l.level.toString() === selectedLevel.toString()
      );

      if (!hasLevel) return false;
    }

    /* CARD */

    if (selectedCard !== "all") {
      const hasCard = trade.levels.some(
        (l) => l.card === selectedCard
      );

      if (!hasCard) return false;
    }

    return true;
  });

  return (
    <div
      className="
      min-h-screen
      bg-[radial-gradient(circle_at_top,_rgba(255,221,87,0.10),transparent_25%),linear-gradient(to_bottom,#ffffff,#f8fafc)]
      flex
      flex-col
      pt-24
    "
    >
      <Navbar />

      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 py-8 flex-grow">
        {/* HERO */}

        <div className="mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-secondary mb-4 leading-tight">
            Find The Right
            <span className="text-primary"> CSCS Course</span>
          </h1>

          <p className="text-lg text-muted max-w-3xl leading-relaxed">
            Explore accredited CSCS, NVQ and construction training courses, then book an appointment with our team for guidance.
          </p>
        </div>

        {/* FILTER BAR */}

        <div className="sticky top-20 z-40 mb-8">
          <div
            className="
            w-full
            backdrop-blur-2xl
            bg-white/80
            border
            border-white/50
            shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            rounded-[22px]
            p-3
          "
          >
            <div className="flex flex-col lg:flex-row gap-3">
              {/* SEARCH */}

              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />

                <input
                  type="text"
                  placeholder="Search courses, trades..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="
                    w-full
                    pl-11
                    pr-4
                    py-3.5
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    text-sm
                    font-medium
                    focus:outline-none
                    focus:ring-4
                    focus:ring-primary/10
                    focus:border-primary
                  "
                />
              </div>

              {/* CARD FILTER */}

              <select
                value={selectedCard}
                onChange={(e) =>
                  setSelectedCard(e.target.value)
                }
                className="
                  lg:w-[240px]
                  px-5
                  py-3.5
                  rounded-xl
                  bg-white
                  border
                  border-gray-200
                  text-sm
                  font-semibold
                  text-secondary
                  focus:outline-none
                  focus:ring-4
                  focus:ring-primary/10
                "
              >
                {uniqueCards.map((card) => (
                  <option key={card} value={card}>
                    {card === "all"
                      ? "All CSCS Cards"
                      : card}
                  </option>
                ))}
              </select>

              {/* CLEAR */}

              <button
                onClick={() => {
                  setSelectedTrade("all");
                  setSelectedLevel("all");
                  setSelectedCard("all");
                  setSearchQuery("");
                }}
                className="
                  px-6
                  py-3.5
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-sm
                  font-semibold
                  hover:border-primary
                  hover:bg-primary/5
                  transition-all
                "
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR */}

          <div className="lg:w-[280px] shrink-0">
            <div
              className="
              sticky
              top-44
              rounded-[26px]
              border
              border-white/50
              bg-white/80
              backdrop-blur-2xl
              shadow-[0_10px_40px_rgba(0,0,0,0.05)]
              p-6
               
            "
            >
              {/* TRADE */}

              <div className="mb-8  ">
                <h3 className="font-bold text-secondary mb-5">
                  Trade
                </h3>

                <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                  {coursesData.map((trade) => (
                    <label
                      key={trade.slug}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div
                        className={`
                          w-5
                          h-5
                          rounded-md
                          border
                          flex
                          items-center
                          justify-center
                          ${selectedTrade === trade.slug
                            ? "bg-primary border-primary"
                            : "border-gray-300 bg-white"
                          }
                        `}
                      >
                        {selectedTrade === trade.slug && (
                          <Check className="w-3 h-3 text-secondary" />
                        )}
                      </div>

                      <span
                        className={`text-sm ${selectedTrade === trade.slug
                          ? "font-semibold text-secondary"
                          : "text-muted"
                          }`}
                      >
                        {trade.trade}
                      </span>

                      <input
                        type="radio"
                        className="hidden"
                        checked={
                          selectedTrade === trade.slug
                        }
                        onChange={() => {
                          setSelectedTrade(trade.slug);
                          updateFilters(
                            trade.slug,
                            selectedLevel
                          );
                        }}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 my-8" />

              {/* LEVEL */}

              <div className="">
                <h3 className="font-bold text-secondary mb-5">
                  Level
                </h3>

                <div className="space-y-4 max-h-[250px] overflow-y-auto custom-scrollbar">
                  {[1, 2, 3, 4, 5, 6, 7].map((lvl) => (
                    <label
                      key={lvl}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <div
                        className={`
                          w-5
                          h-5
                          rounded-md
                          border
                          flex
                          items-center
                          justify-center
                          ${selectedLevel ===
                            lvl.toString()
                            ? "bg-primary border-primary"
                            : "border-gray-300 bg-white"
                          }
                        `}
                      >
                        {selectedLevel ===
                          lvl.toString() && (
                            <Check className="w-3 h-3 text-secondary" />
                          )}
                      </div>

                      <span
                        className={`text-sm ${selectedLevel ===
                          lvl.toString()
                          ? "font-semibold text-secondary"
                          : "text-muted"
                          }`}
                      >
                        Level {lvl}
                      </span>

                      <input
                        type="radio"
                        className="hidden"
                        checked={
                          selectedLevel ===
                          lvl.toString()
                        }
                        onChange={() => {
                          setSelectedLevel(
                            lvl.toString()
                          );

                          updateFilters(
                            selectedTrade,
                            lvl.toString()
                          );
                        }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COURSE LIST */}

          <div className="flex-1">
            <div className="flex items-center justify-between mb-7">
              <p className="text-sm text-muted font-medium">
                Showing {filteredData.length} courses
              </p>

              <div
                className="
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-white
                border
                border-gray-200
                text-sm
                font-semibold
                text-secondary
              "
              >
                Sort by: A-Z

                <ChevronDown className="w-4 h-4 opacity-60" />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <AnimatePresence>
                {filteredData.map((trade, idx) => {
                  const imgSrc =
                    tradeImages[trade.slug] ||
                    DEFAULT_IMAGE;

                  const uniqueCards = [
                    ...new Set(
                      trade.levels.map((l) => l.card)
                    ),
                  ].filter(Boolean);

                  const displayLevels = trade.levels
                    .map((l) => l.level)
                    .join(", ");

                  const hasPriced = trade.levels.some(
                    (l) =>
                      l.bookingType === "booking"
                  );

                  const minPrice = hasPriced
                    ? Math.min(
                      ...trade.levels
                        .filter(
                          (l) =>
                            l.bookingType ===
                            "booking"
                        )
                        .map((l) => l.price)
                    )
                    : null;

                  return (
                    <motion.div
                      key={trade.slug}
                      layout
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                      }}
                      transition={{
                        delay: idx * 0.03,
                        duration: 0.3,
                      }}
                      className="
                      group
                      relative
                      overflow-hidden
                      rounded-[26px]
                      border
                      border-white/50
                      bg-white/80
                      backdrop-blur-2xl
                      shadow-[0_10px_35px_rgba(0,0,0,0.05)]
                      hover:shadow-[0_16px_40px_rgba(0,0,0,0.09)]
                      transition-all
                      duration-500
                    "
                    >
                      <div className="flex flex-col lg:flex-row">
                        {/* IMAGE */}

                        <Link
                          href={`/courses/${trade.slug}`}
                          className="
                          relative
                          w-full
                          lg:w-[260px]
                          h-[190px]
                          shrink-0
                          overflow-hidden
                          rounded-[22px]
                          m-4
                        "
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />

                          <img
                            src={imgSrc}
                            alt={trade.trade}
                            className="
                              w-full
                              h-full
                              object-cover
                              transition-transform
                              duration-700
                              group-hover:scale-110
                            "
                          />

                          <div className="absolute bottom-4 left-4 z-20">
                            <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 text-white text-[11px] font-semibold">
                              Level {displayLevels}
                            </div>
                          </div>
                        </Link>

                        {/* CONTENT */}

                        <div className="flex-1 p-5 flex flex-col justify-between">
                          <div>
                            {/* BADGES */}

                            <div className="flex flex-wrap gap-2 mb-4">
                              {uniqueCards.map(
                                (card, i) => (
                                  <span
                                    key={i}
                                    className={`
                                      px-3
                                      py-1.5
                                      text-[11px]
                                      font-bold
                                      rounded-full
                                      border
                                      ${getBadgeStyles(
                                      card
                                    )}
                                    `}
                                  >
                                    {card}
                                  </span>
                                )
                              )}
                            </div>

                            {/* TITLE */}

                            <Link
                              href={`/courses/${trade.slug}`}
                            >
                              <h3
                                className="
                                text-2xl
                                lg:text-[28px]
                                font-extrabold
                                tracking-tight
                                text-secondary
                                mb-2
                                group-hover:text-primary
                                transition-colors
                              "
                              >
                                {trade.trade}
                              </h3>
                            </Link>

                            {/* META */}

                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted mb-3">
                              <span>
                                Level {displayLevels}
                              </span>

                              <span className="w-1 h-1 rounded-full bg-gray-300" />

                              <span>
                                {
                                  trade.levels.length
                                }{" "}
                                Courses Available
                              </span>
                            </div>

                            {/* DESC */}

                            <p className="text-sm text-muted leading-relaxed max-w-2xl">
                              {trade.description}
                            </p>
                          </div>

                          {/* FOOTER */}

                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5">
                            {/* PRICE */}

                            <div>
                              {minPrice !== null ? (
                                <>
                                  <div className="text-xs text-muted mb-1">
                                    Starting From
                                  </div>

                                  <div className="text-3xl font-extrabold text-secondary tracking-tight">
                                    £{minPrice}
                                  </div>
                                </>
                              ) : (
                                <div className="text-sm font-semibold text-primary">
                                  Contact For Pricing
                                </div>
                              )}
                            </div>

                            {/* BUTTONS */}

                            <div className="flex gap-3 flex-wrap">
                              <Link
                                href={`/courses/${trade.slug}`}
                                className="
                                px-5
                                py-2.5
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                hover:border-primary
                                hover:bg-primary/5
                                text-sm
                                font-semibold
                                transition-all
                              "
                              >
                                View Details
                              </Link>

                              <button
                                onClick={() =>
                                  setAppointmentCourse({
                                    trade: trade.trade,
                                    course: trade.levels[0].course,
                                  })
                                }
                                className="
                                flex
                                items-center
                                gap-2
                                bg-secondary
                                hover:bg-primary
                                text-white
                                hover:text-secondary
                                px-6
                                py-2.5
                                rounded-xl
                                text-sm
                                font-bold
                                transition-all
                                duration-300
                              "
                              >
                                <CalendarCheck className="w-4 h-4" />

                                Book an Appointment
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AppointmentModal
        open={Boolean(appointmentCourse)}
        course={appointmentCourse}
        onClose={() => setAppointmentCourse(null)}
      />

      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CoursesListing />
    </Suspense>
  );
}

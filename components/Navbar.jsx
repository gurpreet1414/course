"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Menu,
  X,
  Search,
  ChevronDown,
  User,
  Hammer,
  Cuboid,
  PaintRoller,
  Shovel,
  Home,
  Grid3X3,
  Zap,
  Award,
  BookOpen,
  ShieldCheck,
  LayoutGrid,
  FileText,
  HelpCircle,
  Info,
  Calendar,
  GraduationCap,
  ArrowUpRight,
  SlidersHorizontal,
  BadgePoundSterling
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import coursesData from "../data/courses.json";

const NAV_ITEMS = [
  { title: "Courses", href: "/courses", dropdown: true },
  { title: "NVQ", href: "/", dropdown: true },
  // { title: "CSCS Cards", href: "/" },
  // { title: "CPCS", href: "/" },
  { title: "Resources", href: "/", dropdown: true },
  { title: "Contact Us", href: "/contact" },
];

const COURSE_CATEGORIES = [
  { title: "Carpentry", href: "/courses?trade=carpentry", desc: "Skilled & Advanced NVQs", icon: Hammer },
  { title: "Bricklaying", href: "/courses?trade=bricklaying", desc: "Solid Masonry qualifications", icon: Cuboid },
  { title: "Painting", href: "/courses?trade=painting-decorating", desc: "Finishing & Coating levels", icon: PaintRoller },
  { title: "Plastering", href: "/courses?trade=plastering", desc: "Wall & ceiling finishing", icon: Shovel },
  { title: "Roofing", href: "/courses?trade=roofing", desc: "Slating, tiling & safety at height", icon: Home },
  { title: "Flooring", href: "/courses?trade=flooring", desc: "Subfloor & floorcovering standards", icon: Grid3X3 },
  { title: "Electrical", href: "/courses?trade=electrical", desc: "Wiring, installation & inspection", icon: Zap },
  { title: "More Trades", href: "/courses", desc: "Explore all 18+ trades", icon: LayoutGrid },
];

const NVQ_LEVELS = [
  { title: "Level 1", href: "/courses", desc: "Green Card - Site Labourer", icon: ShieldCheck },
  { title: "Level 2", href: "/courses", desc: "Blue Card - Skilled Worker", icon: Award },
  { title: "Level 3", href: "/courses", desc: "Gold Card - Advanced Craft", icon: GraduationCap },
  { title: "Level 4", href: "/courses", desc: "Gold Card - Site Supervisor", icon: Info },
  { title: "Level 6", href: "/courses", desc: "Black Card - Site Manager", icon: BookOpen },
  { title: "Level 7", href: "/courses", desc: "Black Card - Senior Manager", icon: Calendar },
];

const RESOURCES = [
  { title: "CSCS Cards Guide", href: "/", desc: "Complete guide to card tiers", icon: FileText },
  { title: "CITB HSE Test Practice", href: "/", desc: "Mock questions & booking support", icon: HelpCircle },
  { title: "CPCS Plant Guide", href: "/", desc: "Heavy machinery certification", icon: Info },
  { title: "FAQ Center", href: "/", desc: "Common questions answered", icon: HelpCircle },
];

const SEARCH_RESULT_LIMIT = 8;

const searchOverlayVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.22, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

const searchPanelVariants = {
  hidden: {
    opacity: 0,
    y: -28,
    scale: 0.94,
    filter: "blur(14px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 26,
      mass: 0.85,
      delay: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    scale: 0.97,
    filter: "blur(8px)",
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

const searchResultsVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.08,
    },
  },
};

const searchResultVariants = {
  hidden: {
    opacity: 0,
    y: 14,
    scale: 0.985,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
  },
};

function buildCourseResults() {
  return coursesData.flatMap((trade) =>
    trade.levels.map((level) => ({
      id: level.id,
      trade: trade.trade,
      tradeSlug: trade.slug,
      description: trade.description,
      level: level.level,
      course: level.course,
      card: level.card,
      tier: level.tier,
      price: level.price,
      bookingType: level.bookingType,
      href: `/courses?trade=${trade.slug}&level=${level.level}`,
      searchText: [
        trade.trade,
        trade.slug,
        trade.description,
        level.course,
        level.card,
        level.tier,
        `level ${level.level}`,
      ]
        .join(" ")
        .toLowerCase(),
    }))
  );
}

export default function Navbar({ dark = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchTrade, setSelectedSearchTrade] = useState("all");
  const [selectedSearchLevel, setSelectedSearchLevel] = useState("all");
  const searchInputRef = useRef(null);

  const courseResults = useMemo(() => buildCourseResults(), []);
  const searchTrades = useMemo(
    () => coursesData.map((trade) => ({ label: trade.trade, value: trade.slug })),
    []
  );
  const searchLevels = useMemo(
    () => [
      ...new Set(coursesData.flatMap((trade) => trade.levels.map((level) => level.level))),
    ].sort((a, b) => a - b),
    []
  );

  const filteredSearchResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return courseResults
      .filter((result) => {
        const matchesQuery =
          !normalizedQuery || result.searchText.includes(normalizedQuery);
        const matchesTrade =
          selectedSearchTrade === "all" || result.tradeSlug === selectedSearchTrade;
        const matchesLevel =
          selectedSearchLevel === "all" ||
          result.level.toString() === selectedSearchLevel.toString();

        return matchesQuery && matchesTrade && matchesLevel;
      })
      .slice(0, SEARCH_RESULT_LIMIT);
  }, [courseResults, searchQuery, selectedSearchLevel, selectedSearchTrade]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSelectedSearchTrade("all");
    setSelectedSearchLevel("all");
  };

  const openSearch = () => {
    setActiveDropdown(null);
    setHoveredIndex(null);
    setIsOpen(false);
    setIsSearchOpen(true);
  };

  const activeFilterCount =
    (selectedSearchTrade !== "all" ? 1 : 0) +
    (selectedSearchLevel !== "all" ? 1 : 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;

    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 120);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isSearchOpen]);

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6"
      onMouseLeave={() => {
        setActiveDropdown(null);
        setHoveredIndex(null);
      }}
    >
      <nav
        className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-500 ease-out backdrop-blur-xl relative
          ${isScrolled
            ? "py-3 px-6 bg-black/60 border-lime-400/20 shadow-[0_15px_30px_rgba(163,230,53,0.08),0_0_1px_rgba(163,230,53,0.2)]"
            : "py-4 px-8 bg-black/30 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          }`}
      >
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="flex items-center z-10">
            <div className="relative w-[120px] sm:w-[150px] md:w-[180px] h-[40px] sm:h-[48px] md:h-[54px]">
              <Image
                src="/backlogo.png"
                alt="Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP NAV ITEMS */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item, i) => (
              <div
                key={i}
                className="relative py-2 px-3.5 cursor-pointer"
                onMouseEnter={() => {
                  setHoveredIndex(i);
                  if (item.dropdown) {
                    setActiveDropdown(item.title);
                  } else {
                    setActiveDropdown(null);
                  }
                }}
              >
                {/* Magnetic Hover Indicator */}
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      layoutId="navbarHoverBg"
                      className="absolute inset-0 bg-lime-400/10 border border-lime-400/20 rounded-xl -z-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </AnimatePresence>

                <Link
                  href={item.href}
                  className="flex items-center gap-1 group whitespace-nowrap"
                >
                  <span className="text-sm xl:text-base font-semibold text-white group-hover:text-lime-400 transition-colors">
                    {item.title}
                  </span>
                  {item.dropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-white group-hover:text-lime-400 transition-colors group-hover:rotate-180 duration-300" />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            <motion.button
              type="button"
              onClick={openSearch}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] text-white transition-all duration-300 hover:border-lime-400/45 hover:bg-lime-400/10 hover:text-lime-400 hover:shadow-[0_0_24px_rgba(163,230,53,0.18)]"
              aria-label="Open course search"
            >
              <span className="absolute inset-0 rounded-xl bg-lime-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Search className="relative z-10 h-4 w-4" />
            </motion.button>

            {/* Login Button with Premium Glow */}
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm xl:text-base font-bold text-white hover:text-lime-400 transition-all border border-white/10 hover:border-lime-400/40 rounded-xl px-4 py-2 bg-white/[0.03] hover:bg-lime-400/5 hover:shadow-[0_0_15px_rgba(163,230,53,0.15)] duration-300"
            >
              <User className="w-4 h-4 text-lime-400" />
              Login
            </Link>

            {/* Support Call Widget */}
            <div className="flex items-center gap-3 border-l border-white/15 pl-5">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-500"></span>
              </div>
              <Phone className="w-4 h-4 text-lime-400" />
              <div className="leading-tight">
                <p className="text-sm font-bold text-white hover:text-lime-400 transition-colors duration-200">
                  <a href="tel:02039038106">02039038106</a>
                </p>
                <p className="text-[10px] text-white font-medium">Mon - Fri 8am - 6pm</p>
              </div>
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <div className="lg:hidden flex items-center gap-2">
            <motion.button
              type="button"
              onClick={openSearch}
              whileTap={{ scale: 0.94 }}
              className="p-2 text-white hover:text-lime-400 transition-colors rounded-xl border border-white/10 bg-white/[0.04]"
              aria-label="Open course search"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-lime-400 transition-colors rounded-xl border border-white/10 bg-white/[0.04]"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MEGA DROPDOWNS */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-3 mx-auto w-[98%] rounded-2xl border border-white/10 bg-[#070707]/95 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_1px_rgba(255,255,255,0.1)] overflow-hidden z-40 p-6"
            >
              {/* Category 1: Courses */}
              {activeDropdown === "Courses" && (
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-9">
                    <p className="text-xs font-bold uppercase tracking-wider text-lime-400/80 mb-4 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Browse Construction Trades
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {COURSE_CATEGORIES.map((cat, i) => (
                        <Link
                          key={i}
                          href={cat.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 p-3 rounded-xl border border-white/[0.03] bg-white/[0.01] hover:bg-lime-400/[0.04] hover:border-lime-400/20 transition-all duration-300"
                        >
                          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 group-hover:border-lime-400/40 group-hover:bg-lime-400/10 text-white transition-all">
                            <cat.icon className="w-4 h-4 text-white group-hover:text-lime-400 transition-colors" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-lime-400 transition-colors leading-none mb-1">
                              {cat.title}
                            </p>
                            <p className="text-xs text-white group-hover:text-white transition-colors">
                              {cat.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Featured Sidebar widget */}
                  <div className="col-span-3 border-l border-white/10 pl-6 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="h-10 w-10 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center">
                        <Award className="w-5 h-5 text-lime-400 animate-pulse" />
                      </div>
                      <h4 className="text-base font-bold text-white leading-tight">
                        Need Immediate Assistance?
                      </h4>
                      <p className="text-xs text-white leading-relaxed">
                        Talk directly to our NVQ advisors. We will help you select the exact trade code and tier for your site requirements.
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      onClick={() => setActiveDropdown(null)}
                      className="mt-4 flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold py-2.5 px-4 rounded-lg shadow-lg shadow-lime-400/20 hover:shadow-lime-400/35 transition-all duration-300"
                    >
                      Speak to an Advisor
                    </Link>
                  </div>
                </div>
              )}

              {/* Category 2: NVQ */}
              {activeDropdown === "NVQ" && (
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-lime-400/80 mb-4 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      NVQ Qualifications by Level
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {NVQ_LEVELS.map((lvl, i) => (
                        <Link
                          key={i}
                          href={lvl.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex items-start gap-3 p-3 rounded-xl border border-white/[0.03] bg-white/[0.01] hover:bg-lime-400/[0.04] hover:border-lime-400/20 transition-all duration-300"
                        >
                          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 group-hover:border-lime-400/40 group-hover:bg-lime-400/10 text-white transition-all">
                            <lvl.icon className="w-4 h-4 text-white group-hover:text-lime-400 transition-colors" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-lime-400 transition-colors leading-none mb-1">
                              {lvl.title}
                            </p>
                            <p className="text-xs text-white group-hover:text-white transition-colors">
                              {lvl.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-4 border-l border-white/10 pl-6 flex flex-col justify-between">
                    <div className="space-y-3">
                      <h4 className="text-base font-bold text-white">Not sure what level you need?</h4>
                      <p className="text-xs text-white leading-relaxed">
                        Qualifications range from Level 1 to 7. Your level corresponds to your job role on-site (Labourer, Skilled Craft, Supervisor, or Manager).
                      </p>
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0" />
                        <span className="text-[11px] text-white">100% Verified CITB On-Site Assessments.</span>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      onClick={() => setActiveDropdown(null)}
                      className="mt-4 inline-block text-center text-xs font-semibold text-lime-400 hover:text-white transition-colors py-2 border border-lime-400/20 hover:border-lime-400 rounded-lg bg-lime-400/5"
                    >
                      Book Free Assessment
                    </Link>
                  </div>
                </div>
              )}

              {/* Category 3: Resources */}
              {activeDropdown === "Resources" && (
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12">
                    <p className="text-xs font-bold uppercase tracking-wider text-lime-400/80 mb-4 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Guides & Resources
                    </p>
                    <div className="grid grid-cols-4 gap-4">
                      {RESOURCES.map((res, i) => (
                        <Link
                          key={i}
                          href={res.href}
                          onClick={() => setActiveDropdown(null)}
                          className="group flex flex-col items-start p-4 rounded-xl border border-white/[0.03] bg-white/[0.01] hover:bg-lime-400/[0.04] hover:border-lime-400/20 transition-all duration-300 h-full"
                        >
                          <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 group-hover:border-lime-400/40 group-hover:bg-lime-400/10 text-white transition-all mb-3">
                            <res.icon className="w-4 h-4 text-white group-hover:text-lime-400 transition-colors" />
                          </div>
                          <p className="text-sm font-bold text-white group-hover:text-lime-400 transition-colors leading-tight mb-1">
                            {res.title}
                          </p>
                          <p className="text-xs text-white  group-hover:text-white transition-colors leading-normal mt-1">
                            {res.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* GLOBAL COURSE SEARCH */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            variants={searchOverlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-[80] bg-black/75 px-4 py-6 backdrop-blur-xl sm:px-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeSearch();
              }
            }}
          >
            <motion.div
              variants={searchPanelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="relative mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#070707]/95 shadow-[0_35px_90px_rgba(0,0,0,0.82),0_0_54px_rgba(163,230,53,0.1)] sm:mt-16"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-px bg-lime-400/35" />
                <div className="absolute inset-x-0 top-0 h-28 bg-lime-400/[0.045]" />
              </div>

              <div className="relative border-b border-white/10 p-4 sm:p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black uppercase text-lime-300">
                      Global Course Finder
                    </p>
                    <p className="mt-1 text-base font-medium text-white">
                      Search NVQs, CSCS cards, levels and trades instantly.
                    </p>
                  </div>
                  <div className="hidden rounded-full border border-lime-400/20 bg-lime-400/10 px-3 py-1.5 text-sm font-bold text-lime-300 sm:block">
                    {courseResults.length} pathways indexed
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-lime-400/35 bg-lime-400/10 text-lime-400 shadow-[0_0_26px_rgba(163,230,53,0.16)]">
                    <motion.span
                      aria-hidden="true"
                      animate={{ opacity: [0.25, 0.6, 0.25], scale: [0.92, 1.08, 0.92] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-1 rounded-lg border border-lime-400/25"
                    />
                    <Search className="relative z-10 h-5 w-5" />
                  </div>

                  <div className="relative min-w-0 flex-1">
                    <input
                      ref={searchInputRef}
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search NVQ, trade, CSCS card, level..."
                      className="h-14 w-full rounded-xl border border-white/10 bg-white/[0.055] px-4 pr-12 text-lg font-bold text-white outline-none transition-all placeholder:text-white focus:border-lime-400/55 focus:bg-white/[0.075] focus:shadow-[0_0_0_4px_rgba(163,230,53,0.12)]"
                    />
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-black/35 px-2 py-1 text-xs font-bold uppercase text-white">
                      Esc
                    </span>
                  </div>

                  <motion.button
                    type="button"
                    onClick={closeSearch}
                    whileHover={{ rotate: 90, scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white transition hover:border-lime-300/45 hover:bg-lime-300/10 hover:text-lime-200 hover:shadow-[0_0_26px_rgba(163,230,53,0.18)]"
                    aria-label="Close search"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <div className="mr-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-bold text-white">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-lime-300" />
                    Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => setSelectedSearchLevel("all")}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-full border px-3 py-2 text-sm font-bold transition ${selectedSearchLevel === "all"
                      ? "border-lime-400 bg-lime-400 text-black shadow-[0_0_20px_rgba(163,230,53,0.22)]"
                      : "border-white/10 bg-white/[0.03] text-white hover:border-lime-400/35 hover:bg-lime-400/10 hover:text-lime-200"
                      }`}
                  >
                    All Levels
                  </motion.button>
                  {searchLevels.map((level) => (
                    <motion.button
                      key={level}
                      type="button"
                      onClick={() => setSelectedSearchLevel(level)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`rounded-full border px-3 py-2 text-sm font-bold transition ${selectedSearchLevel === level
                        ? "border-lime-400 bg-lime-400 text-black shadow-[0_0_20px_rgba(163,230,53,0.22)]"
                        : "border-white/10 bg-white/[0.03] text-white hover:border-lime-400/35 hover:bg-lime-400/10 hover:text-lime-200"
                        }`}
                    >
                      Level {level}
                    </motion.button>
                  ))}
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                  <motion.button
                    type="button"
                    onClick={() => setSelectedSearchTrade("all")}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`shrink-0 rounded-full border px-3 py-2 text-sm font-bold transition ${selectedSearchTrade === "all"
                      ? "border-lime-400 bg-lime-400 text-black shadow-[0_0_20px_rgba(163,230,53,0.22)]"
                      : "border-white/10 bg-white/[0.03] text-white hover:border-lime-400/35 hover:bg-lime-400/10 hover:text-lime-200"
                      }`}
                  >
                    All Trades
                  </motion.button>
                  {searchTrades.map((trade) => (
                    <motion.button
                      key={trade.value}
                      type="button"
                      onClick={() => setSelectedSearchTrade(trade.value)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`shrink-0 rounded-full border px-3 py-2 text-sm font-bold transition ${selectedSearchTrade === trade.value
                        ? "border-lime-400 bg-lime-400 text-black shadow-[0_0_20px_rgba(163,230,53,0.22)]"
                        : "border-white/10 bg-white/[0.03] text-white hover:border-lime-400/35 hover:bg-lime-400/10 hover:text-lime-200"
                        }`}
                    >
                      {trade.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="relative max-h-[58vh] overflow-y-auto p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-black uppercase text-lime-200">
                    {filteredSearchResults.length} Match{filteredSearchResults.length === 1 ? "" : "es"}
                  </p>
                  <Link
                    href="/courses"
                    onClick={closeSearch}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-sm font-bold text-white transition hover:border-lime-300/35 hover:bg-lime-300/10 hover:text-lime-200"
                  >
                    Browse all courses
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {filteredSearchResults.length > 0 ? (
                  <motion.div
                    key={`${searchQuery}-${selectedSearchLevel}-${selectedSearchTrade}`}
                    variants={searchResultsVariants}
                    initial="hidden"
                    animate="show"
                    className="grid gap-3 md:grid-cols-2"
                  >
                    {filteredSearchResults.map((result) => (
                      <motion.div key={result.id} variants={searchResultVariants} layout>
                        <Link
                          href={result.href}
                          onClick={closeSearch}
                          className="group relative block overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.035] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/35 hover:bg-lime-400/[0.045] hover:shadow-[0_22px_56px_rgba(0,0,0,0.42),0_0_28px_rgba(163,230,53,0.1)]"
                        >
                          <div className="absolute inset-x-0 top-0 h-px bg-lime-400/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <div className="absolute bottom-0 left-0 h-px w-0 bg-lime-400/60 transition-all duration-500 group-hover:w-full" />

                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-xs font-black uppercase text-lime-200">
                                {result.trade}
                              </p>
                              <h3 className="mt-2 text-lg font-black leading-tight text-white transition-colors group-hover:text-lime-50">
                                {result.course}
                              </h3>
                            </div>
                            <div className="shrink-0 rounded-full border border-lime-400/35 bg-lime-400/10 px-3 py-1 text-sm font-black text-lime-200 shadow-[0_0_16px_rgba(163,230,53,0.12)]">
                              L{result.level}
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-xs font-semibold text-white">
                              {result.card}
                            </span>
                            <span className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-xs font-semibold text-white">
                              {result.tier}
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-xs font-semibold text-white">
                              <BadgePoundSterling className="h-3 w-3 text-lime-200" />
                              {result.price > 0 ? `From \u00a3${result.price}` : "Advisor quote"}
                            </span>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                            <p className="line-clamp-1 text-sm text-white">
                              {result.description}
                            </p>
                            <ArrowUpRight className="ml-3 h-4 w-4 shrink-0 text-white transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime-200" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 14, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-10 text-center"
                  >
                    <p className="text-xl font-black text-white">No courses found</p>
                    <p className="mx-auto mt-2 max-w-md text-base text-white">
                      Try another trade, level, card type, or qualification name.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border border-white/10 bg-[#070707]/95 backdrop-blur-2xl rounded-2xl mt-2 mx-auto max-w-7xl"
          >
            <div className="px-6 py-6 space-y-4">
              {NAV_ITEMS.map((item, i) => (
                <div key={i} className="border-b border-white/5 pb-2">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-base font-bold text-white hover:text-lime-400 transition-colors py-2"
                  >
                    {item.title}
                  </Link>
                </div>
              ))}

              <div className="pt-4 flex flex-col gap-4">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 text-base font-bold text-white border border-white/10 hover:border-lime-400/40 rounded-xl py-3 bg-white/[0.03]"
                >
                  <User className="w-5 h-5 text-lime-400" />
                  Login
                </Link>

                <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-lime-400" />
                    <div>
                      <p className="text-base font-bold text-white">02039038106</p>
                      <p className="text-xs text-white">Mon - Fri 8am - 6pm</p>
                    </div>
                  </div>
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-500"></span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

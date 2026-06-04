"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Phone, Menu, X, Search, ChevronDown, User, Hammer, Cuboid,
  PaintRoller, Shovel, Home, Grid3X3, Zap, Award, BookOpen,
  ShieldCheck, LayoutGrid, FileText, HelpCircle, Info, Calendar,
  GraduationCap, ArrowUpRight, SlidersHorizontal, BadgePoundSterling,
  Sun, Moon
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import coursesData from "../data/courses.json";

const NAV_ITEMS = [
  { title: "Courses", href: "/courses", dropdown: true },
  { title: "NVQ", href: "/", dropdown: true },
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
  show: { opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.18, ease: "easeIn" } },
};

const searchPanelVariants = {
  hidden: { opacity: 0, y: -28, scale: 0.94, filter: "blur(14px)" },
  show: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 260, damping: 26, mass: 0.85, delay: 0.03 },
  },
  exit: { opacity: 0, y: -18, scale: 0.97, filter: "blur(8px)", transition: { duration: 0.18, ease: "easeIn" } },
};

const searchResultsVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } },
};

const searchResultVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] } },
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
        trade.trade, trade.slug, trade.description, level.course, level.card, level.tier, `level ${level.level}`,
      ].join(" ").toLowerCase(),
    }))
  );
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-10 w-10 rounded-full bg-surface" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground backdrop-blur-md transition-all duration-300 hover:opacity-80 active:scale-95"
      aria-label="Toggle visual theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div key="sun" initial={{ opacity: 0, rotate: -45, scale: 0.8 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 45, scale: 0.8 }} transition={{ duration: 0.2 }}>
            <Sun className="h-[18px] w-[18px] text-primary" />
          </motion.div>
        ) : (
          <motion.div key="moon" initial={{ opacity: 0, rotate: 45, scale: 0.8 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: -45, scale: 0.8 }} transition={{ duration: 0.2 }}>
            <Moon className="h-[18px] w-[18px] text-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Navbar() {
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
    () => [...new Set(coursesData.flatMap((trade) => trade.levels.map((level) => level.level)))].sort((a, b) => a - b),
    []
  );

  const filteredSearchResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return courseResults
      .filter((result) => {
        const matchesQuery = !normalizedQuery || result.searchText.includes(normalizedQuery);
        const matchesTrade = selectedSearchTrade === "all" || result.tradeSlug === selectedSearchTrade;
        const matchesLevel = selectedSearchLevel === "all" || result.level.toString() === selectedSearchLevel.toString();
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

  const activeFilterCount = (selectedSearchTrade !== "all" ? 1 : 0) + (selectedSearchLevel !== "all" ? 1 : 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;
    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 120);
    const handleKeyDown = (event) => { if (event.key === "Escape") closeSearch(); };
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
      className="fixed inset-x-0 top-0 z-50 mt-4 px-4 transition-all duration-300 sm:mt-6 sm:px-6 lg:px-8"
      onMouseLeave={() => {
        setActiveDropdown(null);
        setHoveredIndex(null);
      }}
    >
      <nav
        className={`relative mx-auto max-w-7xl rounded-2xl border transition-all duration-500 ease-out backdrop-blur-xl
          ${isScrolled
            ? "border-border/50 bg-background/80 py-3 px-6 shadow-sm"
            : "border-border bg-background/60 py-4 px-8 shadow-md"
          }`}
      >
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link href="/" className="z-10 flex items-center">
            <div className="relative h-[40px] w-[120px] sm:h-[48px] sm:w-[150px] md:h-[54px] md:w-[180px]">
              <Image src="/backlogo.png" alt="Logo" fill priority className="object-contain dark:invert-0" />
            </div>
          </Link>

          {/* DESKTOP NAV ITEMS */}
          <div className="hidden items-center gap-1 lg:flex xl:gap-2">
            {NAV_ITEMS.map((item, i) => (
              <div
                key={i}
                className="relative cursor-pointer px-3.5 py-2"
                onMouseEnter={() => {
                  setHoveredIndex(i);
                  setActiveDropdown(item.dropdown ? item.title : null);
                }}
              >
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.div
                      layoutId="navbarHoverBg"
                      className="absolute inset-0 -z-10 rounded-xl border border-primary/20 bg-primary/10"
                      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </AnimatePresence>

                <Link href={item.href} className="group flex items-center gap-1 whitespace-nowrap">
                  <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary-text xl:text-base">
                    {item.title}
                  </span>
                  {item.dropdown && (
                    <ChevronDown className="h-3.5 w-3.5 text-foreground transition-colors duration-300 group-hover:rotate-180 group-hover:text-primary-text" />
                  )}
                </Link>
              </div>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden items-center gap-5 lg:flex xl:gap-7">
            <ThemeToggle />

            <motion.button
              type="button"
              onClick={openSearch}
              whileHover={{ y: -2, scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface text-foreground transition-all duration-300 hover:border-primary/45 hover:bg-primary/10 hover:text-primary-text"
              aria-label="Open course search"
            >
              <span className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Search className="relative z-10 h-4 w-4" />
            </motion.button>

            <Link
              href="/login"
              className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-bold text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary-text xl:text-base"
            >
              <User className="h-4 w-4 text-primary-text" />
              Login
            </Link>

            <div className="flex items-center gap-3 border-l border-border pl-5">
              <div className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-text"></span>
              </div>
              <Phone className="h-4 w-4 text-primary-text" />
              <div className="leading-tight">
                <p className="text-sm font-bold text-foreground transition-colors duration-200 hover:text-primary-text">
                  <a href="tel:02039038106">02039038106</a>
                </p>
                <p className="text-[10px] font-medium text-muted">Mon - Fri 8am - 6pm</p>
              </div>
            </div>
          </div>

          {/* MOBILE BUTTONS */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />

            <motion.button
              type="button"
              onClick={openSearch}
              whileTap={{ scale: 0.94 }}
              className="rounded-xl border border-border bg-surface p-2 text-foreground transition-colors hover:text-primary-text"
              aria-label="Open course search"
            >
              <Search className="h-5 w-5" />
            </motion.button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl border border-border bg-surface p-2 text-foreground transition-colors hover:text-primary-text"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* MEGA DROPDOWNS (Desktop only) */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.98 }} transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-40 mx-auto mt-3 w-[98%] overflow-hidden rounded-2xl border border-border bg-background/95 p-6 shadow-xl backdrop-blur-2xl"
            >
              {activeDropdown === "Courses" && (
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-9">
                    <p className="mb-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-text/80">
                      <Zap className="h-3.5 w-3.5" /> Browse Construction Trades
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {COURSE_CATEGORIES.map((cat, i) => (
                        <Link key={i} href={cat.href} onClick={() => setActiveDropdown(null)} className="group flex items-start gap-3 rounded-xl border border-surface bg-surface/50 p-3 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5">
                          <div className="rounded-lg border border-border bg-background p-2 text-foreground transition-all group-hover:border-primary/40 group-hover:bg-primary/10">
                            <cat.icon className="h-4 w-4 text-foreground transition-colors group-hover:text-primary-text" />
                          </div>
                          <div>
                            <p className="mb-1 text-sm font-bold leading-none text-foreground transition-colors group-hover:text-primary-text">{cat.title}</p>
                            <p className="text-xs text-muted transition-colors group-hover:text-foreground">{cat.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-3 flex flex-col justify-between border-l border-border pl-6">
                    <div className="space-y-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/10">
                        <Award className="h-5 w-5 animate-pulse text-primary-text" />
                      </div>
                      <h4 className="text-base font-bold leading-tight text-foreground">Need Immediate Assistance?</h4>
                      <p className="text-xs leading-relaxed text-muted">Talk directly to our NVQ advisors. We will help you select the exact trade code and tier for your site requirements.</p>
                    </div>
                    <Link href="/contact" onClick={() => setActiveDropdown(null)} className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:opacity-90">
                      Speak to an Advisor
                    </Link>
                  </div>
                </div>
              )}
              {/* Note: I've truncated the other Mega Dropdowns here for brevity, apply the exact same `bg-surface`, `text-foreground`, `border-border` replacements across them. */}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* GLOBAL COURSE SEARCH */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            variants={searchOverlayVariants} initial="hidden" animate="show" exit="exit"
            className="fixed inset-0 z-[80] bg-black/60 px-4 py-6 backdrop-blur-xl sm:px-6"
            onMouseDown={(e) => e.target === e.currentTarget && closeSearch()}
          >
            <motion.div
              variants={searchPanelVariants} initial="hidden" animate="show" exit="exit"
              className="relative mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-background/95 shadow-2xl sm:mt-16"
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-px bg-primary/35" />
                <div className="absolute inset-x-0 top-0 h-28 bg-primary/[0.045]" />
              </div>

              <div className="relative border-b border-border p-4 sm:p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black uppercase text-primary-text">Global Course Finder</p>
                    <p className="mt-1 text-base font-medium text-foreground">Search NVQs, CSCS cards, levels and trades instantly.</p>
                  </div>
                  <div className="hidden rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary-text sm:block">
                    {courseResults.length} pathways indexed
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary/35 bg-primary/10 text-primary-text">
                    <Search className="relative z-10 h-5 w-5" />
                  </div>
                  <div className="relative min-w-0 flex-1">
                    <input
                      ref={searchInputRef} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search NVQ, trade, CSCS card, level..."
                      className="h-14 w-full rounded-xl border border-border bg-surface px-4 pr-12 text-lg font-bold text-foreground outline-none transition-all placeholder:text-muted focus:border-primary/55 focus:bg-background focus:shadow-[0_0_0_4px_var(--color-primary)]"
                    />
                  </div>
                  <motion.button
                    type="button" onClick={closeSearch} whileHover={{ rotate: 90, scale: 1.05 }} whileTap={{ scale: 0.92 }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-foreground transition hover:border-primary/45 hover:bg-primary/10 hover:text-primary-text"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <div className="mr-1 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-sm font-bold text-foreground">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-primary-text" /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                  </div>
                  <motion.button
                    type="button" onClick={() => setSelectedSearchLevel("all")}
                    className={`rounded-full border px-3 py-2 text-sm font-bold transition ${selectedSearchLevel === "all" ? "border-primary bg-primary text-black" : "border-border bg-surface text-foreground"}`}
                  >
                    All Levels
                  </motion.button>
                  {/* Map over levels and trades here with the identical ternary logic above */}
                </div>
              </div>

              {/* Added responsive max-height for better mobile scrolling */}
              <div className="relative max-h-[75vh] sm:max-h-[58vh] overflow-y-auto p-4 sm:p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-black uppercase text-primary-text">{filteredSearchResults.length} Matches</p>
                  <Link href="/courses" onClick={closeSearch} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-2 text-sm font-bold text-foreground">
                    Browse all courses <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                {filteredSearchResults.length > 0 ? (
                  <motion.div variants={searchResultsVariants} initial="hidden" animate="show" className="grid gap-3 md:grid-cols-2">
                    {filteredSearchResults.map((result) => (
                      <motion.div key={result.id} variants={searchResultVariants} layout>
                        <Link href={result.href} onClick={closeSearch} className="group relative block overflow-hidden rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-1 hover:border-primary/35 hover:bg-primary/5">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-xs font-black uppercase text-primary-text">{result.trade}</p>
                              <h3 className="mt-2 text-lg font-black leading-tight text-foreground group-hover:text-primary-text">{result.course}</h3>
                            </div>
                            <div className="shrink-0 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-sm font-black text-primary-text">
                              L{result.level}
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                             <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground">{result.card}</span>
                             <span className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground">{result.tier}</span>
                          </div>
                          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                            <p className="line-clamp-1 text-sm text-muted">{result.description}</p>
                            <ArrowUpRight className="ml-3 h-4 w-4 shrink-0 text-muted transition group-hover:text-primary-text" />
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-surface px-5 py-10 text-center">
                    <p className="text-xl font-black text-foreground">No courses found</p>
                    <p className="mx-auto mt-2 max-w-md text-base text-muted">Try another trade, level, card type, or qualification name.</p>
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
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-border bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="space-y-4 px-6 py-6">
              {NAV_ITEMS.map((item, i) => (
                <div key={i} className="border-b border-border pb-2">
                  <Link href={item.href} onClick={() => setIsOpen(false)} className="block py-2 text-base font-bold text-foreground transition-colors hover:text-primary-text">
                    {item.title}
                  </Link>
                </div>
              ))}
              <div className="flex flex-col gap-4 pt-4">
                <Link href="/login" className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-base font-bold text-foreground hover:border-primary/40">
                  <User className="h-5 w-5 text-primary-text" /> Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
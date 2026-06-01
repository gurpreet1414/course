"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Phone,
    Menu,
    X,
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
    GraduationCap
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
    { title: "Courses", href: "/courses", dropdown: true },
    { title: "NVQ", href: "/", dropdown: true },
    { title: "CSCS Cards", href: "/" },
    { title: "CPCS", href: "/" },
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

export default function Navbar({ dark = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [activeDropdown, setActiveDropdown] = useState(null);

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
                                src="/logo.png"
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
                                    <span className="text-sm xl:text-base font-semibold text-white/90 group-hover:text-lime-400 transition-colors">
                                        {item.title}
                                    </span>
                                    {item.dropdown && (
                                        <ChevronDown className="w-3.5 h-3.5 text-white/40 group-hover:text-lime-400 transition-colors group-hover:rotate-180 duration-300" />
                                    )}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT ACTIONS */}
                    <div className="hidden lg:flex items-center gap-5 xl:gap-7">
                        {/* Login Button with Premium Glow */}
                        <Link
                            href="/login"
                            className="flex items-center gap-2 text-sm xl:text-base font-bold text-white/90 hover:text-lime-400 transition-all border border-white/10 hover:border-lime-400/40 rounded-xl px-4 py-2 bg-white/[0.03] hover:bg-lime-400/5 hover:shadow-[0_0_15px_rgba(163,230,53,0.15)] duration-300"
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
                                <p className="text-sm font-bold text-white/90 hover:text-lime-400 transition-colors duration-200">
                                    <a href="tel:02039038106">02039038106</a>
                                </p>
                                <p className="text-[10px] text-white/40 font-medium">Mon - Fri 8am - 6pm</p>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE BUTTON */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 text-white/90 hover:text-lime-400 transition-colors rounded-xl border border-white/10 bg-white/[0.04]"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
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
                                                        <p className="text-sm font-bold text-white/95 group-hover:text-lime-400 transition-colors leading-none mb-1">
                                                            {cat.title}
                                                        </p>
                                                        <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
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
                                            <p className="text-xs text-white/60 leading-relaxed">
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
                                                        <p className="text-sm font-bold text-white/95 group-hover:text-lime-400 transition-colors leading-none mb-1">
                                                            {lvl.title}
                                                        </p>
                                                        <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
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
                                            <p className="text-xs text-white/60 leading-relaxed">
                                                Qualifications range from Level 1 to 7. Your level corresponds to your job role on-site (Labourer, Skilled Craft, Supervisor, or Manager).
                                            </p>
                                            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-3">
                                                <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0" />
                                                <span className="text-[11px] text-white/70">100% Verified CITB On-Site Assessments.</span>
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
                                                    <p className="text-sm font-bold text-white/95 group-hover:text-lime-400 transition-colors leading-tight mb-1">
                                                        {res.title}
                                                    </p>
                                                    <p className="text-xs text-white/50 group-hover:text-white/70 transition-colors leading-normal mt-1">
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
                                        className="block text-base font-bold text-white/80 hover:text-lime-400 transition-colors py-2"
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
                                            <p className="text-base font-bold text-white/90">02039038106</p>
                                            <p className="text-xs text-white/40">Mon - Fri 8am - 6pm</p>
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
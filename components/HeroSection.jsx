"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Select from "react-select";
import {
    ShieldCheck, Headphones, Award, BookOpen, Search,
    Hammer, Cuboid, PaintRoller, Shovel, Home,
} from "lucide-react";
import coursesData from "../data/courses.json";

/* =========================
   Dynamic React Select Styles (Now DRY & Theme Agnostic)
========================= */
const customStyles = {
    control: (base, state) => {
        const isActive = state.isFocused || state.hasValue;
        return {
            ...base,
            borderRadius: "16px",
            padding: "7px 10px",
            borderColor: state.isDisabled ? "var(--border)" : isActive ? "var(--primary)" : "var(--border)",
            boxShadow: state.isFocused 
                ? "0 0 0 4px var(--primary-shadow), 0 0 20px var(--primary-shadow)" 
                : state.hasValue 
                    ? "0 0 0 1px var(--primary), 0 0 15px var(--primary-shadow)" 
                    : "none",
            background: state.isDisabled ? "var(--surface)" : state.hasValue ? "var(--primary-light)" : "var(--surface)",
            backdropFilter: "blur(16px)",
            border: state.isDisabled ? "1px solid var(--border)" : isActive ? "1px solid var(--primary)" : "1px solid var(--border)",
            minHeight: "56px",
            transition: "border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
            color: "var(--foreground)",
            cursor: state.isDisabled ? "not-allowed" : "pointer",
            opacity: state.isDisabled ? 0.75 : 1,
        };
    },
    menu: (base) => ({
        ...base,
        borderRadius: "16px",
        overflow: "hidden",
        zIndex: 9999999,
        border: "1px solid var(--glass-border)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.2), 0 0 20px var(--primary-shadow)",
        backgroundColor: "var(--background)",
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? "var(--primary)" : state.isFocused ? "var(--primary-light)" : "transparent",
        color: state.isSelected ? "var(--background)" : state.isFocused ? "var(--primary-text)" : "var(--foreground)",
        cursor: "pointer",
        padding: "12px 16px",
        fontWeight: state.isSelected ? 800 : 600,
        transition: "all 0.2s ease",
    }),
    placeholder: (base) => ({
        ...base,
        color: "var(--muted)",
        fontSize: "16px",
        fontWeight: 600,
    }),
    singleValue: (base) => ({
        ...base,
        color: "var(--primary-text)",
        fontWeight: 800,
        textShadow: "0 0 16px var(--primary-shadow)",
    }),
    input: (base) => ({
        ...base,
        color: "var(--foreground)",
    }),
    dropdownIndicator: (base, state) => ({
        ...base,
        color: state.isFocused || state.hasValue ? "var(--primary)" : "var(--muted)",
        transition: "all 0.2s ease",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menuPortal: (base) => ({ ...base, zIndex: 9999999 }),
};

/* =========================
   Animated Grid with Mouse Tracking Spotlight
========================= */
function AnimatedGrid({ mouseX, mouseY, isPointerActive, ripples }) {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
            <div
                className={`absolute inset-0 transition-all duration-300 ${isPointerActive ? "opacity-[0.07]" : "opacity-[0.035]"}`}
                style={{
                    backgroundImage: "linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                }}
            />

            <motion.div
                animate={{ opacity: isPointerActive ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(520px circle at ${mouseX}px ${mouseY}px, var(--spotlight-center), var(--spotlight-edge) 32%, transparent 72%)`,
                }}
            />

            <motion.div
                animate={{
                    opacity: isPointerActive ? 1 : 0,
                    scale: isPointerActive ? [0.92, 1.08, 0.92] : 0.86,
                }}
                transition={{
                    opacity: { duration: 0.2, ease: "easeOut" },
                    scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute h-28 w-28 rounded-full border border-border shadow-[0_0_34px_var(--spotlight-center)]"
                style={{ left: mouseX, top: mouseY, x: "-50%", y: "-50%" }}
            />

            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    initial={{ opacity: 0.45, scale: 0.2 }}
                    animate={{ opacity: 0, scale: 2.7 }}
                    transition={{ duration: 0.85, ease: "easeOut" }}
                    className="absolute h-24 w-24 rounded-full border border-border shadow-[0_0_40px_var(--spotlight-center)]"
                    style={{ left: ripple.x, top: ripple.y, x: "-50%", y: "-50%" }}
                />
            ))}

            <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.08] blur-[100px]" />
            <div className="absolute -left-32 top-1/2 h-[350px] w-[350px] rounded-full bg-cyan-400/[0.05] blur-[80px]" />
            <div className="absolute -right-32 bottom-0 h-[350px] w-[350px] rounded-full bg-primary/[0.06] blur-[80px]" />

            <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute top-[30%] h-px w-1/3 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            />
            <motion.div
                animate={{ x: ["200%", "-100%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                className="absolute top-[65%] h-px w-1/4 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            />
        </div>
    );
}

/* =========================
   Tilt Card Component
========================= */
function TiltCard({ children, className }) {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;

        setRotateX(-(mouseY / (height / 2)) * 10);
        setRotateY((mouseX / (width / 2)) * 10);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function HeroSection() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const [selectedTrade, setSelectedTrade] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
    const [hoveredNode, setHoveredNode] = useState(null);
    const [isHeroPointerActive, setIsHeroPointerActive] = useState(false);
    const [heroRipples, setHeroRipples] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => setMounted(true), []);

    const isFilterTarget = (target) => Boolean(target?.closest?.("[data-hero-filter]"));

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        if (isFilterTarget(e.target)) {
            setIsHeroPointerActive(false);
            return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        setMouseCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsHeroPointerActive(true);
    };

    const handleHeroClick = (e) => {
        if (!containerRef.current || isFilterTarget(e.target)) return;
        const rect = containerRef.current.getBoundingClientRect();
        const id = `${Date.now()}-${Math.round(e.clientX)}-${Math.round(e.clientY)}`;
        const ripple = { id, x: e.clientX - rect.left, y: e.clientY - rect.top };

        setHeroRipples((currentRipples) => [...currentRipples.slice(-4), ripple]);
        window.setTimeout(() => {
            setHeroRipples((currentRipples) => currentRipples.filter((r) => r.id !== id));
        }, 900);
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (selectedLevel) params.set("level", selectedLevel);
        if (selectedTrade) params.set("trade", selectedTrade);
        router.push(params.toString() ? `/courses?${params.toString()}` : "/courses");
    };

    const availableTrades = selectedLevel
        ? coursesData.filter((trade) => trade.levels.some((lvl) => lvl.level.toString() === selectedLevel.toString()))
        : [];

    const features = [
        { icon: ShieldCheck, text: "UK Accredited" },
        { icon: Headphones, text: "Expert Support" },
        { icon: Award, text: "High Pass Rate" },
        { icon: BookOpen, text: "Flexible Learning" },
    ];

    const levelOptions = [...new Set(coursesData.flatMap((t) => t.levels.map((l) => l.level)))]
        .sort((a, b) => a - b)
        .map((level) => ({ value: level, label: `Level ${level}` }));

    const tradeOptions = availableTrades.map((trade) => ({ value: trade.slug, label: trade.trade }));

    const heroHeadingWords = ["Learn.", "Qualify."];
    const heroHighlightWords = ["Build", "Your", "Future."];

    const headingVariants = {
        hidden: {},
        show: { transition: { delayChildren: shouldReduceMotion ? 0 : 0.25, staggerChildren: shouldReduceMotion ? 0 : 0.55 } },
    };

    const headingWordVariants = {
        hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 34, filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: shouldReduceMotion ? 0 : 1.55, ease: [0.16, 1, 0.3, 1] } },
    };

    const tradeNodes = [
        { id: "node-carpentry", slug: "carpentry", title: "Carpentry", icon: Hammer, style: { left: "4%", top: "18%" }, pathId: 0, d: "M 120 114 C 300 114, 450 380, 600 380" },
        { id: "node-brickwork", slug: "bricklaying", title: "Bricklaying", icon: Cuboid, style: { left: "1.5%", top: "48%" }, pathId: 1, d: "M 60 294 C 250 294, 450 380, 600 380" },
        { id: "node-painting", slug: "painting-decorating", title: "Painting", icon: PaintRoller, style: { left: "4%", top: "78%" }, pathId: 2, d: "M 120 474 C 300 474, 450 380, 600 380" },
        { id: "node-labourer", slug: "general-labourer", title: "Labourer", icon: ShieldCheck, style: { right: "4%", top: "18%" }, pathId: 3, d: "M 1080 114 C 900 114, 750 380, 600 380" },
        { id: "node-roofing", slug: "roofing", title: "Roofing", icon: Home, style: { right: "1.5%", top: "48%" }, pathId: 4, d: "M 1140 294 C 950 294, 750 380, 600 380" },
        { id: "node-plastering", slug: "plastering", title: "Plastering", icon: Shovel, style: { right: "4%", top: "78%" }, pathId: 5, d: "M 1080 474 C 900 474, 750 380, 600 380" },
    ];

    if (!mounted) return null;

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsHeroPointerActive(false)}
            onClick={handleHeroClick}
            className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-hero-bg px-4 sm:px-6 lg:px-8 py-28 transition-colors duration-500"
        >
            <AnimatedGrid mouseX={mouseCoords.x} mouseY={mouseCoords.y} isPointerActive={isHeroPointerActive} ripples={heroRipples} />

            <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full hidden lg:block select-none" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="none">
                {tradeNodes.map((node) => {
                    const isNodeActive = hoveredNode === node.id || selectedTrade === node.slug;
                    return (
                        <g key={node.id}>
                            {isNodeActive && (
                                <motion.path
                                    d={node.d} stroke="var(--node-active)" strokeWidth="8" strokeLinecap="round"
                                    initial={{ opacity: 0 }} animate={{ opacity: [0.06, 0.2, 0.08] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ filter: "blur(6px)" }}
                                />
                            )}
                            <path
                                d={node.d} stroke={isNodeActive ? "var(--node-active)" : "var(--node-static)"}
                                strokeWidth={isNodeActive ? "2.5" : "1.5"} strokeLinecap="round" className="transition-all duration-300"
                            />
                            <motion.circle
                                r={isNodeActive ? "4" : "2.8"} fill={selectedTrade === node.slug ? "var(--primary)" : "var(--foreground)"}
                                initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0], offsetDistance: ["0%", "100%"] }}
                                transition={{ duration: isNodeActive ? 3.5 : 6, delay: node.pathId * 0.45, repeat: Infinity, ease: "easeInOut" }}
                                style={{ offsetPath: `path("${node.d}")`, filter: selectedTrade === node.slug ? "drop-shadow(0 0 8px var(--primary))" : "drop-shadow(0 0 6px var(--border))" }}
                            />
                        </g>
                    );
                })}
            </svg>

            <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block select-none max-w-7xl mx-auto">
                {tradeNodes.map((node) => {
                    const canSelectNode = Boolean(selectedLevel) && coursesData.find((t) => t.slug === node.slug)?.levels.some((l) => l.level.toString() === selectedLevel.toString());
                    const isSelected = canSelectNode && selectedTrade === node.slug;
                    const isActive = true || isSelected; // Based on original hardcode

                    return (
                        <motion.div
                            key={node.id} style={node.style}
                            onMouseEnter={() => setHoveredNode(node.id)} onMouseLeave={() => setHoveredNode(null)}
                            onClick={() => canSelectNode && setSelectedTrade(node.slug)}
                            whileHover={{ y: -6, scale: 1.1 }} transition={{ type: "spring", stiffness: 420, damping: 24 }}
                            className={`absolute pointer-events-auto flex flex-col items-center gap-2 group ${canSelectNode ? "cursor-pointer" : "cursor-not-allowed"}`}
                        >
                            <div className={`relative flex h-[58px] w-[58px] items-center justify-center rounded-2xl border transition-all duration-300 shadow-lg backdrop-blur-md ${isSelected ? "border-primary bg-primary shadow-[0_0_34px_var(--primary-shadow)]" : "border-border bg-surface"}`}>
                                {isActive && !isSelected && (
                                    <motion.span
                                        aria-hidden="true" className="absolute inset-[-8px] rounded-[22px] border border-border"
                                        initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: [0.88, 1.26], opacity: [0.48, 0] }}
                                        transition={{ duration: 1.15, repeat: Infinity, ease: "easeOut" }}
                                    />
                                )}
                                {isSelected && <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-background shadow-soft" />}
                                <node.icon className={`relative z-10 h-6 w-6 transition-all duration-300 ${isSelected ? "text-background" : "text-foreground"}`} />
                            </div>
                            <span className={`rounded-full border px-3 py-1 text-[11px] !font-extrabold uppercase !tracking-[0.08em] transition-all duration-300 ${isSelected ? "border-primary bg-primary text-background shadow-[0_0_20px_var(--primary-shadow)]" : "border-border bg-surface text-foreground"}`}>
                                {node.title}
                            </span>
                        </motion.div>
                    );
                })}
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
                <div className="overflow-hidden">
                    <motion.h1 variants={headingVariants} initial="hidden" animate="show" className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-foreground">
                        {heroHeadingWords.map((word) => (
                            <motion.span key={word} variants={headingWordVariants} className="inline-block pr-3 sm:pr-4">{word}</motion.span>
                        ))}
                        <br />
                        {heroHighlightWords.map((word, index) => (
                            <motion.span key={word} variants={headingWordVariants} className={`inline-block ${index < heroHighlightWords.length - 1 ? "pr-3 sm:pr-4" : ""}`}>
                                <motion.span
                                    className="inline-block bg-[linear-gradient(110deg,var(--primary-text)_0%,var(--primary)_35%,var(--accent)_55%,var(--primary-text)_100%)] bg-[length:220%_100%] bg-clip-text text-transparent drop-shadow-[0_2px_10px_var(--primary-shadow)]"
                                    animate={shouldReduceMotion ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                    transition={shouldReduceMotion ? undefined : { backgroundPosition: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
                                >
                                    {word}
                                </motion.span>
                            </motion.span>
                        ))}
                    </motion.h1>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 3.35, ease: "easeOut" }}
                    className="mt-6 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-foreground font-medium leading-relaxed"
                >
                    CITB courses, NVQs, and CSCS cards - everything you need to work on site, get qualified, and grow your construction career faster.
                </motion.p>

                <motion.div
                    data-hero-filter onMouseEnter={() => setIsHeroPointerActive(false)}
                    initial={{ opacity: 0, y: 30, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 3.65, ease: [0.16, 1, 0.3, 1] }}
                    className="relative mt-10 w-full max-w-3xl mx-auto bg-glass-bg backdrop-blur-2xl rounded-2xl border border-glass-border shadow-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-30 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl"
                >
                    <div className={`w-full sm:w-[35%] rounded-2xl px-1 transition-all duration-300 ${selectedLevel ? "shadow-[0_0_24px_var(--primary-shadow)]" : ""}`}>
                        <Select
                            options={levelOptions} value={levelOptions.find((l) => l.value === selectedLevel)}
                            onChange={(option) => { setSelectedLevel(option?.value || ""); setSelectedTrade(""); }}
                            placeholder="Select Level" styles={customStyles} isSearchable menuPortalTarget={typeof window !== "undefined" ? document.body : null} menuPosition="fixed" aria-label="Select level" className="text-base"
                        />
                    </div>

                    <div className="hidden sm:block h-9 w-px bg-border" />

                    <div className={`w-full sm:w-[45%] rounded-2xl px-1 transition-all duration-300 ${selectedTrade ? "shadow-[0_0_24px_var(--primary-shadow)]" : ""}`}>
                        <Select
                            options={tradeOptions} value={tradeOptions.find((t) => t.value === selectedTrade)}
                            onChange={(option) => setSelectedTrade(option?.value || "")}
                            placeholder={selectedLevel ? "Select Trade" : "Choose Level First"} isDisabled={!selectedLevel} isSearchable styles={customStyles} menuPortalTarget={typeof window !== "undefined" ? document.body : null} menuPosition="fixed" aria-label="Select trade" className="text-base"
                        />
                    </div>

                    <motion.button
                        onClick={handleSearch} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary-text text-background !font-extrabold px-7 py-4 rounded-xl shadow-[0_0_24px_var(--primary-shadow)] transition-all duration-300 whitespace-nowrap group"
                    >
                        <Search className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                        <span className="!font-extrabold">Find Courses</span>
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 3.95, ease: "easeOut" }}
                    className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full relative"
                >
                    {features.map((feature, idx) => (
                        <TiltCard key={idx} className="flex flex-col items-center justify-center gap-2 bg-surface hover:bg-surface/80 backdrop-blur-md px-4 py-4 rounded-xl border border-border hover:border-primary/40 shadow-sm cursor-default transition-all duration-300">
                            <div className="bg-primary/10 p-2 rounded-full">
                                <feature.icon className="h-[18px] w-[18px] text-primary-text" />
                            </div>
                            <span className="text-sm font-bold text-foreground select-none">{feature.text}</span>
                        </TiltCard>
                    ))}
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }} className="mt-14 flex flex-col items-center gap-2 select-none pointer-events-none">
                    <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="h-[34px] w-5 rounded-full border border-border flex items-start justify-center pt-1.5">
                        <motion.div animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} className="w-1 h-2 rounded-full bg-primary" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default HeroSection;
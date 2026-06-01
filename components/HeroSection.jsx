"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Select from "react-select";
import {
    ShieldCheck,
    Headphones,
    Award,
    BookOpen,
    Search,
    Hammer,
    Cuboid,
    PaintRoller,
    Shovel,
    Home,
} from "lucide-react";
import coursesData from "../data/courses.json";

/* =========================
   Dark React Select Styles
========================= */
const customStyles = {
    control: (base, state) => {
        const isActive = state.isFocused || state.hasValue;

        return {
            ...base,
            borderRadius: "16px",
            padding: "7px 10px",
            borderColor: state.isDisabled
                ? "rgba(255,255,255,0.14)"
                : isActive
                    ? "rgba(190,242,100,0.9)"
                    : "rgba(255,255,255,0.18)",
            boxShadow: state.isFocused
                ? "0 0 0 4px rgba(163,230,53,0.2), 0 0 30px rgba(163,230,53,0.22)"
                : state.hasValue
                    ? "0 0 0 1px rgba(190,242,100,0.45), 0 0 24px rgba(163,230,53,0.16)"
                    : "none",
            background: state.isDisabled
                ? "rgba(255,255,255,0.045)"
                : state.hasValue
                    ? "linear-gradient(135deg, rgba(163,230,53,0.18), rgba(255,255,255,0.07))"
                    : "rgba(255,255,255,0.055)",
            backdropFilter: "blur(16px)",
            border: state.isDisabled
                ? "1px solid rgba(255,255,255,0.14)"
                : isActive
                    ? "1px solid rgba(190,242,100,0.9)"
                    : "1px solid rgba(255,255,255,0.18)",
            minHeight: "56px",
            transition: "border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease",
            color: "#fff",
            cursor: state.isDisabled ? "not-allowed" : "pointer",
            opacity: state.isDisabled ? 0.75 : 1,
        };
    },

    menu: (base) => ({
        ...base,
        borderRadius: "16px",
        overflow: "hidden",
        zIndex: 9999999,
        border: "1px solid rgba(190,242,100,0.32)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(163,230,53,0.12)",
        backgroundColor: "#080808",
    }),

    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? "rgb(190,242,100)"
            : state.isFocused
                ? "rgba(163,230,53,0.16)"
                : "#080808",
        color: state.isSelected
            ? "#050505"
            : state.isFocused
                ? "#d9f99d"
                : "rgba(255,255,255,0.82)",
        cursor: "pointer",
        padding: "12px 16px",
        fontWeight: state.isSelected ? 800 : 600,
        transition: "all 0.2s ease",
    }),

    placeholder: (base) => ({
        ...base,
        color: "rgba(255,255,255,0.58)",
        fontSize: "16px",
        fontWeight: 600,
    }),

    singleValue: (base) => ({
        ...base,
        color: "#ecfccb",
        fontWeight: 800,
        textShadow: "0 0 16px rgba(163,230,53,0.35)",
    }),

    input: (base) => ({
        ...base,
        color: "#ffffff",
    }),

    dropdownIndicator: (base, state) => {
        const hasValue = state.hasValue || Boolean(state.selectProps?.value);

        return {
            ...base,
            color: state.isFocused || hasValue ? "#bef264" : "rgba(255,255,255,0.55)",
            transition: "all 0.2s ease",
        };
    },

    indicatorSeparator: () => ({
        display: "none",
    }),

    menuPortal: (base) => ({
        ...base,
        zIndex: 9999999,
    }),
};

/* =========================
   Animated Grid with Mouse Tracking Spotlight
========================= */
function AnimatedGrid({ mouseX, mouseY, isPointerActive, ripples }) {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
            {/* Grid pattern */}
            <div
                className={`absolute inset-0 transition-all duration-300 ${isPointerActive ? "opacity-[0.07]" : "opacity-[0.035]"}`}
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #a3e635 1px, transparent 1px), linear-gradient(to bottom, #a3e635 1px, transparent 1px)",
                    backgroundSize: "64px 64px",
                }}
            />

            {/* Spotlight Radial Glow following the mouse */}
            <motion.div
                animate={{ opacity: isPointerActive ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.11), rgba(163,230,53,0.07) 32%, transparent 72%)`,
                }}
            />

            {/* Hover cursor ring */}
            <motion.div
                animate={{
                    opacity: isPointerActive ? 1 : 0,
                    scale: isPointerActive ? [0.92, 1.08, 0.92] : 0.86,
                }}
                transition={{
                    opacity: { duration: 0.2, ease: "easeOut" },
                    scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute h-28 w-28 rounded-full border border-white/25 shadow-[0_0_34px_rgba(255,255,255,0.18)]"
                style={{
                    left: mouseX,
                    top: mouseY,
                    x: "-50%",
                    y: "-50%",
                }}
            />

            {/* Click ripples on the background */}
            {ripples.map((ripple) => (
                <motion.span
                    key={ripple.id}
                    initial={{ opacity: 0.45, scale: 0.2 }}
                    animate={{ opacity: 0, scale: 2.7 }}
                    transition={{ duration: 0.85, ease: "easeOut" }}
                    className="absolute h-24 w-24 rounded-full border border-white/45 shadow-[0_0_40px_rgba(255,255,255,0.22)]"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        x: "-50%",
                        y: "-50%",
                    }}
                />
            ))}

            {/* Radial glows */}
            <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500/[0.04] blur-[100px]" />
            <div className="absolute -left-32 top-1/2 h-[350px] w-[350px] rounded-full bg-cyan-500/[0.03] blur-[80px]" />
            <div className="absolute -right-32 bottom-0 h-[350px] w-[350px] rounded-full bg-lime-400/[0.03] blur-[80px]" />

            {/* Animated scan lines */}
            <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute top-[30%] h-px w-1/3 bg-gradient-to-r from-transparent via-lime-400/20 to-transparent"
            />
            <motion.div
                animate={{ x: ["200%", "-100%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                className="absolute top-[65%] h-px w-1/4 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent"
            />
        </div>
    );
}

/* =========================
   Tilt Card Component for 3D Parallax Hover
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

        // Max rotation 10 degrees
        const rX = -(mouseY / (height / 2)) * 10;
        const rY = (mouseX / (width / 2)) * 10;

        setRotateX(rX);
        setRotateY(rY);
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
    const shouldReduceMotion = useReducedMotion();
    const [selectedTrade, setSelectedTrade] = useState("");
    const [selectedLevel, setSelectedLevel] = useState("");
    const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
    const [hoveredNode, setHoveredNode] = useState(null);
    const [isHeroPointerActive, setIsHeroPointerActive] = useState(false);
    const [heroRipples, setHeroRipples] = useState([]);
    const containerRef = useRef(null);

    const isFilterTarget = (target) =>
        Boolean(target?.closest?.("[data-hero-filter]"));

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        if (isFilterTarget(e.target)) {
            setIsHeroPointerActive(false);
            return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        setMouseCoords({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setIsHeroPointerActive(true);
    };

    const handleHeroClick = (e) => {
        if (!containerRef.current || isFilterTarget(e.target)) return;

        const rect = containerRef.current.getBoundingClientRect();
        const id = `${Date.now()}-${Math.round(e.clientX)}-${Math.round(e.clientY)}`;
        const ripple = {
            id,
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        setHeroRipples((currentRipples) => [...currentRipples.slice(-4), ripple]);
        window.setTimeout(() => {
            setHeroRipples((currentRipples) =>
                currentRipples.filter((currentRipple) => currentRipple.id !== id)
            );
        }, 900);
    };

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (selectedLevel) {
            params.set("level", selectedLevel);
        }

        if (selectedTrade) {
            params.set("trade", selectedTrade);
        }

        if (params.toString()) {
            router.push(`/courses?${params.toString()}`);
        } else {
            router.push("/courses");
        }
    };

    const availableTrades = selectedLevel
        ? coursesData.filter((trade) =>
            trade.levels.some((lvl) => lvl.level.toString() === selectedLevel.toString())
        )
        : [];

    const features = [
        { icon: ShieldCheck, text: "UK Accredited" },
        { icon: Headphones, text: "Expert Support" },
        { icon: Award, text: "High Pass Rate" },
        { icon: BookOpen, text: "Flexible Learning" },
    ];

    const levelOptions = [
        ...new Set(coursesData.flatMap((trade) => trade.levels.map((lvl) => lvl.level))),
    ]
        .sort((a, b) => a - b)
        .map((level) => ({
            value: level,
            label: `Level ${level}`,
        }));

    const tradeOptions = availableTrades.map((trade) => ({
        value: trade.slug,
        label: trade.trade,
    }));

    const heroHeadingWords = ["Learn.", "Qualify."];
    const heroHighlightWords = ["Build", "Your", "Future."];

    const headingVariants = {
        hidden: {},
        show: {
            transition: {
                delayChildren: shouldReduceMotion ? 0 : 0.25,
                staggerChildren: shouldReduceMotion ? 0 : 0.55,
            },
        },
    };

    const headingWordVariants = {
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0,
            y: shouldReduceMotion ? 0 : 34,
            filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)",
        },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: shouldReduceMotion ? 0 : 1.55,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    // Trade Nodes on the Left and Right margins of the Hero
    const tradeNodes = [
        { id: "node-carpentry", slug: "carpentry", title: "Carpentry", icon: Hammer, style: { left: "4%", top: "18%" }, pathId: 0, d: "M 120 114 C 300 114, 450 380, 600 380" },
        { id: "node-brickwork", slug: "bricklaying", title: "Bricklaying", icon: Cuboid, style: { left: "1.5%", top: "48%" }, pathId: 1, d: "M 60 294 C 250 294, 450 380, 600 380" },
        { id: "node-painting", slug: "painting-decorating", title: "Painting", icon: PaintRoller, style: { left: "4%", top: "78%" }, pathId: 2, d: "M 120 474 C 300 474, 450 380, 600 380" },
        { id: "node-labourer", slug: "general-labourer", title: "Labourer", icon: ShieldCheck, style: { right: "4%", top: "18%" }, pathId: 3, d: "M 1080 114 C 900 114, 750 380, 600 380" },
        { id: "node-roofing", slug: "roofing", title: "Roofing", icon: Home, style: { right: "1.5%", top: "48%" }, pathId: 4, d: "M 1140 294 C 950 294, 750 380, 600 380" },
        { id: "node-plastering", slug: "plastering", title: "Plastering", icon: Shovel, style: { right: "4%", top: "78%" }, pathId: 5, d: "M 1080 474 C 900 474, 750 380, 600 380" },
    ];

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsHeroPointerActive(false)}
            onClick={handleHeroClick}
            className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#020202] px-4 sm:px-6 lg:px-8 py-28"
        >
            <AnimatedGrid
                mouseX={mouseCoords.x}
                mouseY={mouseCoords.y}
                isPointerActive={isHeroPointerActive}
                ripples={heroRipples}
            />

            {/* INTERACTIVE SVG TRADE CONNECTING NETWORK */}
            <svg
                className="pointer-events-none absolute inset-0 z-0 h-full w-full hidden lg:block select-none"
                viewBox="0 0 1200 600"
                fill="none"
                preserveAspectRatio="none"
            >
                {tradeNodes.map((node) => {
                    const isNodeHovered = hoveredNode === node.id;
                    const isNodeSelected = selectedTrade === node.slug;
                    const isNodeActive = isNodeHovered || isNodeSelected;
                    const activeStroke = isNodeSelected
                        ? "rgba(163, 230, 53, 0.42)"
                        : "rgba(255, 255, 255, 0.42)";

                    return (
                        <g key={node.id}>
                            {isNodeActive && (
                                <motion.path
                                    d={node.d}
                                    stroke={activeStroke}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0.06, 0.2, 0.08] }}
                                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ filter: "blur(6px)" }}
                                />
                            )}

                            {/* Static faint path line */}
                            <path
                                d={node.d}
                                stroke={isNodeActive ? activeStroke : "rgba(255, 255, 255, 0.12)"}
                                strokeWidth={isNodeActive ? "2.5" : "1.5"}
                                strokeLinecap="round"
                                className="transition-all duration-300"
                            />

                            {/* Moving energy sparks */}
                            <motion.circle
                                r={isNodeActive ? "4" : "2.8"}
                                fill={isNodeSelected ? "rgb(163 230 53)" : "rgb(255 255 255)"}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 1, 0],
                                    offsetDistance: ["0%", "100%"],
                                }}
                                transition={{
                                    duration: isNodeActive ? 3.5 : 6,
                                    delay: node.pathId * 0.45,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                style={{
                                    offsetPath: `path("${node.d}")`,
                                    filter: isNodeSelected
                                        ? "drop-shadow(0 0 8px rgb(163 230 53))"
                                        : "drop-shadow(0 0 10px rgb(255 255 255))",
                                }}
                            />
                        </g>
                    );
                })}
            </svg>

            {/* FLOATING TRADE NODE BADGES (DESKTOP) */}
            <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block select-none max-w-7xl mx-auto">
                {tradeNodes.map((node) => {
                    const nodeTrade = coursesData.find((trade) => trade.slug === node.slug);
                    const canSelectNode =
                        Boolean(selectedLevel) &&
                        nodeTrade?.levels.some((lvl) => lvl.level.toString() === selectedLevel.toString());
                    const isHovered = hoveredNode === node.id;
                    const isSelected = canSelectNode && selectedTrade === node.slug;
                    const isActive = isHovered || isSelected;

                    return (
                        <motion.div
                            key={node.id}
                            style={node.style}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                            onClick={() => {
                                if (!canSelectNode) return;
                                setSelectedTrade(node.slug);
                            }}
                            whileHover={{ y: -6, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 420, damping: 24 }}
                            aria-disabled={!canSelectNode}
                            className={`absolute pointer-events-auto flex flex-col items-center gap-2 group ${canSelectNode ? "cursor-pointer" : "cursor-not-allowed"}`}
                        >
                            <div
                                className={`relative flex h-[58px] w-[58px] items-center justify-center rounded-2xl border transition-all duration-300 shadow-lg backdrop-blur-md
                  ${isSelected
                                        ? "border-lime-300 bg-lime-300 shadow-[0_0_34px_rgba(163,230,53,0.55)]"
                                        : isActive
                                            ? "border-white/70 bg-white/[0.12] shadow-[0_0_34px_rgba(255,255,255,0.36)]"
                                            : "border-white/20 bg-black/60"
                                    }`}
                            >
                                {isActive && !isSelected && (
                                    <motion.span
                                        aria-hidden="true"
                                        className="absolute inset-[-8px] rounded-[22px] border border-white/45"
                                        initial={{ scale: 0.88, opacity: 0 }}
                                        animate={{ scale: [0.88, 1.26], opacity: [0.48, 0] }}
                                        transition={{ duration: 1.15, repeat: Infinity, ease: "easeOut" }}
                                    />
                                )}

                                <span
                                    aria-hidden="true"
                                    className={`absolute inset-0 rounded-2xl bg-white/[0.08] transition-opacity duration-300 ${isActive && !isSelected ? "opacity-100" : "opacity-0"}`}
                                />

                                {isSelected && (
                                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.95)]" />
                                )}
                                <node.icon
                                    className={`relative z-10 h-6 w-6 transition-all duration-300
                    ${isSelected ? "text-black" : isActive ? "text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.9)]" : "text-white"}`}
                                />
                            </div>
                            <span
                                className={`rounded-full border px-3 py-1 text-[11px] !font-extrabold uppercase !tracking-[0.08em] transition-all duration-300
                  ${isSelected ? "border-lime-300 bg-lime-300 text-black shadow-[0_0_20px_rgba(163,230,53,0.4)]" : isActive ? "border-white/40 bg-white/[0.12] text-white shadow-[0_0_22px_rgba(255,255,255,0.18)]" : "border-white/10 bg-black/55 text-white/70"}`}
                            >
                                {node.title}
                            </span>
                        </motion.div>
                    );
                })}
            </div>

            {/* HERO CONTENT CONTAINER */}
            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
                {/* Label Badge */}
                {/* <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 flex w-fit items-center gap-2 rounded-full border border-lime-400/25 bg-lime-400/10 px-5 py-2 text-xs font-bold uppercase tracking-widest text-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.15)]"
        >
          <Zap className="h-3.5 w-3.5 animate-pulse" />
          Construction Training Platform
        </motion.div> */}

                {/* Kinetic Staggered Typography */}
                <div className="overflow-hidden">
                    <motion.h1
                        variants={headingVariants}
                        initial="hidden"
                        animate="show"
                        className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
                    >
                        {heroHeadingWords.map((word) => (
                            <motion.span
                                key={word}
                                variants={headingWordVariants}
                                className="inline-block pr-3 sm:pr-4"
                            >
                                {word}
                            </motion.span>
                        ))}
                        <br />
                        {heroHighlightWords.map((word, index) => (
                            <motion.span
                                key={word}
                                variants={headingWordVariants}
                                className={`inline-block ${index < heroHighlightWords.length - 1 ? "pr-3 sm:pr-4" : ""}`}
                            >
                                <motion.span
                                    className="inline-block bg-[linear-gradient(110deg,#a3e635_0%,#d9f99d_35%,#bef264_55%,#a3e635_100%)] bg-[length:220%_100%] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(163,230,53,0.18)]"
                                    animate={
                                        shouldReduceMotion
                                            ? undefined
                                            : {
                                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                            }
                                    }
                                    transition={
                                        shouldReduceMotion
                                            ? undefined
                                            : {
                                                backgroundPosition: {
                                                    duration: 8,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                },
                                            }
                                    }
                                >
                                    {word}
                                </motion.span>
                            </motion.span>
                        ))}
                    </motion.h1>
                </div>

                {/* Subtitle / Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 3.35, ease: "easeOut" }}
                    className="mt-6 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-white/60 font-medium leading-relaxed"
                >
                    CITB courses, NVQs, and CSCS cards - everything you need to work on
                    site, get qualified, and grow your construction career faster.
                </motion.p>

                {/* SEARCH CONSOLE (GLASS COCKPIT PANEL) */}
                <motion.div
                    data-hero-filter
                    onMouseEnter={() => setIsHeroPointerActive(false)}
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, delay: shouldReduceMotion ? 0 : 3.65, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative mt-10 w-full max-w-3xl mx-auto bg-black/60 backdrop-blur-2xl rounded-2xl border shadow-[0_25px_60px_rgba(0,0,0,0.65)] p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-30 transition-all duration-300 hover:border-lime-400/35 hover:shadow-[0_25px_70px_rgba(163,230,53,0.12)] ${selectedLevel || selectedTrade ? "border-lime-400/35" : "border-white/15"}`}
                >
                    {/* LEVEL SELECT */}
                    <div className={`w-full sm:w-[35%] rounded-2xl px-1 transition-all duration-300 ${selectedLevel ? "shadow-[0_0_24px_rgba(163,230,53,0.12)]" : ""}`}>
                        <Select
                            options={levelOptions}
                            value={levelOptions.find((l) => l.value === selectedLevel)}
                            onChange={(option) => {
                                setSelectedLevel(option?.value || "");
                                setSelectedTrade("");
                            }}
                            placeholder="Select Level"
                            styles={customStyles}
                            isSearchable
                            menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                            menuPosition="fixed"
                            aria-label="Select level"
                            className="text-white text-base"
                        />
                    </div>

                    {/* DIVIDER */}
                    <div className="hidden sm:block h-9 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent" />

                    {/* TRADE SELECT */}
                    <div className={`w-full sm:w-[45%] rounded-2xl px-1 transition-all duration-300 ${selectedTrade ? "shadow-[0_0_24px_rgba(163,230,53,0.12)]" : ""}`}>
                        <Select
                            options={tradeOptions}
                            value={tradeOptions.find((t) => t.value === selectedTrade)}
                            onChange={(option) => setSelectedTrade(option?.value || "")}
                            placeholder={selectedLevel ? "Select Trade" : "Choose Level First"}
                            isDisabled={!selectedLevel}
                            isSearchable
                            styles={customStyles}
                            menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                            menuPosition="fixed"
                            aria-label="Select trade"
                            className="text-white text-base"
                        />
                    </div>

                    {/* SEARCH BUTTON */}
                    <motion.button
                        onClick={handleSearch}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full cursor-pointer sm:w-auto flex items-center justify-center gap-2 bg-lime-300 hover:bg-lime-200 text-black !font-extrabold px-7 py-4 rounded-xl shadow-[0_0_34px_rgba(163,230,53,0.45)] hover:shadow-[0_0_46px_rgba(163,230,53,0.6)] transition-all duration-300 whitespace-nowrap group"
                    >
                        <Search className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                        <span className="!font-extrabold">Find Courses</span>
                    </motion.button>
                </motion.div>

                {/* FEATURES ROW WITH 3D TILT CARDS */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 3.95, ease: "easeOut" }}
                    className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 w-full relative"
                >
                    {features.map((feature, idx) => (
                        <TiltCard
                            key={idx}
                            className="flex flex-col items-center justify-center gap-2 bg-white/[0.02] hover:bg-lime-400/[0.04] backdrop-blur-md px-4 py-4 rounded-xl border border-white/5 hover:border-lime-400/20 shadow-sm cursor-default transition-all duration-300"
                        >
                            <div className="bg-lime-400/10 p-2 rounded-full">
                                <feature.icon className="h-[18px] w-[18px] text-lime-400" />
                            </div>
                            <span className="text-sm font-bold text-white/80 select-none">
                                {feature.text}
                            </span>
                        </TiltCard>
                    ))}
                </motion.div>

                {/* Scroll Indicator mouse */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="mt-14 flex flex-col items-center gap-2 select-none pointer-events-none"
                >
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        className="h-[34px] w-5 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
                    >
                        <motion.div
                            animate={{ opacity: [1, 0.3, 1], y: [0, 6, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1 h-2 rounded-full bg-lime-400"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default HeroSection;

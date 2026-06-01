"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const partners = [
  {
    name: "Partner 01",
    src: "/1.png",
    label: "Accredited Body",
    text: "Recognised certification support for trusted training pathways.",
  },
  {
    name: "Partner 02",
    src: "/2.png",
    label: "Industry Standard",
    text: "Professional recognition aligned with real workplace requirements.",
  },
  {
    name: "Partner 03",
    src: "/3.png",
    label: "Training Network",
    text: "Connected learning routes designed for practical career growth.",
  },
  {
    name: "Partner 04",
    src: "/4.png",
    label: "Qualification Route",
    text: "Structured certification pathways for learners and professionals.",
  },
  {
    name: "Partner 05",
    src: "/6.png",
    label: "Compliance Ready",
    text: "Built around trusted standards, safety, and recognised processes.",
  },
  {
    name: "Partner 06",
    src: "/7.png",
    label: "Career Focused",
    text: "Helping learners move from training into professional progression.",
  },
  {
    name: "Partner 07",
    src: "/8.png",
    label: "Trusted Partner",
    text: "A reliable partner ecosystem supporting high-quality delivery.",
  },
];

const nodePositions = [
  { left: "8%", top: "62%" },
  { left: "22%", top: "28%" },
  { left: "36%", top: "69%" },
  { left: "50%", top: "43%" },
  { left: "64%", top: "25%" },
  { left: "78%", top: "65%" },
  { left: "92%", top: "35%" },
];

function LogosSection() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-120px 0px -120px 0px",
  });

  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const selectedPartner = useMemo(() => {
    if (selected === null) return null;
    return partners[selected];
  }, [selected]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    event.currentTarget.style.setProperty("--mx", `${x}%`);
    event.currentTarget.style.setProperty("--my", `${y}%`);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[#050705] py-20 text-white sm:py-24 lg:py-28"
      style={{
        "--mx": "50%",
        "--my": "45%",
      }}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(163,230,53,0.15),transparent_27%),radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.09),transparent_25%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.1),transparent_28%)]" />
        <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-lime-300/[0.055] blur-[130px]" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050705_74%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.94 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-lime-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl"
          >
            <Zap className="h-3.5 w-3.5" />
            Trusted Network
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-3xl font-black tracking-tight sm:text-4xl lg:text-6xl"
          >
            Certifications that connect{" "}
            <span className="bg-gradient-to-r from-lime-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              opportunity
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white sm:text-base"
          >
            A modern accreditation ecosystem with trusted partners, recognised
            pathways, and professional certification routes.
          </motion.p>
        </div>

        {/* Desktop constellation */}
        <div className="relative mx-auto mt-16 hidden h-[560px] max-w-7xl lg:block">
          <svg
            viewBox="0 0 1200 560"
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="constellationGradient"
                x1="80"
                y1="0"
                x2="1120"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#a3e635" stopOpacity="0" />
                <stop offset="18%" stopColor="#a3e635" stopOpacity="0.85" />
                <stop offset="48%" stopColor="#34d399" stopOpacity="1" />
                <stop offset="74%" stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>

              <filter
                id="constellationGlow"
                x="-20%"
                y="-80%"
                width="140%"
                height="260%"
              >
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d="M 80 355 C 190 115 310 112 410 335 C 500 535 610 180 705 165 C 830 145 840 455 1010 348 C 1080 304 1115 250 1120 208"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="8 12"
            />

            <motion.path
              d="M 80 355 C 190 115 310 112 410 335 C 500 535 610 180 705 165 C 830 145 840 455 1010 348 C 1080 304 1115 250 1120 208"
              stroke="url(#constellationGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#constellationGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isInView
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 2,
                delay: 0.55,
                ease: "easeInOut",
              }}
            />

            {isInView && !shouldReduceMotion && (
              <motion.path
                d="M 80 355 C 190 115 310 112 410 335 C 500 535 610 180 705 165 C 830 145 840 455 1010 348 C 1080 304 1115 250 1120 208"
                stroke="#f7fee7"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="80 1120"
                initial={{ strokeDashoffset: 1120, opacity: 0 }}
                animate={{
                  strokeDashoffset: [1120, 0, -1120],
                  opacity: [0, 1, 0.85, 0],
                }}
                transition={{
                  duration: 5,
                  delay: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                filter="url(#constellationGlow)"
              />
            )}
          </svg>

          {/* Click hint only, not detail */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 1.8, ease: "easeOut" }}
            className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-lime-300" />
            Click any logo to view details
          </motion.div>

          {/* Logo nodes */}
          {partners.map((partner, index) => {
            const isSelected = selected === index;
            const isHovered = hovered === index;
            const isFocused = isSelected || isHovered;

            return (
              <motion.button
                key={partner.src}
                type="button"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                onClick={() => setSelected(index)}
                initial={{
                  opacity: 0,
                  scale: 0.55,
                  y: 42,
                  filter: "blur(12px)",
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }
                    : {}
                }
                transition={{
                  duration: 0.7,
                  delay: 0.85 + index * 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: 1.08,
                        y: -8,
                        transition: { duration: 0.25 },
                      }
                }
                className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none"
                style={nodePositions[index]}
              >
                <span
                  className={`absolute -inset-5 rounded-full transition duration-500 ${
                    isFocused
                      ? "bg-lime-300/15 blur-xl"
                      : "bg-transparent"
                  }`}
                />

                <span
                  className={`absolute -inset-3 rounded-full border transition duration-500 ${
                    isFocused
                      ? "border-lime-300/40 opacity-100"
                      : "border-white/10 opacity-0 group-hover:opacity-100"
                  }`}
                />

                {isSelected && !shouldReduceMotion && (
                  <motion.span
                    className="absolute -inset-4 rounded-full border border-lime-300/30"
                    initial={{ scale: 0.85, opacity: 0.8 }}
                    animate={{ scale: 1.35, opacity: 0 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}

                <span
                  className={`relative flex h-[118px] w-[118px] items-center justify-center rounded-[2rem] border p-5 shadow-[0_24px_80px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition duration-500 ${
                    isFocused
                      ? "border-lime-300/40 bg-lime-300/[0.08]"
                      : "border-white/10 bg-white/[0.045] group-hover:border-lime-300/25 group-hover:bg-white/[0.07]"
                  }`}
                >
                  <span className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.12] via-transparent to-transparent" />

                  <span className="relative h-14 w-full">
                    <Image
                      src={partner.src}
                      alt={partner.name}
                      fill
                      sizes="118px"
                      className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
                    />
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile / tablet version */}
        <div className="mx-auto mt-12 max-w-xl lg:hidden">
          <div className="relative">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.2, delay: 0.45, ease: "easeInOut" }}
              className="absolute left-7 top-4 w-px bg-gradient-to-b from-lime-300 via-emerald-300 to-cyan-300"
            />

            <div className="space-y-4">
              {partners.map((partner, index) => {
                const isSelected = selected === index;

                return (
                  <motion.div
                    key={partner.src}
                    initial={{ opacity: 0, x: -28, filter: "blur(10px)" }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0, filter: "blur(0px)" }
                        : {}
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.65 + index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setSelected(isSelected ? null : index)
                      }
                      className={`relative flex w-full items-center gap-4 rounded-3xl border p-4 text-left backdrop-blur-xl transition duration-300 ${
                        isSelected
                          ? "border-lime-300/35 bg-lime-300/[0.08]"
                          : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#070907] p-2">
                        <Image
                          src={partner.src}
                          alt={partner.name}
                          fill
                          sizes="56px"
                          className="object-contain p-2"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-lime-300">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {partner.label}
                        </div>

                        <h3 className="mt-1 text-base font-black text-white">
                          {partner.name}
                        </h3>

                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                          Tap to view details
                        </p>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -8 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -8 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="ml-[72px] mt-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-white backdrop-blur-xl">
                            {partner.text}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop detail modal: only visible after click */}
      <AnimatePresence>
        {selectedPartner && (
          <motion.div
            className="fixed inset-0 z-[100] hidden items-center justify-center bg-black/55 p-6 backdrop-blur-md lg:flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 34, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.94 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#080b08]/90 p-7 shadow-[0_40px_140px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(163,230,53,0.18),transparent_35%),radial-gradient(circle_at_90%_100%,rgba(34,211,238,0.12),transparent_32%)]" />

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white transition hover:bg-white/[0.1] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative">
                <div className="mb-6 flex items-center justify-between pr-12">
                  <div className="flex items-center gap-2 rounded-full border border-lime-300/15 bg-lime-300/[0.07] px-3 py-1 text-xs font-bold text-lime-200">
                    <Sparkles className="h-3.5 w-3.5" />
                    Partner Details
                  </div>

                  <div className="text-xs font-semibold text-white">
                    0{selected + 1} / 0{partners.length}
                  </div>
                </div>

                <div className="mb-6 flex h-24 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="relative h-16 w-full">
                    <Image
                      src={selectedPartner.src}
                      alt={selectedPartner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-lime-300">
                  {selectedPartner.label}
                </p>

                <h3 className="mt-3 text-3xl font-black text-white">
                  {selectedPartner.name}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white">
                  {selectedPartner.text}
                </p>

                <div className="mt-7 flex items-center gap-2 text-sm font-bold text-lime-200">
                  Explore certification route
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default LogosSection;
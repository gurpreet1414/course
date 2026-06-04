"use client";

import React, { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, X, Zap } from "lucide-react";

const partners = [
  { name: "Partner 01", src: "/1.png", label: "Accredited Body", text: "Recognised certification support for trusted training pathways." },
  { name: "Partner 02", src: "/2.png", label: "Industry Standard", text: "Professional recognition aligned with real workplace requirements." },
  { name: "Partner 03", src: "/3.png", label: "Training Network", text: "Connected learning routes designed for practical career growth." },
  { name: "Partner 04", src: "/4.png", label: "Qualification Route", text: "Structured certification pathways for learners and professionals." },
  { name: "Partner 05", src: "/6.png", label: "Compliance Ready", text: "Built around trusted standards, safety, and recognised processes." },
  { name: "Partner 06", src: "/7.png", label: "Career Focused", text: "Helping learners move from training into professional progression." },
  { name: "Partner 07", src: "/8.png", label: "Trusted Partner", text: "A reliable partner ecosystem supporting high-quality delivery." },
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

export default function LogosSection() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(sectionRef, { once: true, margin: "-120px 0px -120px 0px" });

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
      className="relative overflow-hidden bg-logo-bg py-20 text-foreground transition-colors duration-500 sm:py-24 lg:py-28"
      style={{ "--mx": "50%", "--my": "45%" }}
    >
      {/* Background with Theme Glow Profiles */}
      <div className="pointer-events-none absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle at var(--mx) var(--my), var(--logo-glow-1), transparent 27%), radial-gradient(circle at 20% 20%, var(--logo-glow-2), transparent 25%), radial-gradient(circle at 80% 80%, var(--logo-glow-3), transparent 28%)" }}
        />
        <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.04] blur-[130px]" />
        <div 
          className="absolute inset-0 opacity-[0.4]"
          style={{ backgroundImage: "linear-gradient(to right, var(--logo-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--logo-grid) 1px, transparent 1px)", backgroundSize: "72px 72px" }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: "var(--logo-mask)" }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.94 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-primary-text shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl"
          >
            <Zap className="h-3.5 w-3.5" /> Trusted Network
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }} animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-6xl"
          >
            Certifications that connect{" "}
            <span className="bg-gradient-to-r from-primary via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              opportunity
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base"
          >
            A modern accreditation ecosystem with trusted partners, recognised
            pathways, and professional certification routes.
          </motion.p>
        </div>

        {/* Desktop Constellation Panel */}
        <div className="relative mx-auto mt-16 hidden h-[560px] max-w-7xl lg:block">
          <svg viewBox="0 0 1200 560" className="absolute inset-0 h-full w-full overflow-visible" fill="none" preserveAspectRatio="none">
            <defs>
              <linearGradient id="constellationGradient" x1="80" y1="0" x2="1120" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
                <stop offset="18%" stopColor="var(--color-primary)" stopOpacity="0.85" />
                <stop offset="48%" stopColor="#10b981" stopOpacity="1" />
                <stop offset="74%" stopColor="#06b6d4" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>

              <filter id="constellationGlow" x="-20%" y="-80%" width="140%" height="260%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path d="M 80 355 C 190 115 310 112 410 335 C 500 535 610 180 705 165 C 830 145 840 455 1010 348 C 1080 304 1115 250 1120 208" stroke="var(--logo-grid)" strokeWidth="2" strokeLinecap="round" strokeDasharray="8 12" />

            <motion.path
              d="M 80 355 C 190 115 310 112 410 335 C 500 535 610 180 705 165 C 830 145 840 455 1010 348 C 1080 304 1115 250 1120 208"
              stroke="url(#constellationGradient)" strokeWidth="2.5" strokeLinecap="round" filter="url(#constellationGlow)"
              initial={{ pathLength: 0, opacity: 0 }} animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 2, delay: 0.55, ease: "easeInOut" }}
            />

            {isInView && !shouldReduceMotion && (
              <motion.path
                d="M 80 355 C 190 115 310 112 410 335 C 500 535 610 180 705 165 C 830 145 840 455 1010 348 C 1080 304 1115 250 1120 208"
                stroke="var(--color-primary-text)" strokeWidth="5" strokeLinecap="round" strokeDasharray="80 1120"
                initial={{ strokeDashoffset: 1120, opacity: 0 }} animate={{ strokeDashoffset: [1120, 0, -1120], opacity: [0, 1, 0.85, 0] }}
                transition={{ duration: 5, delay: 2.2, repeat: Infinity, ease: "easeInOut" }} filter="url(#constellationGlow)"
              />
            )}
          </svg>

          {/* Hint Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: 1.8, ease: "easeOut" }}
            className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-logo-card-bg px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-foreground shadow-sm backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary-text" /> Click any logo to view details
          </motion.div>

          {/* Logo Nodes */}
          {partners.map((partner, index) => {
            const isSelected = selected === index;
            const isHovered = hovered === index;
            const isFocused = isSelected || isHovered;

            return (
              <motion.button
                key={partner.src} type="button" onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(index)} onBlur={() => setHovered(null)} onClick={() => setSelected(index)}
                initial={{ opacity: 0, scale: 0.55, y: 42, filter: "blur(12px)" }} animate={isInView ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.7, delay: 0.85 + index * 0.16, ease: [0.22, 1, 0.36, 1] }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -8, transition: { duration: 0.25 } }}
                className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 outline-none cursor-pointer"
                style={nodePositions[index]}
              >
                <span className={`absolute -inset-5 rounded-full transition duration-500 ${isFocused ? "bg-primary/10 blur-xl" : "bg-transparent"}`} />
                <span className={`absolute -inset-3 rounded-full border transition duration-500 ${isFocused ? "border-primary/40 opacity-100" : "border-border opacity-0 group-hover:opacity-100"}`} />

                {isSelected && !shouldReduceMotion && (
                  <motion.span
                    className="absolute -inset-4 rounded-full border border-primary/30"
                    initial={{ scale: 0.85, opacity: 0.8 }} animate={{ scale: 1.35, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                )}

                <span className={`relative flex h-[118px] w-[118px] items-center justify-center rounded-[2rem] border p-5 shadow-logo-node backdrop-blur-2xl transition duration-500 ${isFocused ? "border-primary bg-logo-card-bg" : "border-border bg-logo-glass group-hover:border-primary/40"}`}>
                  <span className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-foreground/[0.02] via-transparent to-transparent" />
                  <span className="relative h-14 w-full">
                    <Image src={partner.src} alt={partner.name} fill sizes="118px" className="object-contain dark:invert" />
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile / Tablet List View */}
        <div className="mx-auto mt-12 max-w-xl lg:hidden">
          <div className="relative">
            <motion.div
              initial={{ height: 0 }} animate={isInView ? { height: "100%" } : {}} transition={{ duration: 1.2, delay: 0.45, ease: "easeInOut" }}
              className="absolute left-11 top-4 w-px bg-gradient-to-b from-primary via-emerald-500 to-cyan-500"
            />

            <div className="space-y-4">
              {partners.map((partner, index) => {
                const isSelected = selected === index;

                return (
                  <motion.div
                    key={partner.src} initial={{ opacity: 0, x: -28, filter: "blur(10px)" }} animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.6, delay: 0.65 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      type="button" onClick={() => setSelected(isSelected ? null : index)}
                      className={`relative flex w-full items-center gap-4 rounded-3xl border p-4 text-left backdrop-blur-xl transition duration-300 cursor-pointer ${isSelected ? "border-primary/35 bg-primary/[0.03] shadow-sm" : "border-border bg-logo-card-bg"}`}
                    >
                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface p-2">
                        <Image src={partner.src} alt={partner.name} fill sizes="56px" className="object-contain p-2 dark:invert" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-text">
                          <CheckCircle2 className="h-3.5 w-3.5" /> {partner.label}
                        </div>
                        <h3 className="mt-1 text-base font-black text-foreground">{partner.name}</h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">Tap to view details</p>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -8 }} transition={{ duration: 0.35, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="ml-[72px] mt-3 rounded-3xl border border-border bg-logo-card-bg p-4 text-sm leading-7 text-muted shadow-sm backdrop-blur-xl">
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

      {/* Desktop Overlay Details Modal */}
      <AnimatePresence>
        {selectedPartner && (
          <motion.div
            className="fixed inset-0 z-[100] hidden items-center justify-center bg-black/40 p-6 backdrop-blur-md lg:flex"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 34, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.94 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-border bg-logo-card-bg p-7 shadow-logo-modal backdrop-blur-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,var(--logo-glow-1),transparent_35%),radial-gradient(circle_at_90%_100%,var(--logo-glow-2),transparent_32%)]" />

              <button
                type="button" onClick={() => setSelected(null)}
                className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-logo-card-hover text-muted transition hover:bg-border cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative">
                <div className="mb-6 flex items-center justify-between pr-12">
                  <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary-text">
                    <Sparkles className="h-3.5 w-3.5" /> Partner Details
                  </div>
                  <div className="text-xs font-semibold text-muted">
                    0{selected + 1} / 0{partners.length}
                  </div>
                </div>

                <div className="mb-6 flex h-24 items-center justify-center rounded-3xl border border-border bg-logo-card-hover p-5">
                  <div className="relative h-16 w-full">
                    <Image src={selectedPartner.src} alt={selectedPartner.name} fill className="object-contain dark:invert" />
                  </div>
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-text">{selectedPartner.label}</p>
                <h3 className="mt-3 text-3xl font-black text-foreground">{selectedPartner.name}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{selectedPartner.text}</p>

                <div className="mt-7 flex items-center gap-2 text-sm font-bold text-primary-text hover:opacity-80 transition-colors cursor-pointer">
                  Explore certification route <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
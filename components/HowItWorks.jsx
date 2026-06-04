"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Award, CheckCircle2, Layers, ShieldCheck, UploadCloud, Wrench, Zap } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Choose Your Trade",
    desc: "Select your trade and qualification pathway.",
    longDesc: "Start by choosing the trade that matches your current work experience, site role, and career goal.",
    icon: Wrench,
    points: ["Pick your trade", "Match your role", "Start your pathway"],
  },
  {
    num: "02",
    title: "Select Your Level",
    desc: "Pick the qualification level for your current role.",
    longDesc: "Choose the level that fits your experience, from worker routes to supervisor or advanced options.",
    icon: Layers,
    points: ["Choose correct level", "Role-based guidance", "Clear progression"],
  },
  {
    num: "03",
    title: "Upload Evidence",
    desc: "Submit your documents and work evidence.",
    longDesc: "Upload your site evidence, documents, photos, and work records so your assessor can review your portfolio.",
    icon: UploadCloud,
    points: ["Submit documents", "Upload work proof", "Assessor review"],
  },
  {
    num: "04",
    title: "Get Qualified",
    desc: "Assessment completed and get certified.",
    longDesc: "Once your evidence is reviewed and approved, your qualification process is completed.",
    icon: Award,
    points: ["Assessment complete", "Get certified", "Ready for site"],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(sectionRef, { once: true, margin: "-120px 0px -120px 0px" });

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const activeStep = useMemo(() => steps[active], [active]);
  const ActiveIcon = activeStep.icon;

  useEffect(() => {
    if (!isInView || paused || shouldReduceMotion) return;
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => setActive((prev) => (prev + 1) % steps.length), 3200);
      return () => clearInterval(interval);
    }, 1800);
    return () => clearTimeout(startTimer);
  }, [isInView, paused, shouldReduceMotion]);

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
      className="relative overflow-hidden bg-hiw-bg py-20 text-foreground transition-colors duration-500 sm:py-24 lg:py-28"
      style={{ "--mx": "50%", "--my": "45%" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div 
          className="absolute inset-0" 
          style={{ backgroundImage: "radial-gradient(circle at var(--mx) var(--my), var(--hiw-gradient-1), transparent 28%), radial-gradient(circle at 18% 18%, var(--hiw-gradient-2), transparent 30%), radial-gradient(circle at 82% 78%, var(--hiw-gradient-3), transparent 32%)" }} 
        />

        <motion.div
          animate={shouldReduceMotion ? {} : { x: [0, 60, -25, 0], y: [0, -35, 35, 0], scale: [1, 1.1, 0.98, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-10 h-[560px] w-[560px] rounded-full bg-primary/[0.08] blur-[130px]"
        />

        <motion.div
          animate={shouldReduceMotion ? {} : { x: [0, -55, 30, 0], y: [0, 45, -28, 0], scale: [1, 0.96, 1.12, 1] }}
          transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-40 bottom-10 h-[560px] w-[560px] rounded-full bg-cyan-500/[0.07] blur-[140px]"
        />

        <div className="absolute inset-0" style={{ backgroundImage: "var(--hiw-mask)" }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.div
            initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} transition={{ delay: 0.05 }}
            className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-primary-text backdrop-blur-xl"
          >
            <Zap className="h-3.5 w-3.5" /> Simple Process
          </motion.div>

          <motion.h2
            initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} transition={{ delay: 0.18 }}
            className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-6xl"
          >
            How it <span className="bg-gradient-to-r from-primary-text via-emerald-500 to-cyan-500 bg-clip-text text-transparent">works</span>
          </motion.h2>

          <motion.p
            initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeUp} transition={{ delay: 0.32 }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base"
          >
            A smooth visual process from choosing your trade to getting
            qualified. Click any step to preview the journey.
          </motion.p>
        </div>

        {/* Desktop Layout */}
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="hidden lg:block">
          <div className="mx-auto grid max-w-7xl grid-cols-[1.05fr_1fr] gap-7">
            
            {/* Left Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: -42, y: 20, filter: "blur(16px)" }}
              animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.9, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
              className="relative min-h-[620px] overflow-hidden rounded-[2.6rem] border border-border bg-hiw-glass p-8 shadow-hiw-main backdrop-blur-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,var(--hiw-gradient-1),transparent_34%),radial-gradient(circle_at_90%_100%,var(--hiw-gradient-2),transparent_34%)]" />

              <div className="relative flex h-full flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-8 flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em] text-primary-text">Live Preview</p>
                    <h3 className="mt-2 text-3xl font-black text-foreground">Qualification Card</h3>
                  </div>
                  <div className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-bold text-foreground">
                    {active + 1} / {steps.length}
                  </div>
                </motion.div>

                <div className="relative flex flex-1 items-center justify-center">
                  <motion.div
                    animate={shouldReduceMotion ? {} : { y: [0, -9, 0], rotateX: [0, 2.5, 0], rotateY: [0, -2.5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative h-[420px] w-[540px]" style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.15] blur-3xl" />

                    <motion.div
                      initial={{ opacity: 0, rotate: -8, x: -45, y: 38 }} animate={isInView ? { opacity: 1, rotate: -8, x: -45, y: 38 } : {}}
                      transition={{ duration: 0.75, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-10 rounded-[2rem] border border-border bg-hiw-glass"
                    />

                    <motion.div
                      initial={{ opacity: 0, rotate: 8, x: 45, y: 34 }} animate={isInView ? { opacity: 1, rotate: 8, x: 45, y: 34 } : {}}
                      transition={{ duration: 0.75, delay: 1.08, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-10 rounded-[2rem] border border-border bg-hiw-glass"
                    />

                    {/* Main Focus Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, y: 45 }} animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                      transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-border bg-hiw-glass-solid p-7 shadow-hiw-card backdrop-blur-2xl"
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,var(--hiw-gradient-1),transparent_38%),linear-gradient(135deg,rgba(0,0,0,0.02),transparent_45%,var(--hiw-gradient-2))]" />

                      <div className="relative flex h-full flex-col">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary-text">
                              <ShieldCheck className="h-3.5 w-3.5" /> Verified Pathway
                            </div>
                            <h4 className="mt-5 text-4xl font-black text-foreground">NVQ Journey</h4>
                            <p className="mt-2 text-sm text-muted">Complete your qualification step by step</p>
                          </div>

                          <AnimatePresence mode="wait">
                            <motion.div
                              key={active} initial={{ opacity: 0, scale: 0.7, rotate: -10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.7, rotate: 10 }} transition={{ duration: 0.35 }}
                              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary-text"
                            >
                              <ActiveIcon className="h-8 w-8" />
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        <div className="mt-9 grid grid-cols-2 gap-3">
                          {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isDone = index <= active;
                            const isCurrent = index === active;

                            return (
                              <motion.button
                                key={step.num} type="button" onClick={() => setActive(index)}
                                initial={{ opacity: 0, y: 24, scale: 0.94, filter: "blur(10px)" }}
                                animate={isInView ? { opacity: isDone ? 1 : 0.42, y: 0, scale: 1, filter: "blur(0px)" } : {}}
                                transition={{ duration: 0.55, delay: 1.38 + index * 0.14, ease: [0.22, 1, 0.36, 1] }}
                                className={`relative rounded-2xl border p-4 text-left transition ${isCurrent ? "border-hiw-active-border bg-hiw-active-bg" : isDone ? "border-hiw-done-border bg-hiw-done-bg" : "border-border bg-surface"}`}
                              >
                                <div className="mb-3 flex items-center justify-between">
                                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${isCurrent ? "bg-primary text-background" : isDone ? "bg-hiw-done-bg text-hiw-done-text" : "bg-surface text-muted"}`}>
                                    {index < active ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                                  </span>
                                  <span className="text-xs font-black text-primary-text">{step.num}</span>
                                </div>
                                <p className="text-sm font-black leading-tight text-foreground">{step.title}</p>
                                {isCurrent && (
                                  <motion.span layoutId="builderActiveDot" className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_var(--primary-shadow)]" />
                                )}
                              </motion.button>
                            );
                          })}
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 2.05, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-auto"
                        >
                          <div className="mb-2 flex justify-between text-xs font-black uppercase tracking-[0.18em] text-foreground">
                            <span>Completion</span>
                            <span>{Math.round(((active + 1) / steps.length) * 100)}%</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-border">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-primary via-emerald-500 to-cyan-500"
                              animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
                              transition={{ duration: 0.55, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Interactive Cards */}
            <div className="grid gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = active === index;
                const isDone = index < active;

                return (
                  <motion.button
                    key={step.num} type="button" onClick={() => setActive(index)}
                    initial={{ opacity: 0, x: 42, filter: "blur(14px)" }} animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                    transition={{ duration: 0.72, delay: 0.8 + index * 0.16, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={shouldReduceMotion ? undefined : { x: -8, transition: { duration: 0.22 } }}
                    className={`group relative overflow-hidden rounded-[2rem] border p-5 text-left backdrop-blur-2xl transition duration-500 ${isActive ? "border-hiw-active-border bg-hiw-active-bg shadow-lg" : "border-border bg-hiw-glass shadow-sm hover:border-primary/30"}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-surface via-transparent to-transparent opacity-70" />

                    <div className="relative flex items-start gap-4">
                      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition ${isActive ? "bg-primary text-background" : isDone ? "bg-hiw-done-bg text-hiw-done-text" : "bg-surface text-muted group-hover:text-primary-text"}`}>
                        {isDone ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center justify-between">
                          <p className={`text-xs font-black uppercase tracking-[0.22em] ${isActive ? "text-primary-text" : "text-foreground"}`}>Step {step.num}</p>
                          <ArrowRight className={`h-4 w-4 transition ${isActive ? "text-primary-text" : "text-muted group-hover:text-primary-text"}`} />
                        </div>

                        <h3 className="text-xl font-black text-foreground">{step.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted">{step.desc}</p>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -8 }} transition={{ duration: 0.35 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 space-y-2 border-t border-border pt-4">
                                {step.points.map((point) => (
                                  <div key={point} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary-text">
                                      <CheckCircle2 className="h-3.5 w-3.5" />
                                    </span>
                                    {point}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {isActive && !shouldReduceMotion && (
                      <motion.div layoutId="activeStepBorder" className="pointer-events-none absolute inset-0 rounded-[2rem] border border-hiw-active-border" transition={{ type: "spring", stiffness: 260, damping: 28 }} />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Improved Mobile Layout */}
        <div className="mx-auto mt-12 max-w-xl space-y-4 lg:hidden">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = active === index;

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 34, filter: "blur(12px)" }} animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.68, delay: 0.55 + index * 0.14, ease: [0.22, 1, 0.36, 1] }}
                className={`overflow-hidden rounded-3xl border backdrop-blur-xl transition duration-300 ${isActive ? "border-hiw-active-border bg-hiw-active-bg shadow-md" : "border-border bg-hiw-glass"}`}
              >
                <button type="button" onClick={() => setActive(index)} className="flex w-full items-start gap-4 p-5 text-left">
                  <div className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border transition ${isActive ? "border-hiw-active-border bg-primary text-background" : "border-border bg-surface text-muted"}`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <div className="min-w-0 flex-1 py-1">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-primary-text">Step {step.num}</p>
                    <h3 className="mt-1.5 text-base font-black text-foreground">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.desc}</p>
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -10 }} transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-5 pb-6 pt-4">
                        <p className="text-sm leading-relaxed text-foreground/90">{step.longDesc}</p>

                        <div className="mt-4 space-y-3">
                          {step.points.map((point) => (
                            <div key={point} className="flex items-center gap-3 text-sm font-semibold text-foreground">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary-text">
                                <CheckCircle2 className="h-3.5 w-3.5" />
                              </span>
                              {point}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
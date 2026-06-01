"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  CalendarDays,
  MapPin,
  Share2,
  Star,
  ShieldCheck,
  BookOpen,
  Users,
  BadgeCheck,
  BadgePoundSterling,
  CalendarCheck,
} from "lucide-react";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import coursesData from "../../../data/courses.json";
import AppointmentModal from "../../../components/AppointmentModal";

const tradeImages = {
  "general-labourer":
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80",
  carpentry:
    "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&w=1200&q=80",
  bricklaying:
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
  "painting-decorating":
    "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80",
  plastering:
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80",
  roofing:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80";

const cardBadgeClass = "border-lime-400/25 bg-lime-400/10 text-lime-200";

export default function CourseDetail() {
  const params = useParams();
  const [appointmentCourse, setAppointmentCourse] = useState(null);

  const tradeSlug = params.slug;
  const trade = coursesData.find((item) => item.slug === tradeSlug);

  if (!trade) {
    return (
      <div className="min-h-screen bg-[#020202] text-white">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-4 pt-24">
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-8 text-center">
            <h1 className="text-3xl font-black text-white">Course Not Found</h1>
            <Link
              href="/courses"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-black text-black"
            >
              Back to Courses
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const imgSrc = tradeImages[trade.slug] || DEFAULT_IMAGE;
  const firstLevel = trade.levels[0];
  const levelList = trade.levels.map((level) => level.level).join(", ");
  const cardList = [...new Set(trade.levels.map((level) => level.card))].filter(Boolean);
  const tierList = [...new Set(trade.levels.map((level) => level.tier))].filter(Boolean);
  const pricedLevels = trade.levels.filter(
    (level) => level.bookingType === "booking" && level.price > 0
  );
  const minPrice = pricedLevels.length
    ? Math.min(...pricedLevels.map((level) => level.price))
    : null;

  const handleShare = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: trade.trade,
          text: trade.description,
          url: window.location.href,
        });
      }
    } catch {
      // Share cancellation does not need user-facing feedback.
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#020202] text-white">
      <Navbar />

      <main className="relative pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-px bg-lime-400/35" />
          <div className="absolute left-1/2 top-0 h-[430px] w-[760px] -translate-x-1/2 rounded-full bg-lime-400/[0.055] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:72px_72px]" />
        </div>

        <div className="relative mx-auto max-w-[1380px] px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-7 flex items-center justify-between gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-bold text-white/70 transition hover:border-lime-400/35 hover:bg-lime-400/10 hover:text-lime-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-bold text-white/70 transition hover:border-lime-400/35 hover:bg-lime-400/10 hover:text-lime-200"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            <div className="space-y-5 lg:col-span-8">
              <motion.section
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#070707]/88 shadow-[0_24px_70px_rgba(0,0,0,0.45),0_0_34px_rgba(163,230,53,0.08)] backdrop-blur-2xl"
              >
                <div className="grid md:grid-cols-[350px_1fr]">
                  <div className="relative min-h-[320px] p-3">
                    <img
                      src={imgSrc}
                      alt={trade.trade}
                      className="h-full w-full rounded-xl object-cover"
                    />
                    <div className="absolute inset-3 rounded-xl bg-black/20" />
                    <div className="absolute bottom-7 left-7 rounded-full border border-white/20 bg-black/55 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-xl">
                      Level {levelList}
                    </div>
                  </div>

                  <div className="p-6 lg:p-8">
                    <div className="mb-5 flex flex-wrap gap-2">
                      {cardList.map((card) => (
                        <span
                          key={card}
                          className={`rounded-full border px-3 py-1.5 text-[11px] font-bold ${cardBadgeClass}`}
                        >
                          {card}
                        </span>
                      ))}
                    </div>

                    <h1 className="text-4xl font-black leading-[1.04] text-white sm:text-5xl">
                      {trade.trade}
                    </h1>

                    <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-white/50">
                      <span>Level {levelList}</span>
                      <span className="h-1 w-1 rounded-full bg-white/25" />
                      <span>{tierList.join(", ")}</span>
                    </div>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-white/62">
                      {trade.info || trade.description}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-3">
                      {[
                        { icon: BookOpen, label: "Pathways", value: trade.levels.length },
                        { icon: ShieldCheck, label: "Card Route", value: cardList[0] || "CSCS" },
                        { icon: Users, label: "Support", value: "Advisor led" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl border border-white/10 bg-white/[0.035] p-4"
                        >
                          <item.icon className="h-4 w-4 text-lime-300" />
                          <div className="mt-3 text-[11px] font-bold text-white/40">
                            {item.label}
                          </div>
                          <div className="mt-1 text-sm font-black text-white">
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>

              <InfoStrip
                items={[
                  { title: "Duration", value: "Advisor guided", icon: Clock3 },
                  { title: "Levels", value: `Level ${levelList}`, icon: BadgeCheck },
                  { title: "Certification", value: cardList.join(", "), icon: ShieldCheck },
                  { title: "Assessment", value: "On-site evidence", icon: Users },
                ]}
              />

              <SectionCard title="About This Qualification">
                <p className="max-w-3xl text-sm leading-8 text-white/62">
                  {trade.description}
                </p>

                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {(trade.benefits || []).map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lime-300" />
                      <p className="text-sm leading-7 text-white/68">{benefit}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Available Pathways">
                <div className="space-y-3">
                  {trade.levels.map((level) => (
                    <div
                      key={level.id}
                      className="rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-lime-400/30 hover:bg-lime-400/[0.045]"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="text-[11px] font-black text-lime-300">
                            Level {level.level}
                          </div>
                          <h3 className="mt-2 text-lg font-black text-white">
                            {level.course}
                          </h3>
                          <p className="mt-2 text-sm text-white/50">
                            {level.card} - {level.tier}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            setAppointmentCourse({
                              trade: trade.trade,
                              course: level.course,
                            })
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-black text-black transition hover:bg-lime-300 hover:shadow-[0_0_28px_rgba(163,230,53,0.25)]"
                        >
                          <CalendarCheck className="h-4 w-4" />
                          {level.bookingType === "booking" ? "Book Appointment" : "Talk to Advisor"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-5">
                <div className="rounded-2xl border border-white/10 bg-[#070707]/88 p-6 shadow-[0_20px_62px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-white/40">
                        Starting From
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-5xl font-black text-white">
                        {minPrice !== null ? (
                          <>
                            <BadgePoundSterling className="h-8 w-8 text-lime-300" />
                            {"\u00a3"}
                            {minPrice}
                          </>
                        ) : (
                          <span className="text-3xl text-lime-300">Quote</span>
                        )}
                      </div>
                    </div>

                    <div className="rounded-xl border border-lime-400/25 bg-lime-400/10 px-3 py-2 text-xs font-bold text-lime-200">
                      {cardList[0] || "CSCS"}
                    </div>
                  </div>

                  <div className="mb-7 space-y-4">
                    {[
                      "Advisor guidance and pathway check",
                      "Qualification route matched to your role",
                      "CSCS card support where applicable",
                      "Clear next steps before you book",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-white/66">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lime-300" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setAppointmentCourse({
                        trade: trade.trade,
                        course: firstLevel.course,
                      })
                    }
                    className="h-14 w-full rounded-xl bg-lime-400 text-sm font-black text-black transition hover:bg-lime-300 hover:shadow-[0_0_32px_rgba(163,230,53,0.26)]"
                  >
                    Book an Appointment
                  </button>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <MiniInfo icon={CalendarDays} label="Availability" value="Flexible" />
                    <MiniInfo icon={MapPin} label="Location" value="UK Wide" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-2xl">
                  <h3 className="text-2xl font-black text-white">Course Provider</h3>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-lime-400 bg-black text-lg font-black text-white">
                      CT
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-white">
                          Construction Training
                        </h4>
                        <BadgeCheck className="h-4 w-4 text-lime-300" />
                      </div>
                      <p className="mt-1 text-sm text-white/45">
                        Approved Training Centre
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {[
                      { icon: BadgeCheck, text: "CITB Approved" },
                      { icon: Star, text: "High Pass Rate" },
                      { icon: Users, text: "10,000+ Students Trained" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-3 text-sm text-white/64">
                        <item.icon className="h-5 w-5 text-lime-300" />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={imgSrc}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/65" />
                  <div className="relative z-10 flex min-h-[360px] flex-col justify-end p-6">
                    <div className="rounded-2xl border border-white/10 bg-black/55 p-5 backdrop-blur-xl">
                      <h3 className="text-2xl font-black leading-tight text-white">
                        Start with clear guidance
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/62">
                        Speak with our advisors and confirm the right level, trade
                        route and card before moving forward.
                      </p>
                      <button
                        onClick={() =>
                          setAppointmentCourse({
                            trade: trade.trade,
                            course: firstLevel.course,
                          })
                        }
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-black text-black transition hover:bg-lime-300"
                      >
                        Get Guidance
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <AppointmentModal
        open={Boolean(appointmentCourse)}
        onClose={() => setAppointmentCourse(null)}
        course={appointmentCourse}
      />

      <Footer />
    </div>
  );
}

function InfoStrip({ items }) {
  return (
    <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-[#070707]/88 shadow-[0_18px_52px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="border-b border-white/10 p-5 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-lime-400/25 bg-lime-400/10">
              <item.icon className="h-5 w-5 text-lime-300" />
            </div>
            <div>
              <div className="text-xs font-bold text-white/40">{item.title}</div>
              <div className="mt-1 text-sm font-black text-white">{item.value}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#070707]/88 p-6 shadow-[0_18px_52px_rgba(0,0,0,0.38)] backdrop-blur-2xl lg:p-8">
      <h2 className="mb-6 text-3xl font-black leading-tight text-white">{title}</h2>
      {children}
    </section>
  );
}

function MiniInfo({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
      <div className="mb-2 flex items-center gap-2 text-white/45">
        <Icon className="h-4 w-4 text-lime-300" />
        <span className="text-xs font-bold">{label}</span>
      </div>
      <div className="text-sm font-black text-white">{value}</div>
    </div>
  );
}

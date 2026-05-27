"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CalendarDays,
  MapPin,
  Share2,
  Star,
  ChevronDown,
  ShieldCheck,
  BookOpen,
  Users,
  BadgeCheck,
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
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80";

export default function CourseDetail() {
  const params = useParams();
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  const tradeSlug = params.slug;

  const trade = coursesData.find((t) => t.slug === tradeSlug);

  if (!trade) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fb]">
        <h1 className="text-3xl font-bold text-[#111827]">
          Course Not Found
        </h1>
      </div>
    );
  }

  const imgSrc = tradeImages[trade.slug] || DEFAULT_IMAGE;

  const firstLevel = trade.levels[0];

  const curriculum = [
    {
      title: "Health and Safety at Work",
      desc: "Understand key health and safety responsibilities on site.",
      time: "30 min",
    },
    {
      title: "Construction Site Hazards",
      desc: "Identify common hazards and how to control them.",
      time: "30 min",
    },
    {
      title: "Environment Awareness",
      desc: "Learn how construction impacts the environment.",
      time: "20 min",
    },
    {
      title: "The Test",
      desc: "CITB Health, Safety & Environment Test.",
      time: "40 min",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] overflow-hidden">
      <Navbar />

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* TOP */}
        <div className="flex items-center justify-between mb-7">
          <Link
            href="/courses"
            className="flex items-center gap-2 text-[15px] font-medium text-[#4B5563] hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>

          <button className="flex items-center gap-2 text-[15px] font-medium text-[#4B5563] hover:text-black transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT */}
          <div className="lg:col-span-8 space-y-5">
            {/* HERO */}
            <div className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden shadow-sm">
              <div className="grid md:grid-cols-[340px_1fr]">
                {/* IMAGE */}
                <div className="relative h-full min-h-[300px] p-4">
                  <img
                    src={imgSrc}
                    alt={trade.trade}
                    className="w-full h-full rounded-3xl object-cover"
                  />


                </div>

                {/* CONTENT */}
                <div className="p-7">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="inline-flex items-center px-3 h-8 rounded-lg bg-[#EDF7EE] text-[#46A758] text-[13px] font-semibold mb-5">
                        Green CSCS Card
                      </div>

                      <h1 className="text-[46px] leading-[1.1] tracking-[-1.5px] font-bold text-[#111827] mb-5">
                        {trade.trade}
                      </h1>

                      <div className="flex items-center gap-3 text-[15px] text-[#4B5563] mb-6">
                        <span>Level {firstLevel.level}</span>

                        <span className="w-1 h-1 rounded-full bg-[#9CA3AF]" />

                        <span>Labourer</span>
                      </div>

                      <p className="text-[15px] leading-8 text-[#4B5563] max-w-[650px]">
                        {trade.info}
                      </p>

                      <div className="flex flex-wrap gap-7 mt-7">
                        <div className="flex items-center gap-2 text-[14px] text-[#4B5563]">
                          <BookOpen className="w-4 h-4" />
                          Level 1
                        </div>

                        <div className="flex items-center gap-2 text-[14px] text-[#4B5563]">
                          <ShieldCheck className="w-4 h-4" />
                          2 Courses
                        </div>

                        <div className="flex items-center gap-2 text-[14px] text-[#4B5563]">
                          <Users className="w-4 h-4" />
                          Beginner Friendly
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* INFO STRIP */}
              <div className="border-t border-[#E5E7EB] grid grid-cols-2 md:grid-cols-4 mt-4">
                {[
                  {
                    title: "Duration",
                    value: "1 Day",
                    icon: Clock3,
                  },
                  {
                    title: "Level",
                    value: "Level 1",
                    icon: BadgeCheck,
                  },
                  {
                    title: "Certification",
                    value: "Green CSCS Card",
                    icon: ShieldCheck,
                  },
                  {
                    title: "Suitable For",
                    value: "Labourers",
                    icon: Users,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-5 border-r last:border-r-0 border-[#E5E7EB]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#EDF7EE] flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-[#46A758]" />
                      </div>

                      <div>
                        <div className="text-[13px] text-[#6B7280] mb-1">
                          {item.title}
                        </div>

                        <div className="text-[15px] font-semibold text-[#111827]">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ABOUT */}
            <div className="bg-white border border-[#E5E7EB] rounded-[22px] p-8">
              <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-center">
                <div>
                  <h2 className="text-[34px] leading-tight font-bold tracking-[-1px] text-[#111827] mb-5">
                    About This Course
                  </h2>

                  <p className="text-[15px] leading-8 text-[#4B5563] mb-8">
                    This course prepares you for the CITB Health, Safety &
                    Environment Test required for the Green CSCS Card.
                  </p>

                  <div className="space-y-5">
                    {(trade.benefits || []).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-full bg-[#EDF7EE] flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-[#46A758]" />
                        </div>

                        <p className="text-[15px] font-medium text-[#374151] leading-7">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-[#46A758]/10 blur-3xl rounded-full" />

                  <div className="relative rotate-[-8deg] hover:rotate-0 transition-all duration-500 bg-gradient-to-br from-[#46A758] to-[#5CC96B] rounded-[26px] h-[220px] shadow-[0_20px_80px_rgba(70,167,88,0.35)] p-7 text-white flex flex-col justify-between">
                    <div className="text-4xl font-bold">CSCS</div>

                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-white/20 mb-4" />

                      <div className="text-sm leading-6 font-medium">
                        Construction Skills Certification Scheme
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CURRICULUM */}
            <div className="bg-white border border-[#E5E7EB] rounded-[22px] p-8">
              <h2 className="text-[32px] font-bold tracking-[-1px] text-[#111827] mb-8">
                Curriculum
              </h2>

              <div className="space-y-1">
                {curriculum.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-5 border-b border-[#ECEFF3] last:border-none"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-11 h-11 rounded-full bg-[#EDF7EE] text-[#46A758] font-semibold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>

                      <div>
                        <h3 className="text-[17px] font-semibold text-[#111827] mb-1">
                          {item.title}
                        </h3>

                        <p className="text-[14px] text-[#6B7280]">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-2 text-[14px] text-[#6B7280]">
                        <Clock3 className="w-4 h-4" />
                        {item.time}
                      </div>

                      <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-5">
              {/* PRICE CARD */}
              <div className="bg-white border border-[#E5E7EB] rounded-[22px] p-7 shadow-sm">
                <div className="flex items-start justify-between mb-8">
                  <div className="text-[52px] leading-none font-bold tracking-[-2px] text-[#111827]">
                    £{firstLevel.price}
                  </div>

                  <div className="px-4 h-10 rounded-xl bg-[#EDF7EE] text-[#46A758] text-[13px] font-semibold flex items-center">
                    Green CSCS Card
                  </div>
                </div>

                <div className="space-y-5 mb-8">
                  {[
                    "Course training & materials",
                    "CITB Health, Safety & Environment Test",
                    "Green CSCS Card application",
                    "Certificate of completion",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 text-[15px] text-[#374151]"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#46A758] shrink-0 mt-0.5" />

                      {item}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setAppointmentOpen(true)}
                  className="w-full h-14 rounded-xl bg-[#46A758] hover:bg-[#3d944e] transition-all text-white text-[17px] font-semibold shadow-lg shadow-green-100"
                >
                  Book an Appointment
                </button>

                <div className="mt-5 border border-[#ECEFF3] rounded-[18px] p-5 flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="w-5 h-5 text-[#6B7280] mt-0.5" />

                    <div>
                      <div className="text-[13px] text-[#6B7280] mb-1">
                        Next Available Date
                      </div>

                      <div className="text-[15px] font-semibold text-[#111827]">
                        Tomorrow, 10:00 AM
                      </div>
                    </div>
                  </div>

                  <ChevronDown className="-rotate-90 w-4 h-4 text-[#6B7280]" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5">
                  <div className="border border-[#ECEFF3] rounded-[18px] p-5">
                    <div className="flex items-center gap-2 text-[#6B7280] mb-2">
                      <Clock3 className="w-4 h-4" />
                      <span className="text-[13px]">Duration</span>
                    </div>

                    <div className="text-[15px] font-semibold text-[#111827]">
                      1 Day
                    </div>
                  </div>

                  <div className="border border-[#ECEFF3] rounded-[18px] p-5">
                    <div className="flex items-center gap-2 text-[#6B7280] mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-[13px]">Location</span>
                    </div>

                    <div className="text-[15px] font-semibold text-[#111827]">
                      Training Centre
                    </div>
                  </div>
                </div>
              </div>

              {/* PROVIDER */}
              <div className="bg-white border border-[#E5E7EB] rounded-[22px] p-7">
                <h3 className="text-[30px] tracking-[-1px] font-bold text-[#111827] mb-7">
                  Course Provider
                </h3>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#111827] text-white flex items-center justify-center text-xl font-bold border-[3px] border-[#46A758]">
                    CT
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-[18px] font-semibold text-[#111827]">
                        Construction Training
                      </h4>

                      <BadgeCheck className="w-4 h-4 text-[#46A758]" />
                    </div>

                    <p className="text-[14px] text-[#6B7280]">
                      Approved Training Centre
                    </p>
                  </div>
                </div>

                <div className="space-y-5 mb-8">
                  <div className="flex items-center gap-3 text-[15px] text-[#374151]">
                    <BadgeCheck className="w-5 h-5 text-[#46A758]" />
                    CITB Approved
                  </div>

                  <div className="flex items-center gap-3 text-[15px] text-[#374151]">
                    <Star className="w-5 h-5 text-[#46A758]" />
                    99% Pass Rate
                  </div>

                  <div className="flex items-center gap-3 text-[15px] text-[#374151]">
                    <Users className="w-5 h-5 text-[#46A758]" />
                    10,000+ Students Trained
                  </div>
                </div>

                <button className="w-full h-12 rounded-xl border border-[#D8DEE6] hover:bg-[#F8FAFC] transition-all text-[15px] font-semibold text-[#111827]">
                  View Provider Profile
                </button>
              </div>

              {/* CTA */}
              <div className="relative overflow-hidden rounded-[24px] min-h-[420px]">
                <img
                  src={imgSrc}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/45" />

                <div className="relative z-10 h-full p-7 flex items-end">
                  <div className="bg-white/90 backdrop-blur-xl rounded-[22px] p-6">
                    <h3 className="text-[34px] leading-tight font-bold tracking-[-1px] text-[#111827] mb-4">
                      Start Your Construction Career with Confidence
                    </h3>

                    <p className="text-[15px] leading-7 text-[#4B5563] mb-6">
                      Join thousands who’ve taken the first step towards a safer
                      and more successful career in construction.
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-11 h-11 rounded-full border-2 border-white bg-[#D1D5DB]"
                          />
                        ))}
                      </div>

                      <div className="px-4 h-11 rounded-full bg-[#46A758] text-white text-sm font-semibold flex items-center">
                        10K+
                      </div>
                    </div>

                    <div className="text-[14px] text-[#4B5563] mt-4">
                      Students trained and certified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppointmentModal
        open={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
        course={{
          trade: trade.trade,
          course: firstLevel.course,
        }}
      />

      <Footer />
    </div>
  );
}

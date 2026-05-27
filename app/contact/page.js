"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  CheckCircle2,
  Clock3,
  ExternalLink,
  Headphones,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  Users,
} from "lucide-react";

const offices = [
  {
    name: "London Office",
    badge: "Head Office",
    phone: "02039038106",
    email: "support@getworktraining.co.uk",
    address:
      "Westminster Business Centre, Unit F, Britannia Estate, Printing House lane, Hayes UB3 1AP Middlesex",
    hours: "Mon - Fri: 7:00 AM - 7:00 PM",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80",
    map:
      "https://www.google.com/maps?ll=51.508923,-0.424033&z=16&t=m&hl=en&gl=IN&mapclient=embed&cid=11823234784383421876&output=embed",
    mapLink:
      "https://www.google.com/maps?ll=51.508923,-0.424033&z=16&t=m&hl=en&gl=IN&mapclient=embed&cid=11823234784383421876",
  },
  {
    name: "Walsall Office",
    badge: "Training Centre",
    phone: "02039038106",
    email: "support@getworktraining.co.uk",
    address: "246 Green Lane, Walsall, WS2 8HS",
    hours: "Sat - Sun: 8:00 AM - 4:00 PM",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=700&q=80",
    map:
      "https://www.google.com/maps?cid=14609172424618549640&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed&output=embed",
    mapLink:
      "https://www.google.com/maps?cid=14609172424618549640&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed",
  },
];

const heroFeatures = [
  {
    icon: Users,
    title: "Expert Guidance",
    text: "Get personalised support from our experts",
  },
  {
    icon: Headphones,
    title: "Quick Response",
    text: "We aim to respond within 24 hours",
  },
  {
    icon: MapPin,
    title: "Two Convenient Locations",
    text: "Visit us at either of our office locations",
  },
  {
    icon: MessageSquareText,
    title: "Multiple Contact Options",
    text: "Reach us via phone, email or contact form",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

function ContactContent() {
  const searchParams = useSearchParams();
  const trade = searchParams.get("trade");
  const level = searchParams.get("level");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="flex-grow bg-white">
      <section
        className="relative overflow-hidden border-b border-gray-100 bg-cover bg-center"
        style={{ backgroundImage: "url('/contactt.png')" }}
      >
        {/* <div className="absolute inset-0 bg-white/78" /> */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-28 md:pb-20 text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-secondary mb-6"
          >
            Contact <span className="text-primary">Us</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.08 }}
            className="text-base md:text-lg text-muted leading-8 max-w-2xl mx-auto"
          >
            We're here to help you take the next step in your construction career. Get in touch with our team today.
          </motion.p>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 max-w-5xl mx-auto mt-12"
          >
            {heroFeatures.map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/12 text-primary flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-extrabold text-secondary mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-6">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-secondary mb-3">
              Our Locations
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted mb-8">
              Visit us at either of our convenient office locations.
            </motion.p>

            <motion.div variants={stagger} className="space-y-6">
              {offices.map((office) => (
                <motion.article
                  key={office.name}
                  variants={fadeUp}
                  className="bg-white rounded-[18px] border border-gray-100 shadow-[0_18px_60px_rgba(15,23,42,0.08)] p-5"
                >
                  <div className="grid sm:grid-cols-[210px_1fr] gap-6">
                    <img
                      src={office.image}
                      alt={office.name}
                      className="w-full h-[210px] sm:h-full min-h-[190px] object-cover rounded-xl"
                    />
                    <div className="py-1">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/12 text-primary text-xs font-extrabold mb-4">
                        {office.badge}
                      </span>
                      <h3 className="text-2xl font-extrabold text-secondary mb-5">
                        {office.name}
                      </h3>
                      <div className="space-y-4 text-sm text-muted">
                        <ContactLine icon={MapPin}>{office.address}</ContactLine>
                        <ContactLine icon={Phone}>{office.phone}</ContactLine>
                        <ContactLine icon={Mail}>{office.email}</ContactLine>
                        <ContactLine icon={Clock3}>{office.hours}</ContactLine>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-secondary mb-3">
              Send Us a Message
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted mb-8">
              Fill out the form below and we'll get back to you as soon as possible.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-[22px] border border-gray-100 
shadow-[0_20px_70px_rgba(15,23,42,0.10)] bg-white/80 backdrop-blur-xl p-6 sm:p-10">

              {/* subtle decorative glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 blur-3xl rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/10 blur-3xl rounded-full" />

              {submitted ? (
                <div className="text-center py-24 relative">
                  <div className="w-18 h-18 bg-primary/15 text-primary rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-secondary mb-2">
                    Message Sent
                  </h3>
                  <p className="text-muted text-sm">
                    Our team will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                  {trade && (
                    <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
                      <p className="text-sm font-semibold text-primary">
                        Inquiry about{" "}
                        <strong className="uppercase">{trade.replace("-", " ")}</strong>
                        {level && <span> • Level {level}</span>}
                      </p>
                    </div>
                  )}

                  {/* GRID INPUTS */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full Name" required>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 
            bg-white/70 focus:bg-white outline-none
            focus:ring-2 focus:ring-primary/30 focus:border-primary
            transition shadow-sm"
                      />
                    </Field>

                    <Field label="Email Address" required>
                      <input
                        required
                        type="email"
                        placeholder="john@email.com"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 
            bg-white/70 focus:bg-white outline-none
            focus:ring-2 focus:ring-primary/30 focus:border-primary
            transition shadow-sm"
                      />
                    </Field>

                    <Field label="Phone Number">
                      <input
                        type="tel"
                        placeholder="+91 00000 00000"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 
            bg-white/70 focus:bg-white outline-none
            focus:ring-2 focus:ring-primary/30 focus:border-primary
            transition shadow-sm"
                      />
                    </Field>

                    <Field label="Subject" required>
                      <select
                        required
                        defaultValue=""
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 
            bg-white/70 focus:bg-white outline-none
            focus:ring-2 focus:ring-primary/30 focus:border-primary
            transition shadow-sm"
                      >
                        <option value="" disabled>Select a subject</option>
                        <option>Course information</option>
                        <option>NVQ qualification</option>
                        <option>CSCS card support</option>
                        <option>Appointment request</option>
                      </select>
                    </Field>
                  </div>

                  {/* MESSAGE */}
                  <Field label="Message" required>
                    <textarea
                      required
                      rows="6"
                      placeholder="Write your message..."
                      defaultValue={
                        trade
                          ? `I am interested in ${trade.replace("-", " ")}${level ? ` level ${level}` : ""
                          }. Please provide more details.`
                          : ""
                      }
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 
          bg-white/70 focus:bg-white outline-none resize-none
          focus:ring-2 focus:ring-primary/30 focus:border-primary
          transition shadow-sm min-h-[180px]"
                    />
                  </Field>

                  {/* TERMS */}
                  <label className="flex items-start gap-3 text-xs text-muted">
                    <input type="checkbox" required className="mt-1 accent-primary scale-110" />
                    <span className="leading-5">
                      I agree to the{" "}
                      <span className="text-primary font-semibold">Privacy Policy</span> and{" "}
                      <span className="text-primary font-semibold">Terms & Conditions</span>
                    </span>
                  </label>

                  {/* BUTTON */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="h-12 px-10 rounded-xl bg-primary text-white font-bold text-sm
          shadow-lg shadow-primary/20 hover:shadow-primary/30
          hover:scale-[1.02] active:scale-[0.98]
          transition flex items-center gap-2"
                    >
                      Send Message
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid lg:grid-cols-2 gap-10 mt-14 lg:mt-20"
        >
          {offices.map((office) => (
            <motion.div key={`${office.name}-map`} variants={fadeUp}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-extrabold tracking-[0.22em] uppercase text-primary">
                  {office.name}
                </h3>
                <a
                  href={office.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-secondary"
                >
                  View on Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="relative overflow-hidden rounded-[18px] border border-gray-100 bg-gray-100 shadow-sm">
                <iframe
                  src={office.map}
                  title={`${office.name} map`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[300px] border-0"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="bg-[linear-gradient(90deg,#f3f8e8,#ffffff)] border-y border-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid lg:grid-cols-[1fr_auto_auto] gap-5 items-center"
          >
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center shadow-sm">
                <Headphones className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-secondary">
                  Need Immediate Assistance?
                </h2>
                <p className="text-sm text-muted">
                  Call us now for instant support from our team.
                </p>
              </div>
            </div>

            {offices.map((office) => (
              <motion.a
                key={`${office.name}-phone`}
                variants={fadeUp}
                href={`tel:${office.phone}`}
                className="bg-white rounded-xl border border-gray-100 px-6 py-4 min-w-[260px] flex items-center gap-4 shadow-sm hover:border-primary"
              >
                <span className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </span>
                <span>
                  <strong className="block text-lg leading-none text-secondary">
                    {office.phone}
                  </strong>
                  <span className="text-xs text-muted">{office.name}</span>
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-secondary mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}

function ContactLine({ icon: Icon, children }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-primary mt-1 shrink-0" />
      <span className="leading-6">{children}</span>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col pt-20">
      <Navbar />
      <Suspense fallback={<div className="flex-grow flex items-center justify-center">Loading...</div>}>
        <ContactContent />
      </Suspense>
      <Footer />
    </div>
  );
}

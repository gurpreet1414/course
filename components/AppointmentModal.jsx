"use client";

import React, { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Clock3, Mail, Phone, Send, X } from "lucide-react";

const timeSlots = ["09:30", "10:30", "11:30", "13:00", "14:00", "15:30"];

export default function AppointmentModal({ open, onClose, course }) {
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState(timeSlots[1]);
  const [submitted, setSubmitted] = useState(false);

  const title = course?.course || course?.trade || "Training consultation";

  const disabledDays = useMemo(
    () => [
      { before: new Date() },
      { dayOfWeek: [0] },
    ],
    []
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-secondary/60 backdrop-blur-sm px-4 py-6 overflow-y-auto"
        >
          <div className="min-h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              className="relative w-full max-w-5xl bg-white rounded-[24px] shadow-2xl overflow-hidden"
            >
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 z-10 w-10 h-10 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-secondary hover:bg-gray-50"
                aria-label="Close appointment calendar"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="p-10 sm:p-14 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/15 text-primary mx-auto mb-5 flex items-center justify-center">
                    <CalendarCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-secondary mb-3">
                    Appointment Request Sent
                  </h2>
                  <p className="text-muted max-w-xl mx-auto">
                    Thanks. Getwork Training will confirm your preferred date and time shortly.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 px-7 py-3 rounded-xl bg-secondary text-white font-semibold hover:bg-primary hover:text-secondary"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-[360px_1fr]">
                  <aside className="bg-secondary text-white p-8 sm:p-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-sm font-semibold mb-8">
                      <CalendarCheck className="w-4 h-4 text-primary" />
                      Book an appointment
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
                      Choose a time to speak with our training team.
                    </h2>
                    <p className="text-white/75 leading-7 mb-8">
                      We will help you pick the right qualification, NVQ level, CSCS route and next steps.
                    </p>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-primary" />
                        02039038106
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-primary" />
                        support@getworktraining.co.uk
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock3 className="w-4 h-4 text-primary" />
                        Monday to Saturday
                      </div>
                    </div>
                  </aside>

                  <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10">
                    <div className="mb-6">
                      <div className="text-sm font-semibold text-primary mb-2">
                        Appointment for
                      </div>
                      <h3 className="text-2xl font-extrabold text-secondary">
                        {title}
                      </h3>
                    </div>

                    <div className="grid xl:grid-cols-[1fr_240px] gap-7">
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={disabledDays}
                        className="appointment-calendar"
                      />

                      <div>
                        <label className="block text-sm font-bold text-secondary mb-3">
                          Preferred time
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((slot) => (
                            <button
                              type="button"
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`h-11 rounded-xl border text-sm font-semibold ${
                                selectedTime === slot
                                  ? "bg-secondary text-white border-secondary"
                                  : "bg-white border-gray-200 text-secondary hover:border-primary"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mt-7">
                      <input
                        required
                        placeholder="Full name"
                        className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/15"
                      />
                      <input
                        required
                        type="tel"
                        placeholder="Phone number"
                        className="h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/15"
                      />
                      <input
                        required
                        type="email"
                        placeholder="Email address"
                        className="sm:col-span-2 h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/15"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!selectedDate}
                      className="mt-6 w-full h-[52px] rounded-xl bg-primary text-secondary font-extrabold flex items-center justify-center gap-2 hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Request Appointment
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

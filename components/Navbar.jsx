"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronDown, User } from "lucide-react";
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

const NavLink = ({ title, href, dropdown }) => (
  <Link href={href} className="relative flex items-center gap-1 cursor-pointer py-2 group">
    <span className="text-base lg:text-lg font-semibold text-black hover:text-primary transition-colors">
      {title}
    </span>

    {dropdown && (
      <ChevronDown className="w-4 h-4 text-muted group-hover:text-primary" />
    )}
  </Link>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">

          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <div className="relative w-[140px] sm:w-[180px] md:w-[220px] h-[50px] sm:h-[60px] md:h-[70px]">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_ITEMS.map((item, i) => (
              <NavLink
                key={i}
                title={item.title}
                href={item.href}
                dropdown={item.dropdown}
              />
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/login"
              className="flex items-center gap-2 text-lg font-bold  hover:text-primary"
            >
              <User className="w-5 h-5" />
              Login
            </Link>

            <div className="flex items-center gap-3 border-l pl-6">
              <Phone className="w-4 h-4 text-primary" />
              <div className="leading-tight">
                <p className="text-sm font-bold">02039038106</p>
                <p className="text-[10px] text-gray-500">Mon - Fri 8am - 6pm</p>
              </div>
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white border-t"
          >
            <div className="px-4 py-5 space-y-4">
              {NAV_ITEMS.map((item, i) => (
                <Link
                  key={i}
                  href="#"
                  className="block py-2 border-b text-sm font-medium"
                >
                  {item.title}
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Link href="/login" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Login
                </Link>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="font-semibold">02039038106</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
"use client";

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

function Footer({ dark = false }) {
  const bg = dark ? "bg-[#020202]" : "bg-[#fafafa]";
  const borderTop = dark ? "border-t border-white/5" : "border-t border-gray-100";
  const headingColor = dark ? "text-white" : "text-foreground";
  const linkColor = dark ? "text-white hover:text-lime-400" : "text-muted hover:text-primary";
  const mutedText = dark ? "text-white" : "text-muted";
  const socialBorder = dark ? "border-white/10 text-white hover:text-lime-400 hover:border-lime-400/40" : "border-gray-200 text-muted hover:text-primary hover:border-primary";
  const bottomBorder = dark ? "border-t border-white/5" : "border-t border-gray-200";

  return (
    <footer className={`${bg} pt-16 pb-8 ${borderTop}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">

          {/* Logo & Socials */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link href="/" className="mb-6 flex items-center">
              <div className="relative h-[54px] w-[180px]">
                <Image
                  src="/backlogo.png"
                  alt="Logo"
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="#" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${socialBorder}`}>
                <FaFacebook className="w-4 h-4" />
              </Link>
              <Link href="#" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${socialBorder}`}>
                <FaInstagram className="w-4 h-4" />
              </Link>
              <Link href="#" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${socialBorder}`}>
                <FaLinkedin className="w-4 h-4" />
              </Link>
              <Link href="#" className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${socialBorder}`}>
                <FaYoutube className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-3">
            <h4 className={`text-sm font-bold mb-2 ${headingColor}`}>Courses</h4>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>CITB Courses</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>NEBOSH Courses</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>IOSH Courses</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>First Aid Courses</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>View All Courses</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className={`text-sm font-bold mb-2 ${headingColor}`}>NVQ</h4>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>Carpentry NVQ</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>Bricklaying NVQ</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>Painting NVQ</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>Plastering NVQ</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>All Trades</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className={`text-sm font-bold mb-2 ${headingColor}`}>CSCS Cards</h4>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>Blue CSCS Card</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>Gold CSCS Card</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>Black CSCS Card</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>Green CSCS Card</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>CSCS Card Guide</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className={`text-sm font-bold mb-2 ${headingColor}`}>Support</h4>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>How It Works</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>FAQ</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>Documents</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>Terms & Conditions</Link>
            <Link href="#" className={`text-xs font-medium transition-colors ${linkColor}`}>Privacy Policy</Link>
          </div>

        </div>

        {/* Bottom Section */}
        <div className={`flex flex-col md:flex-row justify-between items-center pt-8 gap-4 ${bottomBorder}`}>
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-8 items-center md:items-start text-xs font-medium ${mutedText}`}>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              <span>020 1234 5678</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              <span>info@ukqualify.co.uk</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>London, United Kingdom</span>
            </div>
          </div>
          <p className={`text-xs font-medium ${mutedText}`}>
            &copy; 2024. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

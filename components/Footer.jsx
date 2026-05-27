"use client";

import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
function Footer() {
  return (
    <footer className="bg-[#fafafa] pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">

          {/* Logo & Socials */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-lg">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground leading-none">UK Qualify</span>
                <span className="text-[10px] text-muted font-medium mt-1">Courses | NVQ | CSCS</span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors">
                <FaFacebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors">
                <FaInstagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors">
                <FaLinkedin className="w-4 h-4" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors">
                <FaYoutube className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-foreground mb-2">Courses</h4>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">CITB Courses</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">NEBOSH Courses</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">IOSH Courses</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">First Aid Courses</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">View All Courses</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-foreground mb-2">NVQ</h4>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">Carpentry NVQ</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">Bricklaying NVQ</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">Painting NVQ</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">Plastering NVQ</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">All Trades</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-foreground mb-2">CSCS Cards</h4>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">Blue CSCS Card</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">Gold CSCS Card</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">Black CSCS Card</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">Green CSCS Card</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">CSCS Card Guide</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-foreground mb-2">Support</h4>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">How It Works</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">FAQ</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">Documents</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link href="#" className="text-xs text-muted font-medium hover:text-primary transition-colors">Privacy Policy</Link>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 gap-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center md:items-start text-xs text-muted font-medium">
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
          <p className="text-xs text-muted font-medium">
            © 2024 UK Qualify. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

"use client";

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-footer-border bg-footer-bg pb-8 pt-12 sm:pt-16 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Improved Responsive Grid: 2 cols on mobile, 4 on tablet, 6 on desktop */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">

          {/* Logo & Socials */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2 flex flex-col items-start">
            <Link href="/" className="mb-6 flex items-center">
              <div className="relative h-[54px] w-[180px]">
                <Image
                  src="/backlogo.png"
                  alt="Logo"
                  fill
                  sizes="180px"
                  className="object-contain dark:invert-0"
                />
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-footer-social-border text-footer-bottom-text transition-colors hover:border-footer-social-hover-border hover:bg-footer-social-hover-bg hover:text-footer-hover"
              >
                <FaFacebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-footer-social-border text-footer-bottom-text transition-colors hover:border-footer-social-hover-border hover:bg-footer-social-hover-bg hover:text-footer-hover"
              >
                <FaInstagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-footer-social-border text-footer-bottom-text transition-colors hover:border-footer-social-hover-border hover:bg-footer-social-hover-bg hover:text-footer-hover"
              >
                <FaLinkedin className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-footer-social-border text-footer-bottom-text transition-colors hover:border-footer-social-hover-border hover:bg-footer-social-hover-bg hover:text-footer-hover"
              >
                <FaYoutube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-1 flex flex-col gap-3">
            <h4 className="mb-2 text-sm font-bold text-footer-heading">Courses</h4>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">CITB Courses</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">NEBOSH Courses</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">IOSH Courses</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">First Aid Courses</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">View All Courses</Link>
          </div>

          <div className="col-span-1 flex flex-col gap-3">
            <h4 className="mb-2 text-sm font-bold text-footer-heading">NVQ</h4>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">Carpentry NVQ</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">Bricklaying NVQ</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">Painting NVQ</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">Plastering NVQ</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">All Trades</Link>
          </div>

          <div className="col-span-1 flex flex-col gap-3">
            <h4 className="mb-2 text-sm font-bold text-footer-heading">CSCS Cards</h4>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">Blue CSCS Card</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">Gold CSCS Card</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">Black CSCS Card</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">Green CSCS Card</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">CSCS Card Guide</Link>
          </div>

          <div className="col-span-1 flex flex-col gap-3">
            <h4 className="mb-2 text-sm font-bold text-footer-heading">Support</h4>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">How It Works</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">FAQ</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">Documents</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">Terms & Conditions</Link>
            <Link href="#" className="text-xs font-medium text-footer-text transition-colors hover:text-footer-hover">Privacy Policy</Link>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-footer-border pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-4 text-xs font-medium text-footer-bottom-text sm:flex-row sm:gap-8 md:items-start">
            <div className="flex items-center gap-2 transition-colors hover:text-footer-bottom-hover">
              <Phone className="h-3.5 w-3.5" />
              <span>020 1234 5678</span>
            </div>
            <div className="flex items-center gap-2 transition-colors hover:text-footer-bottom-hover">
              <Mail className="h-3.5 w-3.5" />
              <span>info@ukqualify.co.uk</span>
            </div>
            <div className="flex items-center gap-2 transition-colors hover:text-footer-bottom-hover">
              <MapPin className="h-3.5 w-3.5" />
              <span>London, United Kingdom</span>
            </div>
          </div>
          <p className="text-xs font-medium text-footer-bottom-text">
            &copy; {currentYear}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
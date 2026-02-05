"use client";

import { Sun, Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

import { contactInfo, socialLinks as configSocialLinks } from "@/lib/config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { href: "/about", label: "About Us" },
      { href: "/contact", label: "Contact Us" },
      { href: "/services", label: "Our Services" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: configSocialLinks.twitter, label: "Twitter" },
    { icon: Facebook, href: configSocialLinks.facebook, label: "Facebook" },
    { icon: Linkedin, href: configSocialLinks.linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="bg-tesla-white border-t border-tesla-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand & Socials */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block mb-8 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/images/Moto PV logo-01.png"
                alt="MotoPV Logo"
                width={150}
                height={50}
                className="object-contain"
              />
            </Link>
            <p className="text-tesla-gray-600 mb-8 text-sm leading-relaxed">
              We are a professional renewable energy company in Malawi specializing in high-performance solar solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-tesla-gray-100 rounded-none flex items-center justify-center hover:bg-tesla-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4 text-tesla-gray-700" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-tesla-black text-xs font-medium tracking-wider uppercase mb-6">Our Office</h3>
            <div className="space-y-4 text-tesla-gray-600 text-sm">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-[#FF6600] shrink-0" />
                <p>{contactInfo.address}</p>
              </div>
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-[#FF6600] shrink-0" />
                <a href={contactInfo.phoneLink} className="hover:text-tesla-black transition-colors">{contactInfo.phone}</a>
              </div>
              <div className="flex gap-3">
                <Mail className="w-4 h-4 text-[#FF6600] shrink-0" />
                <a href={contactInfo.emailLink} className="hover:text-tesla-black transition-colors break-all">{contactInfo.email}</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-tesla-black text-xs font-medium tracking-wider uppercase mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-tesla-gray-600 text-sm hover:text-tesla-black transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-tesla-gray-600 text-sm hover:text-tesla-black transition-colors">
                  Solar Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-tesla-black text-xs font-medium tracking-wider uppercase mb-6">Business Hours</h3>
            <div className="space-y-3 text-sm text-tesla-gray-600">
              <div className="flex justify-between">
                <span>Mon - Fri:</span>
                <span className="font-medium text-tesla-black text-right pl-2">08:00 am - 05:00 pm</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-medium text-tesla-black text-right pl-2">09:00 am - 12:00 pm</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-medium text-tesla-gray-400 text-right pl-2 italic">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-tesla-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-tesla-gray-500 text-xs">
            © {currentYear} MotoPV. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-tesla-gray-500 text-xs hover:text-tesla-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-tesla-gray-500 text-xs hover:text-tesla-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

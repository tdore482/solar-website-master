"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Floating Pill Navigation - Fixed Top */}
      <header className="fixed top-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto bg-[#1a1a1a] rounded-full px-2 py-2 flex items-center shadow-2xl border border-white/10 mx-4">

          {/* Logo */}
          <Link href="/" className="flex items-center justify-center mr-4 hover:opacity-80 transition-opacity">
            <Image
              src="/images/Moto PV logo-07.png"
              alt="MotoPV Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Nav Links */}
          <div className="flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out ${isActive
                    ? "bg-white text-black shadow-md"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Get Quote Button */}
          <div className="ml-2 pl-2 border-l border-white/10">
            <Link
              href="/contact"
              className="flex items-center bg-white text-black px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
            >
              Get Quote
              <span className="ml-1">↗</span>
            </Link>
          </div>
        </nav>
      </header >

      {/* Mobile Menu Toggle (Simplified for this layout, or keep as dock for mobile too) */}
      {/* For mobile, a bottom dock works well too. We can keep it responsive using the same structure roughly. */}
    </>
  );
}

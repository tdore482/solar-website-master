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
      {/* Header Container - Fixed Top */}
      <header className="fixed top-8 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 flex items-center justify-between">

          {/* Logo - Left Corner */}
          <Link href="/" className="pointer-events-auto flex items-center justify-center hover:opacity-80 transition-opacity">
            <Image
              src="/images/Moto PV logo-07.png"
              alt="MotoPV Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </Link>

          {/* Desktop: Floating Pill Navigation - Centered */}
          <nav className="hidden lg:flex pointer-events-auto bg-[#1a1a1a] rounded-full px-2 py-2 items-center shadow-2xl border border-white/10">
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

          {/* Mobile: Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden pointer-events-auto bg-[#1a1a1a] p-3 rounded-full border border-white/10 shadow-2xl hover:bg-[#2a2a2a] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>

          {/* Spacer for balance (hidden on mobile) */}
          <div className="hidden lg:block w-[50px]"></div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-[280px] bg-[#1a1a1a] border-l border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-8 pt-24">
                {/* Mobile Nav Links */}
                <nav className="flex flex-col space-y-2 mb-8">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-5 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActive
                          ? "bg-white text-black"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                          }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile Get Quote Button */}
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center bg-white text-black px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
                >
                  Get Quote
                  <span className="ml-2">↗</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

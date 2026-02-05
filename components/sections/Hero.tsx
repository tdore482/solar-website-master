"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-tesla-white">
      {/* Background with image */}
      <div className="absolute inset-0 z-0">
        {/* Hero image */}
        <div className="absolute inset-0">
          <img
            src="/images/hero1.jpg"
            alt="Solar panel installation"
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Subtle geometric elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-tesla-primary rounded-full blur-[150px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-24 lg:pt-32 pb-16">
        <motion.div
          className="text-center lg:text-left lg:max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <motion.h1
            className="mb-8 text-5xl lg:text-7xl font-light tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="block text-white">
              Stop Renting Power.
            </span>
            <span className="block text-tesla-primary">
              Start Owning It.
            </span>
          </motion.h1>

          <motion.p
            className="text-lg lg:text-2xl font-light text-white mb-10 max-w-2xl lg:max-w-none leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ color: "white" }}
          >
            Save up to 70% on electricity bills and protect your home from outages. Join 5,000+ homeowners achieving energy independence today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 text-sm text-gray-300 mb-10 font-medium"
          >
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-tesla-primary rounded-full"></span> 25-Year Warranty</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-tesla-primary rounded-full"></span> $0 Down Financing</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-tesla-primary rounded-full"></span> 48-Hour Install</span>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link
              href="/get-quote"
              className="btn-tesla-primary"
            >
              Get Free Savings Estimate
            </Link>
            <Link
              href="/services"
              className="btn-tesla-outline text-white hover:text-black hover:bg-white border-white transition-colors"
            >
              View Solutions
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="w-px h-16 bg-gray-400" />
      </motion.div>
    </section>
  );
}
"use client";

import { motion } from "framer-motion";
import CardGrid from "@/components/ui/CardGrid";

// Local service images
const images = {
  waterHeating: "/images/service-2.jpg",
  solarElectric: "/images/service-1.jpg", 
  backup: "/images/service-3.jpg",
  hero: "/images/hero2.jpg"
};

const services = [
  {
    title: "Solar Water Heating",
    category: "Efficiency",
    description: "Experience the comfort of hot water powered by the sun. High-efficiency collectors designed for both residential and commercial applications to reduce energy costs by up to 80%.",
    link: "/get-quote",
    linkText: "Get Quote",
    image: images.waterHeating
  },
  {
    title: "Solar Electricity",
    category: "Power",
    description: "High-quality mono-crystalline panels ranging from 100Wp to 360Wp. Comprehensive Off-Grid and On-Grid solutions available with net metering options.",
    link: "/get-quote",
    linkText: "Get Quote",
    image: images.solarElectric
  },
  {
    title: "Backup Systems",
    category: "Reliability",
    description: "Robust backup power systems including lithium batteries, UPS solutions, and generator integration. Ensure 24/7 power availability for your critical operations.",
    link: "/get-quote",
    linkText: "Get Quote",
    image: images.backup
  },
];

export default function ServicesContent() {
  return (
    <>
      {/* Hero Section - Cinematic */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-tesla-black text-white">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images.hero})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs font-bold uppercase tracking-[0.2em] mb-4 block text-tesla-primary"
          >
            Solutions
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-light tracking-tighter mb-6 text-white"
            style={{ color: "white" }}
          >
            Energy. Engineered.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-white"
            style={{ color: "white" }}
          >
            Comprehensive renewable energy systems designed for performance and longevity.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <CardGrid
        title="Our Services"
        description="From residential installations to industrial-grade power systems, we provide end-to-end renewable energy services."
        items={services}
        layout="horizontal" /* Using Horizontal layout for Services to make them feel more substantial */
      />
    </>
  );
}


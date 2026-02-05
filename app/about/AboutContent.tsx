"use client";

import { motion } from "framer-motion";

export default function AboutContent() {
  return (
    <>
      {/* 1. Hero Section - Cinematic & Minimal */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-tesla-black text-white">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero2.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-light tracking-tighter mb-8 text-white"
            style={{ color: "white" }}
          >
            Powering the Future
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed text-white"
            style={{ color: "white" }}
          >
            Sustainable energy independence for everyone.
          </motion.p>
        </div>
      </section>

      {/* 2. Narrative Section - Text centered */}
      <section className="py-32 bg-tesla-white text-center">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-medium text-tesla-black mb-8 leading-tight">
            We believe the faster the world stops relying on fossil fuels and moves towards a zero-emission future, the better.
          </h2>
          <p className="text-lg text-tesla-gray-600 leading-relaxed font-light">
            Founded in 2010, SolarPower was built on a simple mission: to accelerate the world's transition to sustainable energy. We engineer systems that are not just functional, but beautiful, reliable, and built to last generations.
          </p>
        </div>
      </section>

      {/* 3. Cinematic Split Section - Image Left */}
      <section className="flex flex-col md:flex-row min-h-[80vh]">
        <div className="w-full md:w-1/2 bg-gray-100 min-h-[50vh] md:min-h-auto relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero1.jpg')" }}
          />
        </div>
        <div className="w-full md:w-1/2 bg-tesla-white flex items-center justify-center p-12 md:p-24">
          <div className="max-w-md">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6600] mb-4 block">
              Engineering
            </span>
            <h3 className="text-3xl font-medium text-tesla-black mb-6">
              Designed for Durability
            </h3>
            <p className="text-tesla-gray-600 leading-relaxed mb-6">
              Our systems are engineered to withstand the harshest environments while delivering peak performance. Every component is selected for its reliability and efficiency, ensuring your energy independence is never compromised.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Cinematic Split Section - Image Right */}
      <section className="flex flex-col md:flex-row-reverse min-h-[80vh]">
        <div className="w-full md:w-1/2 bg-gray-100 min-h-[50vh] md:min-h-auto relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2574&auto=format&fit=crop')" }}
          />
        </div>
        <div className="w-full md:w-1/2 bg-tesla-white flex items-center justify-center p-12 md:p-24">
          <div className="max-w-md">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6600] mb-4 block">
              Impact
            </span>
            <h3 className="text-3xl font-medium text-tesla-black mb-6">
              Global Reach, Local Impact
            </h3>
            <p className="text-tesla-gray-600 leading-relaxed">
              With over 1,800 projects completed, we have helped thousands of families and businesses take control of their energy future. Our commitment goes beyond installation; we provide lifetime support to ensure your system evolves with your needs.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Minimalist Closing Statement */}
      <section className="py-32 bg-tesla-gray-50 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-medium text-tesla-black mb-6">Join the transition.</h2>
          <p className="text-tesla-gray-600 mb-8">Power your home with clean, renewable energy.</p>
        </div>
      </section>
    </>
  );
}


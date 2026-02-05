"use client";

import { motion } from "framer-motion";
import { Users, Award, Zap, Battery, ArrowRight } from "lucide-react";
import { Counter } from "@/components/ui/CleanInteractions";

const stats = [
  { 
    icon: Users, 
    value: 500, 
    suffix: "+", 
    label: "Projects Completed", 
    description: "Successful installations across Malawi"
  },
  { 
    icon: Award, 
    value: 15, 
    suffix: "", 
    label: "Years Experience", 
    description: "Industry leadership and expertise"
  },
  { 
    icon: Zap, 
    value: 98, 
    suffix: "%", 
    label: "Client Satisfaction", 
    description: "Exceptional service rating"
  },
  { 
    icon: Battery, 
    value: 50, 
    suffix: "MW", 
    label: "Total Capacity", 
    description: "Solar power installed nationwide"
  },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="text-center group relative"
    >
      {/* Background gradient effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#FF6600]/5 to-[#0A2342]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      <div className="bg-white border border-gray-200 rounded-lg p-8 hover:border-gray-300 transition-all duration-200 relative z-10 overflow-hidden">
        {/* Animated icon with background */}
        <motion.div
          className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-6 group-hover:bg-gradient-to-r group-hover:from-[#FF6600] group-hover:to-[#0A2342] transition-all duration-300"
          whileHover={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 0.6 }}
        >
          <stat.icon className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors duration-300" />
        </motion.div>

        {/* Counter with accent */}
        <div className="text-4xl font-light text-gray-900 mb-2 relative">
          <Counter value={stat.value} suffix={stat.suffix} />
          <motion.div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-px bg-gradient-to-r from-[#FF6600] to-[#0A2342]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
            style={{ transformOrigin: "center" }}
          />
        </div>

        {/* Label */}
        <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-[#FF6600] group-hover:to-[#0A2342] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {stat.label}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {stat.description}
        </p>
      </div>

      {/* Floating accent elements */}
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 bg-[#FF6600] rounded-full opacity-0 group-hover:opacity-60"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -3, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export default function Statistics() {
  return (
    <section
      className="py-24 bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="w-4 h-4 bg-gradient-to-r from-[#FF6600] to-[#0A2342] rounded-full"
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-white text-sm font-medium ml-2">PROVEN RESULTS</span>
          </motion.div>
          
          <h2 className="text-4xl font-light text-white mb-4">
            Trusted <span className="font-semibold bg-gradient-to-r from-[#FF6600] to-[#0A2342] bg-clip-text text-transparent">Track Record</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
            Serving businesses and homeowners across Malawi with premium solar installations.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="bg-gray-800 border border-gray-700 rounded-lg p-8 max-w-2xl mx-auto hover:border-gray-600 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-[#FF6600] to-[#0A2342] rounded-lg flex items-center justify-center"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-white text-xl font-bold">✓</span>
              </motion.div>
            </motion.div>
            
            <h3 className="text-xl font-medium text-white mb-4">
              Ready to join our success <span className="bg-gradient-to-r from-[#FF6600] to-[#0A2342] bg-clip-text text-transparent">stories?</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Let us help you transition to clean, reliable solar energy with confidence.
            </p>
            <motion.a
              href="/get-quote"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 font-medium hover:bg-gradient-to-r hover:from-[#FF6600] hover:to-[#0A2342] hover:text-white transition-all duration-300 rounded-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
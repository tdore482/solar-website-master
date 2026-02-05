"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Shield,
  Battery,
  Wrench,
  Clock,
  Award,
} from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Cost Savings",
    description: "Reduce electricity costs by up to 90% with predictable energy pricing for decades.",
    value: "90%",
    label: "Average Savings",
    gradient: "from-emerald-50 to-green-50"
  },
  {
    icon: Shield,
    title: "Long-Term Warranty",
    description: "Comprehensive warranty coverage with dedicated support throughout system lifetime.",
    value: "25",
    label: "Year Warranty",
    gradient: "from-blue-50 to-indigo-50"
  },
  {
    icon: Battery,
    title: "Energy Independence",
    description: "Advanced battery storage ensures reliable power during grid outages.",
    value: "24/7",
    label: "Backup Power",
    gradient: "from-purple-50 to-pink-50"
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    description: "Certified technicians with extensive experience in solar system installation.",
    value: "500+",
    label: "Installations",
    gradient: "from-orange-50 to-amber-50"
  },
  {
    icon: Clock,
    title: "Efficient Setup",
    description: "Professional installation process with minimal disruption to your daily routine.",
    value: "2-3",
    label: "Day Installation",
    gradient: "from-cyan-50 to-teal-50"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Industry-certified equipment meeting the highest quality standards.",
    value: "A+",
    label: "Quality Rating",
    gradient: "from-rose-50 to-pink-50"
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group relative bg-white border border-gray-200 rounded-lg p-8 hover:border-[#FF6600] transition-all duration-200 overflow-hidden"
    >
      {/* Subtle animated background gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
        animate={{
          opacity: [0, 0.05, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 1 }}
      />
      
      {/* Icon and value */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <motion.div
          className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
          whileHover={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <feature.icon className="w-6 h-6 text-gray-700" />
        </motion.div>
        <div className="text-right">
          <motion.div 
            className="text-2xl font-light text-gray-900"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
          >
            {feature.value}
          </motion.div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">{feature.label}</div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-[#FF6600] group-hover:to-[#0A2342] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {feature.title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {feature.description}
        </p>
      </div>

      {/* Animated bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-[#FF6600] to-[#0A2342]"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-24 bg-white overflow-hidden"
    >
      {/* Subtle animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-[#FF6600]/5 rounded-full"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 bg-[#0A2342]/5 rounded-full"
        animate={{
          y: [0, 20, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Why Choose <span className="font-semibold bg-gradient-to-r from-[#FF6600] to-[#0A2342] bg-clip-text text-transparent">Solar Power?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Invest in sustainable energy with proven benefits for your home or business.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA with enhanced design */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-[#FF6600] to-[#0A2342] text-white rounded flex items-center justify-center"
              animate={{
                rotate: [0, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-sm font-bold">?</span>
            </motion.div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Have questions?</div>
              <div className="text-sm text-gray-600">Get expert advice from our team</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
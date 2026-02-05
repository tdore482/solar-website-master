"use client";

import { motion } from "framer-motion";
import { Home, Building2, Factory, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    icon: Home,
    title: "Residential Solar",
    description: "Complete solar solutions for homes with custom design and professional installation.",
    features: [
      "Custom system design",
      "Roof and ground mounting",
      "Battery integration",
      "Smart home compatibility",
    ],
    image: "/images/service-1.jpg",
    price: "Starting from MWK 2,500,000",
  },
  {
    icon: Building2,
    title: "Commercial Solar",
    description: "Scalable solar solutions for businesses with focus on ROI and sustainability goals.",
    features: [
      "Large-scale installations",
      "Energy monitoring systems",
      "Maintenance packages",
      "Financial analysis",
    ],
    image: "/images/service-2.jpg",
    price: "Custom quotations",
  },
  {
    icon: Factory,
    title: "Industrial Systems",
    description: "High-capacity solar solutions for industrial operations with guaranteed performance.",
    features: [
      "Megawatt-scale capacity",
      "Custom engineering",
      "24/7 monitoring",
      "Performance guarantees",
    ],
    image: "/images/service-3.jpg",
    price: "Custom quotations",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-[#FF6600] transition-all duration-200"
    >
      {/* Image with modern overlay */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="relative h-full"
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/10 via-transparent to-transparent"
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 0.8 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating badge */}
        <motion.div
          className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          Premium
        </motion.div>
      </div>

      <div className="p-8">
        {/* Header with animated icon */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-[#FF6600] group-hover:to-[#0A2342] transition-all duration-300"
            whileHover={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.6 }}
          >
            <service.icon className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-300" />
          </motion.div>
          <h3 className="text-xl font-medium text-gray-900 group-hover:bg-gradient-to-r group-hover:from-[#FF6600] group-hover:to-[#0A2342] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Enhanced features list */}
        <div className="space-y-3 mb-6">
          {service.features.map((feature, featureIndex) => (
            <motion.div 
              key={featureIndex} 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 + featureIndex * 0.1 }}
            >
              <motion.div
                className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#FF6600] group-hover:to-[#0A2342] transition-all duration-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Check className="w-3 h-3 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </motion.div>
              <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors duration-300">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Enhanced price and CTA section */}
        <div className="border-t border-gray-100 pt-6">
          <motion.div
            className="text-sm text-gray-500 mb-3 group-hover:text-gray-700 transition-colors duration-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
          >
            {service.price}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium hover:bg-[#FF6600] transition-all duration-300 rounded-sm"
            >
              Get Quote
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Subtle animated corner accent */}
      <motion.div
        className="absolute top-0 left-0 w-1 h-12 bg-gradient-to-b from-[#FF6600] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        style={{ transformOrigin: "top" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 bg-gray-50"
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
            className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="w-4 h-4 bg-gradient-to-r from-[#FF6600] to-[#0A2342] rounded-full"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-gray-700 text-sm font-medium ml-2">OUR SERVICES</span>
          </motion.div>
          
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Professional <span className="font-semibold bg-gradient-to-r from-[#FF6600] to-[#0A2342] bg-clip-text text-transparent">Solar Solutions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Tailored energy systems for residential, commercial, and industrial applications across Malawi.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-medium text-gray-900 mb-4">
              Not sure which solution is right for you?
            </h3>
            <p className="text-gray-600 mb-6">
              Our energy experts provide free consultations to help you choose the optimal solar system for your specific needs.
            </p>
            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white font-medium hover:bg-[#FF6600] transition-colors duration-200 rounded-sm"
            >
              Schedule Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
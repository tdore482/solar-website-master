"use client";

import { motion } from "framer-motion";
import { Users, Award, Calendar, CheckCircle } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Calendar, value: "50,000+", label: "Installations" },
  { icon: CheckCircle, value: "98%", label: "Satisfaction Rate" },
];

const values = [
  {
    title: "Sustainability",
    description:
      "We're committed to creating a sustainable future through renewable energy solutions.",
  },
  {
    title: "Quality",
    description:
      "We use only the highest quality equipment and maintain the highest installation standards.",
  },
  {
    title: "Customer Focus",
    description:
      "Your satisfaction is our priority. We provide exceptional service from consultation to installation.",
  },
  {
    title: "Innovation",
    description:
      "We stay at the forefront of solar technology to bring you the latest and most efficient solutions.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 bg-white dark:bg-black"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            About Us
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Leading the solar revolution with over 15 years of experience,
            helping thousands of customers transition to clean, renewable energy.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-white dark:from-[#1a3a5c] dark:to-[#0A2342] rounded-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <stat.icon className="w-10 h-10 text-[#FF6600] mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-[#1a3a5c] dark:to-[#0A2342] rounded-2xl shadow-lg"
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


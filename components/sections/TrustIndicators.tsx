"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, Zap, Award } from "lucide-react";

const stats = [
    {
        label: "Years of Experience",
        value: "15+",
        icon: Award,
        description: "Trusted by thousands since 2010"
    },
    {
        label: "Installations Completed",
        value: "5,000+",
        icon: Users,
        description: "Homes and businesses powered"
    },
    {
        label: "Average Savings",
        value: "70%",
        icon: Zap,
        description: "Reduction in monthly energy bills"
    },
    {
        label: "Warranty Coverage",
        value: "25 Years",
        icon: ShieldCheck,
        description: "Industry-leading protection"
    }
];

export default function TrustIndicators() {
    return (
        <section className="py-16 bg-tesla-gray-50 border-y border-tesla-gray-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-12 h-12 mb-4 bg-tesla-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <stat.icon className="w-6 h-6 text-tesla-primary" />
                            </div>
                            <h3 className="text-3xl font-bold text-tesla-black mb-1">
                                {stat.value}
                            </h3>
                            <p className="text-sm font-semibold uppercase tracking-wider text-tesla-gray-600 mb-2">
                                {stat.label}
                            </p>
                            <p className="text-xs text-tesla-gray-500 max-w-[200px]">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

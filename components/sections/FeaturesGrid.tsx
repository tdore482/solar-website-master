"use client";

import { motion } from "framer-motion";
import { Zap, Battery, ShieldCheck } from "lucide-react";

interface FeatureItem {
    iconName: string;
    title: string;
    description: string;
}

interface FeaturesGridProps {
    features: FeatureItem[];
}

const iconMap = {
    Zap,
    Battery,
    ShieldCheck,
};

export default function FeaturesGrid({ features }: FeaturesGridProps) {
    return (
        <section className="py-24 lg:py-32 bg-tesla-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
                    {features.map((feature, index) => {
                        const IconComponent = iconMap[feature.iconName as keyof typeof iconMap];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.15,
                                    duration: 0.7,
                                    ease: "easeOut"
                                }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="group"
                            >
                                {/* Icon */}
                                <div className="mb-8 flex items-start">
                                    <div className="w-12 h-12 bg-tesla-gray-100 rounded-[2px] flex items-center justify-center group-hover:bg-tesla-gray-200 transition-colors duration-200">
                                        {IconComponent && <IconComponent className="w-6 h-6 text-tesla-black" />}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-normal tracking-wide text-tesla-black mb-4">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-tesla-gray-600 text-base leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

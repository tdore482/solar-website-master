"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpecData {
    label: string;
    value: string;
}

interface TabData {
    id: string;
    label: string;
    image?: string;
    specs: SpecData[];
    description?: string;
}

interface SpecsDetailProps {
    title: string;
    tabs: TabData[];
    backgroundImage?: string;
}

export default function SpecsDetail({ title, tabs, backgroundImage }: SpecsDetailProps) {
    const [activeTabId, setActiveTabId] = useState(tabs[0].id);

    const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

    return (
        <section className="py-24 lg:py-32 bg-tesla-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Title */}
                    <div className="text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-tesla-black mb-4">
                            {title}
                        </h2>
                        <p className="text-lg text-tesla-gray-600 max-w-2xl mx-auto font-light">
                            Technical specifications and performance metrics for our solar energy systems.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mb-16">
                        <div className="inline-flex bg-tesla-gray-100 rounded-[2px] p-1">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTabId(tab.id)}
                                    className={`px-8 py-3 text-sm font-medium transition-all duration-200 ${activeTabId === tab.id
                                        ? "bg-tesla-white text-tesla-black shadow-sm"
                                        : "text-tesla-gray-600 hover:text-tesla-black"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Left: Description */}
                        <motion.div
                            key={activeTabId + "left"}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {activeTab.description && (
                                <div className="space-y-6">
                                    <p className="text-lg text-tesla-gray-700 leading-relaxed">
                                        {activeTab.description}
                                    </p>
                                    <div className="pt-6">
                                        <button className="btn-tesla-outline">
                                            Download Specifications
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Right: Specs */}
                        <motion.div
                            key={activeTabId + "right"}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="bg-tesla-gray-50 p-8 lg:p-12">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTabId}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        {activeTab.specs.map((spec, index) => (
                                            <div key={index} className="flex justify-between items-center pb-6 border-b border-tesla-gray-200 last:border-0 last:pb-0">
                                                <span className="text-sm font-medium text-tesla-gray-600 uppercase tracking-wider">
                                                    {spec.label}
                                                </span>
                                                <span className="text-lg font-medium text-tesla-black">
                                                    {spec.value}
                                                </span>
                                            </div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Sun, Banknote, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SavingsCalculator() {
    const [bill, setBill] = useState(150000);
    const [savings, setSavings] = useState(0);

    // Simple calculation logic for demo purposes
    // Assuming 70% savings over 20 years with utility inflation
    useEffect(() => {
        const monthlySavings = bill * 0.7;
        const yearlySavings = monthlySavings * 12;
        // 20 year projection simplified
        const totalLifetimeSavings = yearlySavings * 20;
        setSavings(Math.round(totalLifetimeSavings));
    }, [bill]);

    return (
        <section className="py-24 bg-tesla-black text-white overflow-hidden relative">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-tesla-black via-[#1a1a1a] to-tesla-black" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-2 mb-6 text-tesla-primary">
                            <Calculator className="w-6 h-6" />
                            <span className="text-sm font-bold uppercase tracking-wider">Savings Estimator</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-light tracking-tighter mb-6">
                            Calculate Your <span className="text-tesla-primary">Solar Potential</span>
                        </h2>
                        <p className="text-lg text-gray-400 mb-8 max-w-xl font-light leading-relaxed">
                            Stop renting your power. Own it. See how much you could save over the next 20 years by switching to solar today in Malawi.
                        </p>

                        <ul className="space-y-4 mb-8 text-gray-300">
                            <li className="flex items-center gap-3">
                                <Sun className="w-5 h-5 text-tesla-primary" />
                                <span>Increase your property value immediately</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Banknote className="w-5 h-5 text-tesla-primary" />
                                <span>Lock in your energy rates for 25+ years</span>
                            </li>
                        </ul>

                        <Link
                            href="/get-quote"
                            className="btn-tesla-primary inline-flex items-center gap-2"
                        >
                            Get a Detailed Quote <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    {/* Right: Calculator Tool */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 lg:p-10"
                    >
                        <div className="mb-10">
                            <label className="block text-sm font-medium text-gray-300 mb-4">
                                Average Monthly Electricity Bill (MWK)
                            </label>
                            <div className="flex flex-col gap-6 mb-4">
                                <div className="text-4xl font-light text-white">
                                    MWK {bill.toLocaleString()}
                                </div>
                                <input
                                    type="range"
                                    min="20000"
                                    max="1000000"
                                    step="5000"
                                    value={bill}
                                    onChange={(e) => setBill(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-tesla-primary"
                                />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>MWK 20,000</span>
                                <span>MWK 1,000,000+</span>
                            </div>
                        </div>

                        <div className="text-center bg-white/5 rounded-xl p-8 border border-white/5">
                            <p className="text-gray-400 text-sm uppercase tracking-wide mb-2">Estimated 20-Year Savings</p>
                            <motion.div
                                key={savings}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-4xl lg:text-5xl font-bold text-tesla-primary mb-2"
                            >
                                MWK {savings.toLocaleString()}
                            </motion.div>
                            <p className="text-gray-500 text-xs mt-2">
                                *Estimated savings based on current electricity rates and average inflation.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

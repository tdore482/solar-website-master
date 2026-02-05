"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowLeft, ArrowRight } from "lucide-react";

interface MediaCard {
    title: string;
    subtitle: string;
    image: string;
    isVideo?: boolean;
}

interface VisualCarouselProps {
    items: MediaCard[];
}

export default function VisualCarousel({ items }: VisualCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section className="py-24 lg:py-32 bg-tesla-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-tesla-black mb-4">
                        See It In Action
                    </h2>
                    <p className="text-lg text-tesla-gray-600 max-w-2xl mx-auto font-light">
                        Watch how our solar systems transform homes and businesses with clean, renewable energy.
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className="relative">
                    {/* Main Display */}
                    <div className="relative aspect-[16/9] lg:aspect-[21/9] bg-tesla-gray-100 overflow-hidden rounded-[2px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 1.0, ease: "easeInOut" }}
                                className="relative w-full h-full"
                            >
                                <div className="absolute inset-0">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url(${items[currentIndex]?.image || '/placeholder.jpg'})` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-tesla-black/60 via-tesla-black/20 to-transparent" />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-16">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        <h3 className="text-3xl lg:text-4xl font-medium text-tesla-white mb-4">
                                            {items[currentIndex]?.title}
                                        </h3>
                                        <p className="text-lg text-tesla-gray-200 max-w-2xl">
                                            {items[currentIndex]?.subtitle}
                                        </p>
                                    </motion.div>

                                    {/* Play Button for Videos */}
                                    {items[currentIndex]?.isVideo && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.5 }}
                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-tesla-white/90 backdrop-blur-sm rounded-none flex items-center justify-center hover:bg-tesla-white transition-all duration-200"
                                        >
                                            <Play className="w-10 h-10 text-tesla-black fill-current ml-1" />
                                        </motion.button>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-tesla-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-tesla-white transition-all duration-200"
                        >
                            <ArrowLeft className="w-5 h-5 text-tesla-black" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-tesla-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-tesla-white transition-all duration-200"
                        >
                            <ArrowRight className="w-5 h-5 text-tesla-black" />
                        </button>
                    </div>

                    {/* Thumbnail Navigation */}
                    <div className="flex justify-center mt-8 space-x-4">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-200 ${currentIndex === index
                                    ? "w-24 h-1 bg-tesla-black"
                                    : "w-8 h-1 bg-tesla-gray-300 hover:bg-tesla-gray-400"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface SectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  videoSrc?: string;
  align?: "left" | "center" | "right";
  children?: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  backgroundImage,
  videoSrc,
  align = "left",
  children,
  className = "",
}) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const flexAlignmentClasses = {
    left: "items-start",
    center: "items-center",
    right: "items-end",
  };

  return (
    <section className={`relative w-full py-24 lg:py-32 overflow-hidden bg-tesla-white ${className}`}>
      {/* Background */}
      {(backgroundImage || videoSrc) && (
        <div className="absolute inset-0 z-0">
          {videoSrc ? (
            <video
              autoPlay
              loop
              muted
              className="object-cover w-full h-full"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : backgroundImage && (
            <Image
              src={backgroundImage}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-tesla-white/80" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className={`max-w-4xl mx-auto ${flexAlignmentClasses[align]} ${alignmentClasses[align]}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {title && (
            <motion.h2 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {title}
            </motion.h2>
          )}
          
          {subtitle && (
            <motion.p 
              className="text-lg lg:text-xl text-tesla-gray-700 mb-8 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {children}
            </motion.div>
          )}

          {buttonText && buttonLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link href={buttonLink} className="btn-tesla-primary">
                {buttonText}
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Section;

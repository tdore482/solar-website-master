"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = "",
  hover = true,
  onClick,
}: CardProps) {
  const baseStyles =
    "bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 border border-gray-200";

  const hoverStyles = hover
    ? "hover:shadow-2xl cursor-pointer hover:border-[#FF6600]"
    : "";

  const cardClasses = `${baseStyles} ${hoverStyles} ${className}`;

  if (onClick) {
    return (
      <motion.div
        className={cardClasses}
        onClick={onClick}
        whileHover={hover ? { y: -5, scale: 1.02 } : {}}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cardClasses}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}


"use client";

import { motion } from "framer-motion";
import CardGrid from "@/components/ui/CardGrid";

// Unsplash Image IDs for Blog concepts
const images = {
  hero: "https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=2696&auto=format&fit=crop",
  post1: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2672&auto=format&fit=crop",
  post2: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop",
  post3: "https://images.unsplash.com/photo-1621360841013-c768371e93cf?q=80&w=2574&auto=format&fit=crop",
  post4: "https://images.unsplash.com/photo-1566371486490-560ded23b5e4?q=80&w=2670&auto=format&fit=crop",
  post5: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop",
  post6: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?q=80&w=2510&auto=format&fit=crop"
};

const blogPosts = [
  {
    title: "10 Benefits of Switching to Solar",
    description: "Discover the numerous advantages of solar energy, from reducing electricity bills to contributing to a cleaner environment.",
    link: "/blog/benefits",
    linkText: "Read Article",
    category: "Energy",
    image: images.post1
  },
  {
    title: "Off-Grid vs On-Grid Systems",
    description: "Understanding the differences between off-grid and on-grid solar systems can help you make the best decision for your energy needs.",
    link: "/blog/off-grid-vs-on-grid",
    linkText: "Compare",
    category: "Systems",
    image: images.post2
  },
  {
    title: "Guide to Solar Water Heating",
    description: "Learn everything you need to know about solar water heating systems, including installation process and maintenance.",
    link: "/blog/water-heating",
    linkText: "Read Guide",
    category: "Guides",
    image: images.post3
  },
  {
    title: "Maintenance Essentials",
    description: "Keep your solar panels operating at peak efficiency with these essential maintenance tips.",
    link: "/blog/maintenance",
    linkText: "Learn How",
    category: "Maintenance",
    image: images.post4
  },
  {
    title: "Understanding ROI",
    description: "Calculate your return on investment for solar panels and discover how long it takes to recoup your initial cost.",
    link: "/blog/roi",
    linkText: "Calculate",
    category: "Finance",
    image: images.post5
  },
  {
    title: "Battery Storage Benefits",
    description: "Explore the benefits of adding battery storage to your solar system, including backup power during outages.",
    link: "/blog/batteries",
    linkText: "Read Article",
    category: "Tech",
    image: images.post6
  },
];

export default function BlogContent() {
  return (
    <>
      {/* Hero Section - Cinematic */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-tesla-black text-white">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images.hero})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs font-bold uppercase tracking-[0.2em] mb-4 block text-tesla-primary"
          >
            Updates
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-light tracking-tighter mb-6 text-white"
            style={{ color: "white" }}
          >
            The Solar Journal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-white"
            style={{ color: "white" }}
          >
            Latest news, insights, and technological breakthroughs.
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <CardGrid
        title="Latest Articles"
        items={blogPosts}
        layout="vertical"
      />
    </>
  );
}

"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/sections/Hero"), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-tesla-white" />
});

export default function HeroWrapper() {
  return <Hero />;
}
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog - SolarPower | Solar Energy News & Insights",
  description:
    "Stay updated with the latest news, insights, and tips about solar energy, renewable energy solutions, and sustainable living from SolarPower experts.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <BlogContent />
      <Footer />
    </main>
  );
}


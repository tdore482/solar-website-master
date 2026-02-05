import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us - SolarPower | Professional Renewable Energy Company",
  description:
    "Learn about SolarPower, a leading renewable energy company with over 15 years of experience. Discover our mission, values, and commitment to sustainable energy solutions.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutContent />
      <Footer />
    </main>
  );
}


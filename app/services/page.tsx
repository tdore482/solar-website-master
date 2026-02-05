import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services - SolarPower | Solar Water Heating, Electricity & Backup Systems",
  description:
    "Comprehensive solar energy services including solar water heating systems, solar electricity (Off-Grid & On-Grid), and backup power systems for residential and commercial use.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ServicesContent />
      <Footer />
    </main>
  );
}


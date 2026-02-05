import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us - SolarPower | Get in Touch",
  description:
    "Contact SolarPower for all your solar energy needs. Get in touch with our team for consultations, quotes, and support. We're here to help you transition to clean energy.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactContent />
      <Footer />
    </main>
  );
}


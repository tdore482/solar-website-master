import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import QuoteForm from "./QuoteForm";

export const metadata: Metadata = {
  title: "Get a Quote - SolarPower | Free Solar Energy Consultation",
  description:
    "Get a free, no-obligation quote for your solar energy system. Fill out our simple form and our experts will provide you with a customized solution and pricing.",
};

export default function GetQuotePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <QuoteForm />
      <Footer />
    </main>
  );
}


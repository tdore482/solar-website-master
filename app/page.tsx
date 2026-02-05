import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroWrapper from "@/components/sections/HeroWrapper";
import Section from "@/components/ui/Section";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import SpecsDetail from "@/components/sections/SpecsDetail";
import VisualCarousel from "@/components/sections/VisualCarousel";
import TrustIndicators from "@/components/sections/TrustIndicators";
import SavingsCalculator from "@/components/sections/SavingsCalculator";


export const metadata: Metadata = {
  title: "MotoPV - Professional Solar Energy Solutions in Malawi",
  description:
    "We are a professional renewable energy company in Malawi specializing in Off-Grid and On-Grid solar systems, solar water heating, and backup power solutions.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-tesla-white text-tesla-black">
      <Header />
      <main id="main-content">
        <HeroWrapper />

        {/* Trust Indicators - Social Proof */}
        <TrustIndicators />

        {/* Feature Grid - Based on "Cost" section */}
        <FeaturesGrid
          features={[
            {
              iconName: "Zap",
              title: "Slash Energy Bills",
              description: "Reduce your monthly electricity costs by up to 90% with our high-efficiency Tier-1 solar panels designed for performance."
            },
            {
              iconName: "ShieldCheck",
              title: "Energy Independence",
              description: "Protect your home from rate hikes and grid failures. Our advanced battery systems keep your lights on when the grid goes down."
            },
            {
              iconName: "Battery",
              title: "Reliable Backup",
              description: "Seamless power transition during outages. Our smart inverters and batteries ensure your life continues uninterrupted."
            }
          ]}
        />

        {/* Interactive Calculator - Engagement */}
        <SavingsCalculator />

        <Section
          title="RESIDENTIAL & COMMERCIAL SOLAR"
          subtitle="Transform your home or business with clean, renewable solar energy. Our expert team designs and installs custom solar solutions tailored to your specific energy needs and architecture."
          buttonText="VIEW SERVICE PACKAGES"
          buttonLink="/services"
          align="right"
        >
          {/* If we had specific local assets we'd use them, otherwise Section handles the fallback gradient */}
        </Section>

        {/* Specs Detail - Technical Proof */}
        <SpecsDetail
          title="ENGINEERED FOR PERFORMANCE"
          tabs={[
            {
              id: "panels",
              label: "Solar Panels",
              specs: [
                { label: "Efficiency", value: "22.8%" },
                { label: "Warranty", value: "25 Years" },
                { label: "Type", value: "Monocrystalline" },
                { label: "ROI", value: "3-5 Years" }
              ],
              description: "Our premium monocrystalline panels are designed for maximum durability and energy production."
            },
            {
              id: "batteries",
              label: "Battery Storage",
              specs: [
                { label: "Capacity", value: "5kWh - 100kWh" },
                { label: "Safety", value: "Thermal Control" },
                { label: "Cycle Life", value: "6000+ Cycles" },
                { label: "Chemistry", value: "LiFePO4" }
              ],
              description: "Lithium Iron Phosphate batteries provide safe, reliable, and long-lasting backup power."
            },
            {
              id: "inverters",
              label: "Inverters",
              specs: [
                { label: "Efficiency", value: "98.4%" },
                { label: "Monitoring", value: "24/7 Mobile App" },
                { label: "Type", value: "Hybrid / Off-Grid" },
                { label: "Warranty", value: "10 Years" }
              ],
              description: "Smart inverters that intelligently manage your power flow between solar, battery, and the grid."
            }
          ]}
        />

        {/* Visual Carousel - Social Proof & Process */}
        <VisualCarousel
          items={[
            {
              title: "Seamless Installation",
              subtitle: "Watch how our expert team installs your system in under 48 hours without disrupting your daily life.",
              image: "/images/service-1.jpg",
              isVideo: true
            },
            {
              title: "Real Client Stories",
              subtitle: "See how moving to solar changed their lives and dramatically reduced their monthly bills.",
              image: "/images/service-2.jpg",
              isVideo: true
            },
            {
              title: "Advanced Technology",
              subtitle: "A look inside the smart monitoring systems that put you in control of your energy.",
              image: "/images/service-3.jpg",
              isVideo: false
            }
          ]}
        />

        <Section
          title="READY TO START SAVING?"
          subtitle="Take control of your energy future today. Schedule your free, no-obligation consultation and get a custom savings projection."
          buttonText="GET YOUR FREE QUOTE"
          buttonLink="/get-quote"
          align="center"
        />

      </main>
      <Footer />
    </div>
  );
}

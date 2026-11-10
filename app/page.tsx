import Hero from "@/components/sections/Hero";
import TechMarquee from "@/components/sections/TechMarquee";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CapabilityShowcase from "@/components/sections/CapabilityShowcase";
import WhyUs from "@/components/sections/WhyUs";
import Workflow from "@/components/sections/Workflow";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <ServicesGrid />
      <CapabilityShowcase />
      <WhyUs />
      <Workflow />
      <Testimonials />
      <FAQ />
      <CTABanner />
    </>
  );
}


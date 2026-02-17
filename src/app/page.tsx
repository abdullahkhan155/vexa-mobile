import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { InteractiveDemo } from "@/components/sections/InteractiveDemo";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyVexa } from "@/components/sections/WhyVexa";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <InteractiveDemo />
      <HowItWorks />
      <WhyVexa />
      <CTA />
      <Footer />
    </main>
  );
}

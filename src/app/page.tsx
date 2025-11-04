import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { ValueProposition } from "@/components/landing/ValueProposition";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Waitlist } from "@/components/landing/Waitlist";
import { Footer } from "@/components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Features />
        <ValueProposition />
        <HowItWorks />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  // const scrollToWaitlist = () => {
  //   document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-5"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, hsl(var(--arevei-blue) / 0.1) 0%, transparent 50%)'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Own Your Cloud.{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-arevei-blue bg-clip-text text-transparent">
              Keep Your Privacy.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Turn your laptop into a private Google Drive — secure, unlimited, and completely yours. 
            No subscriptions. No uploads. Just freedom.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="hero-gradient text-lg px-8 py-6 glow-effect transition-smooth hover:scale-105"
              // onClick={scrollToWaitlist}
            >
              Join Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 transition-smooth hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

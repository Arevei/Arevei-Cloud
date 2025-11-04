import { Card, CardContent } from "@/components/ui/card";
import { IndianRupee, Shield, FolderSync, Globe, Zap } from "lucide-react";

const valueProps = [
  {
    icon: IndianRupee,
    pain: "Paying ₹4k–₹10k yearly for cloud storage",
    want: "Save money on files they rarely use",
    solution: "Turns an old laptop or hard drive into a private cloud with 1-click setup",
  },
  {
    icon: Shield,
    pain: "Data stored on Google/Dropbox feels unsafe",
    want: "To truly own their data",
    solution: "Files stay on their own device — 100% private",
  },
  {
    icon: FolderSync,
    pain: "Files scattered across Drive, iCloud, WhatsApp",
    want: "One place for everything",
    solution: "Arevei Agent auto-organizes files across devices",
  },
  {
    icon: Globe,
    pain: "Want remote access without complexity",
    want: "Easy file access anywhere",
    solution: "Creates secure temporary links automatically",
  },
  {
    icon: Zap,
    pain: "Not tech-savvy",
    want: "Plug-and-play setup",
    solution: "Simple installer + dashboard, no coding needed",
  },
];

export const ValueProposition = () => {
  return (
    <section className="py-24 bg-subtle-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose Arevei Cloud?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real problems. Simple solutions. Complete freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {valueProps.map((prop, index) => (
            <Card 
              key={index} 
              className="glass-card border-2 transition-smooth hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-hero-gradient flex items-center justify-center">
                  <prop.icon className="h-6 w-6 text-white" />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      The Problem
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {prop.pain}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">
                      What You Get
                    </p>
                    <p className="text-base font-semibold">
                      {prop.want}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-sm">
                      {prop.solution}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

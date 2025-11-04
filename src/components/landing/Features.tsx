import { Card, CardContent } from "@/components/ui/card";
import { Shield, Cloud, Globe, Sparkles } from "lucide-react";

const features = [
  {
    icon: Cloud,
    title: "Stop Paying for Storage",
    description: "Use that old laptop or external drive instead. Unlimited space without monthly fees.",
  },
  {
    icon: Shield,
    title: "Your Data, Your Device",
    description: "Files stay on your laptop or hard drive. No one else can see them. Not us, not anyone.",
  },
  {
    icon: Globe,
    title: "Access From Anywhere",
    description: "Get your files on any phone or computer with secure temporary links — just like Google Drive.",
  },
  {
    icon: Sparkles,
    title: "1-Click Setup",
    description: "Install the app, click a button, you're done. No coding, no tech skills needed.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            A Smart Home for Your Digital Life
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Save money, protect your privacy, and keep everything in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="glass-card border-2 transition-smooth hover:scale-105 hover:shadow-card-hover animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-hero-gradient flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

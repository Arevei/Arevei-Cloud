import { Card, CardContent } from "@/components/ui/card";
import { Download, FolderOpen, Wifi } from "lucide-react";

const steps = [
  {
    icon: Download,
    number: "1",
    title: "Install in One Click",
    description: "Download the app for Windows, Mac, or Linux. It's like installing any other app.",
  },
  {
    icon: FolderOpen,
    number: "2",
    title: "Pick a Folder",
    description: "Point it to your hard drive or an old laptop. That becomes your private cloud.",
  },
  {
    icon: Wifi,
    number: "3",
    title: "Access Anywhere",
    description: "Open your files from any phone or computer — secure, instant, and always yours.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-subtle-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Setup in 3 Easy Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From download to access — done in minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="glass-card border-2 transition-smooth hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-8 space-y-4 text-center">
                <div className="relative inline-block">
                  <div className="w-16 h-16 rounded-2xl bg-hero-gradient flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const promotions = [
  {
    id: 1,
    title: "Smart File Organization",
    description: "Your files auto-organize across all devices — photos, documents, everything in one place",
    badge: "New Feature",
    action: "Learn More",
  },
  {
    id: 2,
    title: "Free Workshop: Save on Cloud Storage",
    description: "Learn how to stop paying Google and use what you already own",
    badge: "Free Event",
    action: "Register Now",
  },
  {
    id: 3,
    title: "Turn Your Old Laptop into a Cloud",
    description: "Give that unused laptop a purpose — unlimited storage without buying anything new",
    badge: "Popular Tip",
    action: "See How",
  },
];

const PromotionsArea = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const current = promotions[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % promotions.length);
  };

  return (
    <Card className="glass-card border-2 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-hero-gradient flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <Badge>{current.badge}</Badge>
                </div>
                <h3 className="font-semibold text-lg">{current.title}</h3>
                <p className="text-sm text-muted-foreground">{current.description}</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={handlePrev}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              {current.action}
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mt-4 justify-center">
          {promotions.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-primary" : "w-1.5 bg-muted"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotionsArea;

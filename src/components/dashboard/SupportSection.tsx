import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HelpCircle, MessageSquare, BookOpen, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SupportSection = () => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Support Ticket Created",
      description: "We'll get back to you within 24 hours",
    });
    
    setMessage("");
    setEmail("");
  };

  return (
    <Card className="glass-card border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Support & Help
        </CardTitle>
        <CardDescription>Get assistance with your Arevei Cloud</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button variant="outline" className="justify-start h-auto p-4">
            <BookOpen className="h-5 w-5 mr-3" />
            <div className="text-left">
              <p className="font-medium">Documentation</p>
              <p className="text-xs text-muted-foreground">Guides and tutorials</p>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto p-4">
            <MessageSquare className="h-5 w-5 mr-3" />
            <div className="text-left">
              <p className="font-medium">Community Forum</p>
              <p className="text-xs text-muted-foreground">Ask questions and share</p>
            </div>
          </Button>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="support-email">Your Email</Label>
            <Input
              id="support-email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="support-message">How can we help?</Label>
            <Textarea
              id="support-message"
              placeholder="Describe your issue or question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full hero-gradient">
            <Send className="h-4 w-4 mr-2" />
            Create Support Ticket
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SupportSection;

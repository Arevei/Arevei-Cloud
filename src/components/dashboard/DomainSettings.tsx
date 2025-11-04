import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Globe, Crown, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DomainSettings = () => {
  const { toast } = useToast();
  const [customSubdomain, setCustomSubdomain] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleAddCustomDomain = () => {
    if (!customSubdomain) {
      toast({
        title: "Invalid Subdomain",
        description: "Please enter a valid subdomain name",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Payment Required",
      description: "Custom subdomains are a premium feature. Redirecting to payment...",
    });
  };

  return (
    <Card className="glass-card border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Domain Settings
        </CardTitle>
        <CardDescription>Manage your cloud access URLs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Subdomain */}
        <div className="space-y-3">
          <Label>Your Cloud URL</Label>
          <div className="flex items-center gap-3 p-4 rounded-lg border bg-muted/50">
            <div className="flex-1">
              <p className="font-mono text-sm mb-1">username.arevei.cloud</p>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="hero-gradient">Active</Badge>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => window.open("https://username.arevei.cloud", "_blank")}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Custom Subdomain Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-primary" />
              Custom Subdomain
            </Label>
            <Badge variant="secondary">Premium</Badge>
          </div>

          {!showCustomInput ? (
            <Button 
              variant="outline" 
              className="w-full border-primary/50 hover:bg-primary/10"
              onClick={() => setShowCustomInput(true)}
            >
              <Crown className="h-4 w-4 mr-2" />
              Add Custom Subdomain
            </Button>
          ) : (
            <div className="space-y-3 p-4 rounded-lg border border-primary/30 bg-primary/5">
              <div className="space-y-2">
                <Label htmlFor="custom-subdomain">Choose Your Subdomain</Label>
                <div className="flex gap-2">
                  <Input
                    id="custom-subdomain"
                    placeholder="mybrand"
                    value={customSubdomain}
                    onChange={(e) => setCustomSubdomain(e.target.value)}
                  />
                  <div className="flex items-center px-3 rounded-md bg-muted text-sm text-muted-foreground whitespace-nowrap">
                    .arevei.cloud
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-md bg-card border">
                <p className="text-sm font-medium mb-1">Premium Feature</p>
                <p className="text-xs text-muted-foreground mb-2">
                  Custom subdomains are available for $5/month
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>✓ Professional branded URL</li>
                  <li>✓ SSL certificate included</li>
                  <li>✓ Instant activation</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddCustomDomain} className="flex-1 hero-gradient">
                  Continue to Payment
                </Button>
                <Button variant="ghost" onClick={() => setShowCustomInput(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DomainSettings;

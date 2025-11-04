import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Link2, Globe, CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Arevei Cloud Agent is downloading...",
    });
    setTimeout(() => setCurrentStep(2), 1000);
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate API check for connected instance
    setTimeout(() => {
      setIsConnecting(false);
      setCurrentStep(3);
      toast({
        title: "Agent Connected!",
        description: "Your cloud agent is now connected successfully.",
      });
    }, 2000);
  };

  const handleAccessCloud = () => {
    onComplete();
    toast({
      title: "Setup Complete!",
      description: "Welcome to your personal cloud.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold mb-2">Welcome to Your Personal Cloud</h2>
        <p className="text-muted-foreground">Let's turn your device into a private cloud in 3 easy steps</p>
      </div>

      {/* Progress Indicators */}
      <div className="flex gap-4 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-smooth ${
                step < currentStep
                  ? "bg-primary text-primary-foreground"
                  : step === currentStep
                  ? "bg-hero-gradient text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step < currentStep ? <CheckCircle2 className="h-4 w-4" /> : step}
            </div>
            {step < 3 && <div className={`flex-1 h-1 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Download */}
      <Card className={`glass-card border-2 ${currentStep === 1 ? "border-primary" : ""}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Step 1: Download the App
          </CardTitle>
          <CardDescription>Install Arevei on your laptop or desktop</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This small app runs quietly in the background and handles all the cloud magic for you.
          </p>
          <div className="space-y-2">
            <p className="text-sm font-medium">How to Install:</p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Download the installer for your system (Windows, Mac, or Linux)</li>
              <li>• Double-click and follow the simple setup</li>
              <li>• It starts automatically — no setup needed</li>
            </ul>
          </div>
          <Button onClick={handleDownload} className="hero-gradient" disabled={currentStep > 1}>
            <Download className="h-4 w-4 mr-2" />
            Download Agent
          </Button>
        </CardContent>
      </Card>

      {/* Step 2: Connect */}
      <Card className={`glass-card border-2 ${currentStep === 2 ? "border-primary" : ""}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            Step 2: Connect Your Device
          </CardTitle>
          <CardDescription>Link the app to your Arevei account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Once the app is running, click below to connect it with your account.
          </p>
          <Button onClick={handleConnect} disabled={currentStep !== 2 || isConnecting} className="hero-gradient">
            {isConnecting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4 mr-2" />
                Connect Agent
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Step 3: Access Cloud */}
      <Card className={`glass-card border-2 ${currentStep === 3 ? "border-primary" : ""}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Step 3: Start Using Your Cloud
          </CardTitle>
          <CardDescription>You're all set! Access your files anywhere.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 3 && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm font-medium mb-1">Your Cloud URL:</p>
              <p className="text-sm font-mono text-primary">username.arevei.cloud</p>
            </div>
          )}
          <Button onClick={handleAccessCloud} disabled={currentStep !== 3} className="hero-gradient">
            <Globe className="h-4 w-4 mr-2" />
            Open My Cloud
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;

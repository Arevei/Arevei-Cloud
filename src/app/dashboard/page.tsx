"use client"
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
// import { supabase } from "@/integrations/supabase/client";
import { Cloud, LogOut } from "lucide-react";
import OnboardingFlow from "@/components/dashboard/OnboardingFlow";
import InstanceOverview from "@/components/dashboard/InstanceOverview";
import PromotionsArea from "@/components/dashboard/PromotionsArea";
import SyncSettings from "@/components/dashboard/SyncSettings";
import DomainSettings from "@/components/dashboard/DomainSettings";
import ActivityLogs from "@/components/dashboard/ActivityLogs";
import SupportSection from "@/components/dashboard/SupportSection";
import CloudStorage from "@/components/dashboard/CloudStorage";
import SharingSettings from "@/components/dashboard/SharingSettings";

const Dashboard = () => {
  // const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [setupComplete, setSetupComplete] = useState(false);

  // useEffect(() => {
  //   // Check authentication
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     if (!session) {
  //       navigate("/login");
  //     } else {
  //       setUser(session.user);
  //     }
  //   });

  //   const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
  //     if (event === "SIGNED_OUT" || !session) {
  //       navigate("/login");
  //     } else {
  //       setUser(session.user);
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, [navigate]);

  const handleLogout = async () => {
    // await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  const handleSetupComplete = () => {
    setSetupComplete(true);
  };

  const userName = user?.user_metadata?.name || user?.email?.split("@")[0] || "User";

  return (
    <div className="min-h-screen bg-subtle-gradient">
      {/* Header */}
      <header className="glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center">
                <Cloud className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Arevei Cloud</h1>
                <p className="text-sm text-muted-foreground">Personal Dashboard</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {!setupComplete ? (
          <OnboardingFlow onComplete={handleSetupComplete} />
        ) : (
          <>
            {/* Welcome Section */}
            <div className="space-y-2 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold">
                Welcome back, {userName}!
              </h2>
              <p className="text-muted-foreground text-lg">
                Manage and monitor your personal cloud
              </p>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Controls */}
              <div className="lg:col-span-2 space-y-6">
                <CloudStorage />
                <SharingSettings />
                <InstanceOverview />
                <PromotionsArea />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SyncSettings />
                  <DomainSettings />
                </div>
              </div>

              {/* Right Column - Logs & Support */}
              <div className="space-y-6">
                <ActivityLogs />
                <SupportSection />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cloud, Power, Globe, Database, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InstanceOverview = () => {
  const { toast } = useToast();
  const [instanceStatus, setInstanceStatus] = useState<"online" | "offline">("online");

  const toggleInstance = () => {
    const newStatus = instanceStatus === "online" ? "offline" : "online";
    setInstanceStatus(newStatus);
    toast({
      title: newStatus === "online" ? "Instance Started" : "Instance Stopped",
      description: newStatus === "online" 
        ? "Your cloud is now accessible" 
        : "Your cloud has been stopped",
    });
  };

  const handleOpenCloud = () => {
    window.open("https://username.arevei.cloud", "_blank");
  };

  return (
    <Card className="glass-card border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Instance Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Power className="h-4 w-4" />
              Status
            </div>
            <Badge variant={instanceStatus === "online" ? "default" : "secondary"} className={instanceStatus === "online" ? "hero-gradient" : ""}>
              {instanceStatus === "online" ? "Online" : "Offline"}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Uptime
            </div>
            <p className="text-lg font-semibold">24h 32m</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Database className="h-4 w-4" />
              Storage Used
            </div>
            <p className="text-lg font-semibold">12.4 GB</p>
            <p className="text-xs text-muted-foreground">of 100 GB</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              Last Sync
            </div>
            <p className="text-lg font-semibold">2 min ago</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={toggleInstance}
            className={instanceStatus === "online" ? "bg-destructive hover:bg-destructive/90" : "hero-gradient"}
          >
            <Power className="h-4 w-4 mr-2" />
            {instanceStatus === "online" ? "Stop Instance" : "Start Instance"}
          </Button>
          
          <Button variant="outline" onClick={handleOpenCloud} disabled={instanceStatus === "offline"}>
            <Globe className="h-4 w-4 mr-2" />
            Open My Cloud
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstanceOverview;

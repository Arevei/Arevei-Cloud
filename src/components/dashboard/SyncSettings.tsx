import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Folder, Network } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SyncSettings = () => {
  const { toast } = useToast();
  const [autoSync, setAutoSync] = useState(true);
  const [tunnelProvider, setTunnelProvider] = useState("none");

  const handleSyncNow = () => {
    toast({
      title: "Syncing...",
      description: "Your files are being synchronized",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your sync preferences have been updated",
    });
  };

  return (
    <Card className="glass-card border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Sync & Settings
        </CardTitle>
        <CardDescription>Manage how your files are synchronized and accessed</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Auto Sync Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="auto-sync" className="text-base">Auto Sync</Label>
            <p className="text-sm text-muted-foreground">
              Automatically sync files when changes are detected
            </p>
          </div>
          <Switch
            id="auto-sync"
            checked={autoSync}
            onCheckedChange={setAutoSync}
          />
        </div>

        {/* Sync Now Button */}
        <Button onClick={handleSyncNow} variant="outline" className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Sync Now
        </Button>

        {/* Folder Path */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Folder className="h-4 w-4" />
            Storage Folder
          </Label>
          <div className="p-3 rounded-md bg-muted font-mono text-sm">
            D:\AreveiCloud
          </div>
          <p className="text-xs text-muted-foreground">
            This is where your cloud files are stored locally
          </p>
        </div>

        {/* Tunnel Provider */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Tunnel Provider
          </Label>
          <Select value={tunnelProvider} onValueChange={setTunnelProvider}>
            <SelectTrigger>
              <SelectValue placeholder="Select tunnel provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None (Local Only)</SelectItem>
              <SelectItem value="ngrok">ngrok</SelectItem>
              <SelectItem value="cloudflare">Cloudflare Tunnel</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Choose how you want to access your cloud from outside your network
          </p>
        </div>

        {/* Save Button */}
        <Button onClick={handleSaveSettings} className="w-full hero-gradient">
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default SyncSettings;

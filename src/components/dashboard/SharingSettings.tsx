import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Share2, Link2, Lock, Calendar, Copy, 
  Trash2, ExternalLink 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SharedItem {
  id: string;
  name: string;
  type: "file" | "folder";
  shareLink: string;
  isPublic: boolean;
  hasPassword: boolean;
  expiresAt: string | null;
  views: number;
}

const SharingSettings = () => {
  const { toast } = useToast();
  const [shares, setShares] = useState<SharedItem[]>([
    {
      id: "1",
      name: "Project_Report.pdf",
      type: "file",
      shareLink: "https://arevei.cloud/s/abc123xyz",
      isPublic: true,
      hasPassword: false,
      expiresAt: null,
      views: 12,
    },
    {
      id: "2",
      name: "Photos",
      type: "folder",
      shareLink: "https://arevei.cloud/s/xyz789abc",
      isPublic: false,
      hasPassword: true,
      expiresAt: "2025-12-31",
      views: 5,
    },
  ]);

  const [selectedShare, setSelectedShare] = useState<string | null>(null);
  const [sharePassword, setSharePassword] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Link Copied",
      description: "Share link copied to clipboard",
    });
  };

  const togglePublic = (id: string) => {
    setShares(prev => prev.map(share => 
      share.id === id ? { ...share, isPublic: !share.isPublic } : share
    ));
    toast({
      title: "Share Updated",
      description: "Share visibility has been changed",
    });
  };

  const updatePassword = (id: string) => {
    if (!sharePassword) {
      toast({
        title: "Password Required",
        description: "Enter a password to protect this share",
        variant: "destructive",
      });
      return;
    }

    setShares(prev => prev.map(share => 
      share.id === id ? { ...share, hasPassword: true } : share
    ));
    
    toast({
      title: "Password Set",
      description: "This share is now password protected",
    });
    
    setSharePassword("");
    setSelectedShare(null);
  };

  const updateExpiry = (id: string) => {
    if (!expiryDate) {
      toast({
        title: "Date Required",
        description: "Select an expiry date",
        variant: "destructive",
      });
      return;
    }

    setShares(prev => prev.map(share => 
      share.id === id ? { ...share, expiresAt: expiryDate } : share
    ));
    
    toast({
      title: "Expiry Set",
      description: `This share will expire on ${expiryDate}`,
    });
    
    setExpiryDate("");
    setSelectedShare(null);
  };

  const removeShare = (id: string) => {
    setShares(prev => prev.filter(share => share.id !== id));
    toast({
      title: "Share Removed",
      description: "The share link has been deleted",
    });
  };

  return (
    <Card className="glass-card border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Sharing & Access Control
        </CardTitle>
        <CardDescription>
          Share files safely with password-protected links
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {shares.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Share2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No shared files yet</p>
            <p className="text-sm mt-1">Share files securely from your cloud storage</p>
          </div>
        ) : (
          shares.map((share) => (
            <div
              key={share.id}
              className="p-4 rounded-lg border bg-card space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{share.name}</h4>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-muted">
                      {share.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{share.views} views</span>
                    {share.hasPassword && (
                      <span className="flex items-center gap-1">
                        <Lock className="h-3 w-3" />
                        Password protected
                      </span>
                    )}
                    {share.expiresAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Expires {share.expiresAt}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Label className="text-sm">Public</Label>
                  <Switch
                    checked={share.isPublic}
                    onCheckedChange={() => togglePublic(share.id)}
                  />
                </div>
              </div>

              {/* Share Link */}
              <div className="flex gap-2">
                <Input
                  value={share.shareLink}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(share.shareLink)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => window.open(share.shareLink, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>

              {/* Controls */}
              {selectedShare === share.id ? (
                <div className="space-y-3 p-3 rounded-lg bg-muted/50">
                  <div className="space-y-2">
                    <Label>Set Password</Label>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        placeholder="Enter password"
                        value={sharePassword}
                        onChange={(e) => setSharePassword(e.target.value)}
                      />
                      <Button onClick={() => updatePassword(share.id)}>
                        Save
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Set Expiry Date</Label>
                    <div className="flex gap-2">
                      <Input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                      />
                      <Button onClick={() => updateExpiry(share.id)}>
                        Save
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedShare(null)}
                    className="w-full"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedShare(share.id)}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    {share.hasPassword ? "Change" : "Add"} Password
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedShare(share.id)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {share.expiresAt ? "Change" : "Set"} Expiry
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeShare(share.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default SharingSettings;

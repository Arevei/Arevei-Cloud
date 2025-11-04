import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Cloud, Upload, Download, Trash2, FolderPlus, 
  Grid3x3, List, Lock, Share2, RefreshCw, ExternalLink 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FileUploadModal from "./FileUploadModal";
import AccessPasswordModal from "./AccessPasswordModal";
import EncryptionKeyModal from "./EncryptionKeyModal";

interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size: string;
  modified: string;
  synced: boolean;
  encrypted: boolean;
}

const CloudStorage = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [encryptionEnabled, setEncryptionEnabled] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEncryptionModal, setShowEncryptionModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  // Mock file data
  const [files] = useState<FileItem[]>([
    { id: "1", name: "Documents", type: "folder", size: "2.4 GB", modified: "2 hours ago", synced: true, encrypted: true },
    { id: "2", name: "Photos", type: "folder", size: "8.1 GB", modified: "1 day ago", synced: true, encrypted: true },
    { id: "3", name: "Project_Report.pdf", type: "file", size: "3.2 MB", modified: "3 hours ago", synced: true, encrypted: false },
    { id: "4", name: "Presentation.pptx", type: "file", size: "12.8 MB", modified: "Yesterday", synced: false, encrypted: false },
  ]);

  const handleUnlock = (password: string) => {
    // Mock password validation
    if (password.length > 0) {
      setIsUnlocked(true);
      setShowPasswordModal(false);
      toast({
        title: "Cloud Unlocked",
        description: "Your files are now accessible",
      });
    }
  };

  const handleSync = () => {
    toast({
      title: "Syncing...",
      description: "Your files are being synchronized",
    });
  };

  const handleDelete = (id: string) => {
    toast({
      title: "File Deleted",
      description: "The selected file has been removed",
    });
  };

  const toggleEncryption = (enabled: boolean) => {
    setEncryptionEnabled(enabled);
    if (enabled) {
      setShowEncryptionModal(true);
    }
    toast({
      title: enabled ? "Encryption Enabled" : "Encryption Disabled",
      description: enabled 
        ? "All new uploads will be encrypted with AES-256" 
        : "Files will be uploaded without encryption",
    });
  };

  if (!isUnlocked) {
    return (
      <>
        <Card className="glass-card border-2">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-hero-gradient flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle>Cloud Storage Locked</CardTitle>
            <CardDescription>
              Enter your password to unlock your private cloud
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowPasswordModal(true)} 
              className="w-full hero-gradient"
            >
              Unlock Cloud Storage
            </Button>
          </CardContent>
        </Card>

        <AccessPasswordModal 
          open={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onUnlock={handleUnlock}
        />
      </>
    );
  }

  return (
    <>
      <Card className="glass-card border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              <CardTitle>My Cloud Storage</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              >
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3x3 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <CardDescription>Your files, on your device — private and secure</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Security Settings */}
          <div className="p-4 rounded-lg bg-muted/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="encryption" className="text-base">End-to-End Encryption</Label>
                <p className="text-sm text-muted-foreground">
                  Lock your files before they leave your device — only you can unlock them
                </p>
              </div>
              <Switch
                id="encryption"
                checked={encryptionEnabled}
                onCheckedChange={toggleEncryption}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowEncryptionModal(true)}
              >
                <Lock className="h-4 w-4 mr-2" />
                Manage Encryption Key
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsUnlocked(false)}
              >
                <Lock className="h-4 w-4 mr-2" />
                Lock Storage
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button onClick={() => setShowUploadModal(true)} className="hero-gradient">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button variant="outline" onClick={handleSync}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Now
            </Button>
            <Button variant="outline">
              <FolderPlus className="h-4 w-4 mr-2" />
              New Folder
            </Button>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Open App
            </Button>
          </div>

          {/* Files Grid/List */}
          <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-2"}>
            {files.map((file) => (
              <div
                key={file.id}
                className={`p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all cursor-pointer ${
                  selectedFiles.includes(file.id) ? "border-primary" : ""
                }`}
                onClick={() => {
                  setSelectedFiles(prev => 
                    prev.includes(file.id) 
                      ? prev.filter(id => id !== file.id)
                      : [...prev, file.id]
                  );
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg ${
                    file.type === "folder" ? "bg-hero-gradient" : "bg-muted"
                  } flex items-center justify-center flex-shrink-0`}>
                    {file.type === "folder" ? (
                      <Cloud className="h-5 w-5 text-white" />
                    ) : (
                      <span className="text-xs font-bold">
                        {file.name.split('.').pop()?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                      {file.encrypted && (
                        <Lock className="h-3 w-3 text-green-500" />
                      )}
                      {!file.synced && (
                        <RefreshCw className="h-3 w-3 text-amber-500 animate-spin" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{file.modified}</p>
                  </div>
                </div>

                {viewMode === "list" && (
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(file.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <FileUploadModal 
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        encryptionEnabled={encryptionEnabled}
      />

      <EncryptionKeyModal 
        open={showEncryptionModal}
        onClose={() => setShowEncryptionModal(false)}
      />
    </>
  );
};

export default CloudStorage;

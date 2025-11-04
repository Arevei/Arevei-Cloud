import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Key, Download, RefreshCw, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EncryptionKeyModalProps {
  open: boolean;
  onClose: () => void;
}

const EncryptionKeyModal = ({ open, onClose }: EncryptionKeyModalProps) => {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [showKey, setShowKey] = useState(false);

  // Mock encryption key (in production, this would be derived from user's master password)
  const encryptionKey = "AREVEI-" + "X".repeat(40) + "-KEY";

  const handleBackupKey = () => {
    const blob = new Blob([encryptionKey], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "arevei-encryption-key.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Key Downloaded",
      description: "Store this key in a safe place. You'll need it to recover your data.",
    });
  };

  const handleRotateKey = () => {
    if (!currentPassword) {
      toast({
        title: "Password Required",
        description: "Enter your current password to rotate the encryption key",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Key Rotation Started",
      description: "This may take a few minutes to re-encrypt all your files",
    });

    // Mock key rotation process
    setTimeout(() => {
      toast({
        title: "Key Rotation Complete",
        description: "All files have been re-encrypted with the new key",
      });
      setCurrentPassword("");
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-hero-gradient flex items-center justify-center mb-2">
            <Key className="h-6 w-6 text-white" />
          </div>
          <DialogTitle className="text-center">Encryption Key Management</DialogTitle>
          <DialogDescription className="text-center">
            Manage your AES-256 encryption key. Keep it safe!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Warning Banner */}
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-500">Important</p>
              <p className="text-muted-foreground mt-1">
                If you lose your encryption key, your data cannot be recovered. 
                Always keep a secure backup.
              </p>
            </div>
          </div>

          {/* Show/Hide Key */}
          <div className="space-y-2">
            <Label>Your Encryption Key</Label>
            {showKey ? (
              <Textarea
                value={encryptionKey}
                readOnly
                className="font-mono text-xs"
                rows={3}
              />
            ) : (
              <Input
                type="password"
                value={encryptionKey}
                readOnly
                className="font-mono"
              />
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowKey(!showKey)}
              className="w-full"
            >
              {showKey ? "Hide" : "Show"} Encryption Key
            </Button>
          </div>

          {/* Backup Key */}
          <Button
            variant="outline"
            onClick={handleBackupKey}
            className="w-full"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Backup Key
          </Button>

          {/* Rotate Key */}
          <div className="space-y-3 pt-4 border-t">
            <div>
              <Label htmlFor="rotate-password" className="text-base">
                Rotate Encryption Key
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Generate a new key and re-encrypt all files
              </p>
            </div>
            <Input
              id="rotate-password"
              type="password"
              placeholder="Enter current password to confirm"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Button
              variant="outline"
              onClick={handleRotateKey}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Rotate Key
            </Button>
          </div>

          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EncryptionKeyModal;

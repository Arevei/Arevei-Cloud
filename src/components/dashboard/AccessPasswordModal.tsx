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
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AccessPasswordModalProps {
  open: boolean;
  onClose: () => void;
  onUnlock: (password: string) => void;
}

const AccessPasswordModal = ({ open, onClose, onUnlock }: AccessPasswordModalProps) => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      toast({
        title: "Password Required",
        description: "Please enter your access password",
        variant: "destructive",
      });
      return;
    }

    // Mock validation - in production, this would verify against encrypted storage
    onUnlock(password);
    setPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-hero-gradient flex items-center justify-center mb-2">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <DialogTitle className="text-center">Enter Access Password</DialogTitle>
          <DialogDescription className="text-center">
            Your cloud storage is protected. Enter your master password to continue.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Master Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-input"
            />
            <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
              Remember me for 30 days
            </Label>
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 hero-gradient">
              Unlock
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Forgot password? Contact support to reset your access.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AccessPasswordModal;

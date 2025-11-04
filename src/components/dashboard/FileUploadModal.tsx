import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
  encryptionEnabled: boolean;
}

interface UploadFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: "pending" | "uploading" | "complete" | "error";
}

const FileUploadModal = ({ open, onClose, encryptionEnabled }: FileUploadModalProps) => {
  const { toast } = useToast();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadFile[] = Array.from(fileList).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      progress: 0,
      status: "pending" as const,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload with encryption
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: "uploading" as const } : f
    ));

    const interval = setInterval(() => {
      setFiles(prev => {
        const file = prev.find(f => f.id === fileId);
        if (!file || file.progress >= 100) {
          clearInterval(interval);
          return prev.map(f => 
            f.id === fileId ? { ...f, status: "complete" as const, progress: 100 } : f
          );
        }
        return prev.map(f => 
          f.id === fileId ? { ...f, progress: Math.min(f.progress + 10, 100) } : f
        );
      });
    }, 300);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleClose = () => {
    if (files.some(f => f.status === "uploading")) {
      toast({
        title: "Upload in Progress",
        description: "Please wait for uploads to complete",
        variant: "destructive",
      });
      return;
    }
    setFiles([]);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Files
            {encryptionEnabled && (
              <span className="ml-2 px-2 py-1 text-xs bg-green-500/20 text-green-500 rounded-full flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Encrypted
              </span>
            )}
          </DialogTitle>
          <DialogDescription>
            {encryptionEnabled 
              ? "Files will be encrypted with AES-256 before upload" 
              : "Upload files to your cloud storage"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-muted"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">
              Drag and drop files here
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              id="file-input"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("file-input")?.click()}
            >
              Select Files
            </Button>
          </div>

          {/* Files List */}
          {files.length > 0 && (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {files.map(file => (
                <div
                  key={file.id}
                  className="p-3 rounded-lg border bg-card space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                          {encryptionEnabled && " • Encrypting..."}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeFile(file.id)}
                      disabled={file.status === "uploading"}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {file.status !== "pending" && (
                    <Progress value={file.progress} />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              {files.some(f => f.status === "uploading") ? "Cancel" : "Close"}
            </Button>
            {files.length > 0 && files.every(f => f.status === "complete") && (
              <Button className="flex-1 hero-gradient" onClick={handleClose}>
                Done
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;

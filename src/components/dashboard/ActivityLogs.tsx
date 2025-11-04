import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, CheckCircle2, XCircle, AlertCircle, Clock } from "lucide-react";

const logs = [
  {
    id: 1,
    event: "Instance started",
    timestamp: "2 minutes ago",
    status: "success",
  },
  {
    id: 2,
    event: "Sync completed",
    timestamp: "5 minutes ago",
    status: "success",
  },
  {
    id: 3,
    event: "Domain activated",
    timestamp: "1 hour ago",
    status: "success",
  },
  {
    id: 4,
    event: "Agent connected",
    timestamp: "2 hours ago",
    status: "success",
  },
  {
    id: 5,
    event: "Backup completed",
    timestamp: "3 hours ago",
    status: "success",
  },
  {
    id: 6,
    event: "Sync started",
    timestamp: "3 hours ago",
    status: "info",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "error":
      return <XCircle className="h-4 w-4 text-destructive" />;
    case "warning":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "success":
      return <Badge variant="default" className="bg-green-500">Success</Badge>;
    case "error":
      return <Badge variant="destructive">Error</Badge>;
    case "warning":
      return <Badge variant="secondary" className="bg-yellow-500">Warning</Badge>;
    default:
      return <Badge variant="secondary">Info</Badge>;
  }
};

const ActivityLogs = () => {
  return (
    <Card className="glass-card border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Activity & Logs
        </CardTitle>
        <CardDescription>Recent events and system activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth"
              >
                <div className="mt-0.5">{getStatusIcon(log.status)}</div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{log.event}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    {getStatusBadge(log.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityLogs;

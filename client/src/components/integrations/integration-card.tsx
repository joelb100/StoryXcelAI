import { ExternalIntegration } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { MoreHorizontal, ExternalLink, Settings, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SiFigma, SiAdobe } from "react-icons/si";

interface IntegrationCardProps {
  integration: ExternalIntegration;
  onToggle: (id: number, isActive: boolean) => void;
  onEdit: (integration: ExternalIntegration) => void;
  onDelete: (id: number) => void;
}

const getToolIcon = (toolType: string) => {
  switch (toolType) {
    case "figma":
      return <SiFigma className="w-5 h-5 text-purple-600" />;
    case "adobe_creative_cloud":
    case "photoshop":
    case "illustrator":
    case "after_effects":
      return <SiAdobe className="w-5 h-5 text-red-600" />;
    default:
      return <ExternalLink className="w-5 h-5 text-gray-600" />;
  }
};

const getToolName = (toolType: string) => {
  const names: Record<string, string> = {
    figma: "Figma",
    adobe_creative_cloud: "Adobe Creative Cloud",
    photoshop: "Adobe Photoshop",
    illustrator: "Adobe Illustrator",
    after_effects: "Adobe After Effects",
  };
  return names[toolType] || toolType.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
};

const getStatusColor = (isActive: boolean | null, tokenExpiry?: Date | null) => {
  if (!isActive) return "secondary";
  if (tokenExpiry && new Date(tokenExpiry) < new Date()) return "destructive";
  return "default";
};

const getStatusText = (isActive: boolean | null, tokenExpiry?: Date | null) => {
  if (!isActive) return "Inactive";
  if (tokenExpiry && new Date(tokenExpiry) < new Date()) return "Token Expired";
  return "Connected";
};

export function IntegrationCard({ integration, onToggle, onEdit, onDelete }: IntegrationCardProps) {
  const isExpired = integration.tokenExpiry && new Date(integration.tokenExpiry) < new Date();
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-3">
          {getToolIcon(integration.toolType)}
          <div>
            <CardTitle className="text-lg">{getToolName(integration.toolType)}</CardTitle>
            <CardDescription>
              {integration.accountId && `Account: ${integration.accountId}`}
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={getStatusColor(integration.isActive, integration.tokenExpiry)}>
            {getStatusText(integration.isActive, integration.tokenExpiry)}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(integration)}>
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(integration.id)}
                className="text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Connected {integration.createdAt ? new Date(integration.createdAt).toLocaleDateString() : "Unknown"}
            {isExpired && (
              <div className="text-destructive text-xs mt-1">
                Token expired. Please reconnect.
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Active</span>
            <Switch
              checked={integration.isActive ?? false}
              onCheckedChange={(checked) => onToggle(integration.id, checked)}
              disabled={isExpired}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
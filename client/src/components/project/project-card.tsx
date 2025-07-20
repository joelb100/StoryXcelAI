import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Palette, CheckCircle } from "lucide-react";
import type { ProjectWithOwner } from "@shared/schema";

interface ProjectCardProps {
  project: ProjectWithOwner;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'in_progress':
      return {
        icon: Star,
        badgeClass: 'status-active',
        iconClass: 'project-status-in_progress',
        label: 'Active'
      };
    case 'planning':
      return {
        icon: Palette,
        badgeClass: 'status-planning',
        iconClass: 'project-status-planning',
        label: 'Planning'
      };
    case 'completed':
      return {
        icon: CheckCircle,
        badgeClass: 'status-completed',
        iconClass: 'project-status-completed',
        label: 'Done'
      };
    default:
      return {
        icon: Star,
        badgeClass: 'status-active',
        iconClass: 'project-status-in_progress',
        label: 'Active'
      };
  }
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const statusConfig = getStatusConfig(project.status);
  const StatusIcon = statusConfig.icon;

  return (
    <Card className="flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors border hover:border-primary/20">
      <div className={`w-10 h-10 ${statusConfig.iconClass} rounded-lg flex items-center justify-center`}>
        <StatusIcon className="text-white text-sm" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{project.name}</h3>
        <p className="text-xs text-muted-foreground">{project.status.replace('_', ' ')}</p>
        <p className="text-xs text-muted-foreground truncate">
          {project.description || 'No description'}
        </p>
      </div>
      <Badge className={`${statusConfig.badgeClass} text-xs font-medium flex-shrink-0`}>
        {statusConfig.label}
      </Badge>
    </Card>
  );
}

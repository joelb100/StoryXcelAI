import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Share, Clock, DollarSign, Users } from "lucide-react";
import type { ProjectWithOwner } from "@shared/schema";

interface ProjectShowcaseProps {
  project: ProjectWithOwner;
}

export default function ProjectShowcase({ project }: ProjectShowcaseProps) {
  const backgroundImage = project.heroImageUrl || 
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080";

  const formatBudget = (budget?: number) => {
    if (!budget) return 'Not set';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(budget);
  };

  const formatTime = (hours?: number) => {
    if (!hours) return 'Not estimated';
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
  };

  return (
    <Card className="relative rounded-xl overflow-hidden shadow-lg mb-6 h-96">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className="absolute inset-0 hero-overlay" />
      
      <div className="relative h-full flex items-center p-8">
        <div className="text-white max-w-2xl">
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              PROJECT
            </Badge>
            <Badge 
              className={`${
                project.status === 'in_progress' ? 'bg-blue-500/80' :
                project.status === 'planning' ? 'bg-amber-500/80' :
                'bg-emerald-500/80'
              } text-white border-0`}
            >
              {project.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          
          <h2 className="text-4xl font-bold mb-4 tracking-wider uppercase">
            {project.name}
          </h2>
          
          <p className="text-lg leading-relaxed mb-6 text-gray-200 line-clamp-4">
            {project.description || 
              "A creative project in development. Add a description to tell others about your vision and goals for this project."
            }
          </p>

          {/* Project Stats */}
          <div className="flex items-center space-x-6 mb-6 text-sm">
            {project.budget && (
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>{formatBudget(project.budget)}</span>
              </div>
            )}
            {project.timeEstimate && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatTime(project.timeEstimate)}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Owner: {project.owner.firstName} {project.owner.lastName}</span>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Play className="w-4 h-4 mr-2" />
              Continue Project
            </Button>
            <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-white/30">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

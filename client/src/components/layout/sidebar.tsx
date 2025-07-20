import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/project/project-card";
import { 
  ShoppingCart, 
  Package, 
  Coins, 
  BookOpen, 
  TrendingUp, 
  Camera, 
  Music, 
  Type,
  Plus
} from "lucide-react";
import type { ProjectWithOwner } from "@shared/schema";
import { useState } from "react";
import CreateProjectDialog from "@/components/project/create-project-dialog";

interface SidebarProps {
  projects: ProjectWithOwner[];
}

const featuredModules = [
  { name: "Store", icon: ShoppingCart, bgClass: "module-store" },
  { name: "Assets", icon: Package, bgClass: "module-assets" },
  { name: "Credits", icon: Coins, bgClass: "module-credits" },
  { name: "Library", icon: BookOpen, bgClass: "module-library" },
  { name: "Trending", icon: TrendingUp, bgClass: "module-trending" },
  { name: "Photos", icon: Camera, bgClass: "module-photos" },
  { name: "Audio", icon: Music, bgClass: "module-audio" },
  { name: "Fonts", icon: Type, bgClass: "module-fonts" },
];

export default function Sidebar({ projects }: SidebarProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <>
      <aside className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        {/* Projects Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-charcoal">Projects</h2>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setCreateDialogOpen(true)}
              className="text-primary hover:text-primary/80"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <Card className="p-4 border-dashed border-2 text-center">
                <p className="text-muted-foreground text-sm mb-2">No projects yet</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setCreateDialogOpen(true)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Create Project
                </Button>
              </Card>
            )}
          </div>
        </div>

        {/* Featured Modules Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-charcoal">Featured Modules</h3>
          <div className="grid grid-cols-4 gap-2">
            {featuredModules.map((module) => (
              <div
                key={module.name}
                className={`${module.bgClass} rounded-lg p-3 text-white hover:shadow-md transition-shadow cursor-pointer group`}
              >
                <module.icon className="text-lg mb-1 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-medium">{module.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Side News Section */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-charcoal">Side News</h3>
          <div className="bg-muted rounded-lg p-3">
            <Badge variant="secondary" className="mb-2 text-xs">
              Platform Update
            </Badge>
            <p className="text-xs text-muted-foreground leading-relaxed">
              New builder modules are coming soon! We're working hard to bring you 
              enhanced creative tools for better workflow management. Stay tuned for 
              exciting updates including improved collaboration features and 
              AI-powered assistance.
            </p>
          </div>
        </div>
      </aside>

      <CreateProjectDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
      />
    </>
  );
}

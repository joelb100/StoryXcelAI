import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import RightSidebar from "@/components/layout/right-sidebar";
import ProjectShowcase from "@/components/project/project-showcase";
import CreateProjectDialog from "@/components/project/create-project-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, Film, Palette, FileText, Layers, Globe, Play, Clock, DollarSign } from "lucide-react";
import type { ProjectWithOwner } from "@/../../shared/schema";

function DashboardLayout() {
  const { user } = useAuth();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Mock data for demo purposes when not authenticated
  const mockProjects: ProjectWithOwner[] = [
    {
      id: 1,
      name: "Gun Smoke",
      description: "Drifting into the dying glow of their hollow bounty hunter Eli Grantis is hunting the ruthless outlaw Silas Kane. But the town is abandoned by everyone but Kane, who secretly prances the shadows with a young girl accused of arson along with a military archive and a poker that with a violent past. It not about bringing Kane to Sheriff Ben's jail grim smiths, where only his fastest draw will decide who walks away alive.",
      status: "in_progress",
      heroImageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
      ownerId: "demo-user",
      budget: 15000,
      timeEstimate: 120,
      actualTime: 0,
      actualCost: 0,
      tags: ["western", "bounty hunter", "action"],
      isPublic: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      owner: {
        id: "demo-user",
        email: "demo@example.com",
        firstName: "Demo",
        lastName: "User",
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    },
    {
      id: 2,
      name: "Epic Fantasy Chronicles",
      description: "In the mystical realm of Aethermoor, ancient magic awakens as darkness threatens to consume the land.",
      status: "planning",
      heroImageUrl: null,
      ownerId: "demo-user",
      budget: null,
      timeEstimate: null,
      actualTime: 0,
      actualCost: 0,
      tags: ["fantasy", "magic", "adventure"],
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      owner: {
        id: "demo-user",
        email: "demo@example.com",
        firstName: "Demo",
        lastName: "User",
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    }
  ];

  const { data: projects, isLoading: projectsLoading } = useQuery<ProjectWithOwner[]>({
    queryKey: ["/api/projects"],
    retry: false,
    placeholderData: mockProjects,
  });

  const featuredProject = projects?.find(p => p.status === "in_progress") || projects?.[0];

  const quickActions = [
    {
      title: "New Project",
      description: "Start a new creative project with our guided setup process",
      icon: Plus,
      color: "primary",
      action: () => setCreateDialogOpen(true)
    },
    {
      title: "Story Builder",
      description: "Develop characters, plot, and narrative structure",
      icon: BookOpen,
      color: "blue",
      action: () => console.log("Story Builder")
    },
    {
      title: "Asset Manager",
      description: "Organize visual assets, references, and media files",
      icon: Palette,
      color: "purple",
      action: () => console.log("Asset Manager")
    },
    {
      title: "Script Writer",
      description: "Professional screenplay and script formatting tools",
      icon: FileText,
      color: "green",
      action: () => console.log("Script Writer")
    }
  ];

  const featuredVideos = [
    {
      title: "Getting Started with StoryXcel",
      duration: "3:24",
      thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      title: "Advanced Story Building Techniques",
      duration: "8:15",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      title: "Collaborating on Creative Projects",
      duration: "5:42",
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    }
  ];

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar projects={projects || []} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Featured Project Showcase */}
          {featuredProject && (
            <ProjectShowcase project={featuredProject} />
          )}
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Card 
                key={action.title}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={action.action}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 bg-${action.color}-500 rounded-lg flex items-center justify-center`}>
                    <action.icon className="text-white text-lg" />
                  </div>
                  <h3 className="font-semibold">{action.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </Card>
            ))}
          </div>
          
          {/* Featured Videos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Featured Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredVideos.map((video) => (
                <Card key={video.title} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="text-white text-2xl" />
                    </div>
                    <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      {video.duration}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm">{video.title}</h4>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
        
        {/* Right Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200">
          <RightSidebar />
        </div>
      </div>
      
      <CreateProjectDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}

export default DashboardLayout;
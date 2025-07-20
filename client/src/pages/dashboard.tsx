import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import RightSidebar from "@/components/layout/right-sidebar";
import ProjectShowcase from "@/components/project/project-showcase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, TrendingUp, Play } from "lucide-react";
import { useState } from "react";
import CreateProjectDialog from "@/components/project/create-project-dialog";
import type { ProjectWithOwner } from "@shared/schema";

export default function Dashboard() {
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
      name: "Project #2",
      description: "Second demo project",
      status: "planning",
      heroImageUrl: null,
      ownerId: "demo-user",
      budget: null,
      timeEstimate: null,
      actualTime: 0,
      actualCost: 0,
      tags: [],
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
    // Use mock data if query fails (no auth)
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
      title: "Team Collaboration",
      description: "Invite team members and manage project permissions",
      icon: Users,
      color: "secondary",
      action: () => console.log("Team collaboration")
    },
    {
      title: "Analytics",
      description: "Track project progress and resource utilization",
      icon: TrendingUp,
      color: "accent",
      action: () => console.log("Analytics")
    }
  ];

  const featuredVideos = [
    {
      title: "How to Draw like Kim Jung Gi",
      views: "1.8M views",
      time: "5 years ago"
    },
    {
      title: "How to Actually Learn Perspective",
      views: "850K views", 
      time: "1 year ago"
    },
    {
      title: "Free Adobe Genesis",
      views: "2.1M views",
      time: "3 years ago"
    }
  ];

  if (projectsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex h-[calc(100vh-73px)]">
          <div className="w-80 bg-white border-r animate-pulse" />
          <div className="flex-1 animate-pulse bg-muted/20" />
          <div className="w-80 bg-white border-l animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-[calc(100vh-73px)]">
        <Sidebar projects={projects || []} />
        
        {/* Main Dashboard */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl">
            {/* Dashboard Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-charcoal mb-2">DASHBOARD</h1>
              <p className="text-muted-foreground">
                Welcome back, Creator! Here's what's happening with your projects.
              </p>
            </div>

            {/* Featured Project Showcase */}
            {featuredProject ? (
              <ProjectShowcase project={featuredProject} />
            ) : (
              <Card className="mb-6 h-96 flex items-center justify-center border-dashed border-2">
                <CardContent className="text-center">
                  <Plus className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Create Your First Project</h3>
                  <p className="text-muted-foreground mb-4">
                    Get started by creating a new project with our guided setup process.
                  </p>
                  <Button onClick={() => setCreateDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {quickActions.map((action, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-md transition-shadow cursor-pointer border hover:border-primary/20"
                  onClick={action.action}
                >
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                        action.color === 'primary' ? 'bg-primary/10' :
                        action.color === 'secondary' ? 'bg-secondary/10' :
                        'bg-accent/10'
                      }`}>
                        <action.icon className={`text-xl ${
                          action.color === 'primary' ? 'text-primary' :
                          action.color === 'secondary' ? 'text-secondary' :
                          'text-accent'
                        }`} />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm mb-4">{action.description}</p>
                    <Button 
                      variant="ghost" 
                      className={`p-0 h-auto font-medium text-sm ${
                        action.color === 'primary' ? 'text-primary hover:text-primary/80' :
                        action.color === 'secondary' ? 'text-secondary hover:text-secondary/80' :
                        'text-accent hover:text-accent/80'
                      }`}
                    >
                      Get Started →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Video Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Feature Video</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {featuredVideos.map((video, index) => (
                    <div 
                      key={index}
                      className="bg-muted rounded-lg p-4 hover:bg-muted/80 transition-colors cursor-pointer"
                    >
                      <div className="aspect-video bg-muted-foreground/10 rounded-lg mb-3 flex items-center justify-center">
                        <Play className="text-muted-foreground text-2xl" />
                      </div>
                      <h4 className="font-medium text-sm mb-1">{video.title}</h4>
                      <p className="text-xs text-muted-foreground">{video.views} • {video.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        <RightSidebar />
      </div>

      <CreateProjectDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}

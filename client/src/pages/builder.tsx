import { useParams } from "wouter";
import Header from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Film, 
  Package, 
  FileText, 
  Presentation, 
  Globe,
  ArrowLeft,
  Settings,
  Save
} from "lucide-react";

const builderConfig = {
  "production": {
    title: "Production Builder",
    description: "Manage production schedules, budgets, and resource allocation",
    icon: Film,
    color: "bg-red-500",
    features: [
      "Budget tracking and cost management",
      "Production scheduling and timelines", 
      "Resource allocation and team management",
      "Milestone tracking and progress monitoring",
      "Vendor and supplier management"
    ]
  },
  "asset": {
    title: "Asset Builder", 
    description: "Organize and manage all your creative assets in one place",
    icon: Package,
    color: "bg-gray-600",
    features: [
      "Digital asset library and organization",
      "Version control and asset history",
      "Collaborative asset sharing",
      "Metadata tagging and search",
      "Asset usage tracking and analytics"
    ]
  },
  "story": {
    title: "Story Builder",
    description: "Craft compelling narratives with AI-powered story development tools", 
    icon: BookOpen,
    color: "bg-blue-500",
    features: [
      "Character development and profiling",
      "Plot structure and story arcs",
      "World-building and setting creation",
      "Dialogue writing assistance",
      "Story timeline and continuity tracking"
    ]
  },
  "script": {
    title: "Script Builder",
    description: "Write, format, and collaborate on scripts with industry-standard tools",
    icon: FileText, 
    color: "bg-green-500",
    features: [
      "Industry-standard script formatting",
      "Real-time collaborative writing",
      "Character and dialogue management", 
      "Scene breakdown and analysis",
      "PDF export and sharing"
    ]
  },
  "deck": {
    title: "Deck Builder",
    description: "Create stunning pitch decks and presentations",
    icon: Presentation,
    color: "bg-purple-500", 
    features: [
      "Professional presentation templates",
      "Interactive slide creation",
      "Media integration and embedding",
      "Presenter notes and timing",
      "Export to multiple formats"
    ]
  },
  "world": {
    title: "World Builder",
    description: "Develop rich, detailed worlds for your creative projects",
    icon: Globe,
    color: "bg-indigo-500",
    features: [
      "Interactive world mapping",
      "Location and environment design",
      "Cultural and historical development",
      "Species and creature creation",
      "Interconnected world systems"
    ]
  }
};

export default function Builder() {
  const { type } = useParams<{ type: string }>();
  const config = builderConfig[type as keyof typeof builderConfig];

  if (!config) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-73px)]">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6 text-center">
              <h1 className="text-2xl font-bold text-destructive mb-2">Builder Not Found</h1>
              <p className="text-muted-foreground mb-4">
                The requested builder module does not exist.
              </p>
              <Button onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Builder Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className={`w-12 h-12 ${config.color} rounded-xl flex items-center justify-center`}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{config.title}</h1>
              <p className="text-muted-foreground">{config.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Builder Status */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Badge variant="secondary" className="mb-2">
                  Coming Soon
                </Badge>
                <h3 className="text-xl font-semibold mb-2">
                  {config.title} is under development
                </h3>
                <p className="text-muted-foreground">
                  We're working hard to bring you this powerful creative tool. 
                  Check back soon for updates!
                </p>
              </div>
              <div className="text-6xl opacity-20">
                <IconComponent />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Planned Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Planned Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {config.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Notified</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Want to be the first to know when {config.title} launches? 
                We'll notify you as soon as it's ready.
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="w-full">
                  Notify Me
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Builder Preview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-8 text-center">
              <IconComponent className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">
                {config.title} Interface
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                The {config.title.toLowerCase()} will feature an intuitive, 
                powerful interface designed specifically for creative professionals.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

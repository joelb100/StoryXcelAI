import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { SiFigma, SiAdobe } from "react-icons/si";

interface AddIntegrationDialogProps {
  onAddIntegration: (toolType: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const supportedTools = [
  {
    id: "figma",
    name: "Figma",
    description: "Design collaboration platform for UI/UX design",
    icon: <SiFigma className="w-8 h-8 text-purple-600" />,
    features: ["Import designs", "Sync prototypes", "Access team libraries", "Real-time collaboration"],
  },
  {
    id: "adobe_creative_cloud",
    name: "Adobe Creative Cloud",
    description: "Complete creative suite for design and content creation",
    icon: <SiAdobe className="w-8 h-8 text-red-600" />,
    features: ["Access Creative Cloud files", "Sync assets", "Version control", "Team collaboration"],
  },
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    description: "Professional image editing and design",
    icon: <SiAdobe className="w-8 h-8 text-blue-600" />,
    features: ["Import PSD files", "Layer access", "Asset extraction", "Version history"],
  },
  {
    id: "illustrator",
    name: "Adobe Illustrator",
    description: "Vector graphics and illustration",
    icon: <SiAdobe className="w-8 h-8 text-orange-600" />,
    features: ["Vector asset import", "Symbol libraries", "Color palettes", "Export options"],
  },
  {
    id: "after_effects",
    name: "Adobe After Effects",
    description: "Motion graphics and visual effects",
    icon: <SiAdobe className="w-8 h-8 text-purple-700" />,
    features: ["Animation assets", "Comp templates", "Render previews", "Asset management"],
  },
];

export function AddIntegrationDialog({ onAddIntegration, open, onOpenChange }: AddIntegrationDialogProps) {
  const handleToolSelect = (toolType: string) => {
    onAddIntegration(toolType);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Connect External Tools</DialogTitle>
          <DialogDescription>
            Integrate your favorite creative tools to streamline your workflow and sync assets across platforms.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {supportedTools.map((tool) => (
            <Card 
              key={tool.id} 
              className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-primary/50"
              onClick={() => handleToolSelect(tool.id)}
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {tool.icon}
                  <div>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Features:</h4>
                  <ul className="text-sm space-y-1">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> You'll need to authenticate with each service to enable integration. 
            Your credentials are securely stored and encrypted.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IntegrationCard } from "@/components/integrations/integration-card";
import { AddIntegrationDialog } from "@/components/integrations/add-integration-dialog";
import { IntegrationSetupDialog } from "@/components/integrations/integration-setup-dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Zap, Shield, RefreshCw } from "lucide-react";
import { ExternalIntegration } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function IntegrationsPage() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [setupDialogOpen, setSetupDialogOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: integrations = [], isLoading } = useQuery<ExternalIntegration[]>({
    queryKey: ["/api/integrations"],
  });

  const createIntegrationMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/integrations", "POST", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/integrations"] });
      toast({
        title: "Integration Connected",
        description: "Your external tool has been successfully connected.",
      });
    },
    onError: (error) => {
      toast({
        title: "Connection Failed",
        description: "Failed to connect your external tool. Please check your credentials.",
        variant: "destructive",
      });
    },
  });

  const updateIntegrationMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      return apiRequest(`/api/integrations/${id}`, "PATCH", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/integrations"] });
    },
  });

  const deleteIntegrationMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/integrations/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/integrations"] });
      toast({
        title: "Integration Removed",
        description: "The integration has been successfully removed.",
      });
    },
  });

  const handleAddIntegration = (toolType: string) => {
    setSelectedTool(toolType);
    setSetupDialogOpen(true);
  };

  const handleSetupIntegration = async (data: any) => {
    await createIntegrationMutation.mutateAsync(data);
  };

  const handleToggleIntegration = async (id: number, isActive: boolean) => {
    await updateIntegrationMutation.mutateAsync({ id, data: { isActive } });
  };

  const handleEditIntegration = (integration: ExternalIntegration) => {
    setSelectedTool(integration.toolType);
    setSetupDialogOpen(true);
  };

  const handleDeleteIntegration = async (id: number) => {
    if (confirm("Are you sure you want to remove this integration?")) {
      await deleteIntegrationMutation.mutateAsync(id);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-2">
            Connect your favorite creative tools to streamline your workflow
          </p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Integration</span>
        </Button>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">Asset Synchronization</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Automatically sync your design assets, prototypes, and files across all connected tools.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <CardTitle className="text-lg">Streamlined Workflow</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Reduce context switching and maintain creative flow by accessing all tools from one place.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <CardTitle className="text-lg">Secure Connection</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Your credentials are encrypted and securely stored. We never access your files without permission.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Integrations List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Connected Tools</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : integrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                onToggle={handleToggleIntegration}
                onEdit={handleEditIntegration}
                onDelete={handleDeleteIntegration}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">No integrations yet</h3>
                  <p className="text-gray-600 mt-1">
                    Connect your first external tool to get started
                  </p>
                </div>
                <Button onClick={() => setAddDialogOpen(true)}>
                  Add Your First Integration
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <AddIntegrationDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAddIntegration={handleAddIntegration}
      />

      <IntegrationSetupDialog
        open={setupDialogOpen}
        onOpenChange={setSetupDialogOpen}
        toolType={selectedTool}
        onSetup={handleSetupIntegration}
      />
    </div>
  );
}
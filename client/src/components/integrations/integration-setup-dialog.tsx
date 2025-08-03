import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SiFigma, SiAdobe } from "react-icons/si";
import { ExternalLink, Key, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface IntegrationSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toolType: string;
  onSetup: (data: any) => void;
}

const getToolConfig = (toolType: string) => {
  const configs = {
    figma: {
      name: "Figma",
      icon: <SiFigma className="w-6 h-6 text-purple-600" />,
      authUrl: "https://www.figma.com/developers/api#access-tokens",
      fields: [
        { name: "accessToken", label: "Personal Access Token", type: "password", required: true },
        { name: "teamId", label: "Team ID (Optional)", type: "text", required: false },
      ],
      instructions: [
        "Go to your Figma account settings",
        "Navigate to 'Personal access tokens'",
        "Generate a new token with appropriate permissions",
        "Copy the token and paste it below"
      ]
    },
    adobe_creative_cloud: {
      name: "Adobe Creative Cloud",
      icon: <SiAdobe className="w-6 h-6 text-red-600" />,
      authUrl: "https://developer.adobe.com/console/",
      fields: [
        { name: "clientId", label: "Client ID", type: "text", required: true },
        { name: "clientSecret", label: "Client Secret", type: "password", required: true },
        { name: "apiKey", label: "API Key", type: "password", required: true },
      ],
      instructions: [
        "Create a project in Adobe Developer Console",
        "Add Creative SDK API",
        "Copy your Client ID, Client Secret, and API Key",
        "Paste the credentials below"
      ]
    },
    photoshop: {
      name: "Adobe Photoshop",
      icon: <SiAdobe className="w-6 h-6 text-blue-600" />,
      authUrl: "https://developer.adobe.com/photoshop/",
      fields: [
        { name: "apiKey", label: "Photoshop API Key", type: "password", required: true },
        { name: "clientId", label: "Client ID", type: "text", required: true },
      ],
      instructions: [
        "Sign up for Photoshop API access",
        "Get your API key from Adobe Developer Console",
        "Copy your credentials below"
      ]
    }
  };
  
  return configs[toolType as keyof typeof configs] || {
    name: toolType.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    icon: <ExternalLink className="w-6 h-6 text-gray-600" />,
    authUrl: "",
    fields: [
      { name: "accessToken", label: "Access Token", type: "password", required: true },
    ],
    instructions: ["Please refer to the tool's documentation for authentication setup"]
  };
};

const createFormSchema = (fields: any[]) => {
  const schemaFields: Record<string, any> = {};
  fields.forEach(field => {
    if (field.required) {
      schemaFields[field.name] = z.string().min(1, `${field.label} is required`);
    } else {
      schemaFields[field.name] = z.string().optional();
    }
  });
  return z.object(schemaFields);
};

export function IntegrationSetupDialog({ open, onOpenChange, toolType, onSetup }: IntegrationSetupDialogProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const config = getToolConfig(toolType);
  const formSchema = createFormSchema(config.fields);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: config.fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsConnecting(true);
    try {
      await onSetup({
        toolType,
        ...values,
        metadata: { configuredAt: new Date().toISOString() }
      });
      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Integration setup failed:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            {config.icon}
            <div>
              <DialogTitle>Connect {config.name}</DialogTitle>
              <DialogDescription>
                Set up your {config.name} integration to sync assets and projects.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Your credentials are encrypted and stored securely. We never share your data with third parties.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Setup Instructions:</h4>
            <ol className="text-sm text-muted-foreground space-y-1">
              {config.instructions.map((instruction, index) => (
                <li key={index} className="flex space-x-2">
                  <span className="font-medium">{index + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
            {config.authUrl && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => window.open(config.authUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open {config.name} Settings
              </Button>
            )}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {config.fields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className="flex items-center space-x-2">
                        <Key className="w-3 h-3" />
                        <span>{field.label}</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type={field.type}
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                          {...formField}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              
              <div className="flex space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isConnecting}
                  className="flex-1"
                >
                  {isConnecting ? "Connecting..." : "Connect"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
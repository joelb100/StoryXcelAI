import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertProjectSchema, 
  insertFriendSchema, 
  insertExternalIntegrationSchema,
  insertExternalToolProjectSchema 
} from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Project routes
  app.get('/api/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const projects = await storage.getProjects(userId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get('/api/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId, userId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post('/api/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const projectData = insertProjectSchema.parse({
        ...req.body,
        ownerId: userId,
      });
      
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.patch('/api/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const projectId = parseInt(req.params.id);
      const projectData = insertProjectSchema.partial().parse(req.body);
      
      const project = await storage.updateProject(projectId, projectData, userId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found or unauthorized" });
      }
      
      res.json(project);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete('/api/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const projectId = parseInt(req.params.id);
      const success = await storage.deleteProject(projectId, userId);
      
      if (!success) {
        return res.status(404).json({ message: "Project not found or unauthorized" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Friend routes
  app.get('/api/friends', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const friends = await storage.getFriends(userId);
      res.json(friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
      res.status(500).json({ message: "Failed to fetch friends" });
    }
  });

  app.post('/api/friends', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const friendData = insertFriendSchema.parse({
        ...req.body,
        userId,
      });
      
      const friendship = await storage.addFriend(friendData);
      res.status(201).json(friendship);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid friend data", errors: error.errors });
      }
      console.error("Error adding friend:", error);
      res.status(500).json({ message: "Failed to add friend" });
    }
  });

  app.patch('/api/friends/:friendId', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const friendId = req.params.friendId;
      const { status } = req.body;
      
      const success = await storage.updateFriendStatus(userId, friendId, status);
      
      if (!success) {
        return res.status(404).json({ message: "Friendship not found" });
      }
      
      res.json({ message: "Friend status updated" });
    } catch (error) {
      console.error("Error updating friend status:", error);
      res.status(500).json({ message: "Failed to update friend status" });
    }
  });

  // Collaboration routes
  app.get('/api/projects/:id/collaborators', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const collaborators = await storage.getProjectCollaborators(projectId);
      res.json(collaborators);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
      res.status(500).json({ message: "Failed to fetch collaborators" });
    }
  });

  // Asset routes
  app.get('/api/projects/:id/assets', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const assets = await storage.getProjectAssets(projectId);
      res.json(assets);
    } catch (error) {
      console.error("Error fetching assets:", error);
      res.status(500).json({ message: "Failed to fetch assets" });
    }
  });

  // External integrations routes
  app.get('/api/integrations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const integrations = await storage.getUserIntegrations(userId);
      res.json(integrations);
    } catch (error) {
      console.error("Error fetching integrations:", error);
      res.status(500).json({ message: "Failed to fetch integrations" });
    }
  });

  app.post('/api/integrations', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const integrationData = insertExternalIntegrationSchema.parse({
        ...req.body,
        userId,
      });
      
      const integration = await storage.createIntegration(integrationData);
      res.status(201).json(integration);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid integration data", errors: error.errors });
      }
      console.error("Error creating integration:", error);
      res.status(500).json({ message: "Failed to create integration" });
    }
  });

  app.patch('/api/integrations/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const integrationId = parseInt(req.params.id);
      const integrationData = insertExternalIntegrationSchema.partial().parse(req.body);
      
      const integration = await storage.updateIntegration(integrationId, integrationData, userId);
      
      if (!integration) {
        return res.status(404).json({ message: "Integration not found or unauthorized" });
      }
      
      res.json(integration);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid integration data", errors: error.errors });
      }
      console.error("Error updating integration:", error);
      res.status(500).json({ message: "Failed to update integration" });
    }
  });

  app.delete('/api/integrations/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const integrationId = parseInt(req.params.id);
      const success = await storage.deleteIntegration(integrationId, userId);
      
      if (!success) {
        return res.status(404).json({ message: "Integration not found or unauthorized" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting integration:", error);
      res.status(500).json({ message: "Failed to delete integration" });
    }
  });

  // External tool project routes
  app.get('/api/projects/:id/integrations', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const toolProjects = await storage.getProjectToolIntegrations(projectId);
      res.json(toolProjects);
    } catch (error) {
      console.error("Error fetching project integrations:", error);
      res.status(500).json({ message: "Failed to fetch project integrations" });
    }
  });

  app.post('/api/projects/:id/integrations', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const toolProjectData = insertExternalToolProjectSchema.parse({
        ...req.body,
        projectId,
      });
      
      const toolProject = await storage.createToolProject(toolProjectData);
      res.status(201).json(toolProject);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid tool project data", errors: error.errors });
      }
      console.error("Error creating tool project:", error);
      res.status(500).json({ message: "Failed to create tool project" });
    }
  });

  app.patch('/api/tool-projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const toolProjectId = parseInt(req.params.id);
      const toolProjectData = insertExternalToolProjectSchema.partial().parse(req.body);
      
      const toolProject = await storage.updateToolProject(toolProjectId, toolProjectData);
      
      if (!toolProject) {
        return res.status(404).json({ message: "Tool project not found" });
      }
      
      res.json(toolProject);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid tool project data", errors: error.errors });
      }
      console.error("Error updating tool project:", error);
      res.status(500).json({ message: "Failed to update tool project" });
    }
  });

  app.delete('/api/tool-projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const toolProjectId = parseInt(req.params.id);
      const success = await storage.deleteToolProject(toolProjectId);
      
      if (!success) {
        return res.status(404).json({ message: "Tool project not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting tool project:", error);
      res.status(500).json({ message: "Failed to delete tool project" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

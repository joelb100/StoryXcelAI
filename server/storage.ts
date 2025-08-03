import {
  users,
  projects,
  projectCollaborators,
  friends,
  projectAssets,
  externalIntegrations,
  externalToolProjects,
  type User,
  type UpsertUser,
  type Project,
  type ProjectWithOwner,
  type InsertProject,
  type InsertProjectCollaborator,
  type ProjectCollaborator,
  type InsertFriend,
  type Friend,
  type FriendWithUser,
  type InsertProjectAsset,
  type ProjectAsset,
  type InsertExternalIntegration,
  type ExternalIntegration,
  type InsertExternalToolProject,
  type ExternalToolProject,
  type ExternalToolProjectWithIntegration,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Project operations
  getProjects(userId: string): Promise<ProjectWithOwner[]>;
  getProject(id: number, userId: string): Promise<ProjectWithOwner | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>, userId: string): Promise<Project | undefined>;
  deleteProject(id: number, userId: string): Promise<boolean>;
  
  // Collaboration operations
  addCollaborator(collaborator: InsertProjectCollaborator): Promise<ProjectCollaborator>;
  getProjectCollaborators(projectId: number): Promise<(ProjectCollaborator & { user: User })[]>;
  removeCollaborator(projectId: number, userId: string): Promise<boolean>;
  
  // Friend operations
  getFriends(userId: string): Promise<FriendWithUser[]>;
  addFriend(friendship: InsertFriend): Promise<Friend>;
  updateFriendStatus(userId: string, friendId: string, status: string): Promise<boolean>;
  
  // Asset operations
  getProjectAssets(projectId: number): Promise<ProjectAsset[]>;
  createProjectAsset(asset: InsertProjectAsset): Promise<ProjectAsset>;
  deleteProjectAsset(id: number, userId: string): Promise<boolean>;
  
  // External integration operations
  getUserIntegrations(userId: string): Promise<ExternalIntegration[]>;
  createIntegration(integration: InsertExternalIntegration): Promise<ExternalIntegration>;
  updateIntegration(id: number, integration: Partial<InsertExternalIntegration>, userId: string): Promise<ExternalIntegration | undefined>;
  deleteIntegration(id: number, userId: string): Promise<boolean>;
  
  // External tool project operations
  getProjectToolIntegrations(projectId: number): Promise<ExternalToolProjectWithIntegration[]>;
  createToolProject(toolProject: InsertExternalToolProject): Promise<ExternalToolProject>;
  updateToolProject(id: number, toolProject: Partial<InsertExternalToolProject>): Promise<ExternalToolProject | undefined>;
  deleteToolProject(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Project operations
  async getProjects(userId: string): Promise<ProjectWithOwner[]> {
    const userProjects = await db
      .select()
      .from(projects)
      .leftJoin(users, eq(projects.ownerId, users.id))
      .where(
        or(
          eq(projects.ownerId, userId),
          eq(projects.isPublic, true)
        )
      )
      .orderBy(desc(projects.updatedAt));

    return userProjects.map(row => ({
      ...row.projects,
      owner: row.users!,
    }));
  }

  async getProject(id: number, userId: string): Promise<ProjectWithOwner | undefined> {
    const [result] = await db
      .select()
      .from(projects)
      .leftJoin(users, eq(projects.ownerId, users.id))
      .where(
        and(
          eq(projects.id, id),
          or(
            eq(projects.ownerId, userId),
            eq(projects.isPublic, true)
          )
        )
      );

    if (!result) return undefined;

    return {
      ...result.projects,
      owner: result.users!,
    };
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values(project)
      .returning();
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>, userId: string): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set({ ...project, updatedAt: new Date() })
      .where(
        and(
          eq(projects.id, id),
          eq(projects.ownerId, userId)
        )
      )
      .returning();
    return updatedProject;
  }

  async deleteProject(id: number, userId: string): Promise<boolean> {
    const result = await db
      .delete(projects)
      .where(
        and(
          eq(projects.id, id),
          eq(projects.ownerId, userId)
        )
      );
    return (result.rowCount ?? 0) > 0;
  }

  // Collaboration operations
  async addCollaborator(collaborator: InsertProjectCollaborator): Promise<ProjectCollaborator> {
    const [newCollaborator] = await db
      .insert(projectCollaborators)
      .values(collaborator)
      .returning();
    return newCollaborator;
  }

  async getProjectCollaborators(projectId: number): Promise<(ProjectCollaborator & { user: User })[]> {
    const collaborators = await db
      .select()
      .from(projectCollaborators)
      .leftJoin(users, eq(projectCollaborators.userId, users.id))
      .where(eq(projectCollaborators.projectId, projectId));

    return collaborators.map(row => ({
      ...row.project_collaborators,
      user: row.users!,
    }));
  }

  async removeCollaborator(projectId: number, userId: string): Promise<boolean> {
    const result = await db
      .delete(projectCollaborators)
      .where(
        and(
          eq(projectCollaborators.projectId, projectId),
          eq(projectCollaborators.userId, userId)
        )
      );
    return (result.rowCount ?? 0) > 0;
  }

  // Friend operations
  async getFriends(userId: string): Promise<FriendWithUser[]> {
    const userFriends = await db
      .select()
      .from(friends)
      .leftJoin(users, eq(friends.friendId, users.id))
      .where(
        and(
          eq(friends.userId, userId),
          eq(friends.status, "accepted")
        )
      );

    return userFriends.map(row => ({
      ...row.friends,
      friend: row.users!,
    }));
  }

  async addFriend(friendship: InsertFriend): Promise<Friend> {
    const [newFriend] = await db
      .insert(friends)
      .values(friendship)
      .returning();
    return newFriend;
  }

  async updateFriendStatus(userId: string, friendId: string, status: string): Promise<boolean> {
    const result = await db
      .update(friends)
      .set({ status })
      .where(
        and(
          eq(friends.userId, userId),
          eq(friends.friendId, friendId)
        )
      );
    return (result.rowCount ?? 0) > 0;
  }

  // Asset operations
  async getProjectAssets(projectId: number): Promise<ProjectAsset[]> {
    return await db
      .select()
      .from(projectAssets)
      .where(eq(projectAssets.projectId, projectId))
      .orderBy(desc(projectAssets.createdAt));
  }

  async createProjectAsset(asset: InsertProjectAsset): Promise<ProjectAsset> {
    const [newAsset] = await db
      .insert(projectAssets)
      .values(asset)
      .returning();
    return newAsset;
  }

  async deleteProjectAsset(id: number, userId: string): Promise<boolean> {
    const result = await db
      .delete(projectAssets)
      .where(
        and(
          eq(projectAssets.id, id),
          eq(projectAssets.createdBy, userId)
        )
      );
    return (result.rowCount ?? 0) > 0;
  }

  // External integration operations
  async getUserIntegrations(userId: string): Promise<ExternalIntegration[]> {
    return await db
      .select()
      .from(externalIntegrations)
      .where(eq(externalIntegrations.userId, userId))
      .orderBy(desc(externalIntegrations.createdAt));
  }

  async createIntegration(integration: InsertExternalIntegration): Promise<ExternalIntegration> {
    const [newIntegration] = await db
      .insert(externalIntegrations)
      .values(integration)
      .returning();
    return newIntegration;
  }

  async updateIntegration(id: number, integration: Partial<InsertExternalIntegration>, userId: string): Promise<ExternalIntegration | undefined> {
    const [updatedIntegration] = await db
      .update(externalIntegrations)
      .set({ ...integration, updatedAt: new Date() })
      .where(
        and(
          eq(externalIntegrations.id, id),
          eq(externalIntegrations.userId, userId)
        )
      )
      .returning();
    return updatedIntegration;
  }

  async deleteIntegration(id: number, userId: string): Promise<boolean> {
    const result = await db
      .delete(externalIntegrations)
      .where(
        and(
          eq(externalIntegrations.id, id),
          eq(externalIntegrations.userId, userId)
        )
      );
    return (result.rowCount ?? 0) > 0;
  }

  // External tool project operations
  async getProjectToolIntegrations(projectId: number): Promise<ExternalToolProjectWithIntegration[]> {
    const toolProjects = await db
      .select()
      .from(externalToolProjects)
      .leftJoin(externalIntegrations, eq(externalToolProjects.integrationId, externalIntegrations.id))
      .where(eq(externalToolProjects.projectId, projectId))
      .orderBy(desc(externalToolProjects.createdAt));

    return toolProjects.map(row => ({
      ...row.external_tool_projects,
      integration: row.external_integrations!,
    }));
  }

  async createToolProject(toolProject: InsertExternalToolProject): Promise<ExternalToolProject> {
    const [newToolProject] = await db
      .insert(externalToolProjects)
      .values(toolProject)
      .returning();
    return newToolProject;
  }

  async updateToolProject(id: number, toolProject: Partial<InsertExternalToolProject>): Promise<ExternalToolProject | undefined> {
    const [updatedToolProject] = await db
      .update(externalToolProjects)
      .set({ ...toolProject, updatedAt: new Date() })
      .where(eq(externalToolProjects.id, id))
      .returning();
    return updatedToolProject;
  }

  async deleteToolProject(id: number): Promise<boolean> {
    const result = await db
      .delete(externalToolProjects)
      .where(eq(externalToolProjects.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();

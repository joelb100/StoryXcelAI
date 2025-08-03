import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Projects table
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  status: varchar("status", { length: 50 }).notNull().default("planning"), // planning, in_progress, completed
  heroImageUrl: text("hero_image_url"),
  ownerId: varchar("owner_id").notNull().references(() => users.id),
  budget: integer("budget"),
  timeEstimate: integer("time_estimate"), // in hours
  actualTime: integer("actual_time").default(0), // in hours
  actualCost: integer("actual_cost").default(0),
  tags: text("tags").array(),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Project collaborators table
export const projectCollaborators = pgTable("project_collaborators", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  role: varchar("role", { length: 50 }).notNull().default("viewer"), // owner, editor, viewer
  createdAt: timestamp("created_at").defaultNow(),
});

// Friends table
export const friends = pgTable("friends", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  friendId: varchar("friend_id").notNull().references(() => users.id),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending, accepted, blocked
  createdAt: timestamp("created_at").defaultNow(),
});

// Project assets table
export const projectAssets = pgTable("project_assets", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // image, video, audio, document, script
  url: text("url"),
  metadata: jsonb("metadata"),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// External tool integrations table
export const externalIntegrations = pgTable("external_integrations", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id),
  toolType: varchar("tool_type", { length: 50 }).notNull(), // figma, adobe_creative_cloud, photoshop, illustrator, after_effects, etc.
  accountId: varchar("account_id"), // External account identifier
  accessToken: text("access_token"), // Encrypted access token
  refreshToken: text("refresh_token"), // Encrypted refresh token
  tokenExpiry: timestamp("token_expiry"),
  isActive: boolean("is_active").default(true),
  metadata: jsonb("metadata"), // Tool-specific settings and preferences
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// External tool projects table - links StoryXcel projects to external tool projects
export const externalToolProjects = pgTable("external_tool_projects", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  integrationId: integer("integration_id").notNull().references(() => externalIntegrations.id),
  externalProjectId: varchar("external_project_id").notNull(), // ID in the external tool
  externalProjectName: varchar("external_project_name", { length: 255 }),
  externalProjectUrl: text("external_project_url"),
  syncStatus: varchar("sync_status", { length: 50 }).notNull().default("active"), // active, paused, error
  lastSyncAt: timestamp("last_sync_at"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  collaborations: many(projectCollaborators),
  friends: many(friends, { relationName: "userFriends" }),
  friendOf: many(friends, { relationName: "friendOf" }),
  assets: many(projectAssets),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  owner: one(users, {
    fields: [projects.ownerId],
    references: [users.id],
  }),
  collaborators: many(projectCollaborators),
  assets: many(projectAssets),
}));

export const projectCollaboratorsRelations = relations(projectCollaborators, ({ one }) => ({
  project: one(projects, {
    fields: [projectCollaborators.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [projectCollaborators.userId],
    references: [users.id],
  }),
}));

export const friendsRelations = relations(friends, ({ one }) => ({
  user: one(users, {
    fields: [friends.userId],
    references: [users.id],
    relationName: "userFriends",
  }),
  friend: one(users, {
    fields: [friends.friendId],
    references: [users.id],
    relationName: "friendOf",
  }),
}));

export const projectAssetsRelations = relations(projectAssets, ({ one }) => ({
  project: one(projects, {
    fields: [projectAssets.projectId],
    references: [projects.id],
  }),
  creator: one(users, {
    fields: [projectAssets.createdBy],
    references: [users.id],
  }),
}));

export const externalIntegrationsRelations = relations(externalIntegrations, ({ one, many }) => ({
  user: one(users, {
    fields: [externalIntegrations.userId],
    references: [users.id],
  }),
  toolProjects: many(externalToolProjects),
}));

export const externalToolProjectsRelations = relations(externalToolProjects, ({ one }) => ({
  project: one(projects, {
    fields: [externalToolProjects.projectId],
    references: [projects.id],
  }),
  integration: one(externalIntegrations, {
    fields: [externalToolProjects.integrationId],
    references: [externalIntegrations.id],
  }),
}));

// Schemas
export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProjectCollaboratorSchema = createInsertSchema(projectCollaborators).omit({
  id: true,
  createdAt: true,
});

export const insertFriendSchema = createInsertSchema(friends).omit({
  id: true,
  createdAt: true,
});

export const insertProjectAssetSchema = createInsertSchema(projectAssets).omit({
  id: true,
  createdAt: true,
});

export const insertExternalIntegrationSchema = createInsertSchema(externalIntegrations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertExternalToolProjectSchema = createInsertSchema(externalToolProjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type ProjectWithOwner = Project & { owner: User };
export type InsertProjectCollaborator = z.infer<typeof insertProjectCollaboratorSchema>;
export type ProjectCollaborator = typeof projectCollaborators.$inferSelect;
export type InsertFriend = z.infer<typeof insertFriendSchema>;
export type Friend = typeof friends.$inferSelect;
export type FriendWithUser = Friend & { friend: User };
export type InsertProjectAsset = z.infer<typeof insertProjectAssetSchema>;
export type ProjectAsset = typeof projectAssets.$inferSelect;
export type InsertExternalIntegration = z.infer<typeof insertExternalIntegrationSchema>;
export type ExternalIntegration = typeof externalIntegrations.$inferSelect;
export type InsertExternalToolProject = z.infer<typeof insertExternalToolProjectSchema>;
export type ExternalToolProject = typeof externalToolProjects.$inferSelect;
export type ExternalToolProjectWithIntegration = ExternalToolProject & { integration: ExternalIntegration };

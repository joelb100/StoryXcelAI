# StoryXcel - Creative Project Management Platform

## Overview
StoryXcel is a comprehensive creative project management platform designed for creative professionals. It supports various project types including story development, production management, asset organization, script writing, deck creation, and world building, acting as a central hub for all creative endeavors.

## User Preferences
Preferred communication style: Simple, everyday language.

## Version History
- **"I like this version"** (January 11, 2025): Current stable state with working creative project management platform. Features include Story Builder with Quill editor, central conflict system, story beats functionality, and comprehensive UI components. All core features are functional and ready for use.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack React Query
- **UI Framework**: Shadcn/ui (built on Radix UI)
- **Styling**: Tailwind CSS with custom design tokens
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript (ES modules)
- **API Design**: RESTful API

### Data Storage
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Drizzle ORM
- **Migrations**: Drizzle Kit

### Key Components & Features
- **Authentication**: Replit OIDC, Express sessions (PostgreSQL storage), Passport.js, HTTP-only cookies, CSRF protection.
- **Project Management**: Support for multiple builder types (Story, Production, Asset, Script, Deck, World), multi-user collaboration with role-based access, asset management, and project lifecycle tracking.
- **User Interface**: Comprehensive UI components with a consistent design system, responsive design, light/dark mode, and multi-level navigation.
- **Real-time Features**: Friend system with status tracking, real-time project sharing, and toast notifications.
- **Rich Text Editing**: Story Builder with Quill rich text editor, HTML overview injection system, class-based hidden markers, DOM-based content replacement, and automatic synchronization between form fields and editor content.

## External Dependencies

### Core
- **@neondatabase/serverless**: PostgreSQL connection
- **drizzle-orm**: Type-safe ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: UI primitives
- **passport**: Authentication middleware
- **express-session**: Session management
- **react-quill**: Rich text editor (Quill integration for React)
- **quill**: Core rich text editing engine

### Development Tools
- **tsx**: TypeScript execution
- **vite**: Build tool/development server
- **esbuild**: Production bundling
- **tailwindcss**: CSS framework

### Authentication Services
- **Replit OIDC**: Identity provider
- **openid-client**: OpenID Connect client
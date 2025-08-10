# StoryXcel - Creative Project Management Platform

## Overview
StoryXcel is a comprehensive creative project management platform designed for creative professionals. It supports various project types including story development, production management, asset organization, script writing, deck creation, and world building, acting as a central hub for all creative endeavors.

## User Preferences
Preferred communication style: Simple, everyday language.

## Recent Changes

### August 10, 2025 - Dashboard Layout Debugging Complete
- **Issue**: Application failed to start due to malformed conditional statements and syntax errors in dashboard-layout.tsx
- **Root Cause**: Double ternary operators, unclosed component structures, and incorrect export placement
- **Resolution**: 
  - Fixed malformed conditional statements and removed extra ternary operators
  - Corrected component structure preventing proper export recognition
  - Replaced problematic file with clean, working version
  - Successfully restored application functionality
- **Result**: Development server running successfully, dashboard loading properly
- **Status**: ✅ Complete - App is now functional and ready for continued development

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

## External Dependencies

### Core
- **@neondatabase/serverless**: PostgreSQL connection
- **drizzle-orm**: Type-safe ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: UI primitives
- **passport**: Authentication middleware
- **express-session**: Session management

### Development Tools
- **tsx**: TypeScript execution
- **vite**: Build tool/development server
- **esbuild**: Production bundling
- **tailwindcss**: CSS framework

### Authentication Services
- **Replit OIDC**: Identity provider
- **openid-client**: OpenID Connect client
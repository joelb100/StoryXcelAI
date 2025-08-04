# StoryXcel - Creative Project Management Platform

## Overview

StoryXcel is a comprehensive creative project management platform built with a modern full-stack architecture. The application serves as a hub for creative professionals to manage various types of projects including story development, production management, asset organization, script writing, deck creation, and world building.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Build Tool**: Vite with hot module replacement

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured route handling
- **Development**: Hot reload with tsx for development server

### Data Storage Solutions
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Neon serverless driver with WebSocket support

## Key Components

### Authentication System
- **Provider**: Replit OIDC authentication
- **Session Management**: Express sessions with PostgreSQL storage
- **Strategy**: Passport.js with OpenID Connect strategy
- **Security**: HTTP-only cookies, CSRF protection, secure session handling

### Project Management
- **Project Types**: Multiple builder types (Story, Production, Asset, Script, Deck, World)
- **Collaboration**: Multi-user project collaboration with role-based access
- **Asset Management**: File organization and metadata tracking
- **Status Tracking**: Project lifecycle management (planning, in_progress, completed)

### User Interface
- **Component Library**: Comprehensive UI components with consistent design system
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Theme System**: Light/dark mode support with CSS custom properties
- **Navigation**: Multi-level navigation with builder-specific tabs

### Real-time Features
- **Friend System**: User connections with status tracking
- **Collaboration**: Real-time project sharing and team management
- **Notifications**: Toast-based user feedback system

## Data Flow

### Authentication Flow
1. User initiates login through Replit OIDC
2. Server validates credentials and creates session
3. Session stored in PostgreSQL with automatic expiration
4. Client receives authentication status and user data
5. Protected routes enforce authentication middleware

### Project Management Flow
1. Users create projects with specific builder types
2. Projects stored with ownership and collaboration metadata
3. Real-time updates through React Query invalidation
4. Asset uploads and metadata tracking
5. Project status updates with audit trail

### API Communication
1. Client makes requests with automatic credential inclusion
2. Server validates authentication for protected endpoints
3. Data fetched through React Query with caching
4. Optimistic updates for improved user experience
5. Error handling with user-friendly messaging

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection driver
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **passport**: Authentication middleware
- **express-session**: Session management

### Development Tools
- **tsx**: TypeScript execution for development
- **vite**: Build tool and development server
- **esbuild**: Production bundling
- **tailwindcss**: Utility-first CSS framework

### Authentication Services
- **Replit OIDC**: Identity provider integration
- **openid-client**: OpenID Connect client implementation

## Deployment Strategy

### Build Process
1. **Development**: Vite dev server with hot reloading
2. **Frontend Build**: Vite builds React app to `dist/public`
3. **Backend Build**: esbuild bundles server to `dist/index.js`
4. **Database**: Drizzle migrations applied via `db:push`

### Environment Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL`
- **Authentication**: Replit OIDC configuration
- **Sessions**: Secure session secret for cookie encryption
- **Build**: Node.js ESM modules with TypeScript compilation

### Production Deployment
- **Server**: Express server serving both API and static files
- **Static Assets**: Vite-built frontend served from `/dist/public`
- **Database**: Neon serverless PostgreSQL with connection pooling
- **Security**: HTTPS enforcement, secure cookies, CORS configuration

### Development Workflow
- **Hot Reload**: Both frontend and backend with automatic restarts
- **Type Safety**: Full TypeScript coverage with strict compilation
- **Database**: Live schema updates with Drizzle push commands
- **Debugging**: Source maps and runtime error overlays

## Recent Changes
- **2024-01-20**: Added hover tooltips to Project Type dropdown options
  - Added HTML title tooltips for all 4 project type options with detailed explanations
  - Worldbuilding: The process of creating detailed fictional universes, including their cultures, geography, history, and rules
  - Novel: A long-form narrative work of fiction that explores characters, plots, and themes through descriptive prose
  - Script: A written blueprint for stage plays, TV shows, or other media, focusing on dialogue and scene directions
  - Screenplay: A formatted script specifically for film or television, detailing visual actions, camera cues, and spoken dialogue
- **2024-01-20**: Enhanced Story Builder Genre dropdown with comprehensive hover definitions
  - Added HTML title tooltips for all 26 genre options with detailed explanations
  - Browser-native tooltips appear on hover with clear, informative descriptions for each genre type
  - Fixed tooltip implementation to work properly within Select dropdown components
  - Includes definitions for Classic, Crime/Drama, Epic, Fable, Fairy Tale, Fantasy, Folktale, Gothic Fiction, Historical Fiction, Horror, Humor, Legend, Magical Realism, Meta Fiction, Mystery, Realistic Fiction, Romance, Satire, Science Fiction, Spy Fiction, Superhero, Swashbuckler, Suspense/Thriller, Tall Tale, Theological, Tragicomedy, Travel, and Western
- **2024-01-20**: Updated Story Builder Project Type dropdown with streamlined options
  - Replaced previous 6 options (Story Project, Script Project, Novel Project, Screenplay, Book, Series) with 4 focused options: Worldbuilding, Novel, Script, Screenplay
  - Based on user reference image to provide more targeted project categorization
- **2024-01-20**: Enhanced Story Builder text editor toolbar with comprehensive Google Docs-style icons
  - Replaced basic emoji icons with professional Lucide React icons including: Undo/Redo, Print, Format Painter, Zoom controls, Bold/Italic/Underline, Text/Highlight colors, Link, Comment, Image insertion, Alignment options, Lists (bullet/numbered), Indent/Outdent controls
  - Improved toolbar functionality and visual consistency to match modern document editing interfaces
  - Maintains responsive design and proper spacing with dividers between tool groups
- **2024-01-20**: Updated Story Builder Genre, Sub Genre, Theme, Sub Theme, and Central Conflict dropdowns with complete lists
  - Expanded Genre dropdown from 6 to 26 comprehensive options: Classic, Crime/Drama, Epic, Fable, Fairy Tale, Fantasy, Folktale, Gothic Fiction, Historical Fiction, Horror, Humor, Legend, Magical Realism, Meta Fiction, Mystery, Realistic Fiction, Romance, Satire, Science Fiction, Spy Fiction, Superhero, Swashbuckler, Suspense/Thriller, Tall Tale, Theological, Tragicomedy, Travel, Western
  - Updated Sub Genre dropdown from 4 to 20 specialized options: Acid, Buddy, Classic, Comedy, Contemporary, Family, Feminist, Gunslinger, Historical, Horror, Martial Arts, Musical, Noir, Psychological, Railroad, Revisionist, Sci Fi, Southern Gothic, Spaghetti, Survival
  - Enhanced Theme dropdown from 5 to 38 thematic options: Abandonment, Acceptance, Adultery, Adventure, Alienation, Ambition, Betrayal, Coming of Age, Death, Discovery, Escape, Forbidden Love, Forgiveness, Freedom, Friendship, Greed, Justice, Legacy, Loneliness, Love, Morality, Obsession, Overcoming, Patriot, Poverty, Prejudice, Redemption, Revenge, Rivalry, Sacrifice, Survival, Temptation, The Right, Tradition, Transformation, War, Wealth Found, War Zone
  - Enhanced Sub Theme dropdown from 4 to 38 sub-thematic options: Abduction, Adventure, Adultery, Ambition, Ascension, Deliverance, Descension, Disaster, Discovery, Escape, Forbidden Love, Forgiveness, Freedom, Honor, Justice, Love, Loyalty, Madness, Maturation, Metamorphosis, Moral Ambiguity, Obtaining, Ownership, Pursuit, Quest, Redemption, Remorse, Rescue, Respect, Revenge, Revolt, Rivalry, Sacrifice, Supplication, Survival, Temptation, The Riddle, Transformation, Underdog, Wretched Excess
  - Updated Central Conflict dropdown from 4 to 8 comprehensive conflict types: [Wo]Man vs. [Wo]Man, [Wo]Man vs. Nature, [Wo]Man vs. the Environment, [Wo]Man vs. Machines / Technology, [Wo]Man vs. the Supernatural, [Wo]Man vs. Self, [Wo]Man vs. God / Religion, [Wo]Man vs. Society
  - All lists based on user reference images to provide comprehensive story categorization options
- **2024-01-20**: Added helpful tooltips to all icon sidebar buttons
  - Enhanced all 8 icon buttons with styled Tooltip components for better user experience
  - Tooltips appear on the right side with consistent dark theme styling
  - Includes tooltips for: Asset Folder, Character Manager, Script Library, World Objects, Import Files, Export Project, Support Options, Account Settings, and Sign Out
  - Replaced basic HTML title attributes with proper shadcn/ui Tooltip components
- **2024-01-20**: Fixed authentication flow to properly show dashboard after sign-in
  - Updated server authentication callback to redirect to `/dashboard` instead of root
  - Implemented authentication-aware routing in frontend to redirect authenticated users from root to dashboard
  - Fixed DashboardLayout default behavior to show dashboard instead of story builder
  - Changed activeTab default from 'story' to 'dashboard' for proper initial state
  - Added proper loading state and navigation logic for seamless user experience
- **2024-01-20**: Implemented functional icon sidebar with expandable menus
  - Updated bottom icons: Import, Export, Support, Account, Sign Out
  - Added expandable Support menu with FAQ, Technical Support, Live Chat, Messaging
  - Added expandable Account menu with Settings, Personalize, Security, Payment
  - Implemented sign out functionality redirecting to login screen
  - Added proper state management and click handlers for all menu interactions
- **2024-01-20**: Added Project Name and Project Type fields to Story Builder
  - Changed Project Name from dropdown to text input field for user entry
  - Added new Project Type dropdown with options (Story, Script, Novel, Screenplay, Book, Series)
  - Positioned Project Type field between Project Name and Genre as requested
  - Enhanced Story Overview section with proper field hierarchy
- **2024-01-20**: Redesigned landing page to match user's design specification
  - Created split-screen layout with gradient background and geometric patterns
  - Implemented StoryXcel branding with large "X" logo on left side
  - Built modern login form with proper styling on right side
  - Added abstract visual elements and glowing effects
- **2024-01-20**: Fixed database storage null reference errors
  - Updated all rowCount checks to handle null values properly
  - Ensures reliable database operations across all storage methods
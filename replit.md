# Photography Portfolio Application

## Overview

This is a full-stack photography portfolio application built with a modern React frontend and Express.js backend. The application showcases a photographer's work through an elegant, responsive gallery interface with detailed photo views and photographer information.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Data Storage**: Currently using in-memory storage with plans for database integration
- **API Design**: RESTful API endpoints for photos and photographer information

### Key Components

#### Frontend Components
- **Layout Components**: Header, Footer, Hero Section
- **Gallery Components**: Photo Grid, Photo Modal with navigation
- **Content Sections**: About Section, Contact Section
- **UI Components**: Complete shadcn/ui component library integration

#### Backend Services
- **Storage Interface**: Abstracted storage layer with IStorage interface
- **Route Handlers**: RESTful endpoints for photos and photographer data
- **Development Tools**: Vite integration for hot reloading in development

### Data Flow

1. **Photo Gallery Flow**:
   - Frontend requests photos from `/api/photos`
   - Backend serves photo data from storage layer
   - Photos displayed in responsive grid with aspect ratio handling
   - Modal overlay for detailed photo viewing with keyboard navigation

2. **Photographer Information Flow**:
   - Frontend requests photographer data from `/api/photographer`
   - Backend serves photographer bio, contact info, and specialties
   - Data displayed in About and Contact sections

3. **Navigation Flow**:
   - Client-side routing with Wouter
   - Smooth scrolling navigation for single-page sections
   - Photo detail pages with back navigation

### External Dependencies

#### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for production
- **drizzle-orm & drizzle-kit**: Database ORM and migration tools
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitive components
- **wouter**: Lightweight client-side routing

#### Development Dependencies
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across frontend and backend
- **Tailwind CSS**: Utility-first CSS framework
- **ESBuild**: Fast bundling for production builds

### Data Schema

The application uses Zod schemas for type validation:

- **Photo Schema**: Includes id, title, description, category, date, location, camera, lens, iso, aperture, shutterSpeed, focalLength, imageUrl, aspectRatio, and featured status
- **Photographer Info Schema**: Contains name, bio, location, contact information, and specialties

#### Recent Updates (October 2025)
- **Netlify Deployment Migration**: Converted Express backend to Netlify serverless functions
- Added `serverless-http` wrapper for Express routes compatibility
- Created `netlify/functions/api.ts` to handle all API endpoints as serverless functions
- Configured `netlify.toml` with proper redirects and build settings
- Moved photographer portrait to `client/public/` for static asset serving
- Created comprehensive `NETLIFY_DEPLOYMENT.md` guide for deployment instructions

#### Updates (January 2025)
- Added technical metadata fields to Photo schema: lens, iso, aperture, shutterSpeed, focalLength
- Updated photo detail pages and modal to display camera settings and technical information
- Enhanced code-based photo management with example technical metadata
- Implemented search functionality with search bar and tag filtering
- Added tags array to Photo schema for improved categorization and searchability
- Created SearchBar component with real-time search and popular tag selection
- Updated PhotoGrid to show filtered results and search statistics
- Added tag displays to photo cards, detail pages, and modal overlays

### Deployment Strategy

#### Development Setup (Replit)
- Vite development server with hot module reloading
- Express server with TypeScript compilation via tsx
- Shared types between frontend and backend
- Environment-based configuration

#### Production Build (Netlify)
- Frontend built with Vite to static assets in `dist/public`
- Backend converted to Netlify serverless functions using `serverless-http`
- API routes wrapped in serverless function at `netlify/functions/api.ts`
- Static assets (including photographer portrait) served from `client/public/`
- Automatic redirects configured for API routes in `netlify.toml`

#### Architecture Decisions

**Frontend Framework Choice**: React with TypeScript chosen for component reusability and type safety. Wouter selected over React Router for smaller bundle size in this portfolio context.

**Styling Approach**: Tailwind CSS with shadcn/ui provides rapid development with consistent design system. Custom CSS variables allow for easy theme customization.

**State Management**: TanStack React Query eliminates need for additional state management library while providing excellent caching and synchronization for server data.

**Backend Architecture**: Express.js chosen for simplicity and fast development. Abstracted storage layer allows easy transition from in-memory to database storage.

**Database Strategy**: Drizzle ORM selected for type-safe database operations and excellent TypeScript integration. PostgreSQL chosen for reliability and feature completeness.

**Build System**: Vite provides fast development experience with excellent TypeScript support. ESBuild used for production backend bundling for optimal performance.
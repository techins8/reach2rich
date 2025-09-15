# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager**: Uses pnpm (v10.16.0)

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production with Turbopack  
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run Vitest tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:ui` - Run tests with browser UI (Playwright)

## Architecture Overview

**Framework**: Next.js 15 with App Router, React 19, TypeScript

**Core Technologies**:
- **UI**: Tailwind CSS + shadcn/ui components (New York style)
- **Authentication**: Supabase Auth with SSR
- **Database**: Supabase
- **AI Integration**: OpenAI API
- **Forms**: React Hook Form + Zod validation
- **Testing**: Vitest + Playwright
- **External APIs**: Systeme.io integration

**Project Structure**:
- `src/app/` - Next.js App Router pages and layouts
- `src/components/ui/` - shadcn/ui components
- `src/components/blocks/` - Application-specific components
- `src/services/` - API integrations (Supabase, OpenAI, Systeme.io)
- `src/config/` - Configuration files (Supabase client/server)
- `src/lib/` - Shared utilities and helpers
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions

**Key Features**:
- **Offer Management**: Multi-step form system for creating and editing offers
- **AI-Generated Content**: OpenAI integration for generating offer content steps
- **Authentication Flow**: Login/logout with Supabase auth
- **Dashboard**: Protected dashboard with sidebar navigation
- **Course Access Verification**: Integration with Systeme.io to verify user course access

**Authentication Architecture**:
- Middleware (`src/middleware.ts`) handles session management
- Server-side Supabase client (`src/config/supabase/server.ts`) for protected routes
- Client-side auth hook (`src/hooks/useAuth.tsx`)

**Offer System**:
- Core type: `Offer` with `OfferJson` containing `userInput` and `generated` fields
- Multi-step form progression with AI content generation
- Repository pattern for database operations (`src/services/supabase/offers/`)

**UI System**:
- Uses shadcn/ui with Tailwind CSS
- Custom theme with CSS variables for colors
- Radix UI primitives for accessible components
- Sidebar layout with breadcrumb navigation
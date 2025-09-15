# Reach2Rich

A Next.js application for creating AI-generated offers with multi-step form workflows and Supabase authentication.

## Features

- **AI-Generated Offers**: Create comprehensive offers using OpenAI integration
- **Multi-Step Forms**: Progressive form completion with validation
- **Authentication**: Secure login/logout with Supabase Auth
- **Dashboard**: Protected dashboard with sidebar navigation
- **Course Integration**: Verify user access via Systeme.io API
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui (Radix primitives)
- **Backend**: Supabase (Auth & Database)
- **AI**: OpenAI API
- **Forms**: React Hook Form + Zod validation
- **Testing**: Vitest + Playwright
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Supabase project
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd reach2rich

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and OpenAI credentials
```

### Development

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Build for production
pnpm build

# Start production server
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── ui/                # shadcn/ui components
│   └── blocks/            # Application components
├── services/              # API integrations
├── config/                # Configuration files
├── lib/                   # Utilities
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript definitions
```

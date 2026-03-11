# SLS318-Escape

A TypeScript-based escape room game built with Next.js and React.

## Overview

SLS318-Escape is an interactive escape room experience that challenges players to solve puzzles and riddles to progress through different rooms. The game features a modern web interface built with React and PrimeReact components.

## Tech Stack

- **Frontend**: Next.js 16.1.6 with React 19
- **Language**: TypeScript
- **UI Library**: PrimeReact 10.9.7 with PrimeIcons
- **AI Integration**: Anthropic AI SDK
- **Database**: SQLite (planned for multiplayer support)
- **Date/Time**: Day.js
- **Deployment**: Vercel

## Features

- Interactive escape room gameplay
- Modern responsive web interface
- TypeScript for enhanced development experience
- AI-powered game elements
- Future multiplayer support (up to 10 concurrent players)

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SLS318-Escape
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see Environment Setup section)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Anthropic AI API Key
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Database URL (for future SQLite implementation)
DATABASE_URL=file:./database.sqlite

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
SLS318-Escape/
├── README.md
├── package.json
├── tsconfig.json
├── next-env.d.ts
├── vercel.json
├── CLAUDE.md          # AI assistant instructions
├── PROGRESS.md        # Development progress tracking
├── PROGFORMAT.md      # Progress format guidelines
└── [source files to be created]
```

## Future Features

- SQLite database integration for persistent game state
- Multiplayer support for up to 10 concurrent players
- Real-time game synchronization
- Enhanced puzzle mechanics
- Progress tracking and leaderboards

## Development

The project uses:
- TypeScript for type safety
- ESLint for code quality
- Next.js App Router (when implemented)
- PrimeReact for UI components

## Contributing

This is a course project (SLS318). Please follow the established coding standards and update the PROGRESS.md file when making significant changes.

## License

ISC License - See package.json for details

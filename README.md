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

## Image/Asset Organization

Each scene's assets should be co-located with the scene file for better maintainability.

### Directory Structure:
```
app/
├── room/
│   ├── a-1/
│   │   ├── page.tsx
│   │   └── assets/          # Room-specific assets (scene images, sounds, etc.)
│   ├── a-2/
│   │   ├── page.tsx
│   │   └── assets/
│   └── a-3/
│       ├── page.tsx
│       └── assets/
├── page.tsx                 # Main entrance
└── assets/                  # Entrance-specific assets

public/
└── assets/                  # Shared/global assets (UI elements, common sounds, etc.)
```

### Asset Naming Convention:
- Room scene images: `app/room/[room-id]/assets/scene.jpg`
- Room-specific assets: `app/room/[room-id]/assets/[asset-name]`
- Shared assets: `public/assets/[category]/[asset-name]`
- Reference paths:
  - Room assets: `./assets/scene.jpg`
  - Shared assets: `/assets/[category]/[asset-name]`

## Room Generation Scripts

Two scripts are available to automatically generate room directories and page.tsx files:

### 1. JSON-based Generator (Recommended)

**Usage:**
```bash
./generate-rooms.sh [rooms.json]
```

**Example:**
```bash
./generate-rooms.sh          # Uses rooms.json by default
./generate-rooms.sh my-rooms.json    # Uses custom JSON file
```

**JSON Format (`rooms.json`):**
```json
{
  "rooms": [
    {
      "id": "b-1",
      "dialog": "You've entered the ancient archive. Dusty scrolls line the walls...",
      "prevRoute": "/room/a-1",
      "nextRoutes": {
        "Examine the Pedestal": "/room/c-1",
        "Search the Scrolls": "/room/c-2",
        "Return to Library": "/room/a-1"
      }
    },
    {
      "id": "secret-room",
      "dialog": "A hidden chamber filled with treasure...",
      "nextRoutes": {
        "Take the Gold": "/victory",
        "Leave Quietly": "/room/a-1"
      }
    }
  ]
}
```

### 2. Simple Command-line Generator

**Usage:**
```bash
./generate-simple.sh "room-id" "dialog text" "prev-route" "Route1:/path1,Route2:/path2"
```

**Example:**
```bash
./generate-simple.sh "d-1" "Dark dungeon with chains" "/room/c-1" "Exit:/victory,Back:/room/c-1"
```

### What Gets Generated

Both scripts create:
- `app/room/[room-id]/page.tsx` - Complete Scene component with proper naming
- `app/room/[room-id]/assets/` - Empty directory for scene.jpg and other assets
- Component names: `b-1` → `RoomB1()`, `secret-room` → `RoomSECRETROOM()`

### Requirements

- **jq** (for JSON generator): `brew install jq` (macOS) or `apt-get install jq` (Ubuntu)
- Executable permissions: Scripts are already marked executable

### After Generation

1. Add `scene.jpg` images to each room's `assets/` folder
2. Customize dialog text and routes as needed
3. Test navigation flow between rooms

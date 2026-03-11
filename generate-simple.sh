#!/bin/bash

# Simple Room Generator Script for SLS318-Escape
# Usage: ./generate-simple.sh room-id "dialog text" "prev-route" "Next Route 1:/path/1,Next Route 2:/path/2"
# Example: ./generate-simple.sh "d-1" "You are in a dark dungeon" "/room/c-1" "Exit:/victory,Go Back:/room/c-1"

if [ $# -lt 2 ]; then
    echo "Usage: ./generate-simple.sh room-id \"dialog\" [prev-route] [\"Route1:/path1,Route2:/path2\"]"
    echo "Example: ./generate-simple.sh \"d-1\" \"Dark dungeon\" \"/room/c-1\" \"Exit:/victory,Back:/room/c-1\""
    exit 1
fi

ROOM_ID="$1"
DIALOG="$2"
PREV_ROUTE="$3"
NEXT_ROUTES_STR="$4"

# Create directory structure
ROOM_DIR="app/room/$ROOM_ID"
echo "Creating room: $ROOM_ID"

mkdir -p "$ROOM_DIR/assets"

# Generate nextRoutes object
NEXT_ROUTES="{"
if [ -n "$NEXT_ROUTES_STR" ]; then
    IFS=',' read -ra ROUTES <<< "$NEXT_ROUTES_STR"
    FIRST=true
    for route in "${ROUTES[@]}"; do
        IFS=':' read -ra ROUTE_PARTS <<< "$route"
        if [ ${#ROUTE_PARTS[@]} -eq 2 ]; then
            if [ "$FIRST" = false ]; then
                NEXT_ROUTES+=","
            fi
            NEXT_ROUTES+="
    \"${ROUTE_PARTS[0]}\": \"${ROUTE_PARTS[1]}\""
            FIRST=false
        fi
    done
fi
NEXT_ROUTES+="
  }"

# Format component name (replace hyphens, capitalize)
# Convert b-1 -> B1, a-2 -> A2, etc.
COMPONENT_NAME="Room$(echo ${ROOM_ID} | sed 's/-//g' | tr '[:lower:]' '[:upper:]')"

# Generate page.tsx content
cat > "$ROOM_DIR/page.tsx" << EOF
import { Scene } from '@/components/scene'

export default function $COMPONENT_NAME() {
  const nextRoutes = $NEXT_ROUTES

  return (
    <Scene
      currentScene="$ROOM_ID"
      imageUrl="./assets/scene.jpg"
      dialog="$DIALOG"
      nextRoutes={nextRoutes}$([ -n "$PREV_ROUTE" ] && echo "
      prevRoute=\"$PREV_ROUTE\"")
    />
  )
}
EOF

echo "✓ Created $ROOM_DIR/page.tsx"
echo "✓ Created $ROOM_DIR/assets/"
echo "✓ Room '$ROOM_ID' generated successfully!"
echo "Don't forget to add scene.jpg to $ROOM_DIR/assets/"
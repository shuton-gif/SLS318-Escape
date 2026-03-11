#!/bin/bash

# Room Generator Script for SLS318-Escape
# Usage: ./generate-rooms.sh [query-file]
# Example: ./generate-rooms.sh rooms.json

QUERY_FILE=${1:-"rooms.json"}

if [ ! -f "$QUERY_FILE" ]; then
    echo "Error: Query file '$QUERY_FILE' not found!"
    echo "Usage: ./generate-rooms.sh [query-file]"
    exit 1
fi

# Check if jq is available for JSON parsing
if ! command -v jq &> /dev/null; then
    echo "Error: jq is required but not installed."
    echo "Install with: brew install jq (on macOS) or apt-get install jq (on Ubuntu)"
    exit 1
fi

# Parse JSON and create rooms
echo "Generating rooms from $QUERY_FILE..."

jq -c '.rooms[]' "$QUERY_FILE" | while IFS= read -r room_data; do
    # Extract room properties
    room_id=$(echo "$room_data" | jq -r '.id')
    dialog=$(echo "$room_data" | jq -r '.dialog')
    prev_route=$(echo "$room_data" | jq -r '.prevRoute // empty')
    
    # Create directory structure
    room_dir="app/room/$room_id"
    echo "Creating room: $room_id"
    
    mkdir -p "$room_dir/assets"
    
    # Format component name (replace hyphens, capitalize each part)
    # Convert b-1 -> B1, a-2 -> A2, etc.
    component_name=$(echo "$room_id" | sed 's/-//g' | tr '[:lower:]' '[:upper:]')
    component_name="Room${component_name}"
    
    # Format nextRoutes as TypeScript object
    next_routes_ts=""
    if echo "$room_data" | jq -e '.nextRoutes' > /dev/null; then
        next_routes_ts=$(echo "$room_data" | jq '.nextRoutes' | sed 's/"/"/g')
    else
        next_routes_ts='{ "Continue": "/" }'
    fi
    
    # Generate page.tsx content
    if [ -n "$prev_route" ] && [ "$prev_route" != "null" ]; then
        cat > "$room_dir/page.tsx" << EOF
import { Scene } from '@/components/scene'

export default function ${component_name}() {
  const nextRoutes = ${next_routes_ts}

  return (
    <Scene
      currentScene="$room_id"
      imageUrl="./assets/scene.jpg"
      dialog="$dialog"
      nextRoutes={nextRoutes}
      prevRoute="$prev_route"
    />
  )
}
EOF
    else
        cat > "$room_dir/page.tsx" << EOF
import { Scene } from '@/components/scene'

export default function ${component_name}() {
  const nextRoutes = ${next_routes_ts}

  return (
    <Scene
      currentScene="$room_id"
      imageUrl="./assets/scene.jpg"
      dialog="$dialog"
      nextRoutes={nextRoutes}
    />
  )
}
EOF
    fi
    
    echo "✓ Created $room_dir/page.tsx"
    echo "✓ Created $room_dir/assets/"
done

echo "Room generation complete!"
echo "Don't forget to add scene.jpg images to each room's assets/ folder."
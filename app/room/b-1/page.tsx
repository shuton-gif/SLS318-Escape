import { Scene } from '@/components/scene'

export default function RoomB1() {
  const nextRoutes = {
  "Examine the Pedestal": "/room/c-1",
  "Search the Scrolls": "/room/c-2",
  "Return to Library": "/room/a-1"
}

  return (
    <Scene
      currentScene="b-1"
      imageUrl="./assets/scene.jpg"
      dialog="You've entered the ancient archive. Dusty scrolls line the walls, and there's a mysterious pedestal in the center with glowing runes."
      nextRoutes={nextRoutes}
      prevRoute="/room/a-1"
    />
  )
}

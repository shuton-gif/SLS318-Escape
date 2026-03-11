import { Scene } from '@/components/scene'

export default function RoomB2() {
  const nextRoutes = {
  "Activate Main Engine": "/room/c-3",
  "Adjust the Gears": "/room/c-4",
  "Emergency Shutdown": "/room/a-2"
}

  return (
    <Scene
      currentScene="b-2"
      imageUrl="./assets/scene.jpg"
      dialog="The machinery hums with power. Gears turn in complex patterns, and steam hisses from copper pipes. A control panel awaits your input."
      nextRoutes={nextRoutes}
      prevRoute="/room/a-2"
    />
  )
}

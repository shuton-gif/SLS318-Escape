import { Scene } from '@/components/scene'

export default function RoomA2() {
  const nextRoutes = {
    "Examine the Machinery": "/room/b-2",
    "Try Another Path": "/room/a-1",
    "Return to Entrance": "/"
  }

  return (
    <Scene
      currentScene="a-2"
      imageUrl="./assets/scene.jpg"
      dialog="You chose the right door. This room contains strange mechanical devices and gears. You need to figure out the correct sequence to activate them."
      nextRoutes={nextRoutes}
      prevRoute="/"
    />
  )
}
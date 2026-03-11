import { Scene } from '@/components/scene'

export default function RoomA1() {
  const nextRoutes = {
    "Continue Forward": "/room/b-1",
    "Return to Entrance": "/"
  }

  return (
    <Scene
      currentScene="a-1"
      imageUrl="/images/room-a1.jpg"
      dialog="You chose the left door. You're in a library filled with ancient books. There's a riddle written on the wall that needs solving."
      nextRoutes={nextRoutes}
      prevRoute="/"
    />
  )
}
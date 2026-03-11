import { Scene } from '@/components/scene'

export default function RoomA3() {
  const nextRoutes = {
    "Investigate the Crystals": "/room/b-3",
    "Return to Main Path": "/room/a-1"
  }

  return (
    <Scene
      currentScene="a-3"
      imageUrl="./assets/scene.jpg"
      dialog="You discovered the secret passage! This hidden chamber glows with mysterious crystals. The air hums with magical energy. There are symbols on the wall that seem to pulse with light."
      nextRoutes={nextRoutes}
      prevRoute="/"
    />
  )
}
import { Scene } from '@/components/scene'

export default function RoomC1() {
  const nextRoutes = {
  "Follow Map to Exit": "/victory",
  "Explore Hidden Path": "/room/secret-1"
}

  return (
    <Scene
      currentScene="c-1"
      imageUrl="./assets/scene.jpg"
      dialog="The pedestal's runes react to your presence. A holographic map appears, showing the layout of the entire escape room complex."
      nextRoutes={nextRoutes}
      prevRoute="/room/b-1"
    />
  )
}

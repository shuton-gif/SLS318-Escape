import { Scene } from '@/components/scene'

export default function RoomB3() {
  const nextRoutes = {
  "Touch the Blue Crystal": "/room/c-5",
  "Study the Floor Symbols": "/room/c-6",
  "Return to Secret Passage": "/room/a-3"
}

  return (
    <Scene
      currentScene="b-3"
      imageUrl="./assets/scene.jpg"
      dialog="The crystal chamber resonates with mystical energy. Each crystal pulses with a different color, creating a mesmerizing light show. Ancient symbols glow on the floor."
      nextRoutes={nextRoutes}
      prevRoute="/room/a-3"
    />
  )
}

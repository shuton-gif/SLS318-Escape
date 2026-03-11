import { Scene } from '@/components/scene'

export default function HomePage() {
  const branchingRoutes = {
    "Left Door (a-1)": "/room/a-1",
    "Right Door (a-2)": "/room/a-2",
    "Secret Passage (a-3)": "/room/a-3"
  }

  return (
    <Scene
      currentScene="entrance"
      imageUrl="./assets/entrance.jpg"
      dialog="Welcome to the escape room. You see three possible paths ahead. Each door leads to a different challenge. Choose wisely..."
      nextRoutes={branchingRoutes}
      requiresPuzzle={true}
    />
  )
}
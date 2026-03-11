import { useRouter } from "next/navigation"
import styles from './scene.module.css'
import { useState } from "react"

type SceneState = {
    complete: boolean
    currentRoute: string
    availableRoutes: string[]
}

type SceneProps = {
    currentScene: string
    imageUrl: string
    dialog: string
    puzzleComplete?: boolean
    onPuzzleComplete?: () => void
    nextRoutes?: { [key: string]: string }
    prevRoute?: string
    allowBacktrack?: boolean
}

const sceneRenderer = (imgURL: string, dialog: string) => {
    return (
        <div className={styles.sceneContainer}
            style={{
                backgroundImage: `url(${imgURL})`
            }}
        >
            <div className={styles.dialog}>{dialog}</div>
        </div>
    )
}

const RouteSelector = ({ routes, onSelect, isComplete }: { 
    routes: { [key: string]: string }, 
    onSelect: (route: string) => void,
    isComplete: boolean 
}) => {
    if (!isComplete) return null
    
    return (
        <div className={styles.routeSelector}>
            <h3>Choose your path:</h3>
            {Object.entries(routes).map(([key, path]) => (
                <button 
                    key={key}
                    className={styles.routeButton}
                    onClick={() => onSelect(path)}
                >
                    {key}
                </button>
            ))}
        </div>
    )
}

export function Scene({ 
    currentScene, 
    imageUrl, 
    dialog, 
    puzzleComplete = false, 
    onPuzzleComplete,
    nextRoutes = { "Next Room": "/room-2" },
    prevRoute,
    allowBacktrack = true
}: SceneProps) {
    const [state, setState] = useState<SceneState>({
        complete: puzzleComplete,
        currentRoute: currentScene,
        availableRoutes: Object.values(nextRoutes)
    })
    const router = useRouter()

    const handleRouteSelection = (selectedRoute: string) => {
        router.push(selectedRoute)
    }

    const handlePuzzleComplete = () => {
        setState(prev => ({ ...prev, complete: true }))
        if (onPuzzleComplete) {
            onPuzzleComplete()
        }
    }

    return (
        <div className={styles.sceneWrapper}>
            {sceneRenderer(imageUrl, dialog)}
            
            {prevRoute && allowBacktrack && (
                <div className={styles.backButtonArea}>
                    <button 
                        className={styles.backButton}
                        onClick={() => handleRouteSelection(prevRoute)}
                    >
                        ← Go Back
                    </button>
                </div>
            )}
            
            {!state.complete && (
                <div className={styles.puzzleArea}>
                    <button 
                        className={styles.solveButton}
                        onClick={handlePuzzleComplete}
                    >
                        Solve Puzzle
                    </button>
                </div>
            )}

            <RouteSelector 
                routes={nextRoutes}
                onSelect={handleRouteSelection}
                isComplete={state.complete}
            />
        </div>
    )
}
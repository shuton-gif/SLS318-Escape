"use client"

import { useRouter } from "next/navigation"
import styles from './scene.module.css'
import { useState } from "react"

type SceneState = {
    complete: boolean
    currentRoute: string
    availableRoutes: string[]
    validatingRoute: string | null
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
    requiresPuzzle?: boolean
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

const RouteSelector = ({ routes, onSelect, isComplete, validatingRoute }: { 
    routes: { [key: string]: string }, 
    onSelect: (route: string) => void,
    isComplete: boolean,
    validatingRoute: string | null
}) => {
    if (!isComplete) return null
    
    return (
        <div className={styles.routeSelector}>
            <h3>Choose your path:</h3>
            {Object.entries(routes).map(([key, path]) => (
                <div 
                    key={key}
                    className={`${styles.routeButton} ${validatingRoute === path ? styles.validating : ''} ${validatingRoute !== null ? styles.disabled : ''}`}
                    onClick={() => validatingRoute === null && onSelect(path)}
                >
                    {validatingRoute === path ? 'Checking route...' : key}
                </div>
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
    allowBacktrack = true,
    requiresPuzzle = false
}: SceneProps) {
    const [state, setState] = useState<SceneState>({
        complete: puzzleComplete || !requiresPuzzle,
        currentRoute: currentScene,
        availableRoutes: Object.values(nextRoutes),
        validatingRoute: null
    })
    const router = useRouter()

    const handleRouteSelection = async (selectedRoute: string) => {
        // Set validating state
        setState(prev => ({ ...prev, validatingRoute: selectedRoute }))
        
        // Validate route exists before navigation
        try {
            const response = await fetch(selectedRoute, { method: 'HEAD' })
            if (response.ok) {
                router.push(selectedRoute)
            } else {
                console.warn(`Route ${selectedRoute} does not exist (${response.status})`)
                // Navigate to dead-end page with context
                const currentPath = currentScene === 'entrance' ? '/' : `/room/${currentScene}`
                router.push(`/deadend?from=${encodeURIComponent(currentPath)}&route=${encodeURIComponent(selectedRoute)}`)
            }
        } catch (error) {
            console.warn(`Failed to validate route ${selectedRoute}:`, error)
            // Navigate to dead-end page for network errors too
            const currentPath = currentScene === 'entrance' ? '/' : `/room/${currentScene}`
            router.push(`/deadend?from=${encodeURIComponent(currentPath)}&route=${encodeURIComponent(selectedRoute)}`)
        } finally {
            // Clear validating state
            setState(prev => ({ ...prev, validatingRoute: null }))
        }
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
            
            {/* {prevRoute && allowBacktrack && (
                <div className={styles.backButtonArea}>
                    <div 
                        className={styles.backButton}
                        onClick={() => handleRouteSelection(prevRoute)}
                    >
                        ← Go Back
                    </div>
                </div>
            )} */}
            
            {!state.complete && requiresPuzzle && (
                <div className={styles.puzzleArea}>
                    <div 
                        className={styles.solveButton}
                        onClick={handlePuzzleComplete}
                    >
                        Solve Puzzle
                    </div>
                </div>
            )}

            <RouteSelector 
                routes={nextRoutes}
                onSelect={handleRouteSelection}
                isComplete={state.complete}
                validatingRoute={state.validatingRoute}
            />
        </div>
    )
}
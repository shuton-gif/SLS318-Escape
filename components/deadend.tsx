"use client"

import { useRouter, useSearchParams } from "next/navigation"
import styles from './deadend.module.css'

export default function DeadEnd() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const lastPage = searchParams.get('from') || '/'
    const attemptedRoute = searchParams.get('route') || 'unknown'
    
    const handleGoBack = () => {
        router.push(lastPage)
    }

    return (
        <div className={styles.deadEndWrapper}>
            <div className={styles.deadEndContainer}>
                <div className={styles.content}>
                    <h1 className={styles.title}>Dead End</h1>
                    <p className={styles.message}>
                        The path you tried to take leads nowhere...
                    </p>
                    <p className={styles.routeInfo}>
                        Attempted route: <code>{attemptedRoute}</code>
                    </p>
                    <p className={styles.hint}>
                        This room hasn't been built yet. The path crumbles before you, forcing you to turn back.
                    </p>
                    
                    <button 
                        className={styles.backButton}
                        onClick={handleGoBack}
                    >
                        ← Return to Safety
                    </button>
                </div>
            </div>
        </div>
    )
}
import { useRouter } from "next/router"
export default function Form() {
    const router = useRouter()
    return (
        <div>
            <div onClick={() => router.push('')}>GAME</div>
            <div onClick={() => router.push('')}>GAME</div>
        </div>
    )
}
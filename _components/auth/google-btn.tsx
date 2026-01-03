'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/action/user/auth-client"

export function SignInWithGoogleButton(){
    const [loading, setLoading] = useState(false)
    const onLogin = async () => {
        try {
            setLoading(true)
            await authClient.signIn.social({provider: "google"})
        } catch (error) {
            console.log("Error signing In " + error)
            setLoading(false)
        }
    }
    return (
        <button
        onClick={onLogin}
        disabled={loading}
        className="px-4 py-2 rounded-lg border border-neutral-200 font-medium"
        >
            {loading ? "one moment..." : "LogIn with Google"}
        </button>
    )
}

export function SignOutButton(){
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const onLogout = async () => {
        try {
            setLoading(true)
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: ()=> {
                        router.push("/")
                        router.refresh()
                    }
                }
            })
        } catch (error) {
            console.log("Error logging out " + error)
            setLoading(false)
        }
    }
    return (
        <button
        onClick={onLogout}
        className="bg-neutral-400 px-4 py-2 rounded-lg font-medium"
        disabled={loading}
        >
            SignOut
        </button>
    )
}
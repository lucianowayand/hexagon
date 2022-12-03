import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, signOut } = useContext(AuthContext)

    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push("/login")
        }
    }, [user])

    return (
        <div className="flex flex-row h-screen bg-gray-100">
            <div className="w-1/6 ml-5 mt-3 flex flex-col justify-between">
                <div>
                    <div className="mb-6">
                        <h1>{user?.name}</h1>
                        <h1>{user?.email}</h1>
                    </div>
                    <ul>
                        <li><Link href="/dashboard/users">Users</Link></li>
                    </ul>
                </div>
                <div className="mb-7">
                    <a onClick={signOut}>Log out</a>
                </div>
            </div>
            <div className="w-5/6 px-10 py-6 bg-white">
                {children}
            </div>
        </div>
    )
}
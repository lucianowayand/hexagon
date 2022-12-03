import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContextType } from "./types";
import { User } from "../../types";
import { auth } from "../../services/firebase";
import { api } from "../../services/api";
import { useRouter } from "next/router";

const defaultValues: AuthContextType = {
	handleGoogleSignIn: async () => { },
	user: undefined,
	signOut: () => { },
};

export const AuthContext = createContext(defaultValues)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsloading] = useState(true);
	const [user, setUser] = useState<User | undefined>();

	useEffect(() => {
		setIsloading(false);
		setUser(getUserFromLocalStorage())
	}, []);

	function getUserFromLocalStorage(){
		const user = localStorage.getItem("user");
		if(user){
			return JSON.parse(user) as User;
		}
		return undefined;
	}

	const router = useRouter()

	function signOut(){
		localStorage.removeItem("user");
		setUser(undefined);
		router.push('/')
	}

	async function handleGoogleSignIn() {
		const provider = new GoogleAuthProvider();
		const response = await signInWithPopup(auth, provider);
		try {
			const res = await api.post("/api/users", { uid: response.user.uid, name: response.user.displayName, email: response.user.email })
			setUser(res.data)
			localStorage.setItem("user", JSON.stringify(res.data))
		} catch (error: any) {
			console.log(error.response.data)
		}

	}

	return (
		<AuthContext.Provider
			value={{
				handleGoogleSignIn,
				user,
				signOut,
			}}
		>
			{isLoading === false ? children : null}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

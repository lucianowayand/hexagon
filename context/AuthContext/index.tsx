import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContextType } from "./types";
import { User } from "../../types";
import { auth } from "../../services/firebase";
import { prisma } from "../../services/prisma";
import { api } from "../../services/api";

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

	function signOut(){
		localStorage.removeItem("user");
		setIsloading(true)
		setUser(undefined);
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

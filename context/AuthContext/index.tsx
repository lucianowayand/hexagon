import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { AuthContextType, User } from "./types";
import { auth } from "../../services/firebase";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { sign } from "../../services/jwt"
import { useCookies } from 'react-cookie';

const defaultValues: AuthContextType = {
	handleGoogleSignIn: async () => { },
	handleEmailSignIn: async () => { },
	handleEmailSignUp: async () => { },
	user: undefined,
	signOut: () => { },
};

export const AuthContext = createContext(defaultValues)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsloading] = useState(true);
	const [user, setUser] = useState<User | undefined>();
	const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

	useEffect(() => {
		setIsloading(false);
		setUser(getUserFromLocalStorage())
	}, []);

	function getUserFromLocalStorage() {
		const user = localStorage.getItem("user");
		if (user) {
			return JSON.parse(user) as User;
		}
		return undefined;
	}

	const router = useRouter()

	function signOut() {
		localStorage.removeItem("user");
		removeCookie('jwt')
		setUser(undefined);
		router.push('/')
	}

	async function handleGoogleSignIn() {
		console.log("handleGoogleSignIn")
		const provider = new GoogleAuthProvider();
		const response = await signInWithPopup(auth, provider);
		console.log(response)
		try {
			const res = await api.post("/api/users", { uid: response.user.uid, name: response.user.displayName, email: response.user.email })
			res.data.jwt = await sign(res.data)
			setUser(res.data)
			setCookie("jwt", res.data.jwt)
			localStorage.setItem("user", JSON.stringify(res.data))
		} catch (error: any) {
			console.log(error.response.data)
		}

	}

	async function handleEmailSignIn(email: string, password: string) {
		const response = await signInWithEmailAndPassword(auth, email, password)
		try {
			const res = await api.post("/api/users", { uid: response.user.uid, name: response.user.displayName, email: response.user.email })
			res.data.jwt = await sign(res.data)
			setUser(res.data)
			setCookie("jwt", res.data.jwt)
			localStorage.setItem("user", JSON.stringify(res.data))
		} catch (error: any) {
			console.log(error.response.data)
		}
	}
	async function handleEmailSignUp(email: string, password: string, name: string) {
		const response = await createUserWithEmailAndPassword(auth, email, password)
		try {
			const res = await api.post("/api/users", { uid: response.user.uid, name: name, email: response.user.email })
			res.data.jwt = await sign(res.data)
			setUser(res.data)
			setCookie("jwt", res.data.jwt)
			localStorage.setItem("user", JSON.stringify(res.data))
		} catch (error: any) {
			console.log(error.response.data)
		}
	}

	return (
		<AuthContext.Provider
			value={{
				handleGoogleSignIn,
				handleEmailSignIn,
				handleEmailSignUp,
				user,
				signOut,
			}}
		>
			{isLoading === false ? children : null}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

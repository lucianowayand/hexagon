interface User {
	admin: boolean;
	email: string;
	firebaseId: string;
	name: string;
}

interface AuthContextType {
	handleGoogleSignIn: () => Promise<void>;
	handleEmailSignIn: (email: string, password: string) => Promise<void>;
	handleEmailSignUp: (email: string, password: string, name: string) => Promise<void>;
	user?: User | undefined;
	signOut: () => void;
}

export type { AuthContextType };

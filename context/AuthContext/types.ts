interface User {
	admin: boolean;
	email: string;
	firebaseId: string;
	name: string;
}

interface AuthContextType {
    handleGoogleSignIn: () => Promise<void>;
    user?: User | undefined;
	signOut: () => void;
}

export type { AuthContextType };

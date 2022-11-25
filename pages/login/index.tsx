import Link from "next/link";
import { useContext } from "react";
import { ArrowFunction } from "typescript";
import { Context } from "../../context/AttributesContext";

export default function Login() {
	const { title } = useContext(Context);

	const Label = ({ children }: { children: React.ReactNode }) => {
		return <label className="text-gray-500">{children}</label>;
	};

	const Input = ({ type, placeholder }: { type: string; placeholder: string }) => {
		return <input className="bg-gray-100 p-2 rounded border" placeholder={placeholder} type={type} />;
	};

	const Button = ({ children }: { children: React.ReactNode }) => {
		return (
			<button className="p-1 mt-5 mb-5 w-full bg-yellow-100 border border-yellow-300 text-yellow-600">
				{children}
			</button>
		);
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<div className="w-3/12 mb-24">
				<div className="mb-6 text-center">
					<Link href="/" className="text-5xl font-black">
						{title}
					</Link>
					<h3 className="-translate-y-1">Login page</h3>
				</div>
				<div className="flex flex-col">
					<div className="flex flex-col pb-4">
						<Label>Email</Label>
						<Input placeholder="Email address." type="email" />
					</div>
					<div className="flex flex-col">
						<Label>Password</Label>
						<Input placeholder="********" type="password" />
						<Link href="/#" className="underline text-xs pt-1 text-gray-500">
							Forgot your password?
						</Link>
					</div>
					<div>
						<Button>Login</Button>
					</div>
					<div className="flex justify-center">
						<Link href="/#" className="underline text-gray-500">
							Register
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from 'next/link';
import { In18 } from "./types";
import i18n from "./i18n.json";

import Color from "color";

import google from "./assets/google.svg";
import Image from "next/image";
import Divider from "../../components/Divider";
import { useRouter } from "next/router";

export default function Login() {
	const { title, primaryColor, language } = useContext(ThemeContext);
	const { handleGoogleSignIn, user } = useContext(AuthContext);
	const text = (i18n as any)[language] as In18;
	const router = useRouter();

	const [newUser, setNewUser] = useState(false)

	const { register, handleSubmit, formState: { errors } } = useForm();

	useEffect(() => {
		if (user) {
			router.push("/dashboard")
		}
	}, [user])

	const submitFunction = (data:any) => {
		console.log(data)
	}

	const Label = ({ children }: { children: React.ReactNode }) => {
		return <label className="text-gray-500">{children}</label>;
	};

	const Input = ({ type, placeholder }: { type: string; placeholder: string }) => {
		return <input className="bg-gray-100 p-2 rounded border" placeholder={placeholder} type={type} />;
	};

	const LoginButton = ({ children }: { children: React.ReactNode }) => {
		return (
			<button
				type="submit"
				className="p-1 mt-5 mb-5 w-full rounded border-2"
				style={
					primaryColor !== "#000"
						? {
							backgroundColor: Color(primaryColor).lighten(0.7).string(),
							borderColor: Color(primaryColor).darken(0.2).string(),
							color: Color(primaryColor).darken(0.3).string(),
						}
						: {
							backgroundColor: Color("grey").lighten(0.7).string(),
							borderColor: Color("grey").darken(0.2).string(),
							color: Color("grey").darken(0.3).string(),
						}
				}
			>
				{children}
			</button>
		);
	};

	const GoogleLoginButton = ({ children }: { children: React.ReactNode }) => {
		return (
			<button onClick={handleGoogleSignIn} className="p-1 mt-5 mb-5 w-full rounded border-2">
				<div className="flex items-center">
					<Image src={google} alt="google-icon" style={{ height: "1.3em" }} />
					Continue with Google
				</div>
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
					<h3 className="-translate-y-1">{text.subtitle}</h3>
				</div>
				<form className="flex flex-col" onSubmit={handleSubmit(submitFunction)}>
					{newUser ? <div className="flex flex-col pb-4">
						<Label>{text.name}</Label>
						<Input placeholder={text.name_placeholder} type="text" {...register("name")}/>
					</div> : null}
					<div className="flex flex-col pb-4">
						<Label>{text.email}</Label>
						<Input placeholder={text.email_placeholder} type="email"  {...register("email")}/>
					</div>
					<div className="flex flex-col pb-4">
						<Label>{text.password}</Label>
						<Input placeholder="********" type="password"  {...register("password")} />
					</div>
					{!newUser ? <div className="flex flex-col">
						<div className="flex justify-between pt-2">
							<Link href="#" className="underline text-xs pt-1 text-gray-500">
								{text.forgot_password}
							</Link>
							<Link href="" onClick={() => setNewUser(true)} className="underline text-xs pt-1 text-gray-500">
								{text.register}
							</Link>
						</div>
					</div> : <div className="flex justify-between pt-2">
							<Link href="#" className="underline text-xs pt-1 text-gray-500">
								{text.forgot_password}
							</Link>
							<Link href="" onClick={() => setNewUser(false)} className="underline text-xs pt-1 text-gray-500">
								{text.login}
							</Link>
						</div>}
					<LoginButton>{text.login}</LoginButton>
					<Divider text={text.or} />
					<GoogleLoginButton>Continue with Google</GoogleLoginButton>
				</form>
			</div>
		</div>
	);
}
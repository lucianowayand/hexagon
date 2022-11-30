import { useContext } from "react";
import { Context } from "../../context/AttributesContext";
import { In18 } from "./types";
import i18n from './i18n.json'

import Link from "next/link";
import Color from "color";

export default function Login() {
	const { title, primaryColor, language } = useContext(Context);
	const text = ((i18n as any)[language]) as In18

	const Label = ({ children }: { children: React.ReactNode }) => {
		return <label className="text-gray-500">{children}</label>;
	};

	const Input = ({ type, placeholder }: { type: string; placeholder: string }) => {
		return <input className="bg-gray-100 p-2 rounded border" placeholder={placeholder} type={type} />;
	};

	const Button = ({ children }: { children: React.ReactNode }) => {
		return (
			<button
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

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<div className="w-3/12 mb-24">
				<div className="mb-6 text-center">
					<Link href="#" className="text-5xl font-black">
						{title}
					</Link>
					<h3 className="-translate-y-1">{text.subtitle}</h3>
				</div>
				<div className="flex flex-col">
					<div className="flex flex-col pb-4">
						<Label>{text.email}</Label>
						<Input placeholder={text.email_placeholder} type="email" />
					</div>
					<div className="flex flex-col">
						<Label>{text.password}</Label>
						<Input placeholder="********" type="password" />
						<Link href="#" className="underline text-xs pt-1 text-gray-500">
							{text.forgot_password}
						</Link>
					</div>
					<div>
						<Button>{text.login}</Button>
					</div>
					<div className="flex justify-center">
						<Link href="#" className="underline text-gray-500">
							{text.register}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

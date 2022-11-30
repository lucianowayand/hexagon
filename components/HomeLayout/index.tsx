import React, { ReactNode, useContext } from "react";
import { Context } from "../../context/AttributesContext";

import { In18 } from "./types";
import i18n from './i18n.json'
import Link from "next/link";

export default function HomeLayout({ children }: { children: ReactNode }) {
	const { title, primaryColor, secondaryColor, language } = useContext(Context)

	const text = ((i18n as any)[language]) as In18

	const linkStyle = {
		margin: "1rem",
		textDecoration: "none",
		color: secondaryColor,
		fontWeight: "bold",
		fontSize: 32
	};

	return (
		<div className="layout" style={{ backgroundColor: primaryColor, color: secondaryColor }}>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Link href="/login" style={linkStyle}>
					<h1>{title}</h1>
				</Link>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<Link href="#" style={linkStyle}>
						<h1>{text.members}</h1>
					</Link>
					<Link href="#" style={linkStyle}>
						<h1>{text.projects}</h1>
					</Link>
					<Link href="#" style={linkStyle}>
						<h1>{text.sponsors}</h1>
					</Link>
				</div>
			</div>
			<div className="content" style={{ padding: "1em" }}>
				{children}
			</div>
		</div>
	);
}

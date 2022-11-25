import Link from "next/link";
import React, { useEffect, useState, ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
	const [title, setTitle] = useState("");
	const [primaryColor, setPrimaryColor] = useState("");
	const [secondaryColor, setSecondaryColor] = useState("");

	useEffect(() => {
		setTitle(localStorage.getItem("title")!);
		setPrimaryColor(localStorage.getItem("primaryColor")!);
		setSecondaryColor(localStorage.getItem("secondaryColor")!);
	}, []);

	const linkStyle = {
		margin: "1rem",
		textDecoration: "none",
		color: secondaryColor,
	};

	return (
		<div className="layout" style={{ backgroundColor: primaryColor, color: secondaryColor }}>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Link href="/login" style={linkStyle}>
						<h1>{title}</h1>
					</Link>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<Link href="/#" style={linkStyle}>
						<h1>Blog</h1>
					</Link>
					<Link href="/#" style={linkStyle}>
						<h1>Crew</h1>
					</Link>
					<Link href="/#" style={linkStyle}>
						<h1>Projects</h1>
					</Link>
				</div>
			</div>
			<div className="content" style={{ padding: "1em" }}>
				{children}
			</div>
		</div>
	);
}

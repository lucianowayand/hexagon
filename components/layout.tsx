import React, { useEffect, useState } from "react";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	const [title, setTitle] = useState("");
	const [primaryColor, setPrimaryColor] = useState("");
	const [secondaryColor, setSecondaryColor] = useState("");

	useEffect(() => {
		setTitle(localStorage.getItem("title")!);
		setPrimaryColor(localStorage.getItem("primaryColor")!);
		setSecondaryColor(localStorage.getItem("secondaryColor")!);
	}, []);

	return (
		<div className="layout" style={{ backgroundColor: primaryColor, color: secondaryColor }}>
			<div style={{display:'flex', justifyContent:'space-between'}}>
				<h1>{title}</h1>
                <div style={{display:'flex', flexDirection:'row'}}>
                <h1 style={{marginLeft: '1em'}}>Blog</h1>
                <h1 style={{marginLeft: '1em'}}>Blog</h1>
                <h1 style={{marginLeft: '1em'}}>Blog</h1>
                </div>
			</div>
			<div className="content">{children}</div>
		</div>
	);
}

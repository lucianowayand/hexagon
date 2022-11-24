import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";

export async function getStaticProps() {
	const res = await fetch(process.env.BASE_URL + "/api/attributes");
	const data = await res.json();

	return {
		props: { attributes: data },
	};
}

export default function Home({ attributes }: any) {
	const title = attributes.find((value: any) => value.name === "title").value;
	const primaryColor = attributes.find((value: any) => value.name === "primaryColor").value;
	const secondaryColor = attributes.find((value: any) => value.name === "secondaryColor").value;

	return (
		<div style={{ backgroundColor: primaryColor, height: "100vh", width: "100vw", padding: "1em" }}>
			<h1 style={{ color: secondaryColor }}>{title}</h1>
		</div>
	);
}

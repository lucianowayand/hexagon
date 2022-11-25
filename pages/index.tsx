import { useEffect } from "react";
import HomeLayout from "../components/HomeLayout";

export async function getStaticProps() {
	const res = await fetch(process.env.BASE_URL + "/api/attributes");
	const data = await res.json();

	return {
		props: { attributes: data },
	};
}

export default function Home({ attributes }: any) {
	useEffect(() => {
		localStorage.getItem("title") === null ? localStorage.setItem("title", attributes.find((value: any) => value.name === "title").value) : null;
		localStorage.getItem("primaryColor") === null ? localStorage.setItem("primaryColor", attributes.find((value: any) => value.name === "primaryColor").value) : null;
		localStorage.getItem("secondaryColor") === null ? localStorage.setItem("secondaryColor", attributes.find((value: any) => value.name === "secondaryColor").value) : null;
	}, []);

	return (
		<HomeLayout>
			<h1>Content</h1>
		</HomeLayout>
	);
}

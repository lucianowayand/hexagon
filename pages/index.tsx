import { useEffect } from "react";
import HomeLayout from "../components/HomeLayout";

export async function getServerSideProps() {
	const res = await fetch(process.env.BASE_URL + "/api/attributes");
	const data = await res.json();

	return {
		props: { attributes: data },
	};
}

export default function Home({ attributes }: any) {
	useEffect(() => {
		localStorage.setItem("title", attributes.find((value: any) => value.name === "title").value);
		localStorage.setItem("primaryColor", attributes.find((value: any) => value.name === "primaryColor").value);
		localStorage.setItem("secondaryColor", attributes.find((value: any) => value.name === "secondaryColor").value);
	}, []);

	return (
		<HomeLayout>
			<h1>Content</h1>
		</HomeLayout>
	);
}

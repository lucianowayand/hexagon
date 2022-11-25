import type { AppProps } from "next/app";
import AttributesProvider from "../context/AttributesContext";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AttributesProvider>
			<Component {...pageProps} />;
		</AttributesProvider>
	);
}

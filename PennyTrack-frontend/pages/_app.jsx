import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
	const renderWithLayout =
		Component.getLayout ||
		function (page) {
			return <Layout>{page}</Layout>;
		};

	return renderWithLayout(<Component {...pageProps} />);
}

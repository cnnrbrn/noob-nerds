import { useEffect } from "react";
import Script from "next/script";
import { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NProgress from "nprogress";
import { persistor, store } from "../src/state/store";
import ErrorBoundary from "../src/components/layout/ErrorBoundary";
import * as gtag from "../src/lib/gtag";
import { theme } from "../src/styles/theme";
import "highlight.js/styles/base16/atelier-lakeside-light.css";
import "nprogress/nprogress.css";
import "../src/styles/global.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

NProgress.configure({ showSpinner: false });

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		const handleRouteStart = () => NProgress.start();

		const handleRouteDone = (url: string) => {
			NProgress.done();
			gtag.pageview(url);
		};

		Router.events.on("routeChangeStart", handleRouteStart);
		Router.events.on("routeChangeComplete", handleRouteDone);
		Router.events.on("routeChangeError", handleRouteDone);

		return () => {
			Router.events.off("routeChangeStart", handleRouteStart);
			Router.events.off("routeChangeComplete", handleRouteDone);
			Router.events.off("routeChangeError", handleRouteDone);
		};
	}, [router.events]);

	return (
		<>
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
			/>

			<Script id="google-analytics-script" strategy="afterInteractive">
				{`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
					send_page_view: false
                    });
                `}
			</Script>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ChakraProvider theme={theme}>
						<QueryClientProvider client={queryClient}>
							<ErrorBoundary>
								<Component {...pageProps} />
								{/* <ReactQueryDevtools initialIsOpen={false} /> */}
							</ErrorBoundary>
						</QueryClientProvider>
					</ChakraProvider>
				</PersistGate>
			</Provider>
		</>
	);
}

export default MyApp;

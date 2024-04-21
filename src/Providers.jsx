import { useLayoutEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router } from 'react-router-dom';

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000 * 5,
			},
		},
	});
}

let browserQueryClient = undefined;

function getQueryClient() {
	if (typeof window === "undefined") {
		return makeQueryClient();
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}

const Providers = ({ children }) => {
	const [mounted, setMounted] = useState(false);

	useLayoutEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				{children}
			</Router>
			<ReactQueryDevtools initialIsOpen={true} />
		</QueryClientProvider>
	);
};

export default Providers;
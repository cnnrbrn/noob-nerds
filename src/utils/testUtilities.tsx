import { render } from "@testing-library/react";
import { rest } from "msw";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const handlers = [
	rest.get("*/section/question", (req, res, ctx) => {
		return res(ctx.status(200), ctx.json("Answer HTML"));
	}),
	rest.post("*", async (req, res, ctx) => {
		const body = await req.json();

		if (body.code === "missing-element") {
			return res(ctx.status(200), ctx.json({ missingElements: ["variable."], messages: [] }));
		}

		if (body.code === "incorrect-code") {
			return res(ctx.status(200), ctx.json({ missingElements: [], messages: [{ type: "Error", message: "Bad code." }] }));
		}

		if (body.code === "correct-code") {
			return res(ctx.status(200), ctx.json({ missingElements: [], messages: [] }));
		}
	}),
];

const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
		logger: {
			log: console.log,
			warn: console.warn,
			error: () => {},
		},
	});

export function renderWithClient(ui: React.ReactElement) {
	const testQueryClient = createTestQueryClient();
	const { rerender, ...result } = render(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>);
	return {
		...result,
		rerender: (rerenderUi: React.ReactElement) =>
			rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
	};
}

export function createWrapper() {
	const testQueryClient = createTestQueryClient();
	// eslint-disable-next-line react/display-name
	return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>;
}

import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { handlers, renderWithClient } from "../../../utils/testUtilities";
import CodeForm from "./CodeForm";

export const server = setupServer(...handlers);

let originalGtag: any;

beforeAll(() => {
	server.listen();
});

beforeEach(() => {
	originalGtag = window.gtag;
	window.gtag = jest.fn();
});

afterEach(() => {
	server.resetHandlers();
	window.gtag = originalGtag;
});

afterAll(() => {
	server.close();
});

describe("Code form", () => {
	test("if the submitted code is missing an element, display an appropriate message", async () => {
		const user = userEvent.setup();

		let result: any;

		await act(() => {
			result = renderWithClient(<CodeForm section="section" question="question" />);
		});

		const button = result.getByRole("button");
		const textarea = result.getByRole("textbox");

		expect(button).toBeDisabled();

		await act(() => {
			textarea.focus();
			user.paste("missing-element");
		});

		expect(button).toBeEnabled();

		await act(async () => {
			user.click(button);
		});

		expect(await result.findByText(/Your code is missing the following:/i)).toBeInTheDocument();
		expect(await result.findByText(/The variable./i)).toBeInTheDocument();
		expect(window.gtag).toBeCalledTimes(1);
	});

	test("if the submitted code is incorrect, display an appropriate message", async () => {
		const user = userEvent.setup();

		let result: any;

		await act(() => {
			result = renderWithClient(<CodeForm section="section" question="question" />);
		});

		const button = result.getByRole("button");
		const textarea = result.getByRole("textbox");

		await act(() => {
			textarea.focus();
			user.paste("incorrect-code");
		});

		await act(async () => {
			user.click(button);
		});

		expect(await result.findByText(/Bad code./i)).toBeInTheDocument();
		expect(window.gtag).toBeCalledTimes(1);
	});

	test("if the submitted code is correct, display a success message", async () => {
		const user = userEvent.setup();
		let result: any;
		await act(() => {
			result = renderWithClient(<CodeForm section="section" question="question" />);
		});

		await act(() => {
			result.getByRole("textbox").focus();
		});

		await act(() => {
			user.paste("correct-code");
		});

		await act(async () => {
			user.click(await result.findByRole("button"));
		});

		expect(await result.findByText(/Correct/i)).toBeInTheDocument();
		expect(window.gtag).toBeCalledTimes(1);
	});

	test("if the code check post fails, show an error message", async () => {
		const user = userEvent.setup();

		server.use(
			rest.post("*", (req: any, res: any, ctx: any) => {
				console.log("WWWWW");
				return res(ctx.status(500));
			})
		);

		let result: any;

		await act(() => {
			result = renderWithClient(<CodeForm section="section" question="question" />);
		});

		await act(() => {
			result.getByRole("textbox").focus();
		});

		await act(() => {
			user.paste("some-code");
		});

		expect(await result.findByRole("button")).toBeEnabled();

		await act(async () => {
			await user.click(await result.findByRole("button"));
			console.log("WAS CLICKED");
		});

		expect(await result.findByText(/An error occurred/i)).toBeInTheDocument();

		// TODO: why does onError in the useQuery hook fire twice
		expect(window.gtag).toBeCalledTimes(2);
	});
});

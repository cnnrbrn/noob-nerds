import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { handlers, renderWithClient } from "../../../utils/testUtilities";
import ExampleAnswer from "./ExampleAnswer";
import Answer from "./Answer";

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

describe("Example answer", () => {
	test("the show answer and hide answer buttons are toggled", async () => {
		const user = userEvent.setup();

		const result = renderWithClient(<ExampleAnswer section="section" question="question" />);

		let showAnswerButton = result.getByRole("button", {
			name: /Get example answer/i,
		});

		expect(showAnswerButton).toBeInTheDocument();

		await user.click(showAnswerButton);

		const hideAnswerButton = await result.findByRole("button", {
			name: /Clear answer/i,
		});

		expect(showAnswerButton).not.toBeInTheDocument();
		expect(hideAnswerButton).toBeInTheDocument();

		await user.click(hideAnswerButton);

		showAnswerButton = await result.findByRole("button", {
			name: /Get example answer/i,
		});

		expect(showAnswerButton).toBeInTheDocument();
		expect(hideAnswerButton).not.toBeInTheDocument();
	});

	test("if the answer is fetched, the answer is shown", async () => {
		const result = renderWithClient(<Answer section="section" question="question" />);

		expect(await result.findByText(/Answer HTML/i)).toBeInTheDocument();

		expect(window.gtag).toBeCalledTimes(1);
	});

	test("if the answer fetch fails, show the error message", async () => {
		server.use(
			rest.get("*/section/question", (req: any, res: any, ctx: any) => {
				return res(ctx.status(500));
			})
		);

		const result = renderWithClient(<Answer section="section" question="question" />);

		expect(await result.findByText(/Could not fetch the answer/i)).toBeInTheDocument();

		// TODO: why does onError in the useMutation hook fire twice
		expect(window.gtag).toBeCalledTimes(2);
	});
});

import { isActiveLink } from "./layoutUtilities";

describe("layout utility functions", () => {
	test("isActiveLink returns false when not an active link", () => {
		expect(isActiveLink("/javascript/objects/intro", "/")).toBe(false);
	});

	test("isActiveLink returns true when an active link", () => {
		expect(isActiveLink("/javascript/objects/intro", "/javascript/objects/object-with-properties")).toBe(true);
	});
});

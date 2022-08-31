import { getFileNameFromSlug } from "./contentUtilities";
import { bannedFileNames } from "../constants/misc";

describe("content utility functions", () => {
	test("getFileNameFromSlug returns an empty string if passed a string rather than an array", () => {
		expect(getFileNameFromSlug("string")).toBe("");
	});

	test("getFileNameFromSlug returns an empty string if the slug contains a banned name", () => {
		const randomBannedWord = bannedFileNames[Math.floor(Math.random() * bannedFileNames.length)];
		const slug = [randomBannedWord];
		expect(getFileNameFromSlug(slug)).toBe("");
	});

	test("getFileNameFromSlug returns correct file name created from a slug", () => {
		const slug = ["a", "b", "c"];
		const fileName = "a/b/c.md";
		expect(getFileNameFromSlug(slug)).toBe(fileName);
	});
});

import { bannedFileNames } from "../constants/misc";

export function getFileNameFromSlug(slug: string | String[] | undefined): string {
	if (typeof slug === "string" || typeof slug == "undefined") {
		return "";
	}

	let file = slug.join("/") + ".md";

	if (bannedFileNames.some((fileName) => file.toLowerCase().includes(fileName.toLowerCase()))) {
		file = "";
	}

	return file;
}

export function createTitleAndContentFromRepoDoc(repoContent: string): [string, string] {
	const navPosition = repoContent.indexOf("<nav>");

	let nav = "";

	if (navPosition !== -1) {
		nav = repoContent.substring(repoContent.indexOf("<nav>"), repoContent.indexOf("</nav>") + 6);
		nav = nav.replace("<nav>", '<nav class="top">') + "\n\n";
	}

	const title = repoContent
		.substring(repoContent.indexOf("# ") + 2, repoContent.indexOf("\n"))
		.replace(/`/g, "")
		.trim();

	const content = nav + repoContent;

	return [title, content];
}

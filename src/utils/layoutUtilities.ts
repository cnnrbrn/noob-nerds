export function isActiveLink(href: string, currentPath: string): boolean {
	if (currentPath.split("/").length === 2) {
		return href === currentPath;
	}
	return href.split("/")[2] === currentPath.split("/")[2];
}

import { Alert } from "@chakra-ui/react";

interface Props {
	missing: Array<String>;
}

export default function MissingElements({ missing }: Props) {
	if (missing && missing.length === 0) {
		return null;
	}

	return (
		<>
			<Alert status="error" variant="top-accent">
				Your code is missing the following:
			</Alert>
			{missing &&
				missing.map((item, i) => (
					<Alert status="error" variant="solid" key={i} fontSize="1.1rem">
						The {item}
					</Alert>
				))}
		</>
	);
}

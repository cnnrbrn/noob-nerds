import { Alert, Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import CheckingIndicator from "../response/CheckingIndicator";
import useAnswer from "../../../query-hooks/useAnswer";

interface Props {
	section: string;
	question: string;
}

export default function Answer({ section, question }: Props) {
	const backgroundColour = useColorModeValue("teal.50", "teal.900");

	const answer = useAnswer(section, question);

	if (answer.isError) {
		return (
			<Alert status="error" variant="top-accent">
				Could not fetch the answer
			</Alert>
		);
	}

	if (answer.isLoading) {
		return <CheckingIndicator label="Getting..." />;
	}

	return (
		<Box as="pre" bg={backgroundColour}>
			<Box as="code" bg="transparent" className="hljs language-js" dangerouslySetInnerHTML={{ __html: answer.data }} />
		</Box>
	);
}

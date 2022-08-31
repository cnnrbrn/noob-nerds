import { Box, Progress } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

interface Props {
	label?: string;
}

export default function CheckingIndicator({ label }: Props) {
	return (
		<Box width="100%">
			<Box bg={useColorModeValue("gray.100", "gray.900")} p={2}>
				{label ?? "Checking..."}
			</Box>
			<Progress size="xs" isIndeterminate />
		</Box>
	);
}

import { Alert, AlertIcon } from "@chakra-ui/react";

export default function SuccessMessage() {
	return (
		<Alert status="success" variant="solid">
			<AlertIcon />
			Correct
		</Alert>
	);
}

import { Alert } from "@chakra-ui/react";

interface Props {
	messages: Array<{ type: String; message: String }>;
}

export default function Messages({ messages }: Props) {
	if (messages && messages.length === 0) {
		return null;
	}

	const errorMessages = messages ? messages.filter((message) => message.type === "Error") : [];
	const warningMessages = messages ? messages.filter((message) => message.type === "Warning") : [];

	return (
		<>
			{errorMessages.length > 0 ? (
				<>
					{errorMessages.map((item, i) => (
						<Alert status="error" variant="solid" key={i} mb={1} fontSize="1.1rem">
							{item.message}
						</Alert>
					))}
				</>
			) : null}

			{warningMessages.length > 0 ? (
				<Alert status="warning" variant="solid" fontSize="1.1rem">
					{warningMessages.map((item, i) => (
						<div key={i}>{item.message}</div>
					))}
				</Alert>
			) : null}
		</>
	);
}

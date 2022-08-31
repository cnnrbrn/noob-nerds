import { Button } from "@chakra-ui/react";

interface Props {
	disabled: boolean;
	sending: boolean;
	handleClick: () => void;
}

export default function CheckCodeButton({ disabled, sending, handleClick }: Props) {
	return (
		<Button borderRadius="4px 0 0 0" disabled={disabled} onClick={handleClick} position="absolute" bottom={0} variant="code-checker">
			{!sending ? "Check" : "Checking..."}
		</Button>
	);
}

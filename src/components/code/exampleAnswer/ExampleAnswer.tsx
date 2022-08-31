import React, { useState } from "react";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Answer from "./Answer";
import ErrorBoundary from "../../layout/ErrorBoundary";

interface Props {
	section: string;
	question: string;
}

export default function ExampleAnswer({ section, question }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	function toggleOpen() {
		setIsOpen(!isOpen);
	}

	return (
		<Flex direction="column" align="flex-start">
			<>
				{!isOpen ? (
					<Button onClick={toggleOpen} colorScheme="teal" size="sm" mt="3">
						Get example answer
					</Button>
				) : (
					<Flex align="center" width="100%" justifyContent="space-between" mt="5" mb="2">
						<Box>Example answer</Box>
						<IconButton onClick={toggleOpen} size="sm" aria-label="Clear answer" icon={<CloseIcon />} />
					</Flex>
				)}

				{isOpen && <Answer section={section} question={question} />}
			</>
		</Flex>
	);
}

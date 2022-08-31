import React, { useState, useEffect } from "react";
import { Box, Flex, Alert, AlertIcon } from "@chakra-ui/react";
import Editor from "./Editor";
import CheckingIndicator from "../response/CheckingIndicator";
import CheckCodeButton from "./CheckCodeButton";
import useCheckCode from "../../../query-hooks/useCheckCode";
import CodeCheckResponse from "./CodeCheckResponse";

interface Props {
	section: string;
	question: string;
	height?: string;
}

export default function CodeForm({ section, question, height = "100" }: Props) {
	const [buttonEnabled, setButtonEnabled] = useState(false);
	const [code, setCode] = useState("");

	const mutation = useCheckCode(`${section}_${question}`);

	function handleCodeChange(code: string): void {
		const enableButton = code.trim().length > 0;
		setButtonEnabled(enableButton);
		setCode(code);
	}

	useEffect(() => {
		if (mutation.isSuccess || mutation.isError) {
			setButtonEnabled(false);
		}
	}, [mutation.isSuccess, mutation.isError]);

	return (
		<Box mb={4} mt={1}>
			<Flex direction="column" align="flex-end" position="relative">
				<Editor handleChange={handleCodeChange} value={code} id={question} height={height} />
				<CheckCodeButton
					disabled={!buttonEnabled || mutation.isLoading}
					handleClick={() => mutation.mutate({ section, question, code })}
					sending={mutation.isLoading}
				/>
			</Flex>

			{mutation.isLoading ? (
				<CheckingIndicator />
			) : (
				<>
					{mutation.isError ? (
						<Alert status="error">
							<AlertIcon />
							An error occurred
						</Alert>
					) : mutation.isSuccess ? (
						<CodeCheckResponse
							missingElements={mutation.data.missingElements}
							messages={mutation.data.messages}
							hasChecked={true}
							section={section}
							question={question}
						/>
					) : null}
				</>
			)}
		</Box>
	);
}

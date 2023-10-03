import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as gtag from "../lib/gtag";
import { BASE_CODE_CHECKER_URL } from "../constants/services";
import { CODE_CHECK, CODE_CHECK_ERROR, JAVASCRIPT } from "../constants/ga";

interface CodeBody {
	section: string;
	question: string;
	code: string;
}

async function sendCode(body: CodeBody) {
	gtag.event({ action: CODE_CHECK, category: JAVASCRIPT, label: body.section, value: body.question });
	const { data } = await axios.post(BASE_CODE_CHECKER_URL, body);

	return data;
}

export default function useCheckCode(label: string) {
	const queryClient = useQueryClient();

	return useMutation((body: CodeBody) => sendCode(body), {
		retry: false,
		onSuccess: (data) => queryClient.setQueryData([label], data),
		onError: (error) => {
			console.log("error", error);
			const err = error as Error | AxiosError;
			gtag.event({ action: CODE_CHECK_ERROR, category: JAVASCRIPT, label, value: err.message });
		},
	});
}

import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import * as gtag from "../lib/gtag";
import { BASE_CODE_CHECKER_URL } from "../constants/services";
import { EXAMPLE_ANSWER, EXAMPLE_ANSWER_ERROR, JAVASCRIPT } from "../constants/ga";

async function getAnswer(section: string, question: string) {
	gtag.event({ action: EXAMPLE_ANSWER, category: JAVASCRIPT, label: section, value: question });
	const { data } = await axios.get(`${BASE_CODE_CHECKER_URL}${section}/${question}`);
	return data;
}

export default function useAnswer(section: string, question: string) {
	return useQuery(["exampleAnswer", question], () => getAnswer(section, question), {
		refetchOnMount: false,
		retry: false,
		onError: (error) => {
			const err = error as Error | AxiosError;
			gtag.event({ action: EXAMPLE_ANSWER_ERROR, category: JAVASCRIPT, label: section + "_" + question, value: err.message });
		},
	});
}

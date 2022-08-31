import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface QuestionAnswer {
	question: string;
	answer: string;
}

interface AnswerState {
	currentAnswers: QuestionAnswer[];
}

const initialState: AnswerState = { currentAnswers: [] };

const answersSlice = createSlice({
	name: "answers",
	initialState,
	reducers: {
		storeAnswer(state, action: PayloadAction<QuestionAnswer>) {
			const questionIndex = state.currentAnswers.findIndex((qa) => qa.question === action.payload.question);
			if (questionIndex) {
				state = state;
			} else {
				state.currentAnswers.push(action.payload);
			}
		},
	},
});

export const selectCurrentAnswer = (question: string) => (state: RootState) => {
	const questionAnswer = state.answers.currentAnswers.find((qa) => qa.question === question);
	if (questionAnswer) {
		return questionAnswer.answer;
	}
	return "";
};

export const { storeAnswer } = answersSlice.actions;
export default answersSlice.reducer;

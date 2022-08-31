import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface LayoutState {
	contentWidth: number;
}

const initialState: LayoutState = { contentWidth: 2 };

const layoutSlice = createSlice({
	name: "layout",
	initialState,
	reducers: {
		changeContentWidth(state, action: PayloadAction<number>) {
			state.contentWidth = action.payload;
		},
	},
});

export function selectRawContentWidth(state: RootState): number {
	return state.layout.contentWidth;
}

export function selectContentWidth(state: RootState): string {
	switch (state.layout.contentWidth) {
		case 0:
			return "60ch";
		case 1:
			return "75ch";
		case 2:
			return "90ch";
		case 3:
			return "105ch";
		case 4:
			return "120ch";
		default:
			return "60ch";
	}
}

export const { changeContentWidth } = layoutSlice.actions;
export default layoutSlice.reducer;

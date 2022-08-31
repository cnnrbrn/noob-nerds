import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { changeContentWidth } from "../../state/features/layoutSlice";
import { selectRawContentWidth } from "../../state/features/layoutSlice";

export default function ContentWidthSlider() {
	const dispatch = useAppDispatch();
	const width = useAppSelector(selectRawContentWidth);

	return (
		<Slider
			display={{ base: "none", md: "block" }}
			aria-label="content width slider"
			colorScheme="gray"
			defaultValue={width}
			min={0}
			max={4}
			step={1}
			minW="16"
			mr="3"
			onChange={(val) => dispatch(changeContentWidth(val))}
		>
			<SliderTrack>
				<SliderFilledTrack />
			</SliderTrack>
			<SliderThumb />
		</Slider>
	);
}

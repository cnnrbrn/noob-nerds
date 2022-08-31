import { Container } from "@chakra-ui/react";
import { useAppSelector } from "../../state/hooks";
import { selectContentWidth } from "../../state/features/layoutSlice";

interface Props {
	children: React.ReactNode;
}

export default function ContentContainer({ children }: Props) {
	const width = useAppSelector(selectContentWidth);

	return (
		<Container p={4} maxWidth={`${width}`}>
			{children}
		</Container>
	);
}

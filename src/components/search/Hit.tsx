import { Box, useTheme, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import CustomSnippet from "./CustomSnippet";

export default function Hit({ hit }: { hit: any }) {
	const theme = useTheme();

	return (
		<Link href="/[...slug]" as={hit.objectID} passHref>
			<a>
				<Box
					mb="0.5rem"
					p="1em"
					background={useColorModeValue("gray.100", "black")}
					_hover={{ bg: useColorModeValue("gray.50", "gray.800") }}
				>
					<Box
						fontWeight={600}
						color={useColorModeValue("pink.500", "pink.500")}
						sx={{
							mark: {
								background: `${theme.colors.pink[100]}`,
								color: "black",
								padding: "2px 4px",
							},
						}}
					>
						<CustomSnippet attribute="title" hit={hit} />
					</Box>
					<Box
						sx={{
							mark: {
								background: `${theme.colors.pink[100]}`,
								color: "black",
								padding: "2px 4px",
							},
						}}
					>
						{/* <CustomSnippet attribute="content" hit={hit} removeText={hit.title} /> */}
						<CustomSnippet attribute="content" hit={hit} />
					</Box>
				</Box>
			</a>
		</Link>
	);
}

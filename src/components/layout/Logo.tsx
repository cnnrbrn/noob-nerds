import { Link, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Logo() {
	return (
		<NextLink href="/" passHref>
			<Link
				fontSize="2xl"
				fontFamily="'Odor Mean Chey', sans-serif"
				fontWeight="bold"
				color={useColorModeValue("pink.500", "pink.500")}
				_hover={{ textDecoration: "none" }}
			>
				noob nerds
			</Link>
		</NextLink>
	);
}

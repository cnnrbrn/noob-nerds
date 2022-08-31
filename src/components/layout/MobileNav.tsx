import { Flex, FlexProps, Text, HStack, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import ColourModeSwitch from "./ColourModeSwitch";
import ContentWidthSlider from "./ContentWidthSlider";
import Logo from "./Logo";

interface Props extends FlexProps {
	onOpen: () => void;
}

export default function MobileNav({ onOpen, ...rest }: Props) {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}
		>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Text display={{ base: "flex", md: "none" }}>
				<Logo />
			</Text>

			<HStack spacing={{ base: "0", md: "6" }} alignItems="center" justifyContent="flex-end">
				<Flex>
					{/* <ContentWidthSlider /> */}
					<ColourModeSwitch />
				</Flex>
			</HStack>
		</Flex>
	);
}

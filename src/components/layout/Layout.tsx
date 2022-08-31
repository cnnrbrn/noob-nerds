import React, { ReactNode } from "react";
import { Box, useColorModeValue, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import ContentContainer from "./ContentContainer";
import MobileNav from "./MobileNav";
import SidebarContent from "./SidebarContent";

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
			<SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>

			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="1" bg={useColorModeValue("white", "transparent")}>
				<ContentContainer>{children}</ContentContainer>
			</Box>
		</Box>
	);
}

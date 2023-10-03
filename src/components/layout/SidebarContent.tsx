import { Box, BoxProps, CloseButton, Flex, Link, useColorModeValue } from "@chakra-ui/react";
import NavItem from "./NavItem";
import NextLink from "next/link";
import { IconType } from "react-icons";
import { FiSearch } from "react-icons/fi";
import Logo from "./Logo";

interface LinkItemProps {
	name: string;
	icon?: IconType;
	path: string;
}
const LinkItems: Array<LinkItemProps> = [
	// { name: "Search", icon: FiSearch, path: "/search" },
	{ name: "Introduction to objects", icon: FiSearch, path: "/javascript/objects/introduction/index" },
];

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

export default function SidebarContent({ onClose, ...rest }: SidebarProps) {
	return (
		<Box
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Logo />
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link) => (
				<NextLink key={link.name} href={link.path} passHref>
					<NavItem icon={link.icon} href={link.path}>
						{link.name}
					</NavItem>
				</NextLink>
			))}
		</Box>
	);
}

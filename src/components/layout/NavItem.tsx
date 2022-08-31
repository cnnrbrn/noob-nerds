import { Flex, FlexProps, Icon, Link, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { forwardRef } from "react";
import { IconType } from "react-icons";
import { isActiveLink } from "../../utils/layoutUtilities";

interface Props extends FlexProps {
	icon?: IconType;
	href: string;
	children: string;
}

const NavItem = forwardRef(({ icon, href, children, ...rest }: Props, ref) => {
	const router = useRouter();
	const inactiveColour = useColorModeValue("gray.600", "gray.400");

	return (
		<Link href={href} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
			<Flex
				align="center"
				p="2"
				m="2"
				marginTop="1"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				color={isActiveLink(href, router.asPath) ? "default" : inactiveColour}
				_hover={{
					bg: "gray.600",
					color: "white",
				}}
				_before={{
					content: '" "',
					display: "inline-block",
					background: isActiveLink(href, router.asPath) ? "pink.500" : "transparent",
					width: "7px",
					height: "7px",
					borderRadius: "100%",
					marginRight: "8px",
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="2"
						fontSize="16"
						_groupHover={{
							color: "white",
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
});
NavItem.displayName = "NavItem";

export default NavItem;

import { extendTheme, withDefaultColorScheme, theme as baseTheme, type ThemeConfig } from "@chakra-ui/react";
import type { Styles, GlobalStyleProps } from "@chakra-ui/theme-tools";
import { mode } from "@chakra-ui/theme-tools";

const colourConfig: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

const components = {
	Button: {
		variants: {
			"code-checker": {
				bg: "pink.600",
				color: "white",
			},
		},
	},
};

const styles = {
	global: (props: GlobalStyleProps) => ({
		h6: {
			background: "gray.600",
			color: "white",
		},
		"h6 + p": {
			background: mode("gray.200", "gray.700")(props),
		},
		"h6 + p + ul": {
			background: mode("gray.200", "gray.700")(props),
		},
		"h6 + p + ul + pre > code.hljs": {
			background: mode("gray.200", "gray.700")(props),
		},
		"h6 + p + pre > code.hljs": {
			padding: "1em 1em 1em 1em",
			background: mode("gray.200", "gray.700")(props),
		},
		code: {
			color: mode("pink.500", "blue.300")(props),
		},
		nav: {
			borderTopColor: mode("gray.200", "gray.700")(props),
		},
		".content nav a": {
			color: mode("gray.600", "gray.400")(props),
		},
		"nav a:hover": {
			color: mode("gray.900", "white")(props),
		},
		".content a": {
			color: mode("gray.700", "white")(props),
		},
		".hljs": {
			background: mode("blue.50", "#232a38")(props),
			color: mode("gray.600", "gray.200")(props),
		},
		".hljs-keyword": {
			color: mode("pink.500", "pink.300")(props),
		},
		".hljs-string": {
			color: mode("green.600", "green.200")(props),
		},
		".hljs-number": {
			color: mode("purple.600", "purple.300")(props),
		},
		".hljs-literal": {
			color: mode("green.800", "green.400")(props),
		},
		".hljs-attr": {
			color: mode("orange.800", "yellow.500")(props),
		},
	}),
};

export const themeConfig = {
	colourConfig,
	components,
	colors: {
		primary: baseTheme.colors.gray,
		pink: {
			50: "#FDE8EF",
			100: "#F9BED2",
			200: "#F594B5",
			300: "#F06A98",
			400: "#EC417B",
			500: "#E8175E",
			600: "#BA124B",
			700: "#8B0E38",
			800: "#5D0926",
			900: "#2E0513",
		},
	},
	styles,
};

export const theme = extendTheme(themeConfig, withDefaultColorScheme({ colorScheme: "primary" }));

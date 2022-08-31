import { IconButton, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export default function ColourModeSwitch() {
	const { colorMode, toggleColorMode } = useColorMode();

    const icon = colorMode === "light" ?  <MoonIcon /> : <SunIcon />;

    return <IconButton onClick={toggleColorMode} size="md" variant="ghost" aria-label="switch colour mode" icon={icon} />

}

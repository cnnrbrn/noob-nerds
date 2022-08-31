import AceEditor from "react-ace";
import { useColorModeValue } from "@chakra-ui/react";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-one_dark";

interface Props {
	handleChange: (value: string, event?: any) => void;
	value: string;
	id: string;
	height: string;
}

export default function Editor({ handleChange, value, id, height }: Props) {
	return (
		<AceEditor
			setOptions={{ useWorker: false }}
			mode="javascript"
			theme={useColorModeValue("solarized_light", "one_dark")}
			onChange={handleChange}
			value={value}
			name={id}
			editorProps={{ $blockScrolling: false }}
			width="100%"
			height={`${height}px`}
			fontSize={16}
			style={{ padding: "10px" }}
			showGutter={true}
			highlightActiveLine={true}
			showPrintMargin={false}
		/>
	);
}

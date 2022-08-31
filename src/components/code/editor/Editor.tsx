import dynamic from "next/dynamic";

const EditorWithNoSSR = dynamic(() => import("./AceEditor"), { ssr: false });

interface Props {
	handleChange: (value: string, event?: any) => void;
	value: string;
	id: string;
	height: string;
}

export default function Editor({ handleChange, value, id, height }: Props) {
	return <EditorWithNoSSR handleChange={handleChange} value={value} id={id} height={height} />;
}

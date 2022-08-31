import CodeForm from "../code/editor/CodeForm";

interface Props {
	children: string[];
}

export default function ContentForm({ children }: Props) {
	const values = children[0].split(" ");
	const section = values[1];
	const question = values[2];
	const height = values[3];

	return <CodeForm section={section} question={question} height={height} />;
}

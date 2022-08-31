import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import ContentForm from "./ContentForm";
import { GITHUB_ACCOUNT, REPO } from "../../constants/services";

const renderers = {
	del: (props: any) => <ContentForm {...props} />,
	a: (props: any) => {
		return (
			<Link href="/[...slug]" as={props.href}>
				<a className={props.className}>{props.children[0]}</a>
			</Link>
		);
	},
	p: ({ node, children }: { node: any; children: any }) => {
		if (node.children[0].type === "element") {
			return <div>{children}</div>;
		} else {
			return <p>{children}</p>;
		}
	},
};

interface MarkdownProps {
	content: string;
}

export default function Markdown({ content }: MarkdownProps) {
	return (
		<ReactMarkdown
			components={renderers}
			remarkPlugins={[remarkGfm]}
			rehypePlugins={[rehypeHighlight, rehypeRaw]}
			transformImageUri={(uri: string) => `${GITHUB_ACCOUNT}${REPO}/main${uri}`}
		>
			{content}
		</ReactMarkdown>
	);
}

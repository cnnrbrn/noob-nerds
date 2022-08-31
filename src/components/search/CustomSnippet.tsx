import { connectHighlight } from "react-instantsearch-dom";

interface Props {
	highlight: any;
	attribute: any;
	hit: any;
	removeText?: any;
}

function Snippet({ highlight, attribute, hit, removeText }: Props) {
	const parsedHit = highlight({
		highlightProperty: "_snippetResult",
		attribute,
		hit,
	});

	return (
		<span>
			{parsedHit.map((part: any, index: any) => {
				let value = part.value;

				if (removeText) {
					value = value.replace(removeText, "");
				}

				value = value.replace(/#/g, "").replace(/`/g, "");

				return part.isHighlighted ? <mark key={index}>{value}</mark> : <span key={index}>{value}</span>;
			})}
		</span>
	);
}

const CustomSnippet = connectHighlight(Snippet);

export default CustomSnippet;

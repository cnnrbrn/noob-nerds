import NextHead from "next/head";

const defaultDescription = "";

interface Props {
	title?: string;
	description?: string;
}

const Head = ({ title, description = defaultDescription }: Props) => (
	<NextHead>
		<title>{title ? `${title} | ` : ""}Noob Nerds</title>
		{/* <meta name="description" content={description || defaultDescription} /> */}
	</NextHead>
);

export default Head;

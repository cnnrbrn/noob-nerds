import { gql } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import Head from "../src/components/layout/Head";
import Markdown from "../src/components/content/Markdown";
import { REPO, REPO_OWNER, LOCAL_CONTENT_SERVER_URL } from "../src/constants/services";
import client from "../src/lib/apolloClient";
import { createTitleAndContentFromRepoDoc, getFileNameFromSlug } from "../src/utils/contentUtilities";
import Layout from "../src/components/layout/Layout";
import axios from "axios";

const gqlQuery = gql`
	query FileContent($repo: String!, $file: String!) {
		repository(owner: "${REPO_OWNER}", name: $repo) {
			object(expression: $file) {
				... on Blob {
					text
				}
			}
		}
	}
`;

interface Props {
	content?: string;
	title: string;
	error?: string;
}

export default function ContentPage({ content, title, error }: Props) {
	let htmlContent = <div>{error}</div>;

	if (content && !error) {
		const titleAndContent = createTitleAndContentFromRepoDoc(content);
		title = titleAndContent[0];
		htmlContent = <Markdown content={titleAndContent[1]} />;
	}

	return (
		<Layout>
			<Head title={title} />
			<div className="content">{htmlContent}</div>
		</Layout>
	);
}

export async function getServerSideProps({ query }: { query: any }) {
	let content = null;
	let title = "Page not found";
	let error = null;

	try {
		const file = getFileNameFromSlug(query.slug);

		if (process.env.NODE_ENV === "development") {
			const url = `${LOCAL_CONTENT_SERVER_URL}${file}`;
			const response = await axios.get(url);
			content = response.data;
		} else {
			const response = await client.query({
				query: gqlQuery,
				variables: { repo: REPO, file: `main:${file}` },
			});

			if (response?.data && response.data.repository.object) {
				content = response.data.repository.object.text;
			} else {
				error = "Page not found";
			}
		}
	} catch (err: any) {
		if (err instanceof ApolloError) {
			error = err.message;
		} else {
			error = err.toString();
		}
	}

	return {
		props: {
			content,
			title,
			error,
		},
	};
}

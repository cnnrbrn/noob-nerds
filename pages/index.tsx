import NextLink from "next/link";
import { Box, Heading, Link, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import Layout from "../src/components/layout/Layout";
import Head from "../src/components/layout/Head";

export default function Index() {
	return (
		<>
			<Head />
			<Layout>
				<Box w="100%" p={4}>
					<Heading as="h1" mb={3}>
						Noob Nerds
					</Heading>
					<Text mb={6}>Simple JavaScript explanations with automatically marked questions and example answers.</Text>
					<Heading mb={3} size="xl">
						Available sections
					</Heading>
					<UnorderedList>
						<ListItem>
							<NextLink href="/javascript/objects/introduction/index" passHref>
								<Link>Introduction to objects</Link>
							</NextLink>
						</ListItem>
					</UnorderedList>
				</Box>
			</Layout>
		</>
	);
}

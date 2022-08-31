import { Box, Heading } from "@chakra-ui/react";
import Head from "../src/components/layout/Head";
import Layout from "../src/components/layout/Layout";
import Search from "../src/components/search/Search";

export default function SearchPage() {
	return (
		<>
			<Head title="Search" />
			<Layout>
				<Box w="100%" p={4}>
					<Heading as="h1" fontWeight="normal" marginBottom="0.8em">
						Search
					</Heading>
					<Search />
				</Box>
			</Layout>
		</>
	);
}

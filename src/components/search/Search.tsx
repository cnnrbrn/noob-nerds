import { Box, useColorModeValue } from "@chakra-ui/react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, Hits, SearchBox, Configure } from "react-instantsearch-dom";
import Hit from "./Hit";
import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY, ALGOLIA_INDEX } from "../../constants/services";

console.log(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY, ALGOLIA_INDEX);

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);

const Searchbox = () => {
	return (
		<Box
			as={SearchBox}
			my={2}
			sx={{
				'input[type="search"]': {
					width: "calc(100% - 25px)",
					padding: "10px",
					borderWidth: "2px",
					borderStyle: "solid",
					borderColor: useColorModeValue("gray.300", "black"),
					borderRadius: "5px",
					background: useColorModeValue("gray.50", "gray.700"),
				},
				'[type="reset"]': {
					marginLeft: "10px",
				},
				path: {
					fill: useColorModeValue("gray.800", "gray.100"),
				},
			}}
		/>
	);
};

function Search() {
	return (
		<InstantSearch indexName={ALGOLIA_INDEX} searchClient={searchClient}>
			<Configure attributesToSnippet={["title", "content"]} />
			<Searchbox />
			<Hits hitComponent={Hit} />
		</InstantSearch>
	);
}

export default Search;

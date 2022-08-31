import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { CONTENT_SERVER_URL, GITHUB_TOKEN } from "../constants/services";

const oauth = { Authorization: "bearer " + GITHUB_TOKEN };

const link: any = createHttpLink({
	uri: CONTENT_SERVER_URL,
	headers: oauth,
	credentials: "same-origin",
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link,
});

export default client;

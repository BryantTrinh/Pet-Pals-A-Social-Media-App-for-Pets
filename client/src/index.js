import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';
import "./index.css";
import App from "./App";

const client = new ApolloClient({
  cache: new InMemoryCache({}),
  ssrMode: typeof window === 'undefined',
  link: createUploadLink({
    uri: "http://localhost:3000/graphql",
  }),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
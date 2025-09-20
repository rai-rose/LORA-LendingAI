import { ApolloClient, InMemoryCache,HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:5000/graphql", // This is temporary endpoint, will be changed in the future
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
import React from "react";
import { BrowserRouter } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import history from "./Routes/history";
import Router from "./Routes/Router";

import "./Assets/Styles/App.scss";

function App() {
  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_URI,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <>
      {/* <div className="container-background"> */}
      {/* <div className="container"> */}
      <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
        <BrowserRouter history={history}>
          <ApolloProvider client={client}>
            <Router />
          </ApolloProvider>
        </BrowserRouter>
      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
}

export default App;

import * as React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar.js";
import Profile from "./pages/Profile";
import ChatBox from "./components/ChatBox.js";
import Feed from './pages/Feed';
import Uploads from './components/Upload';
import UploadFile from "./components/UploadFile";

import AddPet from './pages/AddPet'

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth_token");
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

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar />
          <ChatBox />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/Feed' element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';

import { setContext } from 'apollo-link-context'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';

import App from './App';

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ``
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:5000'
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

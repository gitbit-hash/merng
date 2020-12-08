import React from 'react';
import ReactDOM from 'react-dom';

import { setContext } from 'apollo-link-context'

import typePolicies from './graphql/type-policies'
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

const cache = new InMemoryCache(typePolicies)

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';

import { setContext } from 'apollo-link-context'
import { createUploadLink } from 'apollo-upload-client'

import { AuthProvider } from './context/auth'

import typePolicies from './graphql/type-policies'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
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

const httpLink = createUploadLink({
  uri: 'http://localhost:5000/graphql'
})

const cache = new InMemoryCache(typePolicies)

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

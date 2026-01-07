import { GraphQLClient } from 'graphql-request';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to set auth token
export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
  graphqlClient.setHeader('Authorization', `Bearer ${token}`);
};

// Helper to get auth token
export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Helper to remove auth token
export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
  graphqlClient.setHeader('Authorization', '');
};

// Initialize token on client side
if (typeof window !== 'undefined') {
  const token = getAuthToken();
  if (token) {
    graphqlClient.setHeader('Authorization', `Bearer ${token}`);
  }
}

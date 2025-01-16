import { ApolloClient, InMemoryCache } from '@apollo/client';

const loginClient = new ApolloClient({
  uri: 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql',
  cache: new InMemoryCache(),
});

export default loginClient;

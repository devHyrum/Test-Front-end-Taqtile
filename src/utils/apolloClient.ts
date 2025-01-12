import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import authLink from '../middleware/authLink';

const httpLink = createHttpLink({
  uri: 'https://template-onboarding-node-sjz6wnaoia-uc.a.run.app/graphql',
});

const loginClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default loginClient;

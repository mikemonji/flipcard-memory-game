import Box from '@mui/material/Box';
import GamePage from './pages/GamePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from 'react-query';
import { ApolloProvider } from '@apollo/react-hooks';

import LandingPage from './pages/LandingPage';
import { authedApolloClient } from './apollo/apolloSetup';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={authedApolloClient()}>
        <Box>
          <Router>
            <Switch>
            
              <Route exact path='/play'>
                <GamePage />
              </Route>
              
              <Route exact path='/'>
                <LandingPage />
              </Route>

            </Switch>
          </Router>
        </Box>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
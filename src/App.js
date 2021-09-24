import { ApolloProvider } from '@apollo/client';
import { client } from './models/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Navbar from './layout/Navbar/Navbar';
import Dashboard from './layout/Dashboard/Dashboard';
import Match from './layout/Match/Match';
import MatchPublic from './layout/Match/MatchPublic';
import AccessPublic from './layout/AccessPublic/AccessPublic';
import Error from './components/Error/Error';

import './App.css';

library.add(fab, faArrowLeft);

function App() {
  return (
    <ApolloProvider client={client}>
      <Router basename={process.env.PUBLIC_URL}>
        <section className='container'>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route path='/match/:id' exact component={Match} />
            <Route path='/match/:id/public' exact component={MatchPublic} />
            <Route
              path='/acceso-publico/:accessID'
              exact
              component={AccessPublic}
            />
            <Route path='*' component={Error} />
          </Switch>
        </section>
      </Router>
    </ApolloProvider>
  );
}
export default App;

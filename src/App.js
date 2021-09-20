import './App.css';
import { ApolloProvider } from '@apollo/client';
import { client } from './models/client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

import Navbar from './layout/Navbar/Navbar';
import Dashboard from './layout/Dashboard/Dashboard';

library.add(fab);

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <section className='container'>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Dashboard} />
            {/*<Route path='/:team/:id' component={} />*/}
          </Switch>
        </section>
      </Router>
    </ApolloProvider>
  );
}

export default App;

import { ApolloProvider } from '@apollo/client';
import { client } from './models/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import Navbar from './layout/Navbar/Navbar';
import Dashboard from './layout/Dashboard/Dashboard';
import Match from './layout/Match/Match';
import MatchPublic from './layout/Match/MatchPublic';
import AccessPublic from './layout/AccessPublic/AccessPublic';
import AccessSuccess from './utils/Success/AccessSuccess';
import Page404 from './utils/Error/Page404';

import './App.css';

library.add(fab, faArrowLeft);

function App() {
  return (
    <ApolloProvider client={client}>
      <Router basename={process.env.PUBLIC_URL}>
        <section className='container'>
          <Navbar />
          <Routes>
            <Route path='/adminBFCFran' element={<Dashboard />} />
            <Route path='/match/:id' element={<Match />} />
            <Route path='/match/:id/public' element={<MatchPublic />} />
            <Route
              path='/acceso-publico/:accessID'
              element={<AccessPublic />}
            />
            <Route
              path='/acceso-publico/:accessID/access-success'
              element={<AccessSuccess />}
            />
            <Route path='*' element={<Page404 />} />
          </Routes>
        </section>
      </Router>
    </ApolloProvider>
  );
}
export default App;

import React, { useState } from 'react';
import Login from '../../components/Login/Login';
import NewTeam from '../../components/NewTeam/NewTeam';
import Teams from '../../components/Teams/Teams';
import NewMatch from '../../components/NewMatch/NewMatch';
import Matches from '../../components/Matches/Matches';

import './Dashboard.css';

const Dashboard = () => {
  const [User, setUser] = useState('');
  return User ? (
    <div className='dashboard-container'>
      <Login />
    </div>
  ) : (
    <div className='dashboard-container'>
      <section className='dashboard-actions'>
        <NewMatch />
        <NewTeam />
      </section>
      <section className='dashboard-main'>
        <h1>Proximos partidos</h1>
        <Matches />
      </section>
    </div>
  );
};

export default Dashboard;

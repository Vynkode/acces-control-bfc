import React, { useState, useRef } from 'react';
import Login from '../../components/Login/Login';
import NewTeam from '../../components/NewTeam/NewTeam';
import Teams from '../../components/Teams/Teams';
import NewMatch from '../../components/NewMatch/NewMatch';

import './Dashboard.css';

const Dashboard = () => {
  const [User, setUser] = useState('');
  return (
    <div className='dashboard-container'>{User ? <Login /> : <NewMatch />}</div>
  );
};

export default Dashboard;

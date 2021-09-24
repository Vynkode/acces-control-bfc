import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar no-print'>
      <div className='navbar-child navbar-logo'>
        Logo Basquet Femení Cornellà
      </div>
      <div className='navbar-child navbar-social'>
        <FontAwesomeIcon
          icon={['fab', 'instagram']}
          className='navbar-social--icon'
        />
        <FontAwesomeIcon
          icon={['fab', 'facebook-square']}
          className='navbar-social--icon'
        />
      </div>
    </div>
  );
};

export default Navbar;

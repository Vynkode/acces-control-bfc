import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../assets/images/logo_bfc.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar no-print'>
      <div className='navbar-child navbar-container-logo'>
        <img
          src={Logo}
          alt='Logo Basquet Femení Cornellà'
          className='navbar-logo'
        />{' '}
        BF Cornellà
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

import React from 'react';

import './Errors.css';

const Error = () => {
  return (
    <aside className='error-container'>
      <h3 className='error-message'>
        Lo sentimos ha ocurrido un error en nuestros servidores, vuelva a
        intentarlo mas tarde
      </h3>
    </aside>
  );
};

export default Error;

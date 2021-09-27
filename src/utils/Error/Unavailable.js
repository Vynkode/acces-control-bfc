import React from 'react';

import './Errors.css';

const Unavailable = () => {
  return (
    <aside className='error-container'>
      <h3 className='error-message'>
        Lo sentimos, el partido que esta buscando ya no esta disponible o se han
        agotado las entradas
      </h3>
    </aside>
  );
};

export default Unavailable;

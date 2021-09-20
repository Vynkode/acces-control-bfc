import React, { useRef } from 'react';

import './Login.css';

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();

  return (
    <section className='container-login'>
      <form className='form-login'>
        <header className='header-login'>Usuario</header>
        <article className='input-login email-login'>
          <label htmlFor='email'>Usuario: </label>
          <input
            type='email'
            id='email'
            ref={emailRef}
            placeholder='Escribe tu email'
          />
        </article>
        <article className='input-login password-login'>
          <label htmlFor='password'>Contraseña: </label>
          <input
            type='password'
            id='password'
            ref={passRef}
            placeholder='Password'
          />
        </article>
        <button
          className='btn-login'
          onClick={() => {
            console.log(emailRef.current.value);
          }}
        >
          Entrar
        </button>
      </form>
    </section>
  );
};

export default Login;

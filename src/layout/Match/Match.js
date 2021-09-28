import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Match.css';

const Match = ({ location }) => {
  const url = window.location.href;
  let { match } = location.state;
  if (match.homeTeam.genre === 'male')
    match = { ...match, homeTeam: { ...match.homeTeam, genre: 'Masculino' } };

  if (match.homeTeam.genre === 'female')
    match = { ...match, homeTeam: { ...match.homeTeam, genre: 'Femenino' } };

  console.log(url.split('match')[0]);
  return (
    <section className='match-container'>
      <Link to='/adminBFCFran' className='match-return-button'>
        <FontAwesomeIcon icon='arrow-left' />
      </Link>
      <article className='match-wrapper'>
        <div className='match-row'>
          <p>Fecha:</p>{' '}
          <p>
            {moment(match.date).format('DD/MM/YYYY')} -{' '}
            {moment(match.date).format('HH:mm')}
          </p>
        </div>
        <div className='match-row'>
          <p>Equipo Local:</p>
          <p>
            {match.homeTeam.name} {match.homeTeam.genre}
          </p>
        </div>
        <div className='match-row'>
          <p>Entradas Restantes Local:</p>
          <p>{match.homePublicCount}</p>
        </div>
        <div className='match-column'>
          <p>URL Local:</p>
          <p>
            {url.split('match')[0]}acceso-publico/
            {match.homeUrl}
          </p>
        </div>
        <div className='match-row'>
          <p>Equipo Visitante:</p>
          <p>{match.awayTeam}</p>
        </div>
        <div className='match-row'>
          <p>Entradas Restantes Local:</p>
          <p>{match.awayPublicCount}</p>
        </div>
        <div className='match-column'>
          <p>URL Visitante:</p>
          <p>
            {url.split('match')[0]}acceso-publico/
            {match.awayUrl}
          </p>
        </div>
        <Link
          to={{ pathname: `/match/${match._id}/public`, state: { match } }}
          style={{ textDecoration: 'none', textAlign: 'center' }}
        >
          <button className='match-button'>Listado Acompañantes</button>
        </Link>
      </article>
    </section>
  );
};

export default Match;

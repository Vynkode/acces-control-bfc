import React from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { Link } from 'react-router-dom';

// STYLES
import './MatchCard.css';

const MatchCard = ({ cStyle, match }) => {
  if (match.homeTeam.genre === 'male')
    match = { ...match, homeTeam: { ...match.homeTeam, genre: 'Masculino' } };

  if (match.homeTeam.genre === 'female')
    match = { ...match, homeTeam: { ...match.homeTeam, genre: 'Femenino' } };

  return (
    match && (
      <article className={`match-card-container flex-column ${cStyle}`}>
        <div className='match-card-date'>
          <p>{moment(match.date).format('DD/MM/YY')}</p>
          <p style={{ textTransform: 'capitalize' }}>
            {moment(match.date).format('dddd')}
          </p>
          <p>{moment(match.date).format('HH:mm')}</p>
        </div>
        <div className='match-card-teams'>
          <p>
            {match.homeTeam.name} {match.homeTeam.genre}
          </p>
          <p
            style={{
              color: 'var(--accent-color)',
              fontSize: '0.7rem',
              fontWeight: 'bolder',
            }}
          >
            VS
          </p>
          <p>{match.awayTeam}</p>
        </div>
      </article>
    )
  );
};

export default MatchCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MATCH_BY_ID_PUBLIC } from '../../models/matchModel';

import './Match.css';

const MatchPublic = ({ location }) => {
  let { match } = location.state;
  const { data, loading, error } = useQuery(MATCH_BY_ID_PUBLIC, {
    variables: { id: match._id },
  });

  if (loading)
    return (
      <section className='match-container'>
        <p>Loading....</p>{' '}
      </section>
    );
  if (error)
    return (
      <section className='match-container'>
        <p>Ha ocurrido un error</p>{' '}
      </section>
    );

  const away = data.findMatchByID.awayPublic.data;
  const home = data.findMatchByID.homePublic.data;

  return (
    <section className='match-container gap-table'>
      <Link
        to={{ pathname: `/match/${match._id}`, state: { match } }}
        st
        className='match-return-button no-print'
      >
        <FontAwesomeIcon icon='arrow-left' />
      </Link>
      <button className='match-button no-print' onClick={() => window.print()}>
        Imprimir lista
      </button>
      <p>
        {match.homeTeam.name} {match.homeTeam.genre}{' '}
        <span style={{ color: 'var(--accent-color)' }}>vs</span>{' '}
        {match.awayTeam}
      </p>
      <table className='match-public-container gap-table'>
        <tr className='match-public-title'>
          <th colSpan={2}>
            {match.homeTeam.name} {match.homeTeam.genre}
          </th>
        </tr>
        <tbody>
          {home &&
            home.map((person, i) => {
              return (
                <tr key={i}>
                  <td className='match-row-name'>
                    {i}. {person.name}
                  </td>
                  <td>{person.dni}</td>
                </tr>
              );
            })}
        </tbody>
        <tr>
          <th colSpan={2}>{match.awayTeam}</th>
        </tr>
        <tbody>
          {away &&
            away.map((person, j) => {
              return (
                <tr key={j}>
                  <td className='match-row-name'>
                    {j}. {person.name}
                  </td>
                  <td>{person.dni}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default MatchPublic;

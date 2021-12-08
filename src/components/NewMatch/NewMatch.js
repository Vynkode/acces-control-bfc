import React, { useRef, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import cryptoRandomString from 'crypto-random-string';
import moment from 'moment';

import { ALL_MATCHES_GREATER_TODAY, NEW_MATCH } from '../../models/matchModel';
import { TEAMS } from '../../models/teamModel';
import './NewMatch.css';

const NewMatch = () => {
  const [isActive, setIsActive] = useState(false);
  const teamIdRef = useRef();
  const homePublic = useRef();
  const awayTeam = useRef();
  const awayPublic = useRef();
  const date = useRef();
  const time = useRef();

  const [
    getTeams,
    { data: teamsData, loading: loadingTeams, error: errorTeams },
  ] = useLazyQuery(TEAMS);
  const [newMatch, { data, loading, error, called }] = useMutation(NEW_MATCH, {
    refetchQueries: [{ query: ALL_MATCHES_GREATER_TODAY }],
  });

  const newTeamToggle = () => {
    if (!isActive) {
      console.log('get teams');
      getTeams();
    }
    setIsActive(!isActive);
  };

  const createNewMatch = (e) => {
    e.preventDefault();
    const datetime = moment(
      `${date.current.value} ${time.current.value}`,
      'YYYY-MM-DD HH:mm:ss.SSS Z'
    );
    newMatch({
      variables: {
        data: {
          date: datetime,
          awayPublicCount: Number(awayPublic.current.value),
          homePublicCount: Number(homePublic.current.value),
          awayTeam: awayTeam.current.value,
          homeTeam: { connect: teamIdRef.current.value },
          awayUrl: `${cryptoRandomString({
            length: 10,
            type: 'alphanumeric',
          })}${moment(datetime).format('DD-MM-YY')}${cryptoRandomString({
            length: 10,
            type: 'alphanumeric',
          })}`.replaceAll('-', ''),
          homeUrl: `${cryptoRandomString({
            length: 10,
            type: 'alphanumeric',
          })}${moment(datetime).format('DD-MM-YY')}${cryptoRandomString({
            length: 10,
            type: 'alphanumeric',
          })}`.replaceAll('-', ''),
        },
      },
    });
    setIsActive(false);
  };

  if (errorTeams) return <div>Error: {errorTeams}</div>;

  return (
    <div className='new-match-container'>
      <div className='new-match-title' onClick={newTeamToggle}>
        <div>Nuevo Partido</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive &&
        (loadingTeams ? (
          'Loading...'
        ) : (
          <form className='new-match-form-container'>
            <div className='new-match-date flex-column gap-column'>
              <label htmlFor='match-date'>Fecha</label>
              <input type='date' id='match-date' ref={date} />
              <input type='time' ref={time} />
            </div>
            <div className='new-match-home flex-column gap-column'>
              <p>Equipo B.F. Cornellà</p>
              <select name='select-teams' id='select-teams' ref={teamIdRef}>
                {teamsData &&
                  teamsData.teams.data.map((team, id) => {
                    if (team.genre === 'male')
                      team = { ...team, genre: 'Masculino' };
                    if (team.genre === 'female')
                      team = { ...team, genre: 'Femenino' };
                    return (
                      <option key={id} value={team._id}>
                        {team.name} {team.genre}
                      </option>
                    );
                  })}
              </select>
              <label htmlFor='awayTeam-public'>Limite publico BFC</label>
              <input type='number' id='awayTeam-public' ref={homePublic} />
            </div>
            <div className='new-match-away flex-column gap-column'>
              <label htmlFor='awayTeam'>Equipo Visitante</label>
              <input type='text' id='awayTeam' ref={awayTeam} />
              <label htmlFor='awayTeam-public'>Limite publico Visitante</label>
              <input type='number' id='awayTeam-public' ref={awayPublic} />
            </div>
            <div className='new-match-button-container'>
              <button className='new-match-button' onClick={createNewMatch}>
                Crear partido
              </button>
            </div>
          </form>
        ))}
    </div>
  );
};

export default NewMatch;

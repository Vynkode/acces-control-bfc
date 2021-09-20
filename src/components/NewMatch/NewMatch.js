import React, { useEffect, useRef, useState } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks';

import { NEW_MATCH } from '../../models/matchModel';
import { TEAMS } from '../../models/teamModel';
import './NewMatch.css';

const NewMatch = () => {
  const [isActive, setIsActive] = useState(false);
  const teamIdRef = useRef();
  const homePublic = useRef();
  const awayTeam = useRef();
  const awayPublic = useRef();

  const [
    getTeams,
    {
      data: teamsData,
      loading: loadingTeams,
      error: errorTeams,
      called: calledTeams,
    },
  ] = useLazyQuery(TEAMS);
  const [newMatch, { data, loading, error, called }] = useMutation(NEW_MATCH, {
    onCompleted: () => {
      console.log(data);
    },
  });

  const createNewMatch = (e) => {
    e.preventDefault();
    newMatch({
      variables: {
        data: {
          awayPublicCount: Number(awayPublic.current.value),
          homePublicCount: Number(homePublic.current.value),
          awayTeam: awayTeam.current.value,
          homeTeam: { connect: teamIdRef.current.value },
          awayUrl: '',
          homeUrl: '',
        },
      },
    });
  };

  // useEffect(() => {
  //   newMatch({
  //     variables: {
  //       data: {
  //         awayPublicCount: 20,
  //         homePublicCount: 20,
  //         awayTeam: 'Esplugues',
  //         homeUrl: '00310245586736513222',
  //         awayUrl: '01310245586736513222',
  //         homeTeam: { connect: '310245586736513222' },
  //       },
  //     },
  //   });
  // }, []);

  if (errorTeams) return <div>Error: {errorTeams}</div>;
  return (
    <div className='new-match-container'>
      <div
        className='new-match-title'
        onClick={() => {
          getTeams();
          setIsActive(!isActive);
        }}
      >
        <div>Nuevo Partido</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive &&
        (loadingTeams ? (
          'Loading'
        ) : (
          <form className='new-match-form-container flex-column'>
            <div className='new-team-homeTeam flex-column'>
              <p>Equipo B.F. Cornellà</p>
              <select name='select-teams' id='select-teams' ref={teamIdRef}>
                {teamsData &&
                  teamsData.teams.data.map((team, id) => {
                    if (team.genre === 'male')
                      team = { ...team, genre: 'Masculino' };
                    return (
                      <option key={id} value={team._id}>
                        {team.name} {team.genre}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className='flex-column'>
              <label htmlFor='awayTeam-public'>Limite publico BFC</label>
              <input type='number' id='awayTeam-public' ref={homePublic} />
            </div>
            <div className='flex-column'>
              <label htmlFor='awayTeam'>Equipo Visitante</label>
              <input
                type='text'
                id='awayTeam'
                ref={awayTeam}
                onChange={() => {
                  console.log(awayTeam.current.value);
                }}
              />
            </div>
            <div className='flex-column'>
              <label htmlFor='awayTeam-public'>Limite publico Visitante</label>
              <input
                type='number'
                id='awayTeam-public'
                ref={awayPublic}
                onChange={() => {
                  console.log(typeof awayPublic.current.value);
                }}
              />
            </div>
            <button onClick={createNewMatch}>Crear partido</button>
          </form>
        ))}
    </div>
  );
};

export default NewMatch;

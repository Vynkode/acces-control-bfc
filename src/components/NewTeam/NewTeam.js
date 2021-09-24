import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { NEW_TEAM, TEAMS } from '../../models/teamModel';

import './NewTeam.css';
import { ALL_MATCHES } from '../../models/matchModel';

const NewTeam = () => {
  const [showNewTeam, setShowNewTeam] = useState(false);
  const newTeamName = useRef('');
  const newGenre = useRef('');
  const successDiv = useRef();
  const [createTeam, { loading }] = useMutation(NEW_TEAM, {
    refetchQueries: [{ query: TEAMS }],
    onCompleted: () => {
      setShowNewTeam(false);
      successDiv.current.classList.add('new-team-success--active');
      setTimeout(() => {
        successDiv.current.classList.remove('new-team-success--active');
      }, 10000);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <aside className='new-team-container'>
      <div className='new-team-success' ref={successDiv}>
        Equipo creado
      </div>
      <div
        className='new-team-title'
        onClick={() => {
          setShowNewTeam(!showNewTeam);
        }}
      >
        <div>Nuevo Equipo</div>
        <div>{showNewTeam ? '-' : '+'}</div>
      </div>
      {showNewTeam && (
        <form className='new-team-form flex-column'>
          <div className='new-team-inputs'>
            <label htmlFor='new-team-name'>Nombre</label>
            <input type='text' ref={newTeamName} id='new-team-name' />
            <select name='gender' id='gender-select' ref={newGenre}>
              <option value='male'>Masculino</option>
              <option value='female'>Femenino</option>
            </select>
          </div>
          <div className='new-team-button-container'>
            <button
              className='new-team-button'
              onClick={(e) => {
                e.preventDefault();
                createTeam({
                  variables: {
                    data: {
                      name: newTeamName.current.value,
                      genre: newGenre.current.value,
                    },
                  },
                });
              }}
            >
              Crear
            </button>
          </div>
        </form>
      )}
    </aside>
  );
};

export default NewTeam;

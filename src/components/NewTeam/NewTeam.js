import React, { useRef, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { NEW_TEAM } from '../../models/teamModel';

import './NewTeam.css';

const NewTeam = () => {
  const [showForm, setShowForm] = useState(false);
  const newTeamName = useRef('');
  const newGenre = useRef('');
  const successDiv = useRef();
  const [createTeam, { loading }] = useMutation(NEW_TEAM, {
    onCompleted: () => {
      setShowForm(false);
      newTeamName.current.value = '';
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
      <form className='new-team-form'>
        <label htmlFor='new-team-name'>Nombre del equipo</label>
        <input type='text' ref={newTeamName} id='new-team-name' />
        <select name='gender' id='gender-select' ref={newGenre}>
          <option value='male'>Masculino</option>
          <option value='female'>Femenino</option>
        </select>
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
      </form>
    </aside>
  );
};

export default NewTeam;

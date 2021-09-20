import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { TEAMS } from '../../models/teamModel';

const Teams = () => {
  const { data, loading } = useQuery(TEAMS);
  if (loading) return <div>Loading....</div>;

  return (
    <div>
      <ul>
        {data.teams.data.map((team, id) => {
          return (
            <li key={id}>
              name: {team.name} genre: {team.genre}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Teams;

import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

// COMPONENTS
import MatchCard from './MatchCard';

// STYLES
import './Matches.css';

// GRAPHQL
import { ALL_MATCHES_GREATER_TODAY } from '../../models/matchModel';

const Matches = () => {
  const { data, loading, error } = useQuery(ALL_MATCHES_GREATER_TODAY);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className='matches-container'>
      {data.matchesGreaterToday.map((match, cardId) => {
        return (
          <Link
            to={{ pathname: `/match/${match._id}`, state: { match } }}
            style={{ textDecoration: 'none' }}
            key={cardId}
          >
            <MatchCard match={match} />
          </Link>
        );
      })}
    </div>
  );
};

export default Matches;

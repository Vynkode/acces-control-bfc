import React, { useRef } from 'react';
import moment, { now } from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';

import Error from '../../utils/Error/Error';
import Unavailable from '../../utils/Error/Unavailable';

import './AccessPublic.css';

import {
  MATCHES_BY_HOMEURL,
  MATCHES_BY_AWAYURL,
  UPDATE_MATCH,
} from '../../models/matchModel';
import {
  CREATE_AWAY_PERSON,
  CREATE_HOME_PERSON,
} from '../../models/personModel';
import MatchCard from '../../components/Matches/MatchCard';

const AccessPublic = () => {
  let history = useHistory();
  const { accessID } = useParams();
  const personName = useRef();
  const personDni = useRef();

  const {
    data: dataHome,
    loading: loadingHome,
    error: errorHome,
  } = useQuery(MATCHES_BY_HOMEURL, {
    variables: { homeUrl: accessID },
  });

  const {
    data: dataAway,
    loading: loadingAway,
    error: errorAway,
  } = useQuery(MATCHES_BY_AWAYURL, {
    variables: { awayUrl: accessID },
  });

  const [
    updateMatch,
    { data: dataUpdate, loading: loadingUpdate, error: errorUpdate },
  ] = useMutation(UPDATE_MATCH, {
    onCompleted: () => {
      history.push(`/acceso-publico/${accessID}/access-success`);
    },
    onError: (error) => {
      console.log(error);
      return <Error />;
    },
  });

  const [
    createHomePerson,
    { data: homePerson, loading: loadingHomePerson, error: errorHomePerson },
  ] = useMutation(CREATE_HOME_PERSON, {
    onCompleted: ({ createHomePerson: homePerson }) => {
      updateMatch({
        variables: {
          id: matchData._id,
          data: {
            date: matchData.date,
            homeUrl: matchData.homeUrl,
            homePublicCount: count - 1,
            awayTeam: matchData.awayTeam,
            awayUrl: matchData.awayUrl,
            awayPublicCount: matchData.awayPublicCount,
            homePublic: { connect: homePerson._id },
          },
        },
      });
    },
    onError: (error) => {
      console.log(error);
      return <Error />;
    },
  });

  const [
    createAwayPerson,
    { data: awayPerson, loading: loadingAwayPerson, error: errorAwayPerson },
  ] = useMutation(CREATE_AWAY_PERSON, {
    onCompleted: ({ createAwayPerson: awayPerson }) => {
      updateMatch({
        variables: {
          id: matchData._id,
          data: {
            date: matchData.date,
            homeUrl: matchData.homeUrl,
            homePublicCount: matchData.homePublicCount,
            awayTeam: matchData.awayTeam,
            awayUrl: matchData.awayUrl,
            awayPublicCount: count - 1,
            awayPublic: { connect: awayPerson._id },
          },
        },
      });
    },
    onError: (error) => {
      console.log(error);
      return <Error />;
    },
  });

  if (loadingHome || loadingAway)
    return (
      <section className='match-access-container flex-column'>
        <p>Loading...</p>
      </section>
    );

  const matchData = dataHome?.matchByHomeUrl || dataAway?.matchByAwayUrl;

  const date = matchData?.date;
  const pastDate = moment(date).isSameOrAfter(now());

  if (errorHome && errorAway) {
    return <Error />;
  }

  const home = !!dataHome;

  const count = home ? matchData?.homePublicCount : matchData?.awayPublicCount;

  if (!pastDate || count < 1) {
    return <Unavailable />;
  }

  const submitPerson = (e) => {
    e.preventDefault();
    if (home) {
      console.log(matchData);
      createHomePerson({
        variables: {
          data: {
            name: personName.current.value,
            dni: personDni.current.value,
            match: { connect: matchData._id },
          },
        },
      });
    }
    if (!home) {
      console.log(matchData);
      createAwayPerson({
        variables: {
          data: {
            name: personName.current.value,
            dni: personDni.current.value,
            match: { connect: matchData._id },
          },
        },
      });
    }
  };

  return (
    <section className='match-access-container flex-column'>
      <article className='match-access-wrapper'>
        <div>
          <p className='match-access-title'>
            Reserva equipo {home ? 'local' : 'visitante'}
          </p>
          <p className='match-access-count'>Entradas disponibles: {count}</p>
        </div>
        <MatchCard cStyle='no-link' match={matchData} />
        <p>Rellene el formulario para reservar su entrada como acompañante.</p>
        <form className='match-access-form'>
          <input
            type='text'
            placeholder='Nombre y apellidos'
            ref={personName}
          />
          <input type='text' placeholder='DNI' ref={personDni} />
          <button className='match-access-button' onClick={submitPerson}>
            Reservar
          </button>
        </form>
      </article>
    </section>
  );
};

export default AccessPublic;

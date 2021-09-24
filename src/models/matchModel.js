import gql from 'graphql-tag';

// QUERIES
export const ALL_MATCHES = gql`
  query GetAllMatches {
    matches {
      data {
        _id
        date
        homeTeam {
          _id
          name
          genre
        }
        homePublicCount
        homeUrl
        awayTeam
        awayPublicCount
        awayUrl
      }
    }
  }
`;

export const MATCH_BY_ID_PUBLIC = gql`
  query GetMatchById($id: ID!) {
    findMatchByID(id: $id) {
      awayPublic {
        data {
          name
          dni
        }
      }
      homePublic {
        data {
          name
          dni
        }
      }
    }
  }
`;

export const MATCHES_BY_HOMEURL = gql`
  query GetMatchByHomeURL($homeUrl: String!) {
    matchByHomeUrl(homeUrl: $homeUrl) {
      _id
      date
      awayPublicCount
      homePublicCount
      homeUrl
      awayUrl
      homeTeam {
        name
        genre
      }
      awayTeam
    }
  }
`;

export const MATCHES_BY_AWAYURL = gql`
  query GetMatchByAwayURL($awayUrl: String!) {
    matchByAwayUrl(awayUrl: $awayUrl) {
      _id
      date
      awayPublicCount
      homePublicCount
      homeUrl
      awayUrl
      homeTeam {
        name
        genre
      }
      awayTeam
    }
  }
`;

//MUTATIONS
export const NEW_MATCH = gql`
  mutation CreateMatch($data: MatchInput!) {
    createMatch(data: $data) {
      _id
      awayTeam
    }
  }
`;

export const UPDATE_MATCH = gql`
  mutation UpdateMatch($id: ID!, $data: MatchInput!) {
    updateMatch(id: $id, data: $data) {
      _id
    }
  }
`;

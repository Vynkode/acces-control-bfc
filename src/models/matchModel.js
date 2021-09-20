import gql from 'graphql-tag';

export const NEW_MATCH = gql`
  mutation CreateMatch($data: MatchInput!) {
    createMatch(data: $data) {
      _id
      awayTeam
    }
  }
`;

export const MATCHES = gql`
  query GetMatches {
    matches {
      data {
        _id
        name
        genre
      }
    }
  }
`;

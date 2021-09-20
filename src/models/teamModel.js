import gql from 'graphql-tag';

export const NEW_TEAM = gql`
  mutation CreateTeam($data: TeamInput!) {
    createTeam(data: $data) {
      _id
      name
      genre
    }
  }
`;

export const TEAMS = gql`
  query GetTeams {
    teams {
      data {
        _id
        name
        genre
      }
    }
  }
`;

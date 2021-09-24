import gql from 'graphql-tag';

// ** HOME PERSON ** //

// MUTATION
export const CREATE_HOME_PERSON = gql`
  mutation CreateHomePerson($data: HomePersonInput!) {
    createHomePerson(data: $data) {
      _id
      name
      dni
    }
  }
`;

// ** AWAY PERSON ** //

// MUTATION
export const CREATE_AWAY_PERSON = gql`
  mutation CreateAwayPerson($data: AwayPersonInput!) {
    createAwayPerson(data: $data) {
      _id
      name
      dni
    }
  }
`;

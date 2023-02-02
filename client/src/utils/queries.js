import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user {
    user {
      _id
      first_name
      last_name
      email
      location
    }
  }
`;

export const QUERY_PETS = gql`
  query pets {
    pets {
      _id: ID
      name: String
      species: String
      birthday: Date
      pictures: String
    }
  }
`;

export const QUERY_PET = gql`
  query pets {
    pets {
      _id: ID
      name: String
      species: String
      birthday: Date
      pictures: String
    }
  }
`;

export const QUERY_MATCH = gql`
  query matches {
  _id: ID
  pet1: String
  pet2: String
}
`

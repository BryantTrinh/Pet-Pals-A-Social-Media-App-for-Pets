import { gql } from "@apollo/client";

const QUERY_USER = gql`
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

const QUERY_PETS = gql`
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

const QUERY_PET = gql`
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

const QUERY_MATCH = gql`
  query matches {
  _id: ID
  pet1: String
  pet2: String
}
`

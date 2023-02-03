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

export const QUERY_OWNER = gql`
  query owner {
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
  query Pets {
    pets {
      _id
      name
      species
      birthday
      pictures
      owner
    }
  }
`;

export const QUERY_PET = gql`
  query pets {
    pets {
      _id
      name
      species
      birthday
      pictures
    }
  }
`;

export const QUERY_MATCH = gql`
  query matches {
    _id
    pet1
    pet2: String
  }
`;

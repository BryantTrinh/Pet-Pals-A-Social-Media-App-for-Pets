import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user {
    user {
      _id
      first_name
      last_name
      email
    }
  }
`;

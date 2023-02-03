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

export const QUERY_MYPETS = gql`
  query MyPets {
    myPets {
      _id
      name
      species
      birthday
      pictures
      owner
    }
  }
`;

export const QUERY_CHAT = gql`
  query getChat($roomId: String) {
    getChat(roomID: $roomId) {
      roomID
      messages {
        sender
        receiver
        message
        createdAt
      }
    }
  }
`;

import { gql, useMutation, useApolloClient } from "@apollo/client";

export const REGISTER_USER = gql`
	mutation register(
		$first_name: String!
		$last_name: String!
		$email: String!
		$password: String!
		$location: String!
	) {
		register(
			first_name: $first_name
			last_name: $last_name
			email: $email
			password: $password
			location: $location
		) {
			token
			user {
				_id
				first_name
				last_name
				email
				location
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				first_name
				last_name
				email
			}
		}
	}
`;

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout
  }
`;

export const ADD_PET = gql`
  mutation addPet(
    $name: String!
    $species: String!
    $birthday: Date!
    $pictures: String!
    $owner: ID
  ) {
    addPet(
      name: $name
      species: $species
      birthday: $birthday
      pictures: $pictures
      owner: $owner
    ) {
      _id
      name
      species
      birthday
      pictures
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation createChat($roomID: String) {
    createChat (roomID: $roomID) {
      roomID
      messages {
        sender
        receiver
        message
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage($roomID: String, $message: MessageInput) {
    addMessage (roomID: $roomID, message: $message) {
      roomID
      messages {
        sender
        receiver
        message
      }
    }
  }
`;

export function useLogoutMutation() {
  const [logout, { data, loading, error }] = useMutation(LOGOUT_MUTATION);

  return { logout, data, loading, error };
}

export const SINGLE_UPLOAD_MUTATION = gql`
	mutation singleUpload($file: Upload!) {
		singleUpload(file: $file) {
			filename
		}
	}
`;
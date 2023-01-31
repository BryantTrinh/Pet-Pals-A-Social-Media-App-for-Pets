import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const LOGOUT = gql`
	mutation Logout {
		logout
	}
`;

function LogoutForm() {
	const [logout, { data }] = useMutation(LOGOUT);
	const [isLoggedOut, setIsLoggedOut] = useState(false);

	useEffect(() => {
		if (data) {
			AuthService.logout();
			setIsLoggedOut(true);
		}
	}, [data]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		await logout();
	};

	if (isLoggedOut) {
		return <p>You have successfully logged out.</p>;
	}

	return (
		<form onSubmit={handleSubmit}>
			<button type="submit">Log Out</button>
		</form>
	);
}

export default LogoutForm;

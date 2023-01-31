import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button } from "@mui/material";

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
			localStorage.removeItem("token");
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
		<Button variant="outlined"
			sx={{
				color: "white",
				borderColor: "white",
				ml: "20px",
				"&:hover": {
					color: "#DE4567",
					borderColor: "#DE4567",
				}
			}}

		>
			Logout
		</Button>
	);
}

export default LogoutForm;

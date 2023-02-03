import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Button } from "@mui/material";
import auth from "../../utils/auth.js";

const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

function LogoutForm() {
  // const [logout, { data }] = useMutation(LOGOUT);
  // const [isLoggedOut, setIsLoggedOut] = useState(false);

  // useEffect(() => {
  //   if (data) {
  //     auth.logout();
  //     setIsLoggedOut(true);
  //   }
  // }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await auth.logout();
  };

  // if (isLoggedOut) {
  //   return <p>You have successfully logged out.</p>;
  // }

  return (
    <Button
      onClick={handleSubmit}
      variant="outlined"
      sx={{
        color: "white",
        borderColor: "white",
        ml: "20px",
        "&:hover": {
          color: "#DE4567",
          borderColor: "#DE4567",
        },
      }}
    >
      Logout
    </Button>
  );
}

export default LogoutForm;

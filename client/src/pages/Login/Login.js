import * as React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import {
  Grid,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

import Auth from "../../utils/auth.js";
import Register from "../Register";

function Login() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const [userLogin, { error, data }] = useMutation(LOGIN_USER);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("hi");
      const { data } = await userLogin({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.login.token);
      console.log("hi");
      console.log(Auth.getProfile());
    } catch (err) {
      window.alert("Unable to login. Please try again or register.");
      console.error(err);
    }
  };

  // Show sign up modal use state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          backgroundColor: "#F8F5F2",
        }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#F8F5F2",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#DE4567" }}>
            <PetsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LOG IN
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleFormSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formState.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formState.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#405C96" }}
            >
              LOG IN
            </Button>
            <Grid container>
              <Grid item>
                <Link onClick={handleOpen} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Register handleClose={handleClose} open={open} />
    </>
  );
}

export default Login;

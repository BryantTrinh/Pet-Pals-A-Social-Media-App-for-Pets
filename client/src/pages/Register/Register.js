import * as React from 'react';
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../utils/mutations";
import { Modal, Box, Typography, Grid, TextField, Button } from "@mui/material";

import Auth from "../../utils/auth.js";

function Register(props) {
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    location: "",
    email: "",
    password: "",
  });

  const [register, { error, data }] = useMutation(REGISTER_USER);

  const handleInputChange = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await register({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.register.token);
      window.location('/Feed')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // Sign up modal
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        "@media (max-width: 600px)": {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }
      }}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formState.first_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
                value={formState.last_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="location"
                label="Location"
                name="location"
                autoComplete="location"
                value={formState.location}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formState.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formState.password}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#405C96' }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default Register;

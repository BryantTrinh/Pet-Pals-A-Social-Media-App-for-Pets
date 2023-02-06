import * as React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Button,
  Grid,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CloudinaryUploadWidget from "../../components/UploadWidget";
import auth from "../../utils/auth";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { ADD_PET } from "../../utils/mutations";

const RecipeReviewCard = () => {
  const [pictureURL, setPictureURL] = React.useState("");
  const [formState, setFormState] = React.useState({
    pet_name: "",
    species: "",
    birthday: "",
  });

  const [addPet] = useMutation(ADD_PET);

  const handlePictureUpload = (pictureURL) => {
    setFormState({ ...formState, pictureURL });
  };

  const handleInputChange = ({ target: { name, value } }) => {
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!pictureURL) {
      return;
    }
    try {
      console.log(formState);
      console.log(`This is a string ${pictureURL}`);
      const addPetForm = await addPet({
        variables: {
          name: formState.pet_name,
          species: formState.species,
          birthday: formState.birthday,
          pictureURL: `${pictureURL}`,
        },
      });
      window.location.replace("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "50px auto" }}>
      <CardHeader title="Add a new pet!" sx={{ textAlign: "center" }} />
      {pictureURL && (
        <CardMedia
          sx={{
            width: "75%",
            height: 350,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "50px auto",
          }}
          image={pictureURL}
          title="Pet Image"
        />
      )}
      <CardContent>
        <Box
          component="form"
          noValidate
          onSubmit={handleFormSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="pet_name"
                required
                fullWidth
                id="petName"
                label="Pet Name"
                autoFocus
                value={formState.pet_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="species"
                label="Species"
                name="species"
                value={formState.species}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="birthday"
                label="Birthday"
                name="birthday"
                value={formState.birthday}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <h2>Upload an Image</h2>
                <CloudinaryUploadWidget setPictureURL={setPictureURL} />
                <br />
                <br />
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleFormSubmit}
                >
                  Save Pet
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid container justifyContent="center"></Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeReviewCard;

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

import { useMutation, useQuery } from "@apollo/client";
import { ADD_PET } from "../../utils/mutations";

export default function RecipeReviewCard() {
	const [formState, setFormState] = useState({
		pet_name: "",
		species: "",
		birthday: "",
		pictureURL: "...",
		owner: "",
	});


  const [selectedFile, setSelectedFile] = useState(null)
	const [image, setImage] = useState();
	const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);
	const [addPet] = useMutation(ADD_PET);

	const handleInputChange = ({ target: { name, value } }) => {
		setFormState({ ...formState, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const addPetForm = await addPet({
				variables: {
					name: formState.pet_name,
					species: formState.species,
					birthday: formState.birthday,
					pictureURL: formState.pictureURL,
				},
			});
			window.location.replace("/Profile");
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (!image) {
			setPreview(
				"https://sugarplumnannies.com/wp-content/uploads/2015/11/dog-placeholder.jpg"
			);
			return;
		}

		const objectUrl = URL.createObjectURL(image);
		console.log(objectUrl);
		console.log(typeof objectUrl);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [imageFile]);

	const onSelectFile = (event) => {
		if (!event.target.files || event.target.files.length === 0) {
			setImageFile(undefined);
			return;
		}

		setImageFile(event.target.files[0]);
	};

	  return (
    <Card sx={{ maxWidth: 500, margin: "50px auto" }}>
      <CardHeader title="Add a new pet!" sx={{ textAlign: "center" }} />
      <CardMedia
        component="img"
        height="300"
        image={image}
        alt="uploaded file"
      />
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
                <h1>Upload Image</h1>
                <form onSubmit={handleSubmit}>
                  <CloudinaryUploadWidget setpictureURL={setpictureURL} />
                  <br />
                  <button type="submit">Submit</button>
                  </form>
                  </div>
                </Grid>
              </Grid>
          <Grid container justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#405C96", right: "0" }}
            >
              Save
            </Button>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
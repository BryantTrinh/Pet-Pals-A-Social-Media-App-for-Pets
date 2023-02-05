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

import UploadWidget from "../../components/UploadWidget";
import auth from "../../utils/auth";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { ADD_PET } from "../../utils/mutations";

const RecipeReviewCard = () => {
	const [pictureURL, setPictureURL] = React.useState("");
	const [formState, setFormState] = React.useState({
		pet_name: "",
		species: "",
		birthday: "",
		// pictureURL: "",
	});

	const handleFormSubmit = (event) => {
		event.preventDefault();
		if (!pictureURL) {
			alert("Please upload a picture of your pet.");
			return;
		}
		console.log("Form data:", { ...formState, pictureURL });
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormState({ ...formState, [name]: value });
	};

	return (
		<Card sx={{ maxWidth: 500, margin: "50px auto" }}>
			<CardHeader title='Add a new pet!' sx={{ textAlign: "center" }} />
			<CardMedia
				component='img'
				height='300'
				image={pictureURL}
				alt='pet profile'
			/>
			<CardContent>
				<Box
					component='form'
					noValidate
					onSubmit={handleFormSubmit}
					sx={{ mt: 3 }}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								name='pet_name'
								required
								fullWidth
								id='petName'
								label='Pet Name'
								autoFocus
								value={formState.pet_name}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='species'
								label='Species'
								name='species'
								value={formState.species}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id='birthday'
								label='Birthday'
								name='birthday'
								value={formState.birthday}
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<div>
								<h2>Upload an Image</h2>
								<UploadWidget setPictureURL={setPictureURL} />
								<br />
								<Button
									variant='contained'
									type='submit'
									onClick={handleFormSubmit}
								>
									Submit Photo
								</Button>
							</div>
						</Grid>
					</Grid>
					<Grid container justifyContent='center'>
						<Button
							type='submit'
							variant='contained'
							sx={{ mt: 3, mb: 2, backgroundColor: "#405C96", right: "0" }}
							onClick={handleFormSubmit}
						>
							Save
						</Button>
					</Grid>
				</Box>
			</CardContent>
		</Card>
	);
};

export default RecipeReviewCard;

const [formState, setFormState] = React.useState({
  pet_name: "",
	species: "",
	birthday: "",
	pictureURL: "",
});

const [selectedFile, setSelectedFile] = useState(null);
const [pictureURL, setPictureURL] = React.useState();
const [preview, setPreview] = React.useState();
const [loading, setLoading] = React.useState(false);
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

  const onSelectFile = (event) => {
  	if (!event.target.files || event.target.files.length === 0) {
  		setPictureURL(undefined);
  		return;
  	}
  	setPictureURL(event.target.files[0]);
  };

  return (
  <Card sx={{ maxWidth: 500, margin: "50px auto" }}>
    <CardHeader title="Add a new pet!" sx={{ textAlign: "center" }} />
    <CardMedia
      component="img"
      height="300"
      image={pictureURL}
      alt="pet profile"
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
              <h2>Upload an Image</h2>
              <form onSubmit={handleFormSubmit}>
                <CloudinaryUploadWidget setPictureURL={setPictureURL} />
                <br />
                <button type="submit">Submit Photo</button>
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
};

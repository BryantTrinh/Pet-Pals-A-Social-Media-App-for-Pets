import * as React from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Button,
    Grid,
    TextField,
    Box
} from '@mui/material';

export default function RecipeReviewCard() {
    const [formState, setFormState] = React.useState({
        pet_name: "",
        species: "",
        birthday: "",
    });

    const handleInputChange = ({ target: { name, value } }) => {
        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

    };

    return (
        <Card sx={{ maxWidth: 500, margin: "50px auto" }}>
            <CardHeader
                title="Add a new pet!"
                sx={{ textAlign: "center" }}
            />
            <CardMedia
                component="img"
                height="300"
                image="https://sugarplumnannies.com/wp-content/uploads/2015/11/dog-placeholder.jpg"
                alt="pet profile"
            />
            <CardContent>
                <Box component="form" noValidate onSubmit={handleFormSubmit} sx={{ mt: 3 }}>
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
                                label="Species/Breed"
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
            </CardContent>
        </Card>
    );
}

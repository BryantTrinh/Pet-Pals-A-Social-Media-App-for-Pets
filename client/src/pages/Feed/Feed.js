import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatIcon from '@mui/icons-material/Chat';

export default function RecipeReviewCard() {
    return (
        <Grid container direction="column" alignItems="center" sx={{ marginTop: "20px" }}>
            {/* Map over card */}
            <Card sx={{ width: 345, marginBottom: "20px" }}>
                <CardHeader
                    title="Chorizo"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image="https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0"
                    alt="pet profile"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Location
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Breed/Species
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Pictures
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <ChatIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Card sx={{ width: 345, marginBottom: "20px" }}>
                <CardHeader
                    title="Chorizo"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image="https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0"
                    alt="pet profile"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Location
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Breed/Species
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Pictures
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <ChatIcon />
                    </IconButton>
                </CardActions>
            </Card>
            <Card sx={{ width: 345, marginBottom: "20px" }}>
                <CardHeader
                    title="Chorizo"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image="https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0"
                    alt="pet profile"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Location
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Breed/Species
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Pictures
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <ChatIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}

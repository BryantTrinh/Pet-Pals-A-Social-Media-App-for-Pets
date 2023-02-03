import * as React from "react";
import { Grid, Button, Card, CardHeader, CardMedia, CardContent, CardActions, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import Match from "../Matches";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PETS, QUERY_USER, QUERY_OWNER } from "../../utils/queries.js";
import { CREATE_CHAT } from "../../utils/mutations";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function RecipeReviewCard() {
  const { loading: petsLoading, data: petsData } = useQuery(QUERY_PETS);
  const petList = petsData?.pets || [];
  const now = dayjs().format("YYYY-MM-DD");
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);
  return (
    <Grid
      container
      justifyContent="center"
      gap={4}
      sx={{ marginTop: "20px", padding: "0 20px" }}
    >
      {petsLoading || userLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {petList.map((pet) => {
            return (
              <Grid item xs={12} sm={6} md={3} key={pet._id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader title={pet.name} />
                  <CardMedia
                    component="img"
                    height="194"
                    image="https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0"
                    alt="pet profile"
                  />
                  <CardContent>
                    <Match pet={pet} userData={userData} />
                    <Typography variant="body2" color="text.secondary">
                      Age: {dayjs(now).diff(dayjs(pet.birthday), "year")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Species: {pet.species}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" endIcon={<ChatIcon />}>
                      ADD TO CHAT
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </>
      )}
    </Grid>
  );
}

import * as React from "react";
import {
  Grid,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import Match from "../Matches";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PETS, QUERY_USER, QUERY_OWNER } from "../../utils/queries.js";
import { CREATE_CHAT } from "../../utils/mutations";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function RecipeReviewCard() {
  const { loading: petsLoading, data: petsData } = useQuery(QUERY_PETS);
  let petList = petsData?.pets || [];
  console.log("-----petList: ", petList);

  const now = dayjs().format("YYYY-MM-DD");
  const { loading: userLoading, data: userData } = useQuery(QUERY_USER);

  const [createChat] = useMutation(CREATE_CHAT);

  // Creating roomID using pet's owner and user ID
  const addToChat = async (event) => {
    if (!petsLoading && !userLoading) {
      const IdArr = [];
      IdArr.push(event.target.firstElementChild.id);
      IdArr.push(userData.user._id);
      IdArr.sort();
      const roomID = IdArr.toString();

      const addChat = await createChat({
        variables: { roomID: roomID },
      });
    }
  };
  console.log(petList);
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
                    image={pet.picturesURL}
                    alt="pet profile picture"
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
                  <CardActions
                    disableSpacing
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      endIcon={<ChatIcon />}
                      onClick={addToChat}
                    >
                      ADD {`${pet.owner.first_name}`} TO CHAT
                      <input hidden={true} id={pet.owner._id}></input>
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

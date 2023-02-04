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

const quickSort = (array) => {
	// if input array is empty, it doesn't need to be sorted, so return it
	// this must be in place, or the recursive function calls will never end
	if (array.length <= 1) {
		return array;
	}

	// use `.slice()` to pull a single element out of the input array at random
	// this will become our pivot value, meaning we will attempt to sort the array based on a value being greater than or less than this value
	const pivot = array.splice(Math.floor(Math.random() * array.length), 1);

	// we create two empty arrays, one to be populated with all the values less than or equal to the pivot value (left), and the other to be populated with all of the values greater than the pivot (right)
	const left = [];
	const right = [];

	// loop through array and push each value into the `left` or `right` arrays based on the pivot value
	array.forEach((el) => {
		if (el.owner <= pivot.owner) {
			left.push(el);
		} else {
			right.push(el);
		}
	});

	// since the array will likely not be sorted the first time going through this, we recursively call the `quickSort()` function on the `left` and `right` arrays, which will then run through this process over and over again until the input array is less than `1`...indicating the initial array has been sorted and we can return it out of the function
	return quickSort(left).concat(pivot, quickSort(right));
};
export default function RecipeReviewCard() {
	const { loading: petsLoading, data: petsData } = useQuery(QUERY_PETS);
	const petList = petsData?.pets || [];
	const beforePetList = [];
	if (!petsLoading) {
		beforePetList.push(petList);
		const updatedPetList = quickSort(beforePetList);
		console.log(beforePetList);
		console.log(updatedPetList);
	}
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

	return (
		<Grid
			container
			justifyContent='center'
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
										component='img'
										height='194'
										image='https://repository-images.githubusercontent.com/260096455/47f1b200-8b2e-11ea-8fa1-ab106189aeb0'
										alt='pet profile'
									/>
									<CardContent>
										<Match pet={pet} userData={userData} />
										<Typography variant='body2' color='text.secondary'>
											Age: {dayjs(now).diff(dayjs(pet.birthday), "year")}
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											Species: {pet.species}
										</Typography>
									</CardContent>
									<CardActions
										disableSpacing
										sx={{ display: "flex", justifyContent: "flex-end" }}
									>
										<Button
											variant='contained'
											endIcon={<ChatIcon />}
											onClick={addToChat}
										>
											ADD TO CHAT
											<input hidden={true} id={pet.owner}></input>
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

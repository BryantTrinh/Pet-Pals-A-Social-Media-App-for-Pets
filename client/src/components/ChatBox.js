import * as React from "react";
import ForumIcon from "@mui/icons-material/Forum";
import SendIcon from "@mui/icons-material/Send";
import {
	Modal,
	Typography,
	Box,
	Grid,
	TextField,
	Backdrop,
	Avatar,
	Stack,
	Button,
} from "@mui/material";
import BasicTabs from "./mobileChatBox";
import { useQuery } from "@apollo/client";
import { QUERY_USER_CHATS, QUERY_FRIENDS_LIST } from "../utils/queries";

import auth from "../utils/auth";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

// Colored avatars with initials
function stringToColor(string) {
	let hash = 0;
	let i;
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = "#";
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	return color;
}

function stringAvatar(name) {
	return {
		sx: {
			bgcolor: stringToColor(name),
		},
		children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
	};
}

function ChatBox() {
	// Show chat box modal use state
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => setOpen(false);

	const userMessageStyle = {
		color: "white",
		lineHeight: "1.5",
		backgroundColor: "primary.main",
		m: "10px 10px 20px 10px",
		p: "5px 20px",
		borderRadius: "16px 16px 0 16px",
		maxWidth: "40%",
		overflowWrap: "break-word",
	};

	const friendMessageStyle = {
		color: "black",
		lineHeight: "1.5",
		backgroundColor: "grey.400",
		m: "10px 10px 20px 10px",
		p: "5px 20px",
		borderRadius: "16px 16px 16px 0px",
		maxWidth: "40%",
		overflowWrap: "break-word",
	};

	// Getting array of user's chats
	const { loading: chatLoading, data: userChats } = useQuery(QUERY_USER_CHATS);
	const chats = userChats?.getUserChats.chats || [];
	const myId = userChats?.getUserChats._id || "";

	// Getting array of friends object ID
	const { loading: friendsLoading, data: userFriends } = useQuery(
		QUERY_FRIENDS_LIST,
		{
			variables: { ownerId: myId },
		}
	);
	const userFriendsList = userFriends?.owner.friends || [];

	// Socket.io stuff
	const [message, setMessage] = React.useState("");
	const [messageReceived, setMessageReceived] = React.useState([]);
	const [room, setRoom] = React.useState("");
	const [chatAnnounce, setChatAnnounce] = React.useState("");

	// Logic to create chatroom ID
	const setChatRoomID = (event) => {
		const IdArr = [];
		IdArr.push(event.target.firstElementChild.id);
		IdArr.push(myId);
		IdArr.sort();
		const roomID = IdArr.toString();

		setChatAnnounce(`You're in a chat with ${event.target.id}`);
		setRoom(roomID);
		socket.emit("joinRoom", roomID);
	};

	const sendMessage = () => {
		if (message === "") {
			return;
		} else if (room === "") {
			console.log("You're not in a room!");
			return;
		}
		socket.emit("sendMessage", { message, room });
	};

	React.useEffect(() => {
		socket.on("receiveMessage", (data) => {
			setMessageReceived(data);
			setMessage("");
		});
	}, [socket]);

	// React components to map
	function DisplayChats(props) {
		return (
			<Button
				variant='outlined'
				sx={{ width: "100%" }}
				onClick={setChatRoomID}
				id={props.fullName}
			>
				<input hidden={true} id={props.friendID} />
				{props.fullName}
			</Button>
		);
	}

	function ChatBubble(props) {
		return (
			<Grid container justifyContent='flex-end'>
				<Typography variant='h6' component='div' sx={userMessageStyle}>
					{props.message}
				</Typography>
			</Grid>
		);
	}

	return (
		<>
			{auth.loggedIn() ? (
				<ForumIcon
					sx={{
						position: "fixed",
						zIndex: 50,
						right: "3%",
						bottom: "3%",
						width: 40,
						height: 40,
						"&:hover": {
							cursor: "pointer",
						},
					}}
					onClick={handleOpen}
				/>
			) : (
				<></>
			)}
			<Backdrop sx={{ color: "#fff", zIndex: 10 }} open={open}>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby='modal-modal-title'
					aria-describedby='modal-modal-description'
					sx={{ height: "100vh" }}
				>
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: "70%",
							height: "70%",
							bgcolor: "background.paper",
							boxShadow: 24,
							p: 2,
							borderRadius: 5,
						}}
					>
						{/* Medium screen breakpoint chat layout */}
						<Grid
							container
							sx={{ height: "100%", display: { xs: "none", md: "flex" } }}
						>
							<Grid
								item
								sm={3}
								sx={{
									borderRight: "2px solid #E4E4E4",
									p: "0 16px 0 0",
								}}
							>
								<Typography
									variant='h6'
									component='h2'
									sx={{ textAlign: "center", marginBottom: "20px" }}
								>
									Chats
								</Typography>
								{userFriendsList.map((friend) => (
									<DisplayChats
										key={friend._id}
										fullName={`${friend.first_name} ${friend.last_name}`}
										friendID={friend._id}
									/>
								))}
							</Grid>
							<Grid
								item
								sm={9}
								sx={{
									p: "0 0 0 16px",
									height: "100%",
								}}
							>
								<Grid
									container
									direction='column'
									justifyContent='flex-end'
									sx={{ height: "100%", flexWrap: "nowrap" }}
								>
									<Grid item>
										<Typography>{chatAnnounce}</Typography>
									</Grid>
									<Grid item sx={{ overflow: "auto" }} id='messageField'>
										{messageReceived.map((data) => (
											<ChatBubble
												key={data.message}
												socketID={data.socketID}
												message={data.message}
											/>
										))}
									</Grid>
									<Grid item>
										<Box
											component='form'
											onSubmit={(event) => {
												event.preventDefault();
												sendMessage();
											}}
										>
											<Grid container justifyContent='center' gap={1}>
												<Grid item xs>
													<TextField
														fullWidth
														size='small'
														placeholder='Your message here...'
														id='textfield'
														value={message}
														onChange={(event) => {
															setMessage(event.target.value);
														}}
													/>
												</Grid>
												<Grid item xs={2}>
													<Grid
														container
														justifyContent='center'
														alignItems='center'
														sx={{ height: 1 }}
													>
														<Button
															variant='contained'
															endIcon={<SendIcon />}
															type='submit'
														>
															Send
														</Button>
													</Grid>
												</Grid>
											</Grid>
										</Box>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
						{/* Small screen breakpoint chat layout */}
						<Grid
							container
							sx={{ height: "100%", display: { xs: "flex", md: "none" } }}
						>
							<BasicTabs
								stringAvatar={stringAvatar}
								friendMessageStyle={friendMessageStyle}
								userMessageStyle={userMessageStyle}
							/>
						</Grid>
					</Box>
				</Modal>
			</Backdrop>
		</>
	);
}

export default ChatBox;

import * as React from "react";
import PropTypes from "prop-types";
import ForumIcon from "@mui/icons-material/Forum";
import SendIcon from "@mui/icons-material/Send";
import {
  Modal,
  Typography,
  Box,
  Grid,
  TextField,
  Backdrop,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { QUERY_USER_CHATS, QUERY_FRIENDS_LIST } from "../utils/queries";

import auth from "../utils/auth";

import io from "socket.io-client";
const socket = io.connect("https://hidden-headland-00556.herokuapp.com/");

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ height: "92%" }}
    >
      {value === index && (
        <Box sx={{ height: "100%" }}>
          <Box sx={{ height: "100%" }}>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ChatBox() {
  // Show chat box modal use state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
  const { loading: userChatLoading, data: userChats } =
    useQuery(QUERY_USER_CHATS);
  // const myIdChats = userChats?.getUserChats || {};
  const myId = userChats?.getUserChats._id || "";
  console.log(myId);

  // Getting array of friends object ID
  const { loading: friendsLoading, data: userFriends } = useQuery(
    QUERY_FRIENDS_LIST,
    {
      variables: { ownerId: myId },
    }
  );
  const userFriendsData = userFriends?.owner || {};
  const userFriendsList = userFriendsData.friends || [];

  // Socket.io stuff
  const [message, setMessage] = React.useState("");
  const [messageReceived, setMessageReceived] = React.useState([]);
  const [room, setRoom] = React.useState("");
  const [chatAnnounce, setChatAnnounce] = React.useState("");
  const [chatStyle, setChatStyle] = React.useState("");

  const ChatBubblesRef = React.useRef(null);

  // Logic to create chatroom ID
  const createChatRoomID = (event) => {
    const IdArr = [];
    IdArr.push(event.target.firstElementChild.id);
    console.log(event.target.firstElementChild.id)
    IdArr.push(myId);
    IdArr.sort();
    const roomID = IdArr.toString();

    setChatAnnounce(`You're in a chat with ${event.target.id}`);
    setRoom(roomID);
    setChatStyle(event.target.firstElementChild.id);
    setValue(1);

    socket.emit("joinRoom", roomID);
  };

  const sendMessage = () => {
    if (message === "") {
      return;
    } else if (room === "") {
      console.log("You're not in a room!");
      return;
    }
    socket.emit("sendMessage", { message, myId, room });
  };

  React.useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageReceived(data);
      setMessage("");
    });
  }, [socket]);

  React.useEffect(() => {
    ChatBubblesRef.current?.scrollIntoView();
  }, [messageReceived]);

  // React components to map
  function DisplayChats(props) {
    return (
      <>
        <Box
          sx={{
            height: "2px",
            marginBottom: "5px",
            backgroundColor: "#E4E4E4",
          }}
        ></Box>
        <Button
          variant={chatStyle === props.friendID ? "contained" : "text"}
          sx={{ width: "100%", marginBottom: "5px" }}
          onClick={createChatRoomID}
          id={props.fullName}
        >
          <input hidden={true} id={props.friendID} />
          {props.fullName}
        </Button>
      </>
    );
  }

  function ChatBubble(props) {
    const timeStamp = new Date(props.timeStamp);
    const timeSetting = {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const newTimeStamp = timeStamp
      .toLocaleDateString("en-US", timeSetting)
      .split(",")
      .join("");

    return (
      <>
        <Box
          textAlign={props.sender === myId ? "right" : "left"}
          fontSize="14px"
          color="grey.400"
        >
          {newTimeStamp}
        </Box>
        <Grid
          container
          justifyContent={props.sender === myId ? "flex-end" : "flex-start"}
        >
          <Typography
            variant="h6"
            component="div"
            sx={props.sender === myId ? userMessageStyle : friendMessageStyle}
          >
            {props.message}
          </Typography>
        </Grid>
      </>
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
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
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
                  variant="h6"
                  component="h2"
                  sx={{ textAlign: "center", marginBottom: "20px" }}
                >
                  Chats
                </Typography>
                <Box overflow="auto">
                  {userFriendsList.map((friend) => (
                    <DisplayChats
                      key={friend._id}
                      fullName={`${friend.first_name} ${friend.last_name}`}
                      friendID={friend._id}
                    />
                  ))}
                </Box>
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
                  direction="column"
                  justifyContent="flex-end"
                  sx={{ height: "100%", flexWrap: "nowrap" }}
                >
                  <Grid item>
                    <Typography>{chatAnnounce}</Typography>
                  </Grid>
                  <Grid item sx={{ overflow: "auto" }}>
                    {messageReceived.map((data) => (
                      <ChatBubble
                        key={data._id}
                        sender={data.sender}
                        message={data.message}
                        timeStamp={data.createdAt}
                      />
                    ))}
                    <div ref={ChatBubblesRef} />
                  </Grid>
                  <Grid item>
                    <Box
                      component="form"
                      onSubmit={(event) => {
                        event.preventDefault();
                        sendMessage();
                      }}
                    >
                      <Grid container justifyContent="center" gap={1}>
                        <Grid item xs>
                          <TextField
                            fullWidth
                            size="small"
                            placeholder="Your message here..."
                            id="textfield"
                            value={message}
                            onChange={(event) => {
                              setMessage(event.target.value);
                            }}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            sx={{ height: 1 }}
                          >
                            <Button
                              variant="contained"
                              endIcon={<SendIcon />}
                              type="submit"
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
              <Grid
                container
                direction="column"
                flexWrap="nowrap"
                sx={{ height: "100%" }}
              >
                <Grid
                  item
                  xs={1}
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                >
                  <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Chats" {...a11yProps(0)} />
                    <Tab label="Message" {...a11yProps(1)} />
                  </Tabs>
                </Grid>
                <TabPanel value={value} index={0}>
                  {userFriendsList.map((friend) => (
                    <DisplayChats
                      key={friend._id}
                      fullName={`${friend.first_name} ${friend.last_name}`}
                      friendID={friend._id}
                    />
                  ))}
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-end"
                    flexWrap="nowrap"
                    height="100%"
                  >
                    <Grid item>
                      <Typography>{chatAnnounce}</Typography>
                    </Grid>
                    <Grid item sx={{ overflow: "auto" }} id="messageField">
                      {messageReceived.map((data) => (
                        <ChatBubble
                          key={data._id}
                          sender={data.sender}
                          message={data.message}
                          timeStamp={data.createdAt}
                        />
                      ))}
                    </Grid>
                    <Grid item>
                      <Box
                        component="form"
                        onSubmit={(event) => {
                          event.preventDefault();
                          sendMessage();
                        }}
                      >
                        <Grid container justifyContent="center">
                          <Grid item xs>
                            <TextField
                              fullWidth
                              size="small"
                              placeholder="Your message here..."
                              id="textfield"
                              value={message}
                              onChange={(event) => {
                                setMessage(event.target.value);
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <Grid
                              container
                              justifyContent="center"
                              alignItems="center"
                              sx={{ height: 1 }}
                            >
                              <Button variant="contained" type="submit">
                                <SendIcon />
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </TabPanel>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Backdrop>
    </>
  );
}

export default ChatBox;
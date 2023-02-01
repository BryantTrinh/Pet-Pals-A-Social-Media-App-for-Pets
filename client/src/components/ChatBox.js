import * as React from 'react';
import ForumIcon from '@mui/icons-material/Forum';
import SendIcon from '@mui/icons-material/Send';
import { Modal, Typography, Box, Grid, TextField, Backdrop, Avatar, Stack } from '@mui/material';

// Colored avatars with initials
function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
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
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
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
    }

    const friendMessageStyle = {
        color: "black",
        lineHeight: "1.5",
        backgroundColor: "grey.400",
        m: "10px 10px 20px 10px",
        p: "5px 20px",
        borderRadius: "16px 16px 16px 0px",
        maxWidth: "40%",
        overflowWrap: "break-word"
    }

    return (
        <>
            <ForumIcon
                sx={{
                    position: "fixed",
                    zIndex: 50,
                    right: "3%",
                    bottom: "3%",
                    width: 40,
                    height: 40,
                    "&:hover": {
                        cursor: "pointer"
                    }
                }}
                onClick={handleOpen}
            />
            <Backdrop sx={{ color: '#fff', zIndex: 10 }}
                open={open}
            >
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{ height: "100vh" }}
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "70%",
                        height: "70%",
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 2,
                        borderRadius: 5
                    }}>
                        <Grid container sx={{ height: "100%" }}>
                            <Grid item sm={3} sx={{
                                borderRight: "2px solid #E4E4E4",
                                p: "0 16px 0 0"
                            }}>
                                <Typography variant="h6" component="h2" sx={{ textAlign: "center", marginBottom: "20px" }}>
                                    Messages
                                </Typography>
                                {/* TODO: Map over messages */}
                                <Stack direction="row" spacing={2} sx={{ borderTop: "2px solid #E4E4E4", p: "5px", "&:hover": { cursor: "pointer" } }}>
                                    <Avatar {...stringAvatar('John Doe')} />
                                    <Grid container alignItems="center">
                                        <Typography sx={{ lineHeight: "1", fontSize: "14px" }}>Last message from John Doe.</Typography>
                                    </Grid>
                                </Stack>
                                <Stack direction="row" spacing={2} sx={{ borderTop: "2px solid #E4E4E4", p: "5px", "&:hover": { cursor: "pointer" } }}>
                                    <Avatar {...stringAvatar('Tim Doe')} />
                                    <Grid container alignItems="center">
                                        <Typography sx={{ lineHeight: "1", fontSize: "14px" }}>Last message from Tim Doe.</Typography>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item sm={9} sx={{
                                p: "0 0 0 16px",
                                height: "100%"
                            }}>
                                <Grid container direction="column" justifyContent="flex-end" sx={{ height: "100%", flexWrap: "nowrap" }}>
                                    {/* TODO: Map over individual chats */}
                                    <Grid item sx={{ overflow: "auto" }} id="messageField">
                                        <Grid container justifyContent="flex-start">
                                            <Typography variant="h6" component="div"
                                                sx={friendMessageStyle}>
                                                Hi, I'm a friend! I'm writing a paragraph to showcase the text wrapping feature of this chat bubble!
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent="flex-start">
                                            <Typography variant="h6" component="div"
                                                sx={friendMessageStyle}>
                                                Hi, I'm a friend! I'm writing a paragraph to showcase the text wrapping feature of this chat bubble!
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent="flex-start">
                                            <Typography variant="h6" component="div"
                                                sx={friendMessageStyle}>
                                                Hi, I'm a friend! I'm writing a paragraph to showcase the text wrapping feature of this chat bubble!
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent="flex-start">
                                            <Typography variant="h6" component="div"
                                                sx={friendMessageStyle}>
                                                Hi, I'm a friend! I'm writing a paragraph to showcase the text wrapping feature of this chat bubble!
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent="flex-start">
                                            <Typography variant="h6" component="div"
                                                sx={friendMessageStyle}>
                                                Hi, I'm a friend! I'm writing a paragraph to showcase the text wrapping feature of this chat bubble!
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent="flex-start">
                                            <Typography variant="h6" component="div"
                                                sx={friendMessageStyle}>
                                                Hi, I'm a friend! I'm writing a paragraph to showcase the text wrapping feature of this chat bubble!
                                            </Typography>
                                        </Grid>
                                        <Grid container justifyContent="flex-end">
                                            <Typography variant="h6" component="div"
                                                sx={userMessageStyle}>
                                                Hi, friend!
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container justifyContent="center">
                                            <Grid item xs={11}>
                                                <TextField fullWidth size='small' placeholder='Your message here...' />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <Grid container justifyContent="center" alignItems="center" sx={{ height: 1 }}>
                                                    <SendIcon sx={{ color: "#405C96", "&:hover": { cursor: "pointer" } }}
                                                        onClick={() => {
                                                            console.log("Send")
                                                            const messageField = document.getElementById("messageField");
                                                            messageField.scrollTop = messageField.scrollHeight;
                                                        }}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal >
            </Backdrop>
        </>
    )
}

export default ChatBox;
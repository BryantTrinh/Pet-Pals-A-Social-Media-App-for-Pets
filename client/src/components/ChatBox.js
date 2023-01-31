import * as React from 'react';
import ForumIcon from '@mui/icons-material/Forum';
import SendIcon from '@mui/icons-material/Send';
import { Modal, Typography, Box, Grid, TextField, Button } from '@mui/material';

function ChatBox(props) {
    // Show chat box modal use state
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                }}>
                    <Grid container sx={{ height: 1 }}>
                        <Grid item sm={3} sx={{
                            borderRight: "2px solid #E4E4E4",
                            p: "0 16px 0 0"
                        }}>
                            <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
                                Messages
                            </Typography>
                            {/* Map over messages */}
                        </Grid>
                        <Grid item sm={9} sx={{
                            p: "0 0 0 16px"
                        }}>
                            <Grid container direction="column" justifyContent="flex-end" sx={{ height: 1 }}>
                                <Grid item xs={11}>
                                    {/* Map over individual chats */}
                                    <Typography variant="h6" component="h2" sx={{ textAlign: "center" }}>
                                        Chat
                                    </Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Grid container justifyContent="center">
                                        <Grid item xs={11}>
                                            <TextField fullWidth size='small' placeholder='Your message here...'/>
                                        </Grid>
                                        <Grid container xs={1} justifyContent="center" alignItems="center">
                                            <SendIcon sx={{ color: "#405C96", "&:hover": { cursor: "pointer" } }} 
                                                onClick={console.log("Send")}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    )
}

export default ChatBox;
import * as React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/system";
import {
	Avatar,
	Grid,
	TextField,
	Box,
	Typography,
	Tabs,
	Tab,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
			style={{ height: "92%" }}
		>
			{value === index && (
				<Box sx={{ p: 2, height: "92%" }}>
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

export default function BasicTabs(props) {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Grid
			container
			direction='column'
			flexWrap='nowrap'
			sx={{ height: "100%" }}
		>
			<Grid item xs={1} sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs value={value} onChange={handleChange} centered>
					<Tab label='Chats' {...a11yProps(0)} />
					<Tab label='Message' {...a11yProps(1)} />
				</Tabs>
			</Grid>
			<TabPanel value={value} index={0}>
				{/* TODO: Map over individual chats */}
				<Stack
					direction='row'
					spacing={2}
					sx={{
						width: "100%",
						borderTop: "2px solid #E4E4E4",
						p: "5px",
						"&:hover": { cursor: "pointer" },
					}}
				>
					<Avatar {...props.stringAvatar("John Doe")} />
					<Grid container alignItems='center'>
						<Typography sx={{ lineHeight: "1", fontSize: "14px" }}>
							Last message from John Doe.
						</Typography>
					</Grid>
				</Stack>
				<Stack
					direction='row'
					spacing={2}
					sx={{
						width: "100%",
						borderTop: "2px solid #E4E4E4",
						p: "5px",
						"&:hover": { cursor: "pointer" },
					}}
				>
					<Avatar {...props.stringAvatar("Tim Doe")} />
					<Grid container alignItems='center'>
						<Typography sx={{ lineHeight: "1", fontSize: "14px" }}>
							Last message from Tim Doe.
						</Typography>
					</Grid>
				</Stack>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Grid
					container
					direction='column'
					justifyContent='flex-end'
					flexWrap='nowrap'
					height='100%'
				>
					<Grid item sx={{ overflow: "auto" }} id='messageField'>
						{/* TODO: Map over individual messages */}
						<Grid container justifyContent='flex-start'>
							<Typography
								variant='h6'
								component='div'
								sx={props.friendMessageStyle}
							>
								Hi, I'm a friend! I'm writing a paragraph to showcase the text
								wrapping feature of this chat bubble!
							</Typography>
						</Grid>
						<Grid container justifyContent='flex-start'>
							<Typography
								variant='h6'
								component='div'
								sx={props.friendMessageStyle}
							>
								Hi, I'm a friend! I'm writing a paragraph to showcase the text
								wrapping feature of this chat bubble!
							</Typography>
						</Grid>
						<Grid container justifyContent='flex-end'>
							<Typography
								variant='h6'
								component='div'
								sx={props.userMessageStyle}
							>
								Hi, friend!
							</Typography>
						</Grid>
					</Grid>
					<Grid item width='100%'>
						<Grid container justifyContent='center'>
							<Grid item xs={11}>
								<TextField
									fullWidth
									size='small'
									placeholder='Your message here...'
								/>
							</Grid>
							<Grid item xs={1}>
								<Grid
									container
									justifyContent='center'
									alignItems='center'
									sx={{ height: 1 }}
								>
									<SendIcon
										sx={{ color: "#405C96", "&:hover": { cursor: "pointer" } }}
										onClick={() => {
											console.log("Send");
											const messageField =
												document.getElementById("messageField");
											messageField.scrollTop = messageField.scrollHeight;
										}}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</TabPanel>
		</Grid>
	);
}

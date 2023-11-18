import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const chat = () => {
	const [socket] = useState(io(":3000"));
	const [message, setMessage] = useState(" ");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		socket.on("receiveMessage", (message) => {
			setMessages([...messages, message]);
		});
	}, [messages]);

	const sendMessage = () => {
		socket.emit("sendMessage", message);
		setMessage(" ");
	};

	return (
		<div>
			<ul>
				{messages.map((message, index) => (
					<li key={index}>{message}</li>
				))}
			</ul>
			<input
				type='text'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button onClick={sendMessage}>Send</button>
		</div>
	);
};

export default Chat;
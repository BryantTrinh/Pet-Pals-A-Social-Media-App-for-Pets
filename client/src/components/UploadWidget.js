import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
	componentDidMount() {
		var myWidget = window.cloudinary.createUploadWidget(
			{
				cloudName: "dkm1ip3w2",
				uploadPreset: "ABCDE12345",
				sources: ["url", "camera", "local"],
				showSkipCropButton: false,
				multiple: false,
				defaultSource: "local",
			},
			(error, result) => {
				if (!error && result && result.event === "success") {
					console.log("SUCCESS! This is your image's URL: ", result.info.url);
					this.props.setPostImageURL(result.info.url);
				}
			}
		);
		document.getElementById("upload_widget").addEventListener(
			"click",
			function () {
				myWidget.open();
			},
			false
		);
	}

	render() {
		return (
			<button id='upload_widget' className='cloudinary-button'>
				Upload Photo
			</button>
		);
	}
}

export default CloudinaryUploadWidget;

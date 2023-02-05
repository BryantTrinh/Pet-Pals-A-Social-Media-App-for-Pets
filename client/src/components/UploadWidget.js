import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
	myWidget = null;

	componentDidMount() {
		if (window.cloudinary) {
			this.myWidget = window.cloudinary.createUploadWidget(
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
						console.log("Done! Here is the image URL: ", result.info.url);
						this.props.setPictureURL(result.info.url);
					}
				}
			);
			document
				.getElementById("upload_widget")
				.addEventListener("click", this.openWidget, false);
		}
	}

	openWidget = () => {
		this.myWidget.open();
	};

	render() {
		return (
			<button id='upload_widget' className='cloudinary-button'>
				Add a Photo
			</button>
		);
	}
}

export default CloudinaryUploadWidget;

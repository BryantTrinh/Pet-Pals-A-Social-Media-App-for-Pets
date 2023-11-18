import { openUploadWidget } from "../utils/CloudinaryService";

const ImageUpload = (props) => {
	const uploadImageWidget = () => {
		console.log(props);
		let myUploadWidget = openUploadWidget(
			{
				cloudName: props.dkm1ip3w2,
				uploadPreset: props.ABCDE12345,
				tags: ["myname"],
				maxImageWidth: 600,
				sources: ["local", "url", "camera"],
			},
			function (error, result) {
				if (!error && result.event === "success") {
					props.onImageUpload(result.info.public_id);
				}
			}
		);
		myUploadWidget.open();
	};

	return (
		<button className='greenButton' onClick={uploadImageWidget}>
			Upload Image
		</button>
	);
};

export default ImageUpload;
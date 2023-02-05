import React, { useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { Transformation } from "@cloudinary/url-gen";
import { thumbnail, scale } from "@cloudinary/url-gen/actions/resize";
import { image } from "@cloudinary/url-gen/qualifiers/source";

const UploadWidget = () => {
	const [pictureURL, setPictureURL] = useState("");
	const [isMounted, setIsMounted] = useState(false);

	// Create a Cloudinary instance and set your cloud name.
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dkm1ip3w2",
		},
	});

	const handleUpload = (error, result) => {
		if (error) {
			console.error(error);
			return;
		}
		setPictureURL(result.secure_url);
	};

	React.useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<div>
			<div>
				<input
					type='file'
					name='file'
					data-cloudinary-field='image_id'
					data-form-data="{ 'upload_preset': 'ABCDE12345' }"
					onChange={handleUpload}
				/>
			</div>
			{pictureURL && <AdvancedImage cldImg={cld.image(pictureURL)} />}
		</div>
	);
};

export default UploadWidget;


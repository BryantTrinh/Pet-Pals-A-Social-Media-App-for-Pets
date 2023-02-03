import React, { useState } from 'react';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { SINGLE_UPLOAD_MUTATION } from '../../utils/mutations';

const UploadFile = ({ setPicture }) => {
	const [uploadFile] = useMutation(SINGLE_UPLOAD_MUTATION);
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	React.useEffect(() => {
		if (error) {
			console.error(error);
			setError(null);
		}
	}, [error]);

	const handleChange = async ({ target: { files } }) => {
		setLoading(true);
		setFile(files[0]);
		try {
			const response = await uploadFile({ variables: { file } });
			setPicture(response.data.singleUpload.id);
		} catch (e) {
			setError(e);
		}
		setLoading(false);
	};

	return (
		<div>
			{loading ? (
				<p>Uploading...</p>
			) : (
				<input type='file' onChange={handleChange} />
			)}
			{error && <p>An error occurred: {error.message}</p>}
		</div>
	);
};

export {UploadFile};
const { createWriteStream, unlink } = require('fs');
const shortId = require('shortid');
const path = require('path');

const UPLOAD_DIRECTORY_URL = require('../../config/UPLOAD_DIRECTORY_URL');

/**
 * Stores a GraphQL file upload in the filesystem and uploads file metadata to MongoDB.
 * @param {Promise<object>} upload GraphQL file upload.
 * @returns {Promise<object>} Resolves the upload as our graphql File type.
 */
const storeUpload = async (upload) => {
	const { createReadStream, filename, mimetype, encoding } = await upload.promise;

	// For information of javascript streams, refer to https://nodesource.com/blog/understanding-streams-in-nodejs/
	const stream = createReadStream();
	const storedFileName = `${shortId.generate()}-${filename}`;
	const storedFileUrl = path.join(UPLOAD_DIRECTORY_URL, storedFileName);

	// Store the file in the filesystem.
	await new Promise((resolve, reject) => {
		// Create a stream to which the upload will be written.
		const writeStream = createWriteStream(storedFileUrl);

		// When the upload is fully written, resolve the promise.
		writeStream.on('finish', resolve);

		// If there's an error writing the file, remove the partially written file
		// and reject the promise.
		writeStream.on('error', (error) => {
			unlink(storedFileUrl, () => {
				reject(error);
			});
		});

		// In Node.js v13, errors are not automatically propagated between piped
		// streams. If there is an error receiving the upload, destroy the write
		// stream with the corresponding error.
		stream.on('error', (error) => writeStream.destroy(error));

		// Pipe the upload into the write stream.
		stream.pipe(writeStream);
	});
	return {filename, mimetype, encoding};
}

module.exports = storeUpload;
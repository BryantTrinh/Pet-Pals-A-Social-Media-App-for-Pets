const { createWriteStream, unlink } = require('fs');
const shortId = require('shortid');
const path = require('path');

const UPLOAD_DIRECTORY_URL = require('../../config/UPLOAD_DIRECTORY_URL');

const storeUpload = async (upload) => {
	const { createReadStream, filename, mimetype, encoding } = await upload.promise;

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

//  If there is an error receiving the upload, destroy the write
		// stream with the corresponding error.
		stream.on('error', (error) => writeStream.destroy(error));

		// Pipe the upload into the write stream.
		stream.pipe(writeStream);
	});
	return {filename, mimetype, encoding};
}

module.exports = storeUpload;
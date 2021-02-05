const sharp = require('sharp')
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('../config');

module.exports = async upload => {
  const { createReadStream } = await upload;

  const stream = createReadStream();

  const cloudinary = require('cloudinary');
  cloudinary.config(
    {
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET
    }
  );

  let resultUrl = '';
  const cloudinaryUpload = async ({ stream }) => {
    try {
      await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.v2.uploader.upload_stream((error, result) => {
          if (result) {
            resultUrl = result.secure_url;
            resolve(resultUrl);
          } else {
            reject(error);
          }
        });

        const transformer =
          sharp()
            .resize({
              width: 400,
              height: 400,
            })
            .ensureAlpha()
            .png();

        stream.pipe(transformer).pipe(streamLoad);
      });
    }
    catch (err) {
      throw new Error(`Failed to upload profile picture ! Err:${err.message}`);
    }
  };

  await cloudinaryUpload({ stream });
  return (resultUrl);
};
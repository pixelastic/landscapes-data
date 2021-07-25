const imoen = require('imoen');
const CLOUDINARY_MAXIMUM_SIZE = 10485760;
/**
 * Custom method to enhance a record before saving it to disk
 * @param {object} record Record as extracted from reddinx
 * @returns {object} Updated record
 **/
module.exports = async (record) => {
  console.info(record.title);
  return record;
  // Get preview metadata
  const previewUrl = record.picture.preview;

  const displayPicture = await imoen(previewUrl);

  if (displayPicture.filesize >= CLOUDINARY_MAXIMUM_SIZE) {
    return false;
  }

  // Image has no dimensions (meaning it's missing)
  if (!displayPicture.width || !displayPicture.height) {
    return false;
  }

  record.displayPicture = displayPicture;

  return record;
};

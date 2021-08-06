const imoen = require('imoen');
/**
 * Custom method to enhance a record before saving it to disk
 * @param {object} record Record as extracted from reddinx
 * @returns {object} Updated record
 **/
module.exports = async (record) => {
  const oldPicture = record.picture;
  const oldDisplayPicture = record.displayPicture;
  delete record.picture;
  delete record.displayPicture;

  const filesize = await imoen.filesize(oldDisplayPicture.url);
  const hash = await imoen.hash(oldDisplayPicture.url);
  record.picture = {
    url: oldDisplayPicture.url,
    height: oldDisplayPicture.height,
    width: oldDisplayPicture.width,
    lqip: oldDisplayPicture.placeholder,
    hash,
    filesize,
    fullUrl: oldPicture.full,
    thumbnailUrl: oldPicture.thumbnail,
  };

  return record;
};

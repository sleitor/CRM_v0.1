const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const filename = moment().format(`DDMMYYYY-HHMMSS_SSS-${file.fieldname}`);
    cb(null, filename);
  },
});

fileFilter = (req, file, cb) => {
  if (file.mimeType === 'image/png' || file.mimeType === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = 1024 * 1024 * 5;

module.exports = multer({storage, fileFilter, limits});

const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Middleware multer.diskStorage qui permet d'uploader une image, en modifiant son nom
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');

// Middleware Sharp qui retaille l'image, ajoute resized dans son nom, et supprime l'image d'origine
module.exports.resizeImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const rootDir = path.resolve('images');

  let filePath;
  try {
    filePath = path.resolve(rootDir, req.file.path);
  } catch (err) {
    console.log('Error resolving file path:', err);
    return next();
  }
  const fileName = req.file.filename;
 
  let newFilePath;
  try {
    newFilePath = path.resolve(rootDir, `resized_${fileName}`);
  } catch (err) {
    console.log('Error resolving new file path:', err);
    return next();
  }

  // Normalize and validate the filePath
  let resolvedFilePath;
  try {
    resolvedFilePath = fs.realpathSync(filePath);
  } catch (err) {
    console.log('Error resolving real file path:', err);
    return next();
  }
  if (!resolvedFilePath.startsWith(rootDir)) {
    console.log('Invalid file path');
    return next();
  }

  // Validate the newFilePath
  let resolvedNewFilePath;
  try {
    resolvedNewFilePath = fs.realpathSync(newFilePath);
  } catch (err) {
    console.log('Error resolving real new file path:', err);
    return next();
  }
  if (!resolvedNewFilePath.startsWith(rootDir)) {
    console.log('Invalid new file path');
    return next();
  }

  sharp.cache(false)
  sharp(resolvedFilePath)
    .resize({ width: 206, fit: sharp.fit.contain })
    .toFile(resolvedNewFilePath)
    .then(() => {
      fs.unlink(resolvedFilePath, (error) => {
        req.file.path = resolvedNewFilePath;
        next();
      });
    })
    .catch(err => {
      console.log(err);
      return next();
    });
};
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

  const filePath = req.file.path;
  const fileName = req.file.filename;
 
  const newFilePath = path.join('images', `resized_${fileName}`);

  sharp.cache(false)
  sharp(filePath)
    .resize({ width: 206, fit: sharp.fit.contain })
    .toFile(newFilePath)
    .then(() => {
      fs.unlink(filePath, (error) => {
        req.file.path = newFilePath;
        next();
      });
    })
    .catch(err => {
      console.log(err);
      return next();
    });
};
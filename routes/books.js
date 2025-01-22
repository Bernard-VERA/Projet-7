const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const rateLimit = require('express-rate-limit');

const booksCtrl = require('../controllers/books');

// Définition des routes des requètes, notament celles qui nécessitent une authentification
router.get('/', booksCtrl.getAllBooks);
router.get('/bestrating', booksCtrl.getBestRating);
router.get('/:id', booksCtrl.getOneBook);
router.post('/', auth, multer, multer.resizeImage, booksCtrl.createBook);
router.post('/:id/rating', auth, booksCtrl.createRating);
router.put('/:id', auth, multer, multer.resizeImage, booksCtrl.modifyBook);
const deleteBookLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10 // limit each IP to 10 delete requests per windowMs
});

router.delete('/:id', auth, deleteBookLimiter, booksCtrl.deleteBook);

module.exports = router;
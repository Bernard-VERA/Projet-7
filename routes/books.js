const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const rateLimit = require('express-rate-limit');

const booksCtrl = require('../controllers/books');

// Définition des routes des requètes, notament celles qui nécessitent une authentification
const getAllBooksLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

router.get('/', getAllBooksLimiter, booksCtrl.getAllBooks);
router.get('/bestrating', booksCtrl.getBestRating);
router.get('/:id', booksCtrl.getOneBook);
router.post('/', createBookLimiter, auth, multer, multer.resizeImage, booksCtrl.createBook);
router.post('/:id/rating', authLimiter, auth, booksCtrl.createRating);
router.put('/:id', authLimiter, auth, multer, multer.resizeImage, booksCtrl.modifyBook);
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50 // limit each IP to 50 requests per windowMs for authenticated routes
});

const deleteBookLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10 // limit each IP to 10 delete requests per windowMs
});

router.delete('/:id', deleteBookLimiter, auth, booksCtrl.deleteBook);

const createBookLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20 // limit each IP to 20 create book requests per windowMs
});

module.exports = router;
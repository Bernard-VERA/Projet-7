const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const booksCtrl = require('../controllers/books');

router.post('/', auth, booksCtrl.createBook);
router.get('/:id', auth, booksCtrl.getOneBook);
router.put('/:id', auth, booksCtrl.modifyBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.get('/', auth, booksCtrl.getAllBooks);

module.exports = router;
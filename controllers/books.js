const Book = require('../models/book');

exports.createBook = (req, res, next) => {
    const book = new Book({
        userId: req.body.userId,
        title: req.body.title,
        author: req.body.author,
        imageUrl: req.body.imageUrl,
        year: req.body.year,
        genre: req.body.genre,
        ratings: req.body.ratings,
        averageRating: req.body.averageRating,
    });
    book.save()
    .then(() => {res.status(201).json({ message: 'Post saved successfully' })})
    .catch((error) => {res.status(400).json({ error })});
};
const Book = require('../models/book');
const fs = require('fs');

// calcul de la moyenne du rating
function average(array) {
    let sum = 0;
    for (let nb of array) {
        sum += nb;
    };
    return(sum/array.length).toFixed(1);
};

// L'opérateur spread (...bookObject) permet de récupérer tous les champs du corps de la requète.
// Il faut enlever les Id et userId par défauts, qui ne sont pas bons, puis vérifier l' authentification
// On indique nom et url de l'image, et un rating, qui de base est défini à 0
// La méthode save enregistre le livre dans la BDD
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/resized_${req.file.filename}`,
        averageRating: bookObject.ratings[0].grade
    });
    book.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json({ error })})
 };

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
    .then((book) => {
        res.status(200).json(book);
    })
    .catch((error) => {
        res.status(404).json({ error: error });
    });
};

// Seul celui qui l'a créé peut modifier un livre (req.auth.userId)
exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/resized_${req.file.filename}`
    } : { ...req.body };
  
    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({ message : 'Unauthorized request'});
            } else {
                const filename = book.imageUrl.split('/images')[1];
                req.file && fs.unlink(`images/${filename}`, (err => {
                    if (err) console.log(err);
                }));
                const updateFields = {
                    title: bookObject.title,
                    author: bookObject.author,
                    description: bookObject.description,
                    imageUrl: bookObject.imageUrl,
                    averageRating: bookObject.averageRating
                };
                Book.updateOne({ _id: req.params.id}, { $set: updateFields })
                .then(() => res.status(200).json({message : 'Livre modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

 exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({message: 'Unauthorized request'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Livre supprimé !' })})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

exports.getAllBooks = (req, res, next) => {
    Book.find()
    .then((books) => {
        res.status(200).json(books);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).json({ error });
    });
};

// Création d'un rating, sauf si l'utilisateur à déjà voté (includes)
// On ajoute le nouveau rating (push) et on met à jour la moyenne (average(grades))
exports.createRating = (req, res, next) => {
    if (0<= req.body.rating <=5) {
        const ratingObject = { ...req.body, grade: req.body.rating };
        delete ratingObject._id;
        Book.findOne({_id: req.params.id})
        .then(book => {
            const newRatings = book.ratings;
            const userIdArray = newRatings.map(rating => rating.userId);
            if (userIdArray.includes(req.auth.userId)) {
                res.status(401).json({ message : 'Not authorized' });
            } else {
                newRatings.push(ratingObject);
                const grades = newRatings.map(rating => rating.grade);
                const averageGrades = average(grades);
                book.averageRating = averageGrades;
                Book.updateOne({ _id: req.params.id }, { ratings: newRatings, averageRating: averageGrades, _id: req.params.id })
                    .then(() => { res.status(201).json()})
                    .catch(error => { res.status(400).json( { error })});
                res.status(200).json(book);
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
    } else {
        res.status(400).json({ message: 'La note doit être comprise entre 1 et 5' }); 
        }
};

// Affichage des 3 meilleurs livres
exports.getBestRating = (req, res, next) => {
    Book.find().sort({ averageRating: -1}).limit(3)
    .then((books)=>res.status(200).json(books))
    .catch((error)=>res.status(400).json({error}));
};

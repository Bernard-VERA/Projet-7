const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);


router.post((req, res, next) => {
    console.log('Requête reçue !');
    next();
  });
  
  router.post((req, res, next) => {
    res.status(201);
    next();
  });

router.post((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

router.post((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});


module.exports = router;
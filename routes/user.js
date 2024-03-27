const express = require('express');
const router = express.Router();



router.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

router.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});


module.exports = router;
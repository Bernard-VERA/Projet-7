const jwt = require('jsonwebtoken');
require("dotenv").config();
 
// Vérification de la validité du Token avec la clé secrète
// Le userId vérifié est ajouté à toute requète demandant une authentification (auth)
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};
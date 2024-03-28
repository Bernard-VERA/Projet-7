const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const booksRoutes = require('./routes/books')



// Début du paragraphe pour la connection a MongoDB
const uri = "mongodb+srv://BernardV:13008@cluster0.ekvhmmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
// Fin du paragraphe pour la connection a MongoDB

const app = express();

// Donne un résultat au format JSON (remplace body.parser)
app.use(express.json());

// MiddleWare CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


/* ce paragraphe sert a vérifier que le localhost:4000 fonctionne (pas d'erreur dans la console)
  app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
  });
  
  app.use((req, res, next) => {
    res.status(201);
    next();
  });

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});
Le paragraphe du dessus sera supprimé aprés les tests du localhost:4000 */



 app.use('/api/auth', userRoutes);
 app.use('/api/books', booksRoutes);



module.exports = app;
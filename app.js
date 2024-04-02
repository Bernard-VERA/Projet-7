const express = require('express');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const path = require('path');



// Début du paragraphe pour la connection a MongoDB
const uri = "mongodb+srv://BernardV:13008@cluster0.ekvhmmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
try {
  mongoose.connect('mongodb+srv://BernardV:13008@cluster0.ekvhmmx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {});
  console.log("CONNECTED TO DATABASE SUCCESSFULLY");
} catch (error) {
  console.error('COULD NOT CONNECT TO DATABASE:', error.message);
}

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


 app.use('/api/auth', userRoutes);
 app.use('/api/books', booksRoutes);
 app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;
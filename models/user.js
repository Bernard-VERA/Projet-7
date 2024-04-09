const mongoose =  require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Le plugin uniqueValidator de Mongoose assure que l'adresse mail sera unique dans la BDD
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
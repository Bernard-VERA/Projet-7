const User = require('../models/user');

exports.signup = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    });
    user.save()
    .then(
        () => {
            res.status(201).json({
                message: 'Utilisateur créé'
            });
        }
    )
    .catch(error => res.status(400).json({ error }));
    
};


const { User } = require('../models/user.js');

let auth = (req,res,next) => {
    let token = req.cookies.auth;

    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.json({
            error: true,
            message: 'Vous n\'êtes pas connecté'
        });

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = {auth};
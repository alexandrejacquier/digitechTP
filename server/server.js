const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const config = require('./config/config.js').get(process.env.NODE_ENV);

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const { auth } = require('./middleware/auth.js');

const { User } = require('./models/user.js');
//const { Book } = require('./models/book.js');
const { Societe } = require('./models/societe.js');
const { Formulaire } = require('./models/formulaire.js');

//ENABLING CORS FOR ACCESSING BACKEND FROM ANOTHER PORT
//POUR DEFINIR LES ORIGINES VALIDES: https://medium.com/@alexishevia/using-cors-in-express-cac7e29b005b
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('frontend/build'));

// GET
app.get('/api/auth', auth, (req,res) => {
    res.json({
        isAuth: true,
        id:req.user._id,
        email:req.user.email,
        privileges:req.user.privileges
    })
})

app.get('/api/logout', auth, (req,res) => {
    //res.send(req.user);
    req.user.deleteToken(req.token, (err,user) => {
        if(err) return res.status(400).send(err);

        res.sendStatus(200);
    })
})

app.get('/api/users', (req,res) => {
    User.find({}, (err,users) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(users);
    })
})

app.get('/api/societesByUser', (req,res) => {
    let id = req.query.id;

    Societe.find({
        $or:[
            {admins: id},
            {users: id}]
    }, (err,docs) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(docs);
    })
})

app.get('/api/getSociete', (req,res) => {
    let id = req.query.id;

    Societe.findOne({_id: id}, (err,docs) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(docs);
    })
})

app.get('/api/formulairesBySociete', (req,res) => {
    let id = req.query.id;
    let order = req.query.order || 'asc';

    Formulaire.find({societeId:id}).sort({date:order}).exec((err,docs) => {
        if(err) return res.status(400).send(err);
        res.send(docs);
    })
})

app.get('/api/getFormulaire', (req,res) => {
    let id = req.query.id;

    Formulaire.findOne({_id:id}).exec((err,doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
    //console.log(JSON.stringify(doc));
})

// POST
app.post('/api/register', (req,res) => {
    const user = new User(req.body);

    user.save( (err,doc) => {
        if(err) return res.status(400).send(err);//return res.json({success:false});
        res.status(200).json({
            success:true,
            user: doc
        });
    });
});

app.post('/api/login', (req,res) => {
    const user = new User(req.body);

    User.findOne({'email':req.body.email}, (err,user) => {
        if(!user) return res.json({isAuth:false, message:'Adresse email non enregistrée'});

        user.comparePassword(req.body.password, (err,isMatch) => {
            if(!isMatch) return res.json({
                isAuth: false,
                message:'Mot de passe érroné'
            });

            user.generateToken( (err,user) => {
                if(err) return res.status(400).send(err);

                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                });
            })
        })
    })
});

app.post('/api/societe', (req,res) => {
    const societe = new Societe(req.body);

    societe.save( (err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            success: true,
            societe: doc
        });
    });
});

app.post('/api/formulaire', (req,res) => {
    const formulaire = new Formulaire(req.body);

    formulaire.save( (err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            success: true,
            formulaire: doc
        });
    });
});


// UPDATE
app.post('/api/updateSociete', (req,res) => {
    Societe.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        });
    });
})

app.post('/api/updateFormulaire', (req,res) => {
    Formulaire.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        });
    });
})

// DELETE
app.delete('/api/deleteSociete', (req,res) => {
    Societe.findByIdAndRemove(req.query.id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.json(true);
    });
})

app.delete('/api/deleteFormulaire', (req,res) => {
    Formulaire.findByIdAndRemove(req.query.id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.json(true);
    });
})


if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*', () => {
        res.sendfile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("SERVER IS RUNNING ON PORT " + port);
});
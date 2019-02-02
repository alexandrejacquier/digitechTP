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

/*app.get('/api/getBook', (req,res) => {
    let id = req.query.id;

    Book.findById(id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})*/

/*app.get('/api/getBooks', (req,res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    if(typeof skip != "undefined" && typeof limit != "undefined" && typeof order != "undefined"){
        Book.find().sort({createdAt:order}).skip(skip).limit(limit).exec( (err,doc) => {
            if(err) return res.status(400).send(err);
            res.send(doc)
        })
    }
    else{
        return res.status(400).send("parameters needed");
    }
})*/

/*app.get('/api/getReviewer',(req,res)=>{
    let id = req.query.id;

    User.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        if(doc === null) return res.json({
            response: 'No match for that user id'
        });
        res.json({
            name: doc.name,
            lastname: doc.lastname
        })
    })
})*/

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

/*app.post('/api/book', (req,res) => {
    const book = new Book(req.body);

    book.save( (err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post:true,
            bookId: doc._id
        });
    });
});*/



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

/*app.post('/api/book_update', (req,res) => {
    Book.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        });
    });
})*/


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

/*app.delete('/api/book_delete', (req,res) => {
    Book.findByIdAndRemove(req.query.id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.json(true);
    });
})*/

const port = process.env.port || 3001;
app.listen(port, () => {
    console.log("SERVER IS RUNNING ON PORT " + port);
});
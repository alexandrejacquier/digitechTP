const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const fs = require('fs');
const multer = require('multer');
const csv = require('fast-csv');
const json2csv = require('json2csv');
const moment = require('moment');

const path = require('path');

const { auth } = require('./middleware/auth.js');

const { User } = require('./models/user.js');
//const { Book } = require('./models/book.js');
const { Societe } = require('./models/societe.js');
const { Formulaire } = require('./models/formulaire.js');

const config = require('./config/config.js').get(process.env.NODE_ENV);

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

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

const upload = multer({ dest: 'tmp/csv/' });

const checkSocRights = (societe, user, admin) => {
    if(admin){
        if(societe.admins.some(adm => {return adm === user.id})){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        if(societe.users.some(usr => {return usr === user.id}) || societe.admins.some(adm => {return adm === user.id})){
            return true;
        }
        else{
            return false;
        }
    }
}

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

app.get('/api/users', auth, (req,res) => {
    //if(req.user.privileges){
        User.find({}, (err,users) => {
            if(err) return res.status(400).send(err);
            //users.forEach((u) => {delete u.password})
            let tmpUsers = users.map(u => {
                return {
                    _id: u.id,
                    email: u.email,
                    privileges: u.privileges
                }
            })
            res.status(200).send(tmpUsers);
        })
    //}
    //else{
    //    res.status(403).json({
    //        error: 'Cette requête requiert les droits administrateur'
    //    });
    //}
})

app.get('/api/societesByUser', auth, (req,res) => {
    //let id = req.query.id;
    const id = req.user.id;

    Societe.find({
        $or:[
            {admins: id},
            {users: id}]
    }, (err,docs) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(docs);
    })
})

app.get('/api/getSociete', auth, (req,res) => {
    let id = req.query.id;

    Societe.findOne({_id: id}, (err,docs) => {
        if(err) return res.status(400).send(err);
        if(checkSocRights(docs, req.user, 0)){
            res.status(200).send(docs);
        }
        else{
            res.status(403).json({
                error: 'Cette requête requiert des droits utilisateur sur la société'
            })
        }
    })
})

app.get('/api/formulairesBySociete', auth, (req,res) => {
    let id = req.query.id;
    let order = req.query.order || 'asc';

    Societe.findOne({_id:id}, (err,doc) => {
        if(err) return res.status(400).send(err);
        if(checkSocRights(doc, req.user, 0)){
            Formulaire.find({societeId:id}).sort({date:order}).exec((err,docs) => {
                if(err) return res.status(400).send(err);
                res.send(docs);
            })
        }
        else{
            res.status(403).json({
                error: 'Cette requête requiert des droits utilisateur sur la société'
            })
        }
    });

    /*Formulaire.find({societeId:id}).sort({date:order}).exec((err,docs) => {
        if(err) return res.status(400).send(err);
        res.send(docs);
    })*/
})

app.get('/api/getFormulaire', auth, (req,res) => {
    let id = req.query.id;
    //console.log(req.user.email);

    Formulaire.findOne({_id:id}).exec((err,doc) => {
        if(err) return res.status(400).send(err);
        Societe.findOne({_id:doc.societeId}, (err,socDoc) => {
            if(err) return res.status(400).send(err);
            if(checkSocRights(socDoc, req.user, 0)){
                res.send(doc);
            }
            else{
                res.status(403).json({
                    error: 'Cette requête requiert des droits utilisateur sur la société'
                })
            }
        });
    })
    //console.log(JSON.stringify(doc));
})

// GET CSV
//GET CSV FORMULAIRES
app.get('/api/CSVformulairesBySociete', auth, (req,res) => {
    let id = req.query.id;
    let order = req.query.order || 'asc';

    const fields = [
        'date',
        'CA',
        'FA',
        'CS',
        'FG',
        'AF',
        'CCT',
        'CLT',
        'CF',
        'Inv'
    ];
    Societe.findOne({_id:id}, (err,doc) => {
        if(err) return res.status(400).send(err);
        if(checkSocRights(doc, req.user, 0)){
            Formulaire.find({societeId:id}).sort({date:order}).exec((err,docs) => {
                if(err) return res.status(400).send(err);
                
                //console.log(docs);
                let csvRetour;
                try {
                    csvRetour = json2csv.parse(docs, { fields });
                } catch (err) {
                    return res.status(500).send(err);
                }
                
                const dateFormat = moment().format('YYYYMMDDhhmmss');
                //const filePath = path.join(__dirname, "..", "public", "exports", "formulaires_"+ id + "_" + dateFormat + ".csv")
                //res.sendfile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
                const filePath = path.join(__dirname, "..", "frontend", "public", "exports", "formulaires_"+ id + "_" + dateFormat + ".csv")
                console.log(filePath);
                const dirPath = path.join(__dirname, "..", "frontend", "public", "exports")

                if (!fs.existsSync(dirPath)){
                    fs.mkdirSync(dirPath);
                }

                fs.writeFile(filePath, csvRetour, function (err) {
                    if (err) {
                        return res.json(err).status(500);
                    }
                    else {
                        setTimeout(function () {
                            fs.unlinkSync(filePath); // delete this file after 300 seconds
                        }, 300000)
                        return res.json("/exports/formulaires_"+ id + "_" + dateFormat + ".csv");
                        //return res.json(filePath);
                    }
                });
                //res.send({success: true})
            })
        }
        else{
            res.status(403).json({
                error: 'Cette requête requiert des droits utilisateur sur la société'
            })
        }
    })
})

// POST
app.post('/api/register', auth, (req,res) => {
    if(req.user.privileges){
        const user = new User(req.body);

        user.save( (err,doc) => {
            if(err) return res.status(400).send(err);//return res.json({success:false});
            res.status(200).json({
                success:true,
                user: doc
            });
        });
    }
    else{
        res.status(403).json({
            error: 'Cette requête requiert les droits administrateur'
        })
    }
});

app.post('/api/registerInitial', (req,res) => {
    const user = new User(req.body);

    if(req.query.supersecret === 'SecretPass123')
    {
        user.save( (err,doc) => {
            if(err) return res.status(400).send(err);//return res.json({success:false});
            res.status(200).json({
                success:true,
                user: doc
            });
        });
    }
});

app.post('/api/login', (req,res) => {
    //const user = new User(req.body);

    //SI L'UTILISATEUR EST CONNECTE AVEC UN AUTRE COMPTE, LE DECONNECTER
    let token = req.cookies.auth;
    if(token){
        User.findByToken(token, (err,user) => {
            if(user){
                user.deleteToken(token, (err,user) => {
                })
            }
        })
    }

    User.findOne({'email':req.body.email}, (err,user) => {
        if(!user) return res.json({isAuth:false, message:'Adresse email non enregistrée'});

        user.comparePassword(req.body.password, (err,isMatch) => {
            if(!isMatch) return res.json({
                isAuth: false,
                message:'Mot de passe erroné'
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

app.post('/api/societe', auth, (req,res) => {
    const societe = new Societe(req.body);

    societe.save( (err,doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            success: true,
            societe: doc
        });
    });
});

app.post('/api/formulaire', auth, (req,res) => {
    const formulaire = new Formulaire(req.body);

    Societe.findOne({_id:formulaire.societeId}, (err,doc) => {
        if(err) return res.status(400).send(err);
        if(checkSocRights(doc, req.user, 1)){
            formulaire.save( (err,doc) => {
                if(err) return res.status(400).send(err);
                res.status(200).json({
                    success: true,
                    formulaire: doc
                });
            });
        }
        else{
            res.status(403).json({
                error: 'Cette requête requiert des droits administrateur sur la société'
            })
        }
    });
});

// UPLOAD CSV

//UPLOAD CSV FORMULAIRES
app.post('/api/CSVFormulaires', auth, upload.single('file'), (req,res) => {
    const fileRows = [];
    let formulairesAdded = [];

    Societe.findOne({_id:req.body.societeId}, (err,doc) => {
        if(err) return res.status(400).send(err);
        if(checkSocRights(doc, req.user, 1)){
            // open uploaded file
            csv.fromPath(req.file.path, {headers: true})
                .on("data", function (data) {
                    fileRows.push(data); // push each row
                })
                .on("end", function () {
                    //console.log(fileRows);
                    fs.unlinkSync(req.file.path);   // remove temp file

                    fileRows.forEach(formulaireData => {
                        let formulaire = new Formulaire({...formulaireData, societeId:req.body.societeId});
                        //console.log("formulaire is : " + formulaire.toString());
                        formulaire.save( (err,doc) => {
                            if(err){
                                formulairesAdded.push(false);
                            }
                            else{
                                formulairesAdded.push(true);
                            }
                        });
                    });

                    res.status(200).json({
                        success: true,
                        data: fileRows,
                        added: formulairesAdded
                    })
                })
        }
        else{
            res.status(403).json({
                error: 'Cette requête requiert des droits administrateur sur la société'
            })
        }
    });
});


// UPDATE
app.post('/api/updateSociete', auth, (req,res) => {
    Societe.findOne({_id:req.body._id}, (err,doc) => {
        if(err) return res.status(400).send(err);
        if(checkSocRights(doc, req.user, 1)){
            Societe.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err,doc) => {
                if(err) return res.status(400).send(err);
                res.json({
                    success: true,
                    doc
                });
            });
        }
        else{
            res.status(403).json({
                error: 'Cette requête requiert des droits administrateur sur la société'
            })
        }
    });
})

app.post('/api/updateFormulaire', auth, (req,res) => {
    Formulaire.findOne({_id:req.body._id}, (err,doc) => {
        if(err) return res.status(400).send(err);
        Societe.findOne({_id:doc.societeId}, (err,doc) => {
            if(err) return res.status(400).send(err);
            if(checkSocRights(doc, req.user, 1)){
                Formulaire.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err,doc) => {
                    if(err) return res.status(400).send(err);
                    res.json({
                        success: true,
                        doc
                    });
                });
            }
            else{
                res.status(403).json({
                    error: 'Cette requête requiert des droits administrateur sur la société'
                })
            }
        });
    });
})

// DELETE
app.delete('/api/deleteSociete', auth, (req,res) => {
    let id = req.query.id;

    Societe.findOne({_id:id}, (err,doc) => {
        if(err) return res.status(400).send(err);
        if(checkSocRights(doc, req.user, 1)){
            Societe.findByIdAndRemove(id, (err,doc) => {
                if(err) return res.status(400).send(err);

                Formulaire.find({societeId:req.query.id}).remove().exec((errF,docsF) => {
                    if(errF) return res.status(400).send(errF);
                    res.json(true);
                })
            });
        }
        else{
            res.status(403).json({
                error: 'Cette requête requiert des droits administrateur sur la société'
            })
        }
    });
})

app.delete('/api/deleteFormulaire', auth, (req,res) => {
    let id = req.query.id;
    Formulaire.findOne({_id:id}, (err,doc) => {
        if(err) return res.status(400).send(err);
        Societe.findOne({_id:doc.societeId}, (err,doc) => {
            if(err) return res.status(400).send(err);
            if(checkSocRights(doc, req.user, 1)){
                Formulaire.findByIdAndRemove(id, (err,doc) => {
                    if(err) return res.status(400).send(err);
                    res.json(true);
                });
            }
            else{
                res.status(403).json({
                    error: 'Cette requête requiert des droits administrateur sur la société'
                })
            }
        });
    });
})



if(process.env.NODE_ENV === 'production'){
    //const path = require('path');
    app.get('/exports/*', (req, res) => {
        const pathToExport = path.join(__dirname, "..", "frontend", "public", req.url);
        //console.log("SHOULD SEND EXPORT CSV")
        //console.log(path.resolve(__dirname, '../frontend', req.url))
        //res.sendFile(path.resolve(__dirname, '../frontend', req.url))
        //console.log(pathToExport);
        res.sendFile(pathToExport);
    })
    
    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("SERVER IS RUNNING ON PORT " + port);
});
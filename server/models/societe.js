const mongoose = require('mongoose');

const societeSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    adresse:{
        type:String,
        default:''
    },
    PDC:{
        type:String,
        default:''
    },
    admins:{
        type:Array, //LISTE DES USERID, A VERIFIER. POSSIBLE DE CHANGER EN 1 SEUL USER
        required:true
    },
    users:{
        type:Array
    }
});

const Societe = mongoose.model('Societe', societeSchema);

module.exports = { Societe }
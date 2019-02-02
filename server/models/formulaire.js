const mongoose = require('mongoose');

const formulaireSchema = mongoose.Schema({
    societeId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    CA:{
        type:Number,
        default:0
    },
    FA:{
        type:Number,
        default:0
    },
    CS:{
        type:Number,
        default:0
    },
    FG:{
        type:Number,
        default:0
    },
    AF:{
        type:Number,
        default:0
    },
    EBITDA:{
        type:Number,
        default:0
    },
    CCT:{
        type:Number,
        default:0
    },
    CLT:{
        type:Number,
        default:0
    },
    CF:{
        type:Number,
        default:0
    },
    Inv:{
        type:Number,
        default:0
    }
}, {timestamps: true});

const Formulaire = mongoose.model('Formulaire', formulaireSchema);

module.exports = { Formulaire }
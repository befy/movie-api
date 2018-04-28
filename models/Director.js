const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    name: String,
    surname: String,
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt :{
        type: Date,
        default: Date.now
    }
}, {versionKey: false});

module.exports = mongoose.model('director', DirectorSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt :{
        type: Date,
        default: Date.now
    }
}, {versionKey: false});

module.exports = mongoose.model('movie', MovieSchema);
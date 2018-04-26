const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://alper:alper_123@ds159509.mlab.com:59509/movie-api');
    mongoose.connection.on('open', () => {
        console.log("MongoDB: connected");
    });
    mongoose.connection.on('err', (err) => {
        console.log("MongoDB Error:", err);
        
    })

    mongoose.Promise = global.Promise;
}
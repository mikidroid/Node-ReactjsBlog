const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

mongoose.connect(process.env.MONGO_URL,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        //useCreateIndex: true, //make this true
        //(helps unique field work in DB)
        autoIndex: true, //make this also true
    })
    .then(() => {
        console.log('Connected to mongoDB');
    })

module.exports = mongoose
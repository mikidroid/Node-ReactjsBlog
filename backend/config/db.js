const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)

module.exports = mongoose
const mongoose = require('mongoose'),

wordleSchema = new mongoose.Schema({
    word: String,
    
})

module.exports = mongoose.model('Wordle', wordleSchema)
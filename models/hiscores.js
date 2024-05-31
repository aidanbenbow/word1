const mongoose = require('mongoose'),

hiScoreSchema = new mongoose.Schema({
    name: String,
    hiScore: Number,
    game: String
})

module.exports = mongoose.model('HiScore', hiScoreSchema)
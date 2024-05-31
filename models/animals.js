const mongoose = require('mongoose'),

animalsSchema = new mongoose.Schema({
    name: String,
    game: String
})

module.exports = mongoose.model('Animals', animalsSchema)
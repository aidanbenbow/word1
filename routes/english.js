const express = require('express'),
router = express.Router(),
HiScore = require('../models/hiscores'),
Animal = require('../models/animals'),
multer = require('multer')

const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')

require('dotenv').config()

const {s3} = require('../config/s3')
const animals = require('../models/animals')

const bucketname = process.env.AWS_BUCKET_NAME

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.get('/', (req,res)=>{
    res.render('english/index')
})

router.get('/creation', (req,res)=>{
    res.render('english/creation')
})

router.get('/animal', async (req,res)=>{

let random = Math.round(Math.random())
let games = ['cheese', 'animals']


 let type = games[random]

 
    let scores = await HiScore.find({game: type}).sort({hiScore: 'desc'}).limit(5)
    let ani = await Animal.find({game: type})
   
    res.render('english/animal', {scores: scores, animals: ani, type: type})
})

router.get('/edit', async (req,res)=>{
    const images = await Animal.find() 
   
    res.render('english/edit', {images: images})
})

router.post('/animalgame', upload.single('pic'), async (req,res)=>{
    let animal = new Animal({
        name: req.body.picname,
        game: req.body.game
    })

    const params = {
        Bucket: bucketname,
        Key: req.body.picname,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    } 
    const command = new PutObjectCommand(params)
     s3.send(command)

    console.log(params)

    await animal.save()
    res.redirect('/english/edit')
    
})

router.post('/animal', async (req,res)=>{
    let score = new HiScore({
        name: req.body.name,
        hiScore: req.body.hiScore,
        game: req.body.game
    })
   

    await score.save()
    res.redirect('/english/animal')
    
})

router.get('/gettingToKnowYou', (req,res)=>{
    res.render('english/gettingToKnowYou')
})

router.delete('/:id', async (req,res)=>{
const img = await  Animal.findById(req.params.id)

console.log(img.name)

const params = {
    Bucket: bucketname,
    Key: img.name,
} 
const command = new DeleteObjectCommand(params)
 s3.send(command)

console.log(params)

    await Animal.findByIdAndDelete(req.params.id)
    res.send('delete')
       // res.render('articles/index')
    })

module.exports = router
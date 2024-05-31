const express = require('express'),
router = express.Router(),
Wordle = require('../models/wordle')

router.get('/', (req,res)=>{
    res.render('games/index')
})

router.get('/edit', (req,res)=>{
    res.render('games/edit')
})


router.get('/guessWord', async (req,res)=>{
const words = await Wordle.find()
let random = Math.round(Math.random() * (words.length-1) )

const targetWord = words[random].word

    res.render('games/guessWord', {word: targetWord})
})

router.post('/guessWord', async (req,res)=>{
let word = new Wordle({
    word: req.body.wordle
})

await word.save()
    res.render('games/edit')
})

router.get('/WordGuess', (req,res)=>{
    res.render('games/wordGuess')
})

router.get('/animals', (req,res)=>{
    res.render('games/animals')
})

router.get('/sort', (req,res)=>{
    res.render('games/sort')
})

module.exports = router
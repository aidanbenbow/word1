const targetwords = [
    'human', 'light', 'birds', 'create', 'plant', 'earth', 'stars', 'water', 'first', 'third'
],

guessGrid = document.querySelector('[data-guess-grid]'),
alertContainer = document.querySelector('[data-alert-container]'),
keyboard = document.querySelector('[data-keyboard]'),

word_length = 5,
flip_animation_duration = 500,
dance_animation = 500,
ranNum = Math.floor(Math.random()*11),


targetWord = document.querySelector('.target-word').textContent




function start(){
document.addEventListener('click', mouseClick)
document.addEventListener('keydown', keyPress)
}

function stop(){
    document.removeEventListener('click', mouseClick)
    document.removeEventListener('keydown', keyPress)
    }

function mouseClick(e){

if(e.target.matches('[data-key]')){
    pressKey(e.target.dataset.key)
    return
}

if(e.target.matches('[data-enter]')){
    submitGuess()
    return
}

if(e.target.matches('[data-delete]')){
    deleteKey()
    return
}
}

function keyPress(e){
    
    if(e.key === 'ENter'){
        submitGuess()
        return
    }
if(e.key === 'Backspace' || e.key === 'Delete'){
    deleteKey()
}

if(e.key.match(/^[a-z]$/)){
    pressKey(e.key)
    return
}

}

function deleteKey(){
    const activetiles = getActivetiles(),
    lastTile = activetiles[activetiles.length-1]
if(lastTile == null) return
lastTile.textContent = ''
delete lastTile.dataset.state
delete lastTile.dataset.letter
}

function pressKey(key){
    const activetiles = getActivetiles()
    if(activetiles.length >= word_length) return
    const nextTile = guessGrid.querySelector(':not([data-letter]')
    nextTile.dataset.letter = key.toLowerCase()
    nextTile.textContent = key

nextTile.dataset.state = 'active'
}

function submitGuess(){
    const activetiles = [...getActivetiles()]
    if(activetiles.length !== word_length){
        showAlert('not enough letters')
        shakeTiles(activetiles)
        return
    }

    const guess = activetiles.reduce((word, tile)=>{
        return word + tile.dataset.letter
    }, '')

    stop()
    activetiles.forEach((...params) => flipTile(...params, guess))
}

function flipTile(tile, index, array, guess){
    const letter = tile.dataset.letter,
    key = keyboard.querySelector(`[data-key='${letter}'i]`)

    setTimeout(()=>{
tile.classList.add('flip')
    }, index * flip_animation_duration / 2)

    tile.addEventListener('transitionend', ()=>{
tile.classList.remove('flip')

if(targetWord[index] === letter){
    tile.dataset.state = 'correct'
    key.classList.add('correct')
} else if(targetWord.includes(letter)){
    tile.dataset.state = 'wrong-location'
    key.classList.add('wrong-location')
} else{
    tile.dataset.state = 'wrong'
    key.classList.add('wrong')
}
if(index === array.length-1){
    tile.addEventListener('transitionend', ()=>{
        start()
        checkWinLose(guess, array)
    }, {once:true})
}

    }, {once:true})
}

function getActivetiles(){
    return guessGrid.querySelectorAll('[data-state="active"]')

}

function showAlert(message, duration = 1000){
const alert = document.createElement('div')
alert.textContent = message
alert.classList.add('alert')
alertContainer.prepend(alert)
if(duration == null) return

setTimeout(()=>{
    alert.classList.add('hide')
    alert.addEventListener('transitionend', ()=>{
        alert.remove()
    })
}, duration)
}

function shakeTiles(tiles){
    tiles.forEach( tile =>{
        tile.classList.add('shake')
        tile.addEventListener('animationend', ()=>{
tile.classList.remove('shake')
        }, {once: true})
    })
}

function checkWinLose(guess, tiles){
    if(guess === targetWord){
        showAlert('you win', 5000)
        danceTiles(tiles)
        stop()
        return
    }

    const remainingTiles = guessGrid.querySelectorAll(':not([data-letter]')
    if(remainingTiles === 0){
        showAlert(targetWord, null)
        stop()
    }
}

function danceTiles(tiles){
    tiles.forEach( (tile, index) =>{
        setTimeout(()=>{
            tile.classList.add('dance')
            tile.addEventListener('animationend', ()=>{
    tile.classList.remove('dance')
            }, {once: true})
        }, index*dance_animation /5)

        })
}

start()
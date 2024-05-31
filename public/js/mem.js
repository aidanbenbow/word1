class memAudio{
    constructor(){
        this.flip = new Audio('../sounds/flip.wav')
        this.background = new Audio('../sounds/game-background1.mp3')
        this.match = new Audio('../sounds/match.wav')
        this.failure = new Audio('../sounds/failure.wav')
        
    }
    flip(){
        this.flip.play()
    }
    startMusic(){
        this.background.play()
       // this.background.addAttribute('loop')
    }
    match(){
        this.match.play()
    }
    failure(){
        this.failure.play()
    }
}




class flipGame{
    constructor(cards){
this.cards = cards
this.flips = document.querySelector('#flips')
this.audio = new memAudio()
this.hasFlipped = false
this.lockBoard = false
this.firstCard
 this.secondCard
 this.flip = new Audio('../sounds/flip.wav')
 this.match = new Audio('../sounds/match.wav')
        this.failure = new Audio('../sounds/failure.wav')
        this.matched = []
 
    }
    startGame(){
         this.shuffle()
           this.resetBoard()
    //  this.audio.startMusic()
        
    }
    shuffle(){
        this.cards.forEach(card =>{
            let rand = Math.floor(Math.random()*12)
            card.style.order = rand})
    }
    resetBoard(){
        [this.hasFlipped, this.lockBoard] = [false,false]
        [this.firstCard, this.secondCard] = [null, null]
    }
    canFlip(){
        return (!this.lockBoard && !this.secondCard)
    }
    flipCard(card){
       
        if(!this.hasFlipped){
            this.flip.play()
            this.flips.textContent++
            card.classList.add('flip')
            this.firstCard = card
            this.hasFlipped = true
            
            return
        } else{
            this.flip.play()
            this.hasFlipped = false
            this.secondCard = card
            this.flips.textContent++
            card.classList.add('flip')
        }
      
        
    
           this.checkMatch()
           
    } checkMatch(){
        let isMatch = this.firstCard.dataset.animal === this.secondCard.dataset.animal

isMatch ? this.disableCards() : this.flipCards()
    }
    disableCards(){
        this.match.play()
       this.firstCard.removeEventListener('click', this.flipCard)
    this.secondCard.removeEventListener('click', this.flipCard)
    this.matched.push(this.firstCard)
    this.matched.push(this.secondCard)

if(this.matched.length === this.cards.length){
    this.victory()
}
    this.resetBoard()
    } 
    flipCards(){
        this.lockBoard = true
        
    setTimeout(()=>{
        this.firstCard.classList.remove('flip')
        this.secondCard.classList.remove('flip')
        this.lockBoard = false
        this.failure.play()
    }, 1000)
    }
    victory(){
        document.querySelector('.game-overlay-over').classList.add('visible')
        let hiScore = document.querySelector('#hiScore')
        hiScore.value = this.flips.textContent

    }
}

function createCard(animal){
    const ani = animal
    const container = document.querySelector('.cardscontainer')
    const temp = document.createElement('template')
    temp.innerHTML = `<li class="thecard" data-animal=${ani}>
    <div class="thefront">
        <ion-icon name="help-outline"></ion-icon>
    </div>
    <div class="theback">
        <img src="https://apb-articlepics.s3.eu-north-1.amazonaws.com/${ani}_sm.png" alt="cardimg">
    </div>
</li>`

const clone = temp.content.cloneNode(true)
container.appendChild(clone)
    console.log(temp)
}

function createBoard(num){
    const anim = ['cat', 'ant', 'croc' ]
    for(i=0;i<anim.length;i++){
        
        createCard(anim[i])
        createCard(anim[i])
    }
}

function ready(){
    
    //createBoard(2)

    const overlayStart = document.querySelector('.game-overlay-start'),
    cards = document.querySelectorAll('.thecard'),
    game = new flipGame(cards)
    
    
    console.log(game)
    
    overlayStart.addEventListener('click', ()=>{
        overlayStart.classList.remove('visible')
        game.startGame()
    })
    
    cards.forEach(card => card.addEventListener(('click'), ()=>{
        game.flipCard(card)
    } ))
    
    }
    
    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', ready)
    } else {
        'ready'
    }


const hiScore = document.querySelector('#hiScore')








 
/*
function checkMatch(){
let isMatch = firstCard.dataset.animal === secondCard.dataset.animal

isMatch ? disableCards() : flipCards()

}

function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function flipCards(){
    lockBoard = true
    setTimeout(()=>{
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        lockBoard = false
    }, 1500)
}


(function shuffle(){
    cards.forEach(card =>{
        let rand = Math.floor(Math.random()*12)
        card.style.order = rand
    })
})()

*/



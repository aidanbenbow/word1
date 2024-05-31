const targetwords = [
    {word:'human',
     hint: 'a person'  }, 
     {word: 'light',
     hint: 'bright'  }, 
     {word:'birds',
     hint: 'fly'  }, 
     {word:'create',
     hint: 'make'  }, 
     {word:'plant',
     hint: 'grows'  }, 
     {word:'earth',
     hint: 'where we live'  }, 
     {word: 'stars',
     hint: 'shine'  }, 
     {word:'water',
     hint: 'necessary for life'  }, 
     {word:'first',
     hint: 'in front'  }, 
     {word:'third',
     hint: 'bronze medal'  }, 
    
]

const hin = document.querySelector('.hint'),
inputs = document.querySelector('.inputs'),
resetBtn = document.querySelector('.reset-btn'),
typingInput =  document.querySelector('.typing-input'),
guessLeft =  document.querySelector('.guess-left span'),
wrongLetter =  document.querySelector('.wrong-letter span')

let word, maxGuesses, incorrect = [], correct = []

function randomWord(){
    let ranObj = targetwords[Math.floor(Math.random()*targetwords.length)]
    word = ranObj.word
    maxGuesses = 8
    incorrect = [], correct = []

    hin.textContent = ranObj.hint
    guessLeft.textContent = maxGuesses
    wrongLetter.textContent = incorrect

    let html = ''
    for (let i = 0; i < word.length; i++) {
        html += '<input type="text" disabled>';
        
    }
inputs.innerHTML = html
}

randomWord()

function initGame(e){
let key = e.target.value
if(key.match(/^[A-Za-z]+$/) && !incorrect.includes(`${key}`) && !correct.includes(key)){
    
    if(word.includes(key) ){
        for (let i = 0; i < word.length; i++) {
            if(word[i]===key){
                correct.push(key)
                inputs.querySelectorAll('input')[i].value = key
            }
            
        } 
    }else{
        maxGuesses--
        incorrect.push(`${key}`)
    }
    guessLeft.textContent = maxGuesses
    wrongLetter.textContent = incorrect
    
}
typingInput.value = ''

setTimeout(()=>{



if(correct.length === word.length){
    alert('You Won')
    randomWord()
}
else if(maxGuesses<1){
    alert('Game Over')
    for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll('input')[i].value = word[i]
        
    }
}})
}

resetBtn.addEventListener('click', randomWord)
typingInput.addEventListener('input', initGame)
document.addEventListener('keydown', ()=> typingInput.focus())
inputs.addEventListener('click', ()=> typingInput.focus())
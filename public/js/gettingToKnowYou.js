const questions = ['Morning or evening person?', 'What is your favorite film?', 'Who do you admire the most?', 'What is your favorite food?', 'What is the last book you read?', 'In which period of history would you like to live?', 'What is your motto?', 'Preffered Season','What do you get excited about?', 'Favourite Singer', 'Favourite Actor', 'What is your greatest weakness?', 'Would you like to be famous?', 'Your greatest wish?', 
'Which abilities would you like to have?', 'Who is your favorite person from history?', 'What annoys you the most?', 'Which music do you most appreciate?', 'What is your strength?', 'What is your preferred television program?', 'Which person would you like to get to know?', 'Which qualities do you value in your friends?','Where would you like to live?', 'What makes you happy?', 'What is your dream?', 'What is your greatest achievement?', 'What is a funny memory?', 'What is your hobby?', 
],

questionArea = document.querySelector('#question'),
questionBtn = document.querySelector('.question-btn')

let rand

function randomNum(num){
return Math.floor(Math.random() * num)
}

rand = randomNum(12)

console.log(rand)

function start(){
    rand = randomNum(questions.length-1)
    questionArea.value = questions[rand]
}

questionBtn.addEventListener('click', start)
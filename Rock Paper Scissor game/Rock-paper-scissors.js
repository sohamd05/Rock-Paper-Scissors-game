const score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0,
    loses : 0,
    ties : 0
};

updateScoreElement();     

let isAutoplay = false;
let intervalid;



function autoplay(){

    if(!isAutoplay){
        intervalid = setInterval( ()  => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        },1000);
        isAutoplay = true;
    }
    
    else{
        clearInterval(intervalid);
        isAutoplay = false;
    }
}

document.querySelector('.js-rock-button').addEventListener('click' , () => {
    playGame('rock');
});

document.querySelector('.js-scissors-button').addEventListener('click',()=>{
    playGame('paper');
});

document.querySelector('.js-paper-button').addEventListener('click' , () =>{
    playGame('scissors');
})

document.querySelector('.js-autoplay-button').addEventListener('click' , () =>{
    autoplay();
})

document.querySelector('.js-reset-button').addEventListener('click' , () =>{
    score.wins = 0;
    score.loses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
});

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r'){
        playGame('rock');
    }

    else if (event.key === 'p'){
        playGame('paper');
    }

    else if(event.key === 's'){
        playGame('scissors');
    }
});

function playGame(playerMove){
const ComputerMove = pickComputerMove();
let result = '';

if(playerMove === 'scissors'){
    if(ComputerMove === 'rock'){
        result = 'You Lose';
    }

    else if( ComputerMove ==='paper'){
        result = 'You Win';
    }

    else if( ComputerMove === 'scissors'){
        result = 'TIE';
    }
}

else if(playerMove === 'rock'){
    if(ComputerMove === 'rock'){
        result = 'TIE';
    }

    else if( ComputerMove ==='paper'){
        result = 'You Lose';
    }

    else if( ComputerMove === 'scissors'){
        result = 'You Win';
    }
}

else{ //its paper
    if(ComputerMove === 'rock'){
        result = 'You Win';
    }

    else if( ComputerMove ==='paper'){
        result = 'TIE';
    }

    else if( ComputerMove === 'scissors'){
        result = 'You Lose';
    }
}

if(result === 'You Win'){
    score.wins += 1;
}

else if(result === 'You Lose'){
    score.loses += 1;
}

else if(result === 'TIE'){
    score.ties += 1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();
document.querySelector('.js-result').innerHTML = result;
document.querySelector('.js-moves').innerHTML = `You <img class = "images" src="images/${playerMove}-emoji.png" > <img class = "images" src = "images/${ComputerMove}-emoji.png">Computer`;

//alert(`You picked ${playerMove}. Computer picked ${ComputerMove}. ${result}\nWins : ${score.wins}, Loses : ${score.loses} , Ties : ${score.ties}`);
}

function updateScoreElement(){
document.querySelector('.js-score').innerHTML = `Wins : ${score.wins}, Loses : ${score.loses} , Ties : ${score.ties}`; 
}

function pickComputerMove(){
const randomNumber = Math.random();
let ComputerMove = '';
if(randomNumber >= 0 && randomNumber < 1/3){
    ComputerMove = 'rock'; 
}
else if(randomNumber >= 1/3 && randomNumber < 2/3) {
    ComputerMove = 'paper';
}
else if(randomNumber >= 2/3 && randomNumber < 1){
    ComputerMove = 'scissors';
}

return ComputerMove;
}
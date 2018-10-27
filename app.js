/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,roundScore=0,dice,activePlayer = 0,gameStatus,x;
scores = [0,0];
document.querySelector('#current-'+activePlayer).textContent = 0;
document.querySelector('#score-1').textContent = 0;
document.querySelector('#score-0').textContent = 0;
document.querySelector('.dice').style.display = 'none';
gameStatus = true;

function init(){
document.querySelector('#current-'+activePlayer).textContent = 0;
document.querySelector('#score-1').textContent = 0;
document.querySelector('#score-0').textContent = 0;
document.querySelector('.dice').style.display = 'none';
document.querySelector('.player-0-panel').classList.add('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.getElementById('name-0').innerHTML = "PLAYER 1";
document.getElementById('name-1').innerHTML = "PLAYER 2";
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
x=0;
gameStatus = true;
}

//roll dice button
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gameStatus)
    {
    //1. generate a random number
    dice =Math.floor(Math.random()*6)+1
    
    //2. display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.src = 'dice-'+ dice + '.png';
    diceDOM.style.display = 'block';
    
    //3. change player if it is 1
    if(dice!==1)
    {   
    	roundScore+=dice;
    	document.querySelector('#current-'+activePlayer).textContent = roundScore;
    }
    else 
    {
    	roundScore=0;
    	document.querySelector('#current-'+ activePlayer).textContent = roundScore;
    	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    	document.querySelector('.player-0-panel').classList.toggle('active');
    	document.querySelector('.player-1-panel').classList.toggle('active');
    	document.querySelector('.dice').style.display = 'none';
    }
   }
});

//hold button
document.querySelector('.btn-hold').addEventListener('click',function(){
	//add score to the global variable
	// change the UI
	//check if the current player won the game
	if(gameStatus)
	{
    x  = parseInt(document.querySelector('#score-'+activePlayer).textContent,10) ;
    x+=roundScore;
    document.querySelector('#score-'+activePlayer).textContent = x;

    if(x>=100) //winner winner chicken dinner
    {
    	document.getElementById('name-'+activePlayer).innerHTML = "WINNER";
    	document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    	gameStatus = false;
    }
    if(gameStatus){
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';
    roundScore=0;
    }
    }
});

document.querySelector('.btn-new').addEventListener('click',init);

var modal = document.querySelector('.modal');
document.querySelector('.btn-rule').addEventListener('click',function(){
   modal.style.display = 'block';
});
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


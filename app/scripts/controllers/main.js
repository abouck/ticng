var turn
var winArr = []
var alreadyWon = false
// function start()

function pgLoad(){
	
	var elems = document.getElementsByClassName('box');
	for(var i = 0; i < elems.length; i++) {
    elems[i].style.opacity = 0;
}
    var elems = document.getElementsByClassName('choice');
	for(var i = 0; i < elems.length; i++) {
    elems[i].setAttribute('onclick',"start()");
}

}

// sets background image (X or O depending in turn)
function setBg(){

document.getElementById("gamebox").setAttribute('style',"background-image:url(img/"+turn+".png)")
}

// Starts the game
function start(){
	turn = event.target.innerHTML
	document.getElementById('start').style.top = "-100000px"
	
	var elems = document.getElementsByClassName('box');
	for(var i = 0; i < elems.length; i++) {
    elems[i].style.opacity = 1;
    elems[i].innerHTML = ""
    elems[i].setAttribute('onclick',"fillBox()");
	}	
	document.getElementById('win').style.display = "none"
	setBg()
}

// Runs on win,
function win(x,y){
	
	var elems = document.getElementsByClassName('box');
	for(var i = 0; i < elems.length; i++) {
    elems[i].setAttribute('onclick',"");
	}
	document.getElementById('win').style.display = "block"
	document.getElementById('win').innerHTML = x+y+'<div class="choice chooseX" onclick="start()">X</div><div class="choice chooseO" onclick="start()">O</div>'
	alreadyWon = true
}




function fillBox()	{

// Determines if box is blank or not
	if(event.target.innerHTML == ''){
	
	event.target.innerHTML = turn
	
	}

	else
		alert('Choose an empty box!')

// Fills winArray for win eval
	for(i=1; i<=9; ++i)
	{
		winArr.push(
			document.getElementById("b"+i).innerHTML
			);
	}
	
// Win Condition logic

// Rows
	for(w=0; w<=6; w+=3)
	{
		if((winArr[w] != '') && (winArr[w] == winArr[w+1]) && (winArr[w+1] == winArr[w+2])){
		win(turn," Wins!!");
		}
	}

// Columns
	for(w=0; w<=2; ++w){
		if((winArr[w] != '') && (winArr[w] == winArr[w+3]) && (winArr[w+3] == winArr[w+6])){
		win(turn," Wins!!");
		}
	}

// Diagonals
	if((winArr[0] != '') && (winArr[0] == winArr[4]) && (winArr[4] == winArr[8])) {
	win(turn," Wins!!")
	}

	else if((winArr[2] != '') && (winArr[2] == winArr[4]) && (winArr[4] == winArr[6])) {
	win(turn," Wins!!")
	}
// Draw (won't let you win on last turn)
	var draw = 0
	for (var i =0; i <winArr.length; i++) {
		if(winArr[i] !="")
			draw++
			};
		if(draw == 9 && alreadyWon == false)
			win("Draw!","")
// Switches turn to other side
	if(turn == 'X')
		turn = 'O'
	else
		turn = 'X'

// Changes background image turn indicator

	setBg()
//	Clears winArr for win logic	
	winArr = []
}


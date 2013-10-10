'use strict';

angular.module('newTicApp')
	.controller('MainCtrl', function ($scope){
		
	$scope.ticArr=[[{value: '', r: 1, c: 1},{value: '', r: 1, c: 2},{value: '', r: 1, c: 3}],[{value: '', r: 2, c: 1},{value: '', r: 2, c: 2},{value: '', r: 2, c: 3}],
	[{value: '', r: 3, c: 1},{value: '', r: 3, c: 2},{value: '', r: 3, c: 3}]]

	var playerTurn = 1;
	$scope.fill = function(sqr,row) {
		if(sqr.value == "X" || sqr.value == "O")
		alert("Please Choose an Empty Square!")
		else {
			if(playerTurn % 2 == 1) 
				sqr.value = "X";
			else 
				sqr.value = "O";
	
		++playerTurn
		};
		$scope.win(row,sqr)

	}


$scope.win = function(row,sqr){		
	var winTest = 0
	var len = this.ticArr.length
// Win eval for rows
		for (var i=0; i<len; i++) {
			winTest = 0
			for (var o=0; o<len; o++) {
				switch(this.ticArr[i][o].value)
				{
					case "X":
						++winTest
						break;
					case "O":
						--winTest
						break;
				}
			};
			if(Math.abs(winTest) == 3)
		$scope.gameWon = true
		}
		
// Win eval for columns
		for (var i=0; i<len; i++) {
			winTest = 0
			for (var o=0; o<len; o++) {
				switch(this.ticArr[o][i].value)
				{
					case "X":
						++winTest
						break;
					case "O":
						--winTest
						break;
				}
			};
			if(Math.abs(winTest) == 3) 
			$scope.gameWon = true

		};
	// Diagonals eval
	var diagTest1 = 0;
	var diagTest2 = 0;
	for(var i = 0;i < len ; ++ i)
	{
		// Diagonals going from upper-left to lower-right
		switch(this.ticArr[i][i].value)
			{
				case "X":
					++diagTest1;
					break;
				case "O":
					--diagTest1;
					break;
			}
		// Diagonals going from upper-right to lower-left
		switch(this.ticArr[i][(len-1)-i].value)
			{
				case "X":
					++diagTest2;
					break;
				case "O":
					--diagTest2;
					break;
			}
			
		if(diagTest1 == len) {
			alert("Dude X won on diagonal \\");
		$scope.gameWon = true}
		if(diagTest1 == -len){
			alert("Dude O won on diagonal \\");
			$scope.gameWon = true}
		if(diagTest2 == len) {
			alert("Dude X won on diagonal /");
			$scope.gameWon = true}
		if(diagTest2 == -len) {
			alert("Dude O won on diagonal /");
			$scope.gameWon = true}

	}
	// Cats game eval
	$scope.cats = false
	var catsTest=0
	for (var i=0; i<len; i++) {
			winTest = 0
			for (var o=0; o<len; o++) {
				if(this.ticArr[i][o].value != "")
						++catsTest		
				};
	}
	if(catsTest == 9 && $scope.gameWon != true) {
	$scope.cats = true
	}
	}	
	});
	




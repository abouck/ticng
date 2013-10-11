'use strict';

angular.module('newTicApp')
	.controller('MainCtrl', function ($scope, angularFire){
	$scope.games = [];
	$scope.queue = {};
	$scope.turnWait = false;

	var games = new Firebase("https://ticsntacs.firebaseio.com/games");
	angularFire(games, $scope, "games").then(function() {

		var queue = new Firebase("https://ticsntacs.firebaseio.com/queue");
		angularFire(queue, $scope, "queue").then(function() {
			if($scope.queue.gameId == undefined) {
				console.log("I'm player 1");
				$scope.player = "p1";

				var newGame = {
					board: [[{value: '', r: 1, c: 1},{value: '', r: 1, c: 2},{value: '', r: 1, c: 3}],
							[{value: '', r: 2, c: 1},{value: '', r: 2, c: 2},{value: '', r: 2, c: 3}],
							[{value: '', r: 3, c: 1},{value: '', r: 3, c: 2},{value: '', r: 3, c: 3}]],
					turn: "p1",
					win: false,
					turnCount: 0
				};

				$scope.gameId = $scope.games.push(newGame) - 1;
				$scope.queue.gameId = $scope.gameId;
				console.log("Player 1's game is: " + $scope.gameId);

			} else {
				console.log("I'm player 2");
				$scope.player = "p2";

				$scope.gameId = $scope.queue.gameId;
				$scope.queue = {};
				console.log("Player 2's game is: " + $scope.gameId);
			}
		});
	});

// End of Firebase stuff

	$scope.fill = function(sqr,row) {
		
		if(sqr.value == "X" || sqr.value == "O")
		alert("Please Choose an Empty Square!")
		else {
			if($scope.games[$scope.gameId].turnCount % 2 != 1) 
				sqr.value = "X";
			else 
				sqr.value = "O";
	
		++$scope.games[$scope.gameId].turnCount
		};
		$scope.win(row,sqr)

	 
}


$scope.win = function(row,sqr){		
	$scope.turnWait = false
	var winTest = 0
	var len = $scope.games[$scope.gameId].board.length
// Win eval for rows
		for (var i=0; i<len; i++) {
			winTest = 0
			for (var o=0; o<len; o++) {
				switch($scope.games[$scope.gameId].board[i][o].value)
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
				switch($scope.games[$scope.gameId].board[o][i].value)
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
		switch($scope.games[$scope.gameId].board[i][i].value)
			{
				case "X":
					++diagTest1;
					break;
				case "O":
					--diagTest1;
					break;
			}
		// Diagonals going from upper-right to lower-left
		switch($scope.games[$scope.gameId].board[i][(len-1)-i].value)
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
				if($scope.games[$scope.gameId].board[i][o].value != "")
						++catsTest		
				};
	}
	if(catsTest == 9 && $scope.gameWon != true) {
	$scope.cats = true
	}
	} 

		
	});
	




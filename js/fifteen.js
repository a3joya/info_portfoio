// 	Aaron Joya
// 	Student: 1236572
// 	Assignemnt #8 Date: 5/26/2014
// 	TA: Zach Cava 	Section: CD
//	This provides a playable fifteen puzzle javascript game including functionalities that 
//	highlight, move, and shuffle puzzle pieces on the webpage. 
(function() {
	"use strict";
	var emptyRow = 3;
	var emptyColumn = 3;
	var rAndC = 4;
	var pixelSize = 100;

//	Initial created funtionalities upon load of webpage.
	window.onload=function() {
		createGrid();
		var boxes = document.querySelectorAll("#puzzlearea .box");
		for (var i = 0; i < boxes.length; i++) {
			boxes[i].onclick = mover;
		}
		isMoveable();
		var shufflebtn = document.getElementById("shufflebutton");
			shufflebtn.onclick = shuffle;
	};

//	This function creates the playable puzzle pieces for webpage.
	function createGrid() {
		for(var i = 1; i < Math.pow(rAndC, 2); i++) {
			var box = document.createElement("div");
			box.className = "box";
			document.getElementById("puzzlearea").appendChild(box);	
		}
		styleBoxes();
	}

//	This function styles the and sets playable puzzle pieces for the 
//	fiftenn puzzle webpage.
	function styleBoxes() {
		var boxes = document.querySelectorAll("#puzzlearea .box");
		var row = 0;
		var column = 0;
			for(var i = 0; i < boxes.length; i++) {	
			var number = document.createTextNode(i + 1);
			boxes[i].id = "" + column + row;
			boxes[i].style.top = ((column ) *  pixelSize) + "px";
			boxes[i].style.left = ((row ) * pixelSize) + "px";
			boxes[i].style.backgroundImage = "url(background/puzzleBackground.jpg)";
			boxes[i].style.backgroundPosition =  (row * -pixelSize)+ "px" + " " + (column * - pixelSize) + "px"; 
			boxes[i].appendChild(number);
			if(row == 3) {
				row = 0;
				column++;
			} else {
				row++;
			}
			
		}
	}

//	Helper method allowing passable parameters to moveIt function.	
	function mover() {
		moveIt(this);
	}

//	Takes in a tile parameter and if able to move allows user to click to move tile
//	to empty position.
	function moveIt(tile) {
 		var mousedOverBox = parseInt(tile.id);
		var mousedOverRow = mousedOverBox % 10;
		var mousedOverColumn = parseInt(mousedOverBox / 10);
		if (tile.classList.contains("eligible")) {
				tile.style.top = (emptyColumn * pixelSize) + "px";
				tile.style.left =(emptyRow * pixelSize)+ "px";
				tile.id = "" + (emptyColumn) + (emptyRow);
				emptyRow = mousedOverRow ;
				emptyColumn = mousedOverColumn;	
		}
		isMoveable();
	}	

//	Provides functionality to shuffle puzzle pieces preserving solvability.
	function shuffle() {
		var canMove = document.querySelectorAll("#puzzlearea .box");
		for(var i = 0; i < 1000; i++) {
			var neighbors = [];
			for (var j = 0; j < canMove.length; j++) {
				if(canMove[j].classList.contains("eligible")){
					neighbors.push(canMove[j].id);
				}
			}
			var num = parseInt(Math.random() * (neighbors.length));
			var validate = document.getElementById(neighbors[num]);
			moveIt(validate);
		 }	
	}

//	Function checks which boxes are moveable and implements added style if 
//	puzzle piece is eligible to move.
	function isMoveable() {
		var boxesId = document.querySelectorAll("#puzzlearea .box");
		for (var i = 0; i < boxesId.length; i++) {
			var boxRow = (boxesId[i].id) % 10;
			var boxColumn = parseInt(boxesId[i].id / 10);
			if((boxRow - 1) == emptyRow && boxColumn == emptyColumn || 
				(boxRow + 1) == emptyRow && boxColumn == emptyColumn ||
				boxRow == emptyRow && (boxColumn - 1) == emptyColumn ||
				boxRow == emptyRow && (boxColumn + 1) == emptyColumn) {
				boxesId[i].classList.add("eligible");
			} else {
				boxesId[i].classList.remove("eligible");
			}
		}
	}
})();

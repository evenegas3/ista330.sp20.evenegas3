/*
Erick Venegas
CSC337, Spring 2019
fifteen.js

The Fifteen Puzzle (also called the Sliding Puzzle) is a simple classic game
consisting of a 4x4 grid of numbered squares with one square missing.
The object of the game is to arrange the tiles into numerical order by repeatedly
sliding a square that neighbors the missing square into its empty space.
*/

"use strict";
(function() {
	let GHOSTX;
	let GHOSTY;

	window.onload = function() {
		start();
		document.getElementById("shufflebutton").onclick = shuffle;

		if(document.getElementById("background")){
			document.getElementById("size").onchange = start;
			document.getElementById("background").onchange = setImage;
		}
	};

	// Simple helper variable to reduce globals
	let info = {
		getChange: function() { 
			return (400/4);
		}
	};

	/**
	* On page load, start function starts a new game.
	* Function will delete previous puzzle game, and set new pieces accordingly.
	* @parameters {none}
	* @returns {None}
	*/
	function start(){
		const area = 400;
		const tiles = 3;
		let CHANGE = info.getChange();
		GHOSTX = ((tiles - 1) * CHANGE);
		GHOSTY = ((tiles - 1) * CHANGE);

		let puzzlepieces = document.querySelectorAll(".puzzlepiece");
		if(puzzlepieces[0]){
			for(let i  = 0; i < puzzlepieces.length; i++) {
				puzzlepieces[i].parentNode.removeChild(puzzlepieces[i]);
			}
		}
		createPuzzle(tiles);
	}

	/**
    * Creates all the puzzlepieces and places them in correct places
	* with identifying numbers and correct background image.
    * @parameters {tiles} -- an integer, used for 4x4 grid.
    * @returns {None}
    */
	function createPuzzle(tiles) {
		let startX = 0;
		let startY = 0;
		let CHANGE = info.getChange();

		for(let i = 1; i < (tiles * tiles); i++) {
			let rec = document.createElement("div");
			rec.className = "puzzlepiece";
			rec.style.backgroundPosition = "-" + startX + "px -" + startY + "px";
			rec.style.height = (CHANGE - 2) + "px";
			rec.style.width = (CHANGE - 2) + "px";
			rec.style.lineHeight = CHANGE + "px";
			rec.style.fontSize = ((CHANGE * 30) / 100) + "pt";
			rec.innerHTML = i;
			rec.style.left = startX + "px";
			rec.style.top = startY + "px";
			document.getElementById("puzzlearea").appendChild(rec);

			rec.onmouseover = mouseOverFunction;
			rec.onmouseout = mouseOutFunction;
			rec.onclick = mouseClickedFunction;

			if(startX > (400 - (2 * CHANGE))){
				startX = 0;
				startY += CHANGE;
			}else{
				startX += CHANGE;
			}
			movePiece();
		}
	}

	/**
    * Itterates through and checks to see which piece is next the empty piece
    * Function gets and sets those pieces to "moveable"
    * @parameters {none}
    * @returns {None}
    */
	function movePiece(){
		let piece = document.querySelectorAll(".puzzlepiece");
		let CHANGE = info.getChange();

		for(let i  = 0; i < piece.length; i++) {
			let currX = parseInt(piece[i].style.left);
			let currY = parseInt(piece[i].style.top);
			if(currX === GHOSTX && (currY === (GHOSTY + CHANGE) || currY === (GHOSTY - CHANGE))){
				piece[i].movable = true;
			}else if(currY === GHOSTY && (currX === (GHOSTX + CHANGE) || currX === (GHOSTX - CHANGE))){
				piece[i].movable = true;
			}else {
				piece[i].movable = false;
			}
		}
	}

	/**
    * Function shuffle is called when the user presses "shuffle button"
    * Itterates through mutliple times in order to reduce the chance of getting same puzzle
    * @parameters {none}
    * @returns {None}
    */
	function shuffle(){
		for(let i = 0; i < 10000; i++){
			let list = [];
			let piece = document.querySelectorAll(".puzzlepiece");

			for(let j  = 0; j < piece.length; j++) {
				if(piece[j].movable){
					list.push(piece[j]);
				}
			}
			let random = Math.floor(Math.random() * list.length);
			move(list[random]);
		}
	}

	/**
    * Moves the piece that is passed in to the empty space.
    * @parameters {rect} -- a piece of the puzzle
    * @returns {None}
    */
	function move(rect){
		let oldX = parseInt(rect.style.left);
		let oldY = parseInt(rect.style.top);
		rect.style.left = GHOSTX + "px";
		rect.style.top = GHOSTY + "px";

		GHOSTX = oldX;
		GHOSTY = oldY;
		movePiece();
	}

	/**
    * Sets the background image of each puzzle piece, also keeps old location
    * @parameters {none}
    * @returns {None}
    */
	function setImage(){
		let bgd = document.getElementById("background");
		let urlImage = bgd.children[bgd.selectedIndex].value;
		let puzzlepieces = document.querySelectorAll(".puzzlepiece");

		for(let i  = 0; i < puzzlepieces.length; i++) {
			let pos = puzzlepieces[i].style.backgroundPosition;
			puzzlepieces[i].style.backgroundPosition = pos;
			puzzlepieces[i].style.background = "url(" + urlImage + ")";
		}
	}

	/**
    * When the mouse is hovering over a moveale puzzle piece
	* Function will be called and change piece to red
    * @parameters {none}
    * @returns {None}
    */
	function mouseOverFunction(){
		if(this.movable){
			this.classList.add("puzzlepiecehover");
		}else{
			this.classList.add("puzzlepiecedhover");
		}
	}

	/**
    * When a piece isn't moveable or isn't hovered over, color will return to default
    * @parameters {none}
    * @returns {None}
    */
	function mouseOutFunction(){
		this.classList.remove("puzzlepiecehover");
		this.classList.remove("puzzlepiecedhover");
	}

	/**
    * Function checks to see if piece is moveable, if so do so.
    * @parameters {none}
    * @returns {None}
    */
	function mouseClickedFunction(){
		if(this.movable){
			move(this);
		}
	}

}());



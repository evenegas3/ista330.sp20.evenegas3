/*
Erick Venegas
*/

"use strict";
(function() {

	window.onload = function() {
		fetch_info();
		im();
		// l();
		// start_quizes();
		// start();
		// document.getElementById("shufflebutton").onclick = shuffle;

		// if(document.getElementById("background")){
		// 	document.getElementById("size").onchange = start;
		// 	document.getElementById("background").onchange = setImage;
		// }
	};

	function fetch_info() {
		// body...
	}

	function im() {
		var x = document.createElement("IMG");
		x.setAttribute("src", "background.png");
		x.setAttribute("width", "304");
		x.setAttribute("height", "228");
		x.setAttribute("alt", "The Pulpit Rock");
		document.body.appendChild(x);

		var x = document.createElement("IMG");
		x.setAttribute("src", "background.png");
		x.setAttribute("width", "304");
		x.setAttribute("height", "228");
		x.setAttribute("alt", "The Pulpit Rock");
		document.body.appendChild(x);
	}

	// function l() {

	// 	var elem = document.createElement("img");
	// 	elem.className = "puzzlepiece";
	// 	elem.setAttribute("src", "background.png");
	// 	elem.setAttribute("height", "100");
	// 	elem.setAttribute("width", "100");
	// 	elem.setAttribute("alt", "Flower");
	// 	document.getElementById("placehere").appendChild(elem);
	// 	elem.onclick = alert('');

	// }

	// window.onload=function(){
	
	// }

	function start_quizes(){
		for(let i = 1; i < (tiles * tiles); i++) {
			let rec = document.createElement("div");
			let CHANGE = info.getChange();

			// rec.className = "puzzlepiece";
			rec.style.backgroundPosition = "-" + startX + "px -" + startY + "px";
			rec.style.height = (CHANGE - 2) + "px";
			rec.style.width = (CHANGE - 2) + "px";
			// rec.style.lineHeight = CHANGE + "px";
			// rec.style.fontSize = ((CHANGE * 30) / 100) + "pt";
			// rec.innerHTML = i;
			// rec.style.left = startX + "px";
			// rec.style.top = startY + "px";
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
	// function start(){
	// 	const area = 400;
	// 	const tiles = 4;
	// 	let CHANGE = info.getChange();
	// 	GHOSTX = ((tiles - 1) * CHANGE);
	// 	GHOSTY = ((tiles - 1) * CHANGE);

	// 	let puzzlepieces = document.querySelectorAll(".puzzlepiece");
	// 	if(puzzlepieces[0]){
	// 		for(let i  = 0; i < puzzlepieces.length; i++) {
	// 			puzzlepieces[i].parentNode.removeChild(puzzlepieces[i]);
	// 		}
	// 	}
	// 	createPuzzle(tiles);
	// }

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



}());



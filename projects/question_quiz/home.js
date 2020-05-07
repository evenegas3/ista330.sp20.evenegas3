/*
Erick Venegas
*/

"use strict";
(function() {

	window.onload = function() {
		document.getElementById('load').onclick = hardcode;
		document.getElementById('div0').onclick = quiz0;
		document.getElementById('div1').onclick = quiz1;


	};

	function hardcode() {
		let cars = ['music.png', 'background.png'];		
		for (let i = 0; i < cars.length; i++) {
			let s = `div${i}`;
			let div = document.getElementById(s);
			div.src = cars[i];
			div.style.display = 'inline';
		}
	}

	function quiz0() {
		console.log('div0');
	}

	function quiz1() {
		console.log('div1');
	}








	// Simple helper variable to reduce globals
	let info = {
		getChange: function() { 
			return (400/4);
		}
	};





}());


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
}());

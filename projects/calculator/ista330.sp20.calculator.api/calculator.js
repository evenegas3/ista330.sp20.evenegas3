// Erick Venegas
// ISTA330
// 01-24-20
// calculator.js

function test(){
	let message = document.getElementById("result");
	let expression = document.getElementById("input").value;
	submit();
	message.innerHTML = expression;
}

function check(prepped){
	let firstChar = prepped[0];
	let lastChar = prepped[prepped.length - 1];
	var symbols = ["+", "-", "=", "*", "/"];

	if(symbols.includes(firstChar) || symbols.includes(lastChar)){
		return false;
	}

	if (/[a-zA-Z]/.test(prepped.join(""))) {
		return false;
	}
}

function edgeCases(array){
	if(/([!@#$])/.test(array)){
		return false;
	}

	for(let i =0; i < array.length; i++){
		if(array[i] == "*" && array[i+1] == ""){
			return false;
		}
	}
}

let calculate = function(expression) {
	let temp = expression.split(/([-+*\/])/);

	console.log(temp);

	for(let i = 0; i < temp.length; i++){
		if(temp[i] == ""){
			temp.splice(i, 1);
		}

		if(check(temp) == false){
			return "SyntaxError";
		}

		temp[i] = temp[i].trim();

		for(let n of temp[i]){
			if(n == " "){
				return "SyntaxError";
			}
		}
	}

	if(edgeCases(temp) == false){
		return "SyntaxError";
	}

	let a = exponents(temp);
	let b = divmulti(a);
	let answer = addsub(b);

	return answer;
}


module.exports = {calculate:calculate};

function addsub(express){
	for(let i = 0; i < express.length; i++){
		if(express[i] == "+"){
			let temp = parseFloat(express[i-1]) + parseFloat(express[i+1]);
			express[i-1] = temp;
			express.splice(i, 2);
			i = i - 1;
		}

		else if(express[i] == "-"){
			let temp = parseFloat(express[i-1]) - parseFloat(express[i+1]);
			express[i-1] = temp;
			express.splice(i, 2);
			i = i - 1;
		}
	}

	return express[0];
}



function divmulti(express){
	for(let i = 0; i < express.length; i++){
		if(express[i] == "/"){
			let temp = parseFloat(express[i-1]) / parseFloat(express[i+1]);
			express[i-1] = temp;
			express.splice(i, 2);
			i = i - 1;
		}

		else if(express[i] == "*"){
			let temp = parseFloat(express[i-1]) * parseFloat(express[i+1]);
			express[i-1] = temp;
			express.splice(i, 2);
			i = i - 1;
		}
	}

	return express;
}

function exponents(express){
	for(let i = express.length-1; i >=0; i--){
		if(express[i] == "*"){
			if(express[i-1] == "*"){
				temp1 = parseFloat(express[i-2]) ** parseFloat(express[i+1]);
				express[i-2] = temp1;
				express.splice(i-1, 3);
				i = i-2;
			}
		}
	}
	return express;
}

function submit(){
	let inputField = document.getElementById("input").value;
	let url = "http://localhost:3001?expression=" + inputField;

	fetch(url)
	.then(response => {
		if(response.status == 200) {
			return response.json().then(data => {
				return {status: response.status, data};
			});
		} else {
			console.log('Server error! Please check logs');
			return Promise.resolve();
		}
	})
	.then(result => {
		var finalMessage = result.data.express;

		if(finalMessage.split("=")[1] === "SyntaxError"){
			finalMessage = "SyntaxError";
		}

		document.getElementById("result").innerHTML = finalMessage;
	});

}



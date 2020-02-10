// Erick Venegas
// ISTA330
// 01-24-20
// calculator.js

let calculate = function(expression) {
	// let temp = expression.split(/([-+*\/])/);
	let decode = expression.replace(/%20/g, " ");
	let stripped = decode.replace(/\s+/g, '');
	// let punctuations = "*/+-=";
	let test = stripped.split(/([-+*\/])/);

	for(let i=0; i < test.length; i++){
		if(test[i] == ""){
			test.splice(i, 1);
			

		}
	}

	let prepped = test;
	let firstChar = prepped[0];
	let lastChar = prepped[prepped.length - 1];
	var symbols = ["+", "-", "=", "*", "/"];


	if(symbols.includes(firstChar) && symbols.includes(lastChar)){
		return "illegal";
	}

	if (/[a-zA-Z]/.test(prepped.join(""))) {
		return "illegal";
	}
	
	exponents(prepped);
	division(prepped);
	multiplication(prepped);
	addition(prepped);
	subtraction(prepped);

	let answer = prepped;

	return answer;



	// console.log(prepped);

	// var chars = stripped.split('');
	// let firstChar = stripped[0];
	// let lastChar = stripped.charAt(stripped.length - 1);
	// var symbols = ["+", "-", "=", "*", "/"];

	// if(symbols.includes(firstChar) && symbols.includes(lastChar)){
	// 	return "illegal";
	// }


	// let temp = addSubtract(stripped);
	// return temp;
	// answer = eval(stripped);
	// return answer;
}
module.exports = {calculate:calculate};

function multiplication(express){
	for(let i = 0; i < express.length; i++){
		if(express[i] == "*"){
			let temp = parseInt(express[i-1]) * parseInt(express[i+1]);
			express[i-1] = temp;
			express.splice(i, 2);
			i = i - 1;
		}
	}
}

function subtraction(express){
	for(let i = 0; i < express.length; i++){
		if(express[i] == "-"){
			let temp = parseInt(express[i-1]) - parseInt(express[i+1]);
			express[i-1] = temp;
			express.splice(i, 2);
			i = i - 1;
			// console.log("addition method: " + express);
		}
	}
}

function addition(express){
	for(let i = 0; i < express.length; i++){
		if(express[i] == "+"){
			let temp = parseInt(express[i-1]) + parseInt(express[i+1]);
			express[i-1] = temp;
			express.splice(i, 2);
			i = i - 1;
			// console.log("addition method: " + express);
		}
	}
}

function division(express){
	for(let i = 0; i < express.length; i++){
		if(express[i] == "/"){
			let temp = parseInt(express[i-1]) / parseInt(express[i+1]);
			express[i-1] = temp;
			express.splice(i, 2);
			i = i - 1;
			// console.log(express);
		}
	}

	// console.log(express);
}

function exponents(express){
	for(let i = express.length-1; i >=0; i--){
		if(express[i] == "*"){
			if(express[i-1] == "*"){
				temp1 = parseInt(express[i-2]) ** parseInt(express[i+1]);
				express[i-2] = temp1;
				express.splice(i-1, 3);
				i = i-2;
			}
		}
	}

	// return express;
}


function addSubtract(str) {
	return (str.replace(/\s/g, '').match(/[+-]?([0-9\.]+)/g) || []).reduce((acc, v) => +acc + +v);
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

		if(finalMessage.split("=")[1] === "illegal"){
			finalMessage = "SyntaxError";
		}
		
		// else if(finalMessage.split("=")[1] === "NaN"){
		// 	finalMessage = "NaN";
		// }

		document.getElementById("result").innerHTML = finalMessage;
	});

}

// Erick Venegas
// ISTA330
// 01-24-20
// calculator.js

// function 

// function prepareInfo(expression){
// 	/**
// 	 * Takes in a string expression and removes whitespace and creates an array of expression
// 	 */
// 	let decode = expression.replace(/%20/g, " ");
// 	let stripped = decode.replace(/\s+/g, '');
// 	let test = stripped.split(/([-+*\/])/);

// 	for(let i=0; i < test.length; i++){
// 		if(test[i] == ""){
// 			test.splice(i, 1);
// 		}
// 	}
// 	return test;

// }

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

let calculate = function(expression) {
	let temp = expression.split(/([-+*\/])/);
	// console.log(temp);

	for(let i = 0; i < temp.length; i++){
		if(temp[i] == ""){
			temp.splice(i, 1);
		}

		temp[i] = temp[i].trim();

		// if(    !(  /([-+*\/])/.test(temp[i])   ) || !/[0-9]+/.test(temp[i])){
		// 	return "SyntaxError";
		// }


		for(let n of temp[i]){
			if(n == " "){
				return "SyntaxError";
			}
		}
		// console.log("askdmksamd");


	}

	//itterate through and if its a number, check that the next one is an operator, else error
	//if its a number, then operorator, if its the *, then the next is either number or *,
	//if its number, *, *, then then it should be a number, else error
	if(check(temp) == false){
		return "SyntaxError";
	}


	let a = exponents(temp);
	let b = divmulti(a);

	return addsub(b);


	// console.log(exponents(temp));
	// for(let i = 0; i < temp.length; i++){
		// if(temp[i] == ""){
		// 	temp.splice(i, 1);
		// }
	// 	temp[i] = temp[i].trim();

		// if(!(/([-+*\/])/.test(temp[i])) || !(/[0-9]+/).test(temp[i])){
		// 	return "SyntaxError";
		// }





	// }

	// console.log("temp=" + temp);
	// let n = exponents(temp);
	// console.log(n);


	let answer = temp;
	// console.log(n);

	// console.log("answer:: " + answer);
	return answer;
}

module.exports = {calculate:calculate};



// function isInt(n) {
// 	return n % 1 === 0;
//  }

// function multiplication(express){
// 	for(let i = 0; i < express.length; i++){

// 	}

// 	return
// }



// function subtraction(express){
// 	for(let i = 0; i < express.length; i++){
		// if(express[i] == "-"){
		// 	let temp = parseFloat(express[i-1]) - parseFloat(express[i+1]);
		// 	express[i-1] = temp;
		// 	express.splice(i, 2);
		// 	i = i - 1;
		// 	// console.log("addition method: " + express);
		// }
// 	}
// }

function addsub(express){
	for(let i = 0; i < express.length; i++){
		if(express[i] == "+"){
			let temp = parseFloat(express[i-1]) + parseFloat(express[i+1]);
			express[i-1] = temp;
			express.splice(i, 2);
			i = i - 1;
			// console.log("addition method: " + express);
		}

		if(express[i] == "-"){
			let temp = parseFloat(express[i-1]) - parseFloat(express[i+1]);
			express[i-1] = temp;
			express.splice(i, 2);
			i = i - 1;
			// console.log("addition method: " + express);
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
			// console.log(express);
		}

		else if(express[i] == "*"){
			let temp = parseFloat(express[i-1]) * parseFloat(express[i+1]);
			express[i-1] = temp;
			express.splice(i, 2);
			i = i - 1;
		}


		
	}

	return express;
	// console.log(express);
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
	// console.log("in exponents method");
	// console.log(express);
	return express;
}


// function addSubtract(str) {
// 	return (str.replace(/\s/g, '').match(/[+-]?([0-9\.]+)/g) || []).reduce((acc, v) => +acc + +v);
// }

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
		
		// else if(finalMessage.split("=")[1] === "NaN"){
		// 	finalMessage = "NaN";
		// }

		document.getElementById("result").innerHTML = finalMessage;
	});

}








	// 	return "SyntaxError";
	// }
	// console.log(temp);


	// while(prepped.length != 1){
	// 	for(let i=0; i<prepped.length; i++){
	// 		if(prepped[i] == "/"){
	// 			divisionTest(prepped, i);
	// 			console.log(prepped);
	// 			console.log(prepped[i]);
	// 		}
	// 		if(prepped[i] == "*" && prepped[i+1] != "**"){
	// 			multiTest(prepped, i);
	// 			console.log(prepped);
	// 		}
	// 		if(prepped[i] == "-"){
	// 			subTest(prepped, i);
	// 			console.log(prepped);
	// 		}
	// 		if(prepped[i] == "+"){
	// 			addTest(prepped, i);
	// 			console.log(prepped);
	// 		}
	// 	}

	// }

	// for(let i=0; i<prepped.length; i++){
	// 	if(prepped[i] == "/"){
	// 		divisionTest(prepped, i);

	// 	}
	// 	if(prepped[i] == "*"){
	// 		multiTest(prepped, i);
	// 	}
	
	// 	console.log(prepped);
	// }



	// console.log(prepped);
	// exponents(prepped);
	// multiplication(prepped);
	// console.log(prepped);
	// division(prepped);
	// console.log(prepped);
	// addition(prepped);
	// console.log(prepped);
	// subtraction(prepped);
// Erick Venegas
// ISTA330
// 01-24-20
// calculator.js

let calculate = function(expression) {
	let decode = expression.replace(/%20/g, " ");
	let stripped = decode.replace(/\s+/g, '');
	let firstChar = stripped[0];
	let lastChar = stripped.charAt(stripped.length - 1);
	var symbols = ["+", "-", "=", "*", "/"];

	if(symbols.includes(firstChar) && symbols.includes(lastChar)){
		return "illegal";
	}

	if (/[a-zA-Z]/.test(stripped)) {
		return "illegal";
	}

	answer = eval(stripped);
	return answer;
}
module.exports = {calculate:calculate};

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

		document.getElementById("result").innerHTML = finalMessage;
	});

}

// Erick Venegas
// ISTA330
// 01-24-20
// calculator.js

let calculate = function(expression) {
	let decode = expression.replace(/%20/g, " ");
	let stripped = decode.replace(/\s+/g, '');
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
		let finalMessage = result.data.express;
		document.getElementById("result").innerHTML = finalMessage;
	});

}

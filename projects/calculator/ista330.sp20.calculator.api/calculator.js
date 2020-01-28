// ???
// let calculate = function(expression) {
// 	return "-1";
// }
// module.exports = {calculate};


function submit(){
	console.log("onclick");
	let info = document.getElementById("input").value;
	let url = "http://localhost:3001?expression=" + info;

	fetch(url)
	.then(response => {
		console.log("fetch");
		console.log(response);
		if(response.status == 200) {
			return response.json().then(data => {
				return {status: response.status, data};
			});
		} else {
			console.log('Server error!');
			return Promise.resolve();
		}
	})
	.then(result => {
		let ex = result.data.message;
		console.log(ex);
		document.getElementById("result").innerHTML = ex;
	});

}




// Erick Venegas
// ISTA330
// 01-21-20
// service.js

// dependencies
const express = require("express");
const url = require("url");
const calculator = require("./calculator.js");
const cors = require("cors")

// create the server
const app = express();
const port = 3001;

// the methods
app.get('/', cors(), (request , response) => {
	console.log("get method");

	let expression = request.url.split("=")[1];
	let decode = expression.replace(/%20/g, " ");
	let stripped = decode.replace(/\s+/g, '');
	answer = eval(stripped);
	console.log(answer);

	response.json({message: expression+"= "+answer});
	// response.send(expression + " = " + calculator.calculate(expression));


});


app.listen(port, () => console.log("Listening on port" + port));






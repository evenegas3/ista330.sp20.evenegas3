// Erick Venegas
// ISTA330
// 01-21-20
// service.js

// dependencies
const express = require("express");
const url = require("url");
const cors = require("cors")
const calculator = require("./calculator.js");

// create the server
const app = express();
const port = 3001;

// the methods
app.get('/', cors(), (request , response) => {
	let expression = request.url.split("=")[1];
	response.json({express: expression+"="+calculator.calculate(expression)});
});

app.listen(port, () => console.log("Listening on port" + port));






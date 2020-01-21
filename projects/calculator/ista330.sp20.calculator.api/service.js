// Erick Venegas
// ISTA330
// 01-21-20
// service.js

const express = require('express');
const cors = require("cors")
const url = require('url');
const app = express();
const port = 3001;

app.get('/', cors(), (request , response) => {
	var expression = request.url.split("=")[1];
	console.log(expression);
	response.json({message: expression + " = ?"});
});

app.listen(port, ()=> console.log('Listening on port ' + port));

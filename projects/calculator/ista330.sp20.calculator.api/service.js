// const express = require(’express’);
// const url = require(’url’);
// const app = express();

// app.get(’/’, (request , response) => {
// 	var urlParts = url.parse(request.url, true);
// 	var parameters = urlParts.query;
// 	var expression = parameters.expression;
// 	response.send(expression + " = ?");
// });

// app.listen(3001);

// Erick Venegas

const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
console.log('web service started');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static('public'));


app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	console.log(req);
	console.log(res);
	// let information = getFileInfo();
	// res.send(JSON.stringify(information));
})



app.listen(3001);

<<<<<<< Updated upstream
// dependencies
const express = require(’express’);
const url = require(’url’);

//create the server 
const app = express();
const port = 3001;

// the methods
app.get(’/’, (request , response) => {
var urlParts = url.parse(request.url, true);
var parameters = urlParts.query;
var expression = parameters.expression;
response.send(expression + " = ?");
});

// start the server
app.listen(port, ()=> console.log (’Listening on port’ + port));
=======
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
	response.json({message: expression + " = ?"});
});

app.listen(port, ()=> console.log('Listening on port ' + port));
>>>>>>> Stashed changes

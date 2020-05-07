// Erick Venegas
// ISTA330

// dependencies
const express = require("express");
const url = require("url");
const cors = require("cors")
const calculator = require("./category1.js");

// create the server
const app = express();
const port = 3001;
const mariadb = require('mariadb');


const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: 'db1.cxkesjdm0afm.us-east-1.rds.amazonaws.com', 
     user:'admin', 
     password: 'myPassword',
     connectionLimit: 2
});

// the methods
app.get('/', cors(), (request , response) => {
	let expression = request.url.split("=")[1];
	response.json({express: expression+"="+calculator.calculate(expression)});
});

async function asyncFunction() {
  let conn;
  try {
	conn = await pool.getConnection();
	const rows = await conn.query("SELECT 1 as val");
	console.log(rows); //[ {val: 1}, meta: ... ]
	const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
	console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
}

mariadb.createConnection({host: 'mydb.com', user: 'myUser', password: 'myPwd'})
.then(conn => {
  conn.query("select 1", [2])
    .then(rows => {
      console.log(rows); // [{ "1": 1 }]
      conn.end();
    })
    .catch(err => { 
      //handle query error
    });
})
.catch(err => {
  //handle connection error
});


app.listen(port, () => console.log("Listening on port" + port));
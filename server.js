
const express = require('express')
const app = express()
const fs = require("fs")
const path = require("path");

const mariadb = require('mariadb');


var pool

async function Connect(){
	pool = await mariadb.createPool({
   		host: '192.168.1.50', 
   		user:'bts', 
   		password: 'snir',
   		connectionLimit: 5,
   		database: "bts_tutorial"
	});
}

Connect()

console.log( pool )

async function Mesures() {
	return new Promise(async function(resolve, reject) {
  		let conn;
  		try {
			conn = await pool.getConnection();
			let rows = await conn.query("SELECT * FROM Mesures ORDER BY ID DESC LIMIT 1");
			resolve( rows )
		
  		} catch (err) {
  			Connect()
			reject(err ) ;
  		}
  	})
}



app.get('/', function (req, res) {
	res.type('text/html; charset=utf-8');
  	res.sendFile( path.join(__dirname + '/www/template.html') )

})

var lastmesure = {}

app.get('/data.json', async function (req, res) {
	res.type('text/html; charset=utf-8');
	lastmesure = (await Mesures()) || lastmesure
  	res.send( lastmesure )

})

app.get('/style.css', function (req, res) {
	res.type('text/css; charset=utf-8');
  	res.sendFile( path.join(__dirname + '/www/style.css') )
})

app.get('/script.js', function (req, res) {
	res.type('text/javascript; charset=utf-8');
  	res.sendFile( path.join(__dirname + '/www/script.js') )
})

app.get('/images/*', function (req, res) {

	let file = req.url.replace('/images/', '')

	res.type('text/css; charset=utf-8');
  	res.sendFile( path.join(__dirname + '/www/images/' + file) )

})

app.get('*', function (req, res) {
	res.redirect('/')
})


app.listen(3333)
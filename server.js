
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

async function Mesures( limit ) {
	return new Promise(async function(resolve, reject) {
  		let conn;
  		limit = limit || 1
  		try {
			conn = await pool.getConnection();
			let rows = await conn.query("SELECT * FROM Mesures ORDER BY ID DESC LIMIT " + limit);
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

var lastmesure10 = {}

app.get('/chart.json', async function (req, res) {
	res.type('text/html; charset=utf-8');
	lastmesure10 = (await Mesures( 10 )) || lastmesure10
  	res.send( lastmesure10 )

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
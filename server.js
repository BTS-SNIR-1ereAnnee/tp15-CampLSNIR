
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


function Generate( num ){
	return new Promise(async function(resolve, reject) {
		
		let obj = {}
	
		console.log( "valeur Aleatoires !"  )

		num = num || 1
	
		for( let i = 0 ; i < num ; i++ ){
	
			let  today = new Date( Date.now() - i *100 )
    		h = today.getHours()
    		m = today.getMinutes()
    		s = today.getSeconds()
			
			obj[i] = {}
    		obj[i].id = i
			obj[i].DATE = h + ":" + m + ":" + s
			obj[i].degres = (15 + Math.random()*5).toFixed(2)
			obj[i].humidie = (50 + Math.random()*5).toFixed(2)
			obj[i].pression = (1000 + Math.random()*10).toFixed(2)
		}
	
		resolve(obj)
	})

}

async function Mesures( limit ) {
	return new Promise(async function(resolve, reject) {
  		let conn;
  		limit = limit || 1
  		try {
			conn = await pool.getConnection();
			let rows = await conn.query("SELECT * FROM Mesures ORDER BY ID DESC LIMIT " + limit);
			resolve( rows )
		
  		} catch (err) {
  			
  			reject( false )
  			Connect()
  		}
  	})
}

(async () => {
	await Connect()

	try{
		let conn = await pool.getConnection()
	}catch( e ){
		console.log( "Cannot retrieve connection from pool" , "Inpossible de se connecter a la Db les valeurs seront crée aléatoirement" )
		Mesures = Generate
		pool = undefined
	}

	
})();

app.get('/', function (req, res) {
	res.type('text/html; charset=utf-8');
  	res.sendFile( path.join(__dirname + '/www/template.html') )

})


app.get('/data.json', async function (req, res) {
	res.type('application/json; charset=utf-8');
  	res.send( await Mesures( 1 ) )

})

app.get('/chart.json', async function (req, res) {
	res.type('application/json; charset=utf-8');
  	res.send( await Mesures( 10 ) )

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

	let ext = path.extname( file ).substr(1)

	res.type('image/' + ext + ";");
  	res.sendFile( path.join(__dirname + '/www/images/' + file) )

})

app.get('*', function (req, res) {
	res.redirect('/')
})


app.listen(3333)
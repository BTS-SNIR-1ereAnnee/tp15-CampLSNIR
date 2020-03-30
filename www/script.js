//https://codepen.io/m2creates/pen/prvqjp

async function GetData() {
	return new Promise(async function(resolve, reject) {

  		try {
			
  			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			        var maLigne = this.responseText;
			            try{
			              data = JSON.parse(maLigne);
			              resolve( data )
			            }catch (e) {
			            	reject( date )
			              console.error("Erreur d'analyse du JSON :", e);
			            }
			
			
			        }
			
			};
			xhttp.open("GET", "/data.json", true);
			xhttp.send();

  		} catch (err) {
			reject(err ) ;
  		}
  	})
}

async function GetData10() {
	return new Promise(async function(resolve, reject) {

  		try {
			
  			var xhttp = new XMLHttpRequest();

			xhttp.onreadystatechange = function() {
			    if (this.readyState == 4 && this.status == 200) {
			        var maLigne = this.responseText;
			            try{
			              data = JSON.parse(maLigne);
			              resolve( data )
			            }catch (e) {
			            	reject( date )
			              console.error("Erreur d'analyse du JSON :", e);
			            }
			
			
			        }
			
			};
			xhttp.open("GET", "/chart.json", true);
			xhttp.send();

  		} catch (err) {
			reject(err ) ;
  		}
  	})
}

async function Start() {
	console.log( "ok" )
	let obj = await GetData10()

	let mobj = obj[0]
	console.log( mobj )

	document.querySelector("#temperature").innerText  = mobj.degres
	console.log( mobj.degres )
	document.querySelector("#humidite").innerText  = mobj.humidie
	document.querySelector("#pression").innerText  = mobj.pression

	console.log( obj )

	let data = []

	let dates = []

	for( i=0 ; i < 10 ; i++ ){
		data[i] = obj[i].degres
		dates[i] = obj[i].DATE
	}


	var ctx = document.getElementById('Chart').getContext('2d');
	var chart = new Chart(ctx, {
	
	    type: 'line',
	
	    data: {
	        labels: dates,
	        datasets: [{
	            label: 'Mesures',
	            backgroundColor: 'rgb(15, 15, 15 , 0)',
	            borderColor: 'white',
	            data: data
	        }]
	    },
	    options: {}
	});
}


Start()

document.querySelector("#actualiser").addEventListener("click", function(){ 
    Start()
})



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

async function Start() {
	console.log( "ok" )
	let obj = await GetData()

	obj = obj[0]
	console.log( obj )

	document.querySelector("#temperature").innerText  = obj.degres
	console.log( obj.degres )
	document.querySelector("#humidite").innerText  = obj.humidie
	document.querySelector("#pression").innerText  = obj.pression

}


Start()

document.querySelector("#actualiser").addEventListener("click", function(){ 
    Start()
})
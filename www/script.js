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

	console.log( await GetData() )

}


Start()

let url1 = 'https://covid-api.mmediagroup.fr/v1/cases';
let url2 = 'https://covid-api.mmediagroup.fr/v1/cases?country=';
let url3 = 'https://covid-api.mmediagroup.fr/v1/cases?country=Spain';


const selectCategorias = document.getElementById('categorias');
const contagiados = document.getElementById("contagiados");
const altas = document.getElementById("altas");
const fallecidos = document.getElementById("fallecidos");
const fechaActualizacion = document.getElementById("fecha-actualizacion-fecha");

const continente = document.getElementsByClassName("continente-país");
const contagiadosPaís = document.getElementsByClassName("contagiados-país");
const altasPaís = document.getElementsByClassName("altas-país");
const fallecidosPaís = document.getElementsByClassName("fallecidos-país");

async function obtenerJSON(url){
  const respuesta = await fetch(url);
  const json = await respuesta.json();
  return json;
}

function recargarListadatos(datos){
	
	const datoElement = document.getElementById("categorias");
	option = document.createElement('option');
	option.text = `Contagiados: ${datos.Extremadura.confirmed}`;
	option.value= "hh";
	datoElement.appendChild(option);
	option2 = document.createElement('option');
	option2.text = `Altas: ${datos.Extremadura.recovered}`;
	datoElement.appendChild(option2);
	option3 = document.createElement('option');
	option3.text = `Fallecidos: ${datos.Extremadura.deaths}`;
	datoElement.appendChild(option3);

}

obtenerJSON(url3).then(json => { 

	for(var i=0; i<json.Extremadura.length; i++){

		var valor = json.Extremadura[i].confirmed;
		var opcion = document.createElement('option');
		opcion.appendChild( document.createTextNode(valor) );
		opcion.value = valor;
		selectCategorias.appendChild(opcion);

	}

	filtrarPorCategoria();

});

function filtrarPorCategoria(){

	var categoria = selectCategorias.value;

	obtenerJSON(url3 + categoria).then(json => { 
		console.log(json);
		recargarListadatos(json);
	});
}

obtenerJSON(url3).then(json => {

		contagiados.innerText = "contagiados: " + json.Extremadura.confirmed;
		altas.innerText ="Altas: " + json.Extremadura.recovered;
		fallecidos.innerText ="Fallecidos: " + json.Extremadura.deaths;
		fechaActualizacion.innerText = json.Extremadura.updated;
	})

	obtenerJSONpaís();


function obtenerJSONpaís(){
	const pais = ['Spain', 'France', 'Portugal', 'US', 'China', 'Italy'];
var i;
	for ( i = 0; i < pais.length ; i++) {

		obtenerJSON(url2+pais[i]).then(json => {

			numeroPais=pais.indexOf(json.All.country);
				continente[numeroPais].innerText = "Continente: " + json.All.continent;
				contagiadosPaís[numeroPais].innerText = "Contagiados: " + json.All.confirmed;
				altasPaís[numeroPais].innerText = "Altas: " + json.All.recovered;
				fallecidosPaís[numeroPais].innerText = "Fallecidos: " + json.All.deaths;
		})
	}
};